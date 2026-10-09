"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/edit-bestie/sample_01.mp4";

/**
 * 9:16 phone frame playing the sample edit. Muted autoplay loop; tap the video or the pill for sound.
 * The 10 MB mp4 is only attached once the phone is near the viewport (autoplay ignores preload="metadata",
 * so without this it downloads during first paint); until then the poster shows.
 */
export default function SampleReel() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      setSrc(SRC);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(SRC);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // `autoPlay` covers a src set after mount in every current browser; this is the belt to its braces.
  useEffect(() => {
    const v = ref.current;
    if (src && v && v.paused) v.play().catch(() => {});
  }, [src]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div className="eb-phone">
      <div className="eb-screen">
        <video
          ref={ref}
          className="eb-video"
          src={src}
          poster="/edit-bestie/sample_01-poster.jpg"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onClick={toggleSound}
          aria-label="Sample reel edited with Edit Bestie, with captions on screen"
        />
        <button type="button" className="eb-sound" onClick={toggleSound} aria-pressed={!muted}>
          <i className={muted ? "iconoir-sound-off" : "iconoir-sound-high"} aria-hidden="true" />
          {muted ? "tap for sound" : "sound on"}
        </button>
      </div>
    </div>
  );
}
