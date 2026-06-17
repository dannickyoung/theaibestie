import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import LessonCard from "@/components/LessonCard";

const TITLE = "Lessons — The AI Bestie";
const DESCRIPTION =
  "All The AI Bestie lessons in one place. Tiny, beginner-friendly AI lessons. Zero coding. Work through them in order or jump to what you need.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lessons" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lessons",
    siteName: "The AI Bestie",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The AI Bestie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const LESSONS = [
  {
    badge: "LESSON 01",
    title: "What is Claude Code?",
    desc: "No tech words, no scary stuff. What Claude Code is, how to set it up, and the amazing things it can build for you.",
    href: "/lesson-01",
    art: "/assets/claude-code-mascot.png",
    pixel: true,
    meta: [
      { icon: "iconoir-page", label: "5-min read" },
      { icon: "iconoir-emoji", label: "Total beginner" },
    ],
  },
  {
    badge: "LESSON 02",
    title: "You're Using Claude All Wrong",
    desc: "Most people only chat with Claude. Learn to make it actually build for you — live, inside VS Code.",
    href: "/lesson-02",
    art: "/assets/vscode.png",
    pixel: false,
    meta: [
      { icon: "iconoir-code", label: "VS Code setup" },
      { icon: "iconoir-cursor-pointer", label: "Hands-on" },
    ],
  },
];

const COMING_SOON = [
  { n: "LESSON 03", title: "Chat vs Co-work vs Code" },
  { n: "LESSON 04", title: "Build a Website" },
];

export default function LessonsPage() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="intro" style={{ marginTop: 34 }}>
          <span className="free-badge">★ THE AI BESTIE COURSE</span>
          <h1>All the lessons</h1>
          <p>
            Work through them in order, or jump straight to whatever you&apos;re
            curious about. New lessons drop regularly.
          </p>
          <div className="learn-modes">
            <span className="lm">
              <i className="iconoir-internet" /> Read online
            </span>
            <span className="lm">
              <i className="iconoir-download" /> Download the PDF &middot; learn offline
            </span>
          </div>
        </div>

        <div className="section-label">
          <i className="iconoir-bookmark-book" /> Lessons
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {LESSONS.map((l) => (
            <LessonCard key={l.href} {...l} />
          ))}
        </div>

        <div className="section-label" style={{ fontSize: 16, color: "#6b7178" }}>
          <i className="iconoir-clock" style={{ color: "#9aa0a6" }} /> Coming soon
        </div>
        <div className="soon-row">
          {COMING_SOON.map((l) => (
            <div className="soon" key={l.n}>
              <span className="sn">{l.n}</span>
              <h3>{l.title}</h3>
              <span className="lk">
                <i className="iconoir-lock" /> Locked
              </span>
            </div>
          ))}
        </div>

        <footer>
          <span>The AI Bestie Course &middot; Lessons 1–4</span>
          <a className="ig" href="https://instagram.com/the.ai.bestie">
            <i className="iconoir-instagram" /> @the.ai.bestie
          </a>
        </footer>
      </div>
    </>
  );
}
