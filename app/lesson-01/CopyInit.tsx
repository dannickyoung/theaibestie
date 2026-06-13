"use client";

import { useEffect } from "react";

/** Wires up "click any black box to copy" on the lesson's copy boxes. */
export default function CopyInit() {
  useEffect(() => {
    const boxes = Array.from(
      document.querySelectorAll<HTMLElement>("#l1 .copybox")
    );
    const cleanups: Array<() => void> = [];

    boxes.forEach((box) => {
      const code = box.querySelector<HTMLElement>(".cb-code");
      const btn = box.querySelector<HTMLElement>(".cb-copy");
      if (!code) return;

      const onClick = () => {
        const text = (code.innerText || "").trim();
        const flash = () => {
          if (!btn) return;
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="iconoir-check"></i> copied!';
          setTimeout(() => {
            btn.innerHTML = orig;
          }, 1400);
        };
        const fallback = () => {
          const t = document.createElement("textarea");
          t.value = text;
          t.style.position = "fixed";
          t.style.opacity = "0";
          document.body.appendChild(t);
          t.select();
          try {
            document.execCommand("copy");
          } catch {}
          document.body.removeChild(t);
          flash();
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(flash).catch(fallback);
        } else {
          fallback();
        }
      };

      box.style.cursor = "pointer";
      box.addEventListener("click", onClick);
      cleanups.push(() => box.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
