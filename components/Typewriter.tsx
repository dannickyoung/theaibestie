"use client";

import { useEffect, useState } from "react";

/** Types a phrase, pauses, deletes, then moves to the next — looping forever. */
export default function Typewriter({
  phrases,
  typeMs = 70,
  deleteMs = 38,
  holdMs = 1700,
}: {
  phrases: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        ),
      deleting ? deleteMs : typeMs
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typeMs, deleteMs, holdMs]);

  return (
    <>
      <span className="hl">{text}</span>
      <span className="tw-caret" aria-hidden="true" />
    </>
  );
}
