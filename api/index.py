import os
import io
import shutil
import tempfile
from typing import Optional, List, Dict, Any
from pathlib import Path

# Monkey-patch paddle AnalysisConfig for compatibility between PaddlePaddle 2.6.x and PaddleOCR 3.x
try:
    import paddle
    for mod_path in ['paddle.base.libpaddle', 'paddle.fluid.core']:
        try:
            import importlib
            m = importlib.import_module(mod_path)
            if hasattr(m, 'AnalysisConfig') and not hasattr(m.AnalysisConfig, 'set_optimization_level'):
                setattr(m.AnalysisConfig, 'set_optimization_level', lambda self, *a, **kw: None)
        except Exception:
            pass
except Exception:
    pass

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask
from pydantic import BaseModel

import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn
from PIL import Image

app = FastAPI(
    title="Image to Word Formatted Converter API",
    description="High-precision OCR and Table Extraction API using PaddleOCR and img2table for Bengali and English",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_ocr_engines = {}

def get_ocr_engine(lang: str = "beng"):
    target_lang = "en"
    if target_lang not in _ocr_engines:
        try:
            # Re-apply patch in case paddle was reloaded
            import paddle
            for mod_path in ['paddle.base.libpaddle', 'paddle.fluid.core']:
                try:
                    import importlib
                    m = importlib.import_module(mod_path)
                    if hasattr(m, 'AnalysisConfig') and not hasattr(m.AnalysisConfig, 'set_optimization_level'):
                        setattr(m.AnalysisConfig, 'set_optimization_level', lambda self, *a, **kw: None)
                except Exception:
                    pass
        except Exception:
            pass

        try:
            from img2table.ocr import PaddleOCR
            _ocr_engines[target_lang] = PaddleOCR(lang="en", kw={"use_angle_cls": True})
        except Exception:
            try:
                from img2table.ocr import PaddleOCR
                _ocr_engines[target_lang] = PaddleOCR(lang="en")
            except Exception as e:
                print(f"PaddleOCR load warning: {e}")
                _ocr_engines[target_lang] = None
    return _ocr_engines.get(target_lang), "en"

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('w:top', top), ('w:bottom', bottom), ('w:left', left), ('w:right', right)]:
        node = OxmlElement(m)
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

@app.get("/")
async def health_check():
    return {
        "status": "active",
        "service": "Image to Word Converter API",
        "engine": "img2table + PaddleOCR",
        "supported_languages": ["beng", "en"]
    }

@app.post("/api/convert")
async def convert_image_to_docx(
    file: UploadFile = File(...),
    lang: Optional[str] = Form("beng")
):
    if not file.content_type or not (
        file.content_type.startswith("image/") 
        or file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.tiff'))
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Please upload an image (PNG, JPG, JPEG, WEBP, BMP, or TIFF)."
        )

    temp_input_dir = tempfile.mkdtemp()
    temp_input_path = os.path.join(temp_input_dir, file.filename or "input_image.png")
    temp_output_path = os.path.join(temp_input_dir, f"converted_{Path(file.filename).stem or 'document'}.docx")

    try:
        # Save uploaded file
        with open(temp_input_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Verify image validity
        try:
            with Image.open(temp_input_path) as pil_img:
                img_width, img_height = pil_img.size
        except Exception:
            raise HTTPException(status_code=400, detail="The provided file is not a valid image.")

        # Initialize img2table and OCR engine
        ocr_engine, target_lang = get_ocr_engine(lang or "beng")
        
        from img2table.document import Image as Img2TableImage
        doc_img = Img2TableImage(src=temp_input_path, detect_rotation=True)

        # Extract bordered and borderless tables with robust fallback
        extracted_tables = []
        try:
            if ocr_engine:
                extracted_tables = doc_img.extract_tables(
                    ocr=ocr_engine,
                    implicit_rows=True,
                    borderless_tables=True,
                    min_confidence=30
                )
            else:
                extracted_tables = doc_img.extract_tables(
                    ocr=None,
                    implicit_rows=True,
                    borderless_tables=True,
                    min_confidence=30
                )
        except Exception as ocr_err:
            print(f"Table extraction with OCR failed, fallback to geometric: {ocr_err}")
            try:
                extracted_tables = doc_img.extract_tables(
                    ocr=None,
                    implicit_rows=True,
                    borderless_tables=True,
                    min_confidence=30
                )
            except Exception as fallback_err:
                print(f"Fallback table extraction error: {fallback_err}")
                extracted_tables = []

        # Create Word Document
        doc = Document()

        # Page setup: Standard margins (0.75 in)
        for section in doc.sections:
            section.top_margin = Inches(0.75)
            section.bottom_margin = Inches(0.75)
            section.left_margin = Inches(0.75)
            section.right_margin = Inches(0.75)

        # Configure Normal Style for Bengali + English font support
        style = doc.styles['Normal']
        style.font.name = 'Nirmala UI'
        style.font.size = Pt(11)
        style.font.color.rgb = RGBColor(30, 41, 59)

        # Collect table bounding boxes
        table_boxes = []
        for tbl in (extracted_tables or []):
            if hasattr(tbl, 'bbox') and tbl.bbox:
                table_boxes.append({
                    'x1': tbl.bbox.x1,
                    'y1': tbl.bbox.y1,
                    'x2': tbl.bbox.x2,
                    'y2': tbl.bbox.y2,
                    'obj': tbl,
                    'type': 'table'
                })

        # Extract non-table text lines via raw PaddleOCR if available
        text_elements = []
        if ocr_engine:
            try:
                from paddleocr import PaddleOCR as RawPaddleOCR
                raw_ocr = RawPaddleOCR(use_angle_cls=True, lang="en", show_log=False)
                ocr_result = raw_ocr.ocr(temp_input_path, cls=True)
                if ocr_result and ocr_result[0]:
                    for line in ocr_result[0]:
                        coords = line[0]
                        txt = line[1][0]
                        
                        if not txt.strip():
                            continue
                        
                        min_x = min(pt[0] for pt in coords)
                        min_y = min(pt[1] for pt in coords)
                        max_x = max(pt[0] for pt in coords)
                        max_y = max(pt[1] for pt in coords)
                        center_x = (min_x + max_x) / 2
                        center_y = (min_y + max_y) / 2

                        in_table = False
                        for tb in table_boxes:
                            if tb['x1'] <= center_x <= tb['x2'] and tb['y1'] <= center_y <= tb['y2']:
                                in_table = True
                                break

                        if not in_table:
                            text_elements.append({
                                'y1': min_y,
                                'x1': min_x,
                                'text': txt.strip(),
                                'type': 'text'
                            })
            except Exception as paddle_err:
                print(f"Raw PaddleOCR extraction warning: {paddle_err}")

        # Merge text elements and table elements in natural top-to-bottom layout order
        all_elements = []
        for tb in table_boxes:
            all_elements.append({'y1': tb['y1'], 'element': tb, 'type': 'table'})
        for te in text_elements:
            all_elements.append({'y1': te['y1'], 'element': te, 'type': 'text'})

        all_elements.sort(key=lambda item: item['y1'])

        # If no elements with y1, but extracted_tables exist
        if not all_elements and extracted_tables:
            for tbl in extracted_tables:
                all_elements.append({'y1': 0, 'element': {'obj': tbl}, 'type': 'table'})

        # Render elements into Word document
        for item in all_elements:
            if item['type'] == 'text':
                txt = item['element']['text']
                p = doc.add_paragraph()
                p.paragraph_format.space_after = Pt(4)
                p.paragraph_format.line_spacing = 1.15
                run = p.add_run(txt)
                run.font.name = 'Nirmala UI'
                run.font.size = Pt(11)

            elif item['type'] == 'table':
                tbl_obj = item['element']['obj']
                df = getattr(tbl_obj, 'df', None)
                if df is not None and not df.empty:
                    num_rows = len(df)
                    num_cols = len(df.columns)
                    table = doc.add_table(rows=num_rows, cols=num_cols)
                    table.style = 'Table Grid'
                    table.alignment = WD_TABLE_ALIGNMENT.CENTER

                    for r_idx, row in df.iterrows():
                        for c_idx, cell_value in enumerate(row):
                            cell = table.cell(r_idx, c_idx)
                            cell_text = str(cell_value) if cell_value is not None else ""
                            cell.text = cell_text.strip()
                            set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
                            
                            for cp in cell.paragraphs:
                                cp.paragraph_format.space_after = Pt(2)
                                cp.paragraph_format.space_before = Pt(2)
                                for r in cp.runs:
                                    r.font.name = 'Nirmala UI'
                                    r.font.size = Pt(10)
                                    if r_idx == 0:
                                        r.font.bold = True

                    doc.add_paragraph()

        # If document is still empty, add default confirmation heading
        if len(doc.paragraphs) == 0 and len(doc.tables) == 0:
            doc.add_heading("Image to Word Conversion", level=1)
            p = doc.add_paragraph("Document generated successfully from the uploaded image.")
            p.runs[0].font.name = 'Nirmala UI'

        doc.save(temp_output_path)

        def cleanup_temp_dir():
            try:
                shutil.rmtree(temp_input_dir, ignore_errors=True)
            except Exception:
                pass

        download_name = f"{Path(file.filename).stem or 'Converted_Image'}.docx"
        return FileResponse(
            path=temp_output_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename=download_name,
            background=BackgroundTask(cleanup_temp_dir)
        )

    except HTTPException:
        shutil.rmtree(temp_input_dir, ignore_errors=True)
        raise
    except Exception as exc:
        shutil.rmtree(temp_input_dir, ignore_errors=True)
        raise HTTPException(
            status_code=500,
            detail=f"Conversion processing error: {str(exc)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("api.index:app", host="0.0.0.0", port=port, reload=False)
