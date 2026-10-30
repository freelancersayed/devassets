import type { Metadata } from "next";
import VideoToAudioClient from "./VideoToAudioClient";

export const metadata: Metadata = {
  title: "Video to Audio Detacher — Free Browser Tool",
  description:
    "Detach and extract high-quality lossless 16-bit PCM WAV audio from MP4, WebM, and MOV videos directly in your browser. 100% offline, client-side, and private.",
  keywords: [
    "video to audio converter",
    "video to wav",
    "extract audio from video",
    "mp4 to wav",
    "webm to wav",
    "mov to wav",
    "browser audio extractor",
    "free audio detacher",
  ],
  alternates: {
    canonical: "https://devassets.online/tools/video-to-audio",
  },
  openGraph: {
    title: "Video to Audio Detacher — Free Browser Tool | DevAssets",
    description:
      "Extract lossless WAV audio from MP4, WebM, and MOV videos locally in your browser. 100% client-side privacy.",
    url: "https://devassets.online/tools/video-to-audio",
    type: "website",
  },
};

export default function VideoToAudioPage() {
  return <VideoToAudioClient />;
}
