import type { Metadata } from "next";
import "./lesson.css";
import { lessonHtml } from "./lessonHtml";
import CopyInit from "./CopyInit";

const TITLE = "Lesson 1: What is Claude Code? — The AI Bestie";
const DESCRIPTION =
  "No tech words. The simplest explainer you'll ever read — what Claude Code is, how to set it up, and what it can build for you.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lesson-01" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lesson-01",
    siteName: "The AI Bestie",
    type: "article",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The AI Bestie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function Lesson1Page() {
  return (
    <>
      <div id="l1" dangerouslySetInnerHTML={{ __html: lessonHtml }} />
      <CopyInit />
    </>
  );
}
