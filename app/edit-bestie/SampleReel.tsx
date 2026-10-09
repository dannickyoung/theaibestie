"use client";

import { useRef, useState } from "react";

/** 9:16 phone frame playing the sample edit. Muted autoplay loop; tap the video or the pill for sound. */
export default function SampleReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (v.paused) void v.play();
  };

  return (
    <div className="eb-phone">
      <div className="eb-screen">
        <video
          ref={ref}
          className="eb-video"
          src="/edit-bestie/sample_01.mp4"
          poster="/edit-bestie/sample_01-poster.jpg"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onClick={toggleSound}
          aria-label="Sample reel edited with Edit Bestie, with captions on screen"
        />
        <button type="button" className="eb-sound" onClick={toggleSound} aria-pressed={!muted} aria-label="Sound">
          <i className={muted ? "iconoir-sound-off" : "iconoir-sound-high"} aria-hidden="true" />
          {muted ? "tap for sound" : "sound on"}
        </button>
      </div>
    </div>
  );
}
