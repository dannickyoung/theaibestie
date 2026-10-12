"use client";

import { useEffect, useRef, useState } from "react";

const SOUND_EVENT = "eb-sound-on";

/**
 * 9:16 phone frame playing a reel. Muted autoplay loop; tap the video or the pill for sound.
 * The mp4 is only attached once the phone is near the viewport (autoplay ignores preload="metadata",
 * so without this it downloads during first paint); until then the poster shows.
 */
export default function SampleReel({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(src);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(src);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  // Only one video on the page has sound: turning sound on here mutes every other reel.
  useEffect(() => {
    const onOther = (e: Event) => {
      const v = ref.current;
      if (v && (e as CustomEvent<HTMLVideoElement>).detail !== v && !v.muted) {
        v.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener(SOUND_EVENT, onOther);
    return () => window.removeEventListener(SOUND_EVENT, onOther);
  }, []);

  // `autoPlay` covers a src set after mount in every current browser; this is the belt to its braces.
  useEffect(() => {
    const v = ref.current;
    if (active && v && v.paused) v.play().catch(() => {});
  }, [active]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: v }));
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div className={`eb-phone ${className}`}>
      <div className="eb-screen">
        <video
          ref={ref}
          className="eb-video"
          src={active}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          onClick={toggleSound}
          aria-label={label}
        />
        <button type="button" className="eb-sound" onClick={toggleSound} aria-pressed={!muted}>
          <i className={muted ? "iconoir-sound-off" : "iconoir-sound-high"} aria-hidden="true" />
          {muted ? "tap for sound" : "sound on"}
        </button>
      </div>
    </div>
  );
}
