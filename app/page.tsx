import Banner from "@/components/Banner";
import LessonCard from "@/components/LessonCard";

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

export default function Home() {
  return (
    <div className="wrap">
      <Banner />

      <div className="intro">
        <h1>Learn AI, the easy way.</h1>
        <p>Tiny, no-jargon lessons. Zero coding. Start right here &darr;</p>
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
  );
}
