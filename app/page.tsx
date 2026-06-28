import NavBar from "@/components/NavBar";
import Reveal from "@/components/Reveal";

function BtnArrow() {
  return (
    <svg className="btn-arrow" viewBox="0 0 48 28" fill="none" aria-hidden="true">
      <path d="M2 15 C 16 16.5, 30 16.8, 47 17" />
      <path d="M26 1 C 33 5, 41 10.5, 47 17" />
      <path d="M47 17 C 40 20, 32 23, 24 25.5" />
    </svg>
  );
}

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
                    Weekly <span className="hl">AI tips</span>{"\n"}your mom can{" "}
                    <span className="hl">understand</span>
                    <span className="tw-caret" aria-hidden="true" />
                  </h1>
                  <div className="hero-cta rise" style={{ animationDelay: "300ms" }}>
                    <a className="btn btn-primary" href="/lesson-01">
                      Start Lesson 1 <BtnArrow />
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
                    <span className="hero-annot-name">Your AI Bestie Wendy</span>
                    <span className="hero-annot-line">
                      Non technical but built
                      <br />2 companies using AI.
                    </span>
                    <span className="hero-annot-line">Make AI easy for the girlies.</span>
                    <svg className="hero-annot-arrow" viewBox="0 0 120 106" aria-hidden="true">
                      <path d="M103 15 C 100 30, 99 33, 96 38 C 90 47, 74 47, 71 40 C 68 33, 80 33, 84 42 C 89 54, 88 58, 80 64 C 70 76, 50 82, 36 76 C 33 75, 30 72, 27 68" />
                      <path d="M27 68 l 16 -3" />
                      <path d="M27 68 l 8 12" />
                    </svg>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="hero-face" src="/assets/wendy-front.png" alt="Wendy, your AI Bestie" />
                </div>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#learn" aria-label="Scroll to learn more">
            <span>scroll</span>
            <i className="iconoir-nav-arrow-down" />
          </a>
        </section>

        {/* ---------- learn / testimonial / final cta ---------- */}
        <section className="lp-section" id="learn">
          <div className="lp-container lp-close">
            <Reveal className="paper-card paper-brown">
              <div className="lp-head">
                <h2>Online or offline, your call</h2>
                <p className="learn-line">
                  <span className="scrap">Read every lesson right here</span>
                  <span className="or-word">OR</span>
                  <span className="scrap">download the PDF and learn on the go.</span>
                </p>
              </div>
            </Reveal>

            <Reveal className="testi">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/wendy-smile.png" alt="Wendy, your AI Bestie" />
              <div>
                <div className="tq">
                  “AI tips your mom can understand”
                </div>
                <div className="tw">Wendy, your AI Bestie</div>
              </div>
            </Reveal>

            <Reveal className="cta-card">
              <div className="cta-grid" />
              <h2>Download tips for free.</h2>
              <a className="btn" href="/lessons">
                HERE <BtnArrow />
              </a>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cta-face" src="/assets/wendy-calm.png" alt="" />
            </Reveal>

            <footer>
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
