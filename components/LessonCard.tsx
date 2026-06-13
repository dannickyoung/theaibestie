// Links to the live lesson page served from /public (lesson-01.html).
// When the lesson becomes a real Next route, swap href for next/link.
export default function LessonCard() {
  return (
    <a className="lesson-card" href="/lesson-01.html">
      <div className="lc-left">
        <span className="lc-badge">
          <i className="iconoir-bookmark-book" /> LESSON 01
        </span>
        <h2>What is Claude Code?</h2>
        <p>
          No tech words, no scary stuff. The simplest explainer you&apos;ll ever
          read — what Claude Code is, how to set it up, and the amazing things it
          can build for you.
        </p>
        <div className="lc-meta">
          <span>
            <i className="iconoir-page" /> 4 pages
          </span>
          <span>
            <i className="iconoir-clock" /> 5-min read
          </span>
          <span>
            <i className="iconoir-emoji" /> Total beginner
          </span>
        </div>
        <span className="lc-open">
          Open the lesson <i className="iconoir-arrow-right" />
        </span>
      </div>
      <div className="lc-art">
        <div className="cc-tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/claude-code-mascot.png" alt="Claude Code mascot" />
        </div>
      </div>
    </a>
  );
}
