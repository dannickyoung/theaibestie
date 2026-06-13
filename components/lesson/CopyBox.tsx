"use client";

import { useState } from "react";
import styles from "./lesson.module.css";

type Variant = "cmd" | "url" | "prompt";

export default function CopyBox({
  label,
  copyText,
  variant = "cmd",
  children,
}: {
  label: string;
  copyText: string;
  variant?: Variant;
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const className = [
    styles.copybox,
    variant === "url" && styles.cbUrl,
    variant === "prompt" && styles.cbPrompt,
  ]
    .filter(Boolean)
    .join(" ");

  const copy = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    };
    const fallback = () => {
      const t = document.createElement("textarea");
      t.value = copyText;
      t.style.position = "fixed";
      t.style.opacity = "0";
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(t);
      done();
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(copyText).then(done).catch(fallback);
    } else {
      fallback();
    }
  };

  return (
    <div
      className={className}
      role="button"
      tabIndex={0}
      onClick={copy}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          copy();
        }
      }}
    >
      <div className={styles.cbTop}>
        <span className={styles.cbLab}>{label}</span>
        <span className={styles.cbCopy}>
          {copied ? (
            <>
              <i className="iconoir-check" /> copied!
            </>
          ) : (
            <>
              <i className="iconoir-copy" /> copy
            </>
          )}
        </span>
      </div>
      <div className={styles.cbCode}>{children ?? copyText}</div>
    </div>
  );
}
