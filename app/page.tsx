import Banner from "@/components/Banner";
import LessonCard from "@/components/LessonCard";

const COMING_SOON = [
  { n: "LESSON 02", title: "Claude in VS Code" },
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

      <LessonCard />

      <div
        className="section-label"
        style={{ fontSize: 16, color: "#6b7178" }}
      >
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
        <span>The AI Bestie Course &middot; Lesson 1 of 4</span>
        <a className="ig" href="https://instagram.com/the.ai.bestie">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </footer>
    </div>
  );
}
