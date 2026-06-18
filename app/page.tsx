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
                    AI. No coding. Just you and your AI bestie.
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
                  <div className="hero-annot">
                    <span className="hero-annot-text">hi! I&apos;m your AI bestie</span>
                    <svg className="hero-annot-arrow" viewBox="0 0 120 86" aria-hidden="true">
                      <path d="M104 12 C 78 2, 52 16, 64 34 C 72 46, 86 40, 80 28 C 76 20, 64 24, 66 36 C 70 56, 46 66, 18 60" />
                      <path d="M18 60 l 20 -4" />
                      <path d="M18 60 l 16 13" />
                    </svg>
                  </div>
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

        {/* ---------- learn your way ---------- */}
        <section className="lp-section" id="learn">
          <div className="lp-container">
            <Reveal className="lp-head">
              <span className="lp-eyebrow">
                <i className="iconoir-book" /> Learn your way
              </span>
              <h2>Online or offline, your call</h2>
              <p>Read every lesson right here, or download the PDF and learn on the go.</p>
            </Reveal>
            <Reveal className="learn-modes learn-modes--center">
              <span className="lm">
                <i className="iconoir-internet" /> Read online
              </span>
              <span className="lm">
                <i className="iconoir-download" /> Download the PDF &middot; learn offline
              </span>
            </Reveal>
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
              <span>The AI Bestie Course</span>
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
