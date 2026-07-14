import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import CopyBox from "@/components/lesson/CopyBox";
import Star from "@/components/lesson/Star";

const TITLE =
  "Lesson 15: If You're Not Using Fable 5 to Build Your Brand, You're Already Behind — The AI Bestie";
const DESCRIPTION =
  "Fable 5 is the smartest AI ever made, and it's free until July 19. Open Claude, switch to Fable 5, and build your positioning, a week of posts, and your website — step by step.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lesson-15" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lesson-15",
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

const PROMPT_ABOUT =
  "Here's everything about me — my work, my wins, and the way I talk: [describe yourself]. Based on all of it, tell me: what makes me different from everyone else in my space, and how should I position my personal brand?";

const PROMPT_POSTS =
  "Write me a full week of posts (7 days) in my exact voice. Here are a few captions I love so you can copy my style: [paste 2–3 captions you're proud of].";

const PROMPT_SITE =
  "Build me my personal website — my bio, my story, and all my links, beautifully laid out. Make it stunning.";

export default function Lesson15Page() {
  return (
    <Lesson label="Lesson 15" pdfHref="/lesson-15-build-your-brand.pdf">
      <CoverBanner tab="LESSON 15" faceSrc="/assets/wendy-cool.svg" />

      {/* title */}
      <div className={`${styles.clay} ${styles.titleCard}`}>
        <span className={styles.badge}>
          <i className="iconoir-flash" /> LESSON 15
        </span>
        <h1 style={{ fontSize: 37, letterSpacing: "-0.5px" }}>
          If You&apos;re Not Using Fable&nbsp;5
          <br />
          to Build Your Brand,
          <br />
          You&apos;re Already Behind
        </h1>
        <p className={styles.sub} style={{ maxWidth: "72%" }}>
          <b>Fable 5</b> is the <b>smartest AI ever made</b> — and it&apos;s free until
          July 19. Here&apos;s exactly how to catch up.
        </p>
        <div className={styles.ccSticker} style={{ transform: "rotate(-6deg)", background: "#FFEAFB" }}>
          <div style={{ textAlign: "center", lineHeight: 1.05 }}>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: 12, color: "var(--magenta)" }}>
              FREE
            </div>
            <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 15, marginTop: 6 }}>
              until
            </div>
            <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 22 }}>
              Jul 19
            </div>
          </div>
        </div>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -14, left: 120, transform: "rotate(-7deg)" }} />
        <Star fill="#35ECEC" style={{ position: "absolute", right: 26, top: 56, width: 40, transform: "rotate(-12deg)" }} />
      </div>

      {/* the steps — instructions first */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-rocket" color="var(--green)" />
        <h2>Do it in 5 steps</h2>
      </div>
      <p className={styles.lead}>Free, and about 10 minutes. Tap any black box to copy.</p>

      <Step n={1} title="Open Claude">
        <p>
          Open Chrome or Safari and go to Claude. Sign in (or make a free account) — this
          is where Fable 5 lives.
        </p>
        <CopyBox variant="url" label="OPEN IN YOUR BROWSER" copyText="claude.ai" />
      </Step>

      <Step n={2} title="Switch to Fable 5">
        <p>
          At the <b>top of the chat</b>, tap the <b>model name</b> and choose{" "}
          <b>Fable 5</b> — the smartest one. It&apos;s the free upgrade, until July 19.
        </p>
        <div className={styles.termNote}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.termIco} src="/assets/claude-code-mascot.png" alt="Claude" style={{ imageRendering: "pixelated", objectFit: "contain", background: "#fff" }} />
          <div className={styles.tn}>
            <b>Where&apos;s the switcher?</b> It&apos;s the little model name right above (or
            beside) the message box — tap it to open the list, then pick{" "}
            <b>Fable 5</b>. Your normal model is a smart intern; this one is the genius.
          </div>
        </div>
      </Step>

      <Step n={3} title="Tell it everything about you">
        <p>
          Dump it all in — your work, your wins, the way you talk. Then ask the one
          question that matters:
        </p>
        <CopyBox variant="prompt" label="PASTE THIS PROMPT" copyText={PROMPT_ABOUT}>
          Here&apos;s everything about me — my work, my wins, and the way I talk:{" "}
          <span className={styles.k}>[describe yourself]</span>. Based on all of it,
          tell me: <span className={styles.k2}>what makes me different</span> and how
          should I position my personal brand?
        </CopyBox>
      </Step>

      <Step n={4} title="Get a full week of posts in your voice">
        <p>
          Paste a few captions you love so it copies your style — then let it write a
          whole week for you.
        </p>
        <CopyBox variant="prompt" label="PASTE THIS PROMPT" copyText={PROMPT_POSTS}>
          Write me a <span className={styles.k}>full week of posts</span> in my exact
          voice. Here are a few captions I love so you can copy my style:{" "}
          <span className={styles.k2}>[paste 2–3 captions]</span>.
        </CopyBox>
      </Step>

      <Step n={5} title="Build your personal website">
        <p>Your bio, your story, your links. All of it — designed and done for you.</p>
        <CopyBox variant="prompt" label="PASTE THIS PROMPT" copyText={PROMPT_SITE}>
          Build me my <span className={styles.k}>personal website</span> — my bio, my
          story, and all my links, beautifully laid out.{" "}
          <span className={styles.k2}>Make it stunning.</span>
        </CopyBox>
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          watch it build the whole thing for you.
        </p>
      </Step>

      {/* why fable 5 */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-trophy" color="var(--magenta)" />
        <h2>Why Fable 5, not your usual AI</h2>
      </div>
      <p className={styles.lead}>Same Claude family — but Fable 5 plays a completely different game.</p>
      <div className={styles.two}>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsApp}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-user" color="#fff" />
            <h3>Your usual model</h3>
          </div>
          <p>
            A <b>smart intern</b>. Helpful and quick — but you have to hold its hand and
            spell out every step.
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-coffee-cup" style={{ color: "var(--lilac)" }} /> good helper
          </span>
        </div>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsCode}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-brain" color="#fff" />
            <h3>Fable 5</h3>
          </div>
          <p>
            The <b>genius partner</b> who thinks <b>three steps ahead</b> — it builds the
            whole brand, not just the thing you asked for.
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-flash" style={{ color: "var(--green-deep)" }} /> thinks ahead
          </span>
        </div>
        <div className={styles.vsBubble}>VS</div>
      </div>

      {/* stat tiles */}
      <div className={styles.promise} style={{ marginTop: 22 }}>
        <div className={styles.clay} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 40, color: "var(--magenta)", lineHeight: 1 }}>
            +90%
          </div>
          <h3 style={{ marginTop: 8 }}>More creative</h3>
          <p>In copy, design and ideas — it goes places everyday models won&apos;t.</p>
        </div>
        <div className={styles.clay} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 40, color: "var(--green-deep)", lineHeight: 1 }}>
            3 steps
          </div>
          <h3 style={{ marginTop: 8 }}>Ahead, not behind</h3>
          <p>It plans your whole brand, not just one post at a time.</p>
        </div>
        <div className={styles.clay} style={{ textAlign: "center" }}>
          <div style={{ fontFamily: '"Baloo 2", cursive', fontWeight: 800, fontSize: 40, color: "var(--sky)", lineHeight: 1 }}>
            10×
          </div>
          <h3 style={{ marginTop: 8 }}>The nuance</h3>
          <p>It captures <i>your</i> voice — not a flat, generic version.</p>
        </div>
      </div>

      {/* same prompt, different worlds */}
      <div className={`${styles.clay} ${styles.explain}`} style={{ background: "#fff7fd", marginTop: 18 }}>
        <Chip icon="iconoir-post" color="var(--lilac)" />
        <div>
          <h3>Same prompt, different worlds</h3>
          <p style={{ marginTop: 8 }}>
            Ask both <b>“build my personal brand.”</b> A normal model hands you a{" "}
            <b>plain page and a few generic captions</b>. Fable 5 hands you a{" "}
            <b>positioning angle, a styled website, and a full week of posts in your
            voice</b> — because it thought three steps ahead.
          </p>
        </div>
      </div>

      {/* quote */}
      <div className={`${styles.clay} ${styles.quote}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.qFace} src="/assets/wendy-talk.svg" alt="Wendy" />
        <div>
          <div className={styles.qText}>
            “The people who move now are the ones who win. Don&apos;t be the girl who
            finds out on July 20.”
          </div>
          <div className={styles.qWho}>— Wendy, your AI Bestie</div>
        </div>
      </div>

      {/* urgency + cta */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-clock" color="var(--magenta)" />
        <h2>Don&apos;t wait for July 20</h2>
      </div>
      <p className={styles.lead}>A brand strategist, a writer, and a web designer — free until July 19.</p>
      <div className={`${styles.clay} ${styles.super}`}>
        <h3>Move now. Win now.</h3>
        <p>
          Fable 5 is <span className={styles.pop}>free until July 19</span>. After that,
          the people who moved early already have their{" "}
          <span className={styles.pop2}>posts, their site, and their edge</span>. Be one
          of them.
        </p>
        <p className={styles.yap}>save this &amp; comment BESTIE for the exact steps</p>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -14, left: 40, transform: "rotate(-6deg)" }} />
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <span>
          Lesson <span className={styles.dot}>15</span> · The AI Bestie Course
        </span>
        <a className={styles.insta} href="https://instagram.com/the.ai.bestie" target="_blank" rel="noopener">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </div>
    </Lesson>
  );
}
