/**
 * Client-Side Audio Extraction Utility
 * 100% offline, private, zero-dependency browser processing.
 */

/**
 * Pure client-side ISO BMFF (MP4/MOV) audio track isolator.
 * Converts video and non-audio tracks inside the container into 'free' space atoms
 * without changing byte lengths or offsets in 'mdat' or 'stco'.
 * This allows the browser's native AudioContext.decodeAudioData to parse the audio
 * without throwing EncodingError on video tracks.
 */
export function isolateAudioTrackInMp4(buffer: ArrayBuffer): boolean {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  function readString(offset: number, length: number): string {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += String.fromCharCode(bytes[offset + i]);
    }
    return str;
  }

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      bytes[offset + i] = str.charCodeAt(i);
    }
  }

  let moovOffset = -1;
  let moovSize = 0;
  let offset = 0;

  // Locate the 'moov' atom (can be anywhere in the container)
  while (offset + 8 <= bytes.length) {
    const size = view.getUint32(offset);
    const type = readString(offset + 4, 4);

    if (size === 0) {
      if (type === "moov") {
        moovOffset = offset;
        moovSize = bytes.length - offset;
      }
      break;
    }
    const boxSize = size === 1 ? Number(view.getBigUint64(offset + 8)) : size;
    if (boxSize < 8) break;

    if (type === "moov") {
      moovOffset = offset;
      moovSize = boxSize;
      break;
    }
    offset += boxSize;
  }

  if (moovOffset === -1) return false;

  let trakOffset = moovOffset + 8;
  const moovEnd = Math.min(moovOffset + moovSize, bytes.length);
  let modified = false;

  // Inspect each 'trak' inside 'moov'
  while (trakOffset + 8 <= moovEnd) {
    const size = view.getUint32(trakOffset);
    const type = readString(trakOffset + 4, 4);
    if (size === 0) break;
    const boxSize = size === 1 ? Number(view.getBigUint64(trakOffset + 8)) : size;
    if (boxSize < 8 || trakOffset + boxSize > bytes.length) break;

    if (type === "trak") {
      let isNonAudio = false;
      const trakEnd = trakOffset + boxSize;
      let inner = trakOffset + 8;

      while (inner + 8 <= trakEnd) {
        const inSize = view.getUint32(inner);
        const inType = readString(inner + 4, 4);
        if (inSize < 8 || inner + inSize > trakEnd) break;

        if (inType === "mdia") {
          let mdiaInner = inner + 8;
          const mdiaEnd = inner + inSize;
          while (mdiaInner + 8 <= mdiaEnd) {
            const mSize = view.getUint32(mdiaInner);
            const mType = readString(mdiaInner + 4, 4);
            if (mSize < 8 || mdiaInner + mSize > mdiaEnd) break;

            if (mType === "hdlr") {
              if (mdiaInner + 20 <= mdiaEnd) {
                const handlerType = readString(mdiaInner + 16, 4);
                // Flag video, subtitle, hint, or text tracks
                if (
                  handlerType === "vide" ||
                  handlerType === "sbtl" ||
                  handlerType === "text" ||
                  handlerType === "hint"
                ) {
                  isNonAudio = true;
                }
              }
              break;
            }
            mdiaInner += mSize;
          }
          break;
        }
        inner += inSize;
      }

      if (isNonAudio) {
        // Renaming 'trak' to 'free' instructs the demuxer to skip this track
        writeString(trakOffset + 4, "free");
        modified = true;
      }
    }

    trakOffset += boxSize;
  }

  return modified;
}

/**
 * Encodes an AudioBuffer into standard 16-bit PCM lossless WAV format.
 * High-performance TypedArray implementation.
 */
export function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // 1 = Linear PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const numSamples = buffer.length;
  const dataSize = numSamples * blockAlign;
  const bufferSize = 44 + dataSize;

  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  /* RIFF chunk descriptor */
  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");

  /* "fmt " sub-chunk */
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  /* "data" sub-chunk */
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  // Interleave channels as 16-bit PCM
  const int16View = new Int16Array(arrayBuffer, 44, numSamples * numChannels);
  let p = 0;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      int16View[p++] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

export interface ExtractionResult {
  blob: Blob;
  url: string;
  duration: string;
  filename: string;
}

export function extractAudioFromVideoFile(
  file: File,
  onProgress?: (progress: number, statusMsg: string) => void
): Promise<ExtractionResult> {
  return new Promise((resolve, reject) => {
    const validExtensions = [".mp4", ".webm", ".mov", ".m4v", ".mkv", ".ogg", ".ogv"];
    const dotIndex = file.name.lastIndexOf(".");
    const fileExt = dotIndex !== -1 ? file.name.substring(dotIndex).toLowerCase() : "";
    const isValid =
      validExtensions.includes(fileExt) ||
      file.type.startsWith("video/") ||
      file.type.startsWith("audio/") ||
      file.type === "video/quicktime" ||
      file.type === "video/mp4" ||
      file.type === "video/webm";

    if (!isValid) {
      return reject(
        new Error("Please select a supported video file (.mp4, .webm, or .mov).")
      );
    }

    onProgress?.(15, `Reading ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        const percent = Math.min(45, Math.max(15, Math.round((event.loaded / event.total) * 45)));
        onProgress?.(percent, `Reading file buffer (${percent}%)...`);
      }
    };

    reader.onload = async (e) => {
      try {
        const rawArrayBuffer = e.target?.result as ArrayBuffer;
        if (!rawArrayBuffer || rawArrayBuffer.byteLength === 0) {
          throw new Error("Unable to read video file buffer.");
        }

        onProgress?.(50, "Initializing browser Web Audio API context...");

        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error("Web Audio API is not supported in this browser.");
        }

        const audioCtx = new AudioContextClass();

        if (audioCtx.state === "suspended") {
          try {
            await audioCtx.resume();
          } catch {
            // resume if allowed
          }
        }

        onProgress?.(60, "Isolating audio track from video container...");

        const processedBuffer = rawArrayBuffer.slice(0);
        isolateAudioTrackInMp4(processedBuffer);

        onProgress?.(70, "Decoding audio track via browser Web Audio API...");

        const audioBuffer = await new Promise<AudioBuffer>((res, rej) => {
          let resolved = false;

          const successCb = (buf: AudioBuffer) => {
            if (!resolved) {
              resolved = true;
              res(buf);
            }
          };

          const errorCb = (err: unknown) => {
            if (!resolved) {
              resolved = true;
              rej(err);
            }
          };

          try {
            const maybePromise = audioCtx.decodeAudioData(processedBuffer.slice(0), successCb, errorCb);
            if (maybePromise && typeof maybePromise.then === "function") {
              maybePromise.then(successCb).catch(errorCb);
            }
          } catch (syncErr) {
            if (!resolved) {
              resolved = true;
              rej(syncErr);
            }
          }
        });

        onProgress?.(85, "Encoding lossless 16-bit PCM WAV...");

        const wavBlob = audioBufferToWav(audioBuffer);
        const url = URL.createObjectURL(wavBlob);

        const safeBaseName = file.name.replace(/\.[^/.]+$/, "") || "extracted-audio";
        const finalWavName = `${safeBaseName}.wav`;

        const totalSecs = Math.floor(audioBuffer.duration);
        const minutes = Math.floor(totalSecs / 60);
        const seconds = totalSecs % 60;
        const durationStr = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        onProgress?.(100, `Audio extracted successfully (${durationStr})!`);

        audioCtx.close().catch(() => {});

        resolve({
          blob: wavBlob,
          url,
          duration: durationStr,
          filename: finalWavName,
        });
      } catch (err: unknown) {
        reject(
          err instanceof Error && err.message
            ? err
            : new Error("Could not decode audio track. The video may contain an unsupported codec or have no audio track.")
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the video file. Please try again."));
    };

    reader.readAsArrayBuffer(file);
  });
}
