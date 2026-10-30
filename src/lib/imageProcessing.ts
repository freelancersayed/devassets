/**
 * Client-Side Image Processing Utility
 * 100% in-memory HTML5 Canvas & FileReader engine.
 * Zero telemetry, zero server uploads, 100% private.
 */

export type ImageOutputFormat = "webp" | "jpeg" | "png";

export type AspectRatioPreset =
  | "original"
  | "1:1"
  | "16:9"
  | "4:5"
  | "9:16"
  | "custom";

export type ResizeFitMode = "cover" | "contain" | "stretch";

export interface ProcessImageOptions {
  format: ImageOutputFormat;
  quality: number; // 0.1 to 1.0
  aspectRatio: AspectRatioPreset;
  fitMode: ResizeFitMode;
  customWidth?: number;
  customHeight?: number;
  scalePercent?: number; // 10 to 100
}

export interface ProcessedImageResult {
  blob: Blob;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  savingsPercent: number;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  outputFormat: ImageOutputFormat;
  fileName: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Loads a File into an HTMLImageElement asynchronously.
 */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });
}

/**
 * Calculates target dimensions based on aspect ratio, fit mode, and scale settings.
 */
export function calculateDimensions(
  origW: number,
  origH: number,
  aspectRatio: AspectRatioPreset,
  fitMode: ResizeFitMode,
  customW?: number,
  customH?: number,
  scalePercent: number = 100
): { targetW: number; targetH: number; srcX: number; srcY: number; srcW: number; srcH: number } {
  let finalW = origW;
  let finalH = origH;
  let srcX = 0;
  let srcY = 0;
  let srcW = origW;
  let srcH = origH;

  // 1. Calculate desired aspect ratio
  let targetRatio: number | null = null;
  if (aspectRatio === "1:1") targetRatio = 1.0;
  else if (aspectRatio === "16:9") targetRatio = 16 / 9;
  else if (aspectRatio === "4:5") targetRatio = 4 / 5;
  else if (aspectRatio === "9:16") targetRatio = 9 / 16;
  else if (aspectRatio === "custom" && customW && customH && customW > 0 && customH > 0) {
    targetRatio = customW / customH;
  }

  if (targetRatio !== null) {
    if (aspectRatio === "custom" && customW && customH) {
      finalW = customW;
      finalH = customH;
    } else {
      if (fitMode === "cover") {
        // Crop image to target aspect ratio
        const currentRatio = origW / origH;
        if (currentRatio > targetRatio) {
          srcW = Math.round(origH * targetRatio);
          srcH = origH;
          srcX = Math.round((origW - srcW) / 2);
          srcY = 0;
        } else {
          srcW = origW;
          srcH = Math.round(origW / targetRatio);
          srcX = 0;
          srcY = Math.round((origH - srcH) / 2);
        }
        finalW = srcW;
        finalH = srcH;
      } else {
        // Keep dimensions inside target bounding box
        finalW = origW;
        finalH = Math.round(origW / targetRatio);
      }
    }
  }

  // Apply scale percentage
  const scale = Math.max(10, Math.min(100, scalePercent)) / 100;
  finalW = Math.max(1, Math.round(finalW * scale));
  finalH = Math.max(1, Math.round(finalH * scale));

  return { targetW: finalW, targetH: finalH, srcX, srcY, srcW, srcH };
}

/**
 * Transforms, resizes, and compresses an image in memory via Canvas.
 */
export async function processImage(
  file: File,
  img: HTMLImageElement,
  options: ProcessImageOptions
): Promise<ProcessedImageResult> {
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  const { targetW, targetH, srcX, srcY, srcW, srcH } = calculateDimensions(
    origW,
    origH,
    options.aspectRatio,
    options.fitMode,
    options.customWidth,
    options.customHeight,
    options.scalePercent || 100
  );

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d", { alpha: options.format === "png" || options.format === "webp" });

  if (!ctx) {
    throw new Error("Unable to create canvas 2D rendering context.");
  }

  // Fill white background for JPEG since it doesn't support transparency
  if (options.format === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetW, targetH);
  }

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw image
  ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetW, targetH);

  const mimeType =
    options.format === "png"
      ? "image/png"
      : options.format === "jpeg"
      ? "image/jpeg"
      : "image/webp";

  // Quality parameter applies to webp and jpeg
  const q = Math.max(0.1, Math.min(1.0, options.quality));

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed."));
      },
      mimeType,
      q
    );
  });

  const previewUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const extension = options.format === "jpeg" ? "jpg" : options.format;
  const fileName = `${baseName}_studio.${extension}`;

  const savings = file.size > 0 ? Math.round(((file.size - blob.size) / file.size) * 100) : 0;

  return {
    blob,
    previewUrl,
    originalSize: file.size,
    compressedSize: blob.size,
    savingsPercent: savings,
    originalWidth: origW,
    originalHeight: origH,
    newWidth: targetW,
    newHeight: targetH,
    outputFormat: options.format,
    fileName,
  };
}
