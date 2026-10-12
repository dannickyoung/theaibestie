"use client";

import { useEffect, useRef, useState } from "react";

/** Wide muted loop inside an FAQ answer. Loads and plays only once the answer is opened (visible). */
export default function FaqVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setActive(src);
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      className="eb-faq-video"
      src={active}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={label}
    />
  );
}
