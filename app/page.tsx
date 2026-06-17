import NavBar from "@/components/NavBar";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";

const HEADLINES = ["Learn AI, the easy way.", "Build real things, zero code."];

const PROMISE = [
  {
    icon: "iconoir-chat-bubble-translate",
    color: "var(--sky)",
    title: "No jargon, ever",
    desc: "Plain words and real examples. If your mom can't follow it, we rewrote it.",
  },
  {
    icon: "iconoir-emoji",
    color: "var(--lilac)",
    title: "Zero coding",
    desc: "You never have to write code. You just describe what you want, and Claude builds it.",
  },
  {
    icon: "iconoir-flash",
    color: "var(--cyan)",
    title: "5-minute lessons",
    desc: "Tiny, bite-sized steps you can finish on a coffee break. Start today.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Pick a lesson",
    desc: "Start at the very beginning with Lesson 1, or jump to whatever you're curious about.",
  },
  {
    n: 2,
    title: "Follow along",
    desc: "Copy-paste the steps and the exact words to say. No guessing, no setup headaches.",
  },
  {
    n: 3,
    title: "Build something real",
    desc: "Watch AI make a website, a tool, or anything else, live and right in front of you.",
  },
];

export default function Home() {
  return (
    <>
      <NavBar />

      <main className="lp">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <div className="lp-container">
            <div className="hero-panel">
              <div className="hero-grid" />
              <div className="hero-inner">
                <div className="hero-copy">
                  <span className="free-badge rise" style={{ animationDelay: "60ms" }}>
                    ★ 100% FREE COURSE
                  </span>
                  <h1 className="hero-type rise" style={{ animationDelay: "140ms" }}>
                    <Typewriter phrases={HEADLINES} />
                  </h1>
                  <p className="hero-sub rise" style={{ animationDelay: "220ms" }}>
                    Tiny, no-jargon lessons that teach you to build real things with
                    AI. No coding, no overwhelm. Just you and your AI bestie.
                  </p>
                  <div className="hero-cta rise" style={{ animationDelay: "300ms" }}>
                    <a className="btn btn-primary" href="/lesson-01">
                      Start Lesson 1 <i className="iconoir-arrow-right" />
                    </a>
                    <a className="btn btn-ghost" href="/lessons">
                      <i className="iconoir-bookmark-book" /> Browse lessons
                    </a>
                    <span className="hero-note">
                      <i className="iconoir-heart" /> beginner-friendly, promise
                    </span>
                  </div>
                </div>

                <div className="hero-art rise" style={{ animationDelay: "220ms" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="hero-face" src="/assets/wendy-front.png" alt="Wendy, your AI Bestie" />
                </div>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#why" aria-label="Scroll to learn more">
            <span>scroll</span>
            <i className="iconoir-nav-arrow-down" />
          </a>
        </section>

        {/* ---------- why ---------- */}
        <section className="lp-section" id="why">
          <div className="lp-container">
            <Reveal className="lp-head">
              <span className="lp-eyebrow">
                <i className="iconoir-heart" /> Why The AI Bestie
              </span>
              <h2>No tech background needed</h2>
              <p>Three promises we actually keep, so you never feel lost.</p>
            </Reveal>

            <div className="promise-row">
              {PROMISE.map((p, i) => (
                <Reveal className="promise-card" delay={i * 90} key={p.title}>
                  <div className="hp-chip" style={{ background: p.color }}>
                    <i className={p.icon} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- how it works ---------- */}
        <section className="lp-section lp-alt" id="how">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lp-sticker" src="/assets/wendy-wink.png" alt="" />
          <div className="lp-container">
            <Reveal className="lp-head">
              <span className="lp-eyebrow">
                <i className="iconoir-sparks" /> How it works
              </span>
              <h2>From zero to “I built that”</h2>
              <p>Three little steps. You&apos;ll make your first thing today.</p>
            </Reveal>

            <div className="steps-row">
              {STEPS.map((s, i) => (
                <Reveal className="step-card" delay={i * 90} key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- testimonial + final cta ---------- */}
        <section className="lp-section" id="start">
          <div className="lp-container lp-close">
            <Reveal className="testi">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/wendy-smile.png" alt="Wendy, your AI Bestie" />
              <div>
                <div className="tq">
                  “You don&apos;t need to be techy. You just need a bestie who explains
                  it without the scary words.”
                </div>
                <div className="tw">Wendy, your AI Bestie</div>
              </div>
            </Reveal>

            <Reveal className="cta-card">
              <div className="cta-grid" />
              <h2>Ready to build your first thing?</h2>
              <p>Five minutes. No coding. Start exactly where everyone else did.</p>
              <a className="btn" href="/lesson-01">
                Start Lesson 1 <i className="iconoir-arrow-right" />
              </a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cta-face" src="/assets/wendy-calm.png" alt="" />
            </Reveal>

            <footer>
              <span>The AI Bestie Course &middot; Lessons 1 to 4</span>
              <a className="ig" href="https://instagram.com/the.ai.bestie">
                <i className="iconoir-instagram" /> @the.ai.bestie
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
