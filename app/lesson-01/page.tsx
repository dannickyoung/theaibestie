import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import CopyBox from "@/components/lesson/CopyBox";
import Roadmap from "@/components/lesson/Roadmap";
import Star from "@/components/lesson/Star";

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

const PROMPT =
  "Build me a cute one-page landing page for my coffee brand. Soft pastel colours, a big friendly headline, a sign-up button, and a little about-me section. Make it gorgeous.";

const PROMISE = [
  { icon: "iconoir-emoji", color: "var(--cyan)", title: "Zero coding", text: "You will not write a single line of code. Ever." },
  { icon: "iconoir-chat-bubble-empty", color: "var(--lilac)", title: "Plain English", text: "If you can text a friend, you can do this." },
  { icon: "iconoir-sparks", color: "var(--magenta)", title: "5-min reads", text: "Tiny lessons. Big results. Save & follow." },
];

const CHECKS = [
  "How to get it & set it up in 3 steps",
  "What Claude Code actually is — in plain words",
  "The amazing things it can build for you",
];

const MAKES = [
  { icon: "iconoir-globe", color: "var(--cyan)", title: "Websites", text: "A gorgeous site for your biz, brand or big idea." },
  { icon: "iconoir-smartphone-device", color: "var(--lilac)", title: "Little apps", text: "Tools, trackers & calculators made just for you." },
  { icon: "iconoir-folder", color: "var(--magenta)", title: "Tidy your files", text: "Sort, rename & organise the mess in seconds." },
  { icon: "iconoir-media-image", color: "var(--sky)", title: "Content", text: "Posts, captions, graphics & ideas on tap." },
  { icon: "iconoir-wrench", color: "var(--green)", title: "Fix stuff", text: "Broken thing? Describe it. It troubleshoots." },
  { icon: "iconoir-flash", color: "var(--cyan)", title: "Automate", text: "Boring, repetitive tasks — done for you." },
];

export default function Lesson1Page() {
  return (
    <Lesson label="Lesson 1" pdfHref="/lesson-01-what-is-claude-code.pdf">
      <CoverBanner tab="LESSON 01" faceSrc="/assets/wendy-cool.svg" />

      {/* title */}
      <div className={`${styles.clay} ${styles.titleCard}`}>
        <span className={styles.badge}>
          <i className="iconoir-bookmark-book" /> LESSON 1
        </span>
        <h1>
          What is
          <br />
          Claude&nbsp;Code?
        </h1>
        <p className={styles.sub}>
          No tech words. No scary stuff. Just the simplest explanation you&apos;ll
          ever read. Pinky promise.
        </p>
        <div className={styles.ccSticker}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/claude-code-mascot.png" alt="Claude Code mascot" />
        </div>
        <div className={`${styles.tape} ${styles.tapeLilac}`} style={{ top: -14, left: 120, transform: "rotate(-7deg)" }} />
        <Star fill="#35ECEC" style={{ position: "absolute", right: 26, top: 56, width: 40, transform: "rotate(-12deg)" }} />
      </div>

      {/* promise */}
      <div className={styles.promise}>
        {PROMISE.map((p) => (
          <div className={styles.clay} key={p.title}>
            <Chip icon={p.icon} color={p.color} />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>

      {/* in this lesson */}
      <div className={`${styles.clay} ${styles.inThis}`}>
        <h3>
          <i className="iconoir-list" style={{ fontSize: 24, color: "var(--magenta)" }} /> In
          this lesson you&apos;ll learn…
        </h3>
        <div className={styles.inThisGrid}>
          {CHECKS.map((c) => (
            <div className={styles.checkItem} key={c}>
              <i className="iconoir-check-circle-solid" /> {c}
            </div>
          ))}
        </div>
        <div className={styles.poweredBy}>
          <span>powered by</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/claude-logo.png" alt="Claude" />
        </div>
        <div className={`${styles.tape} ${styles.tapeSky}`} style={{ top: -14, right: 120, transform: "rotate(5deg)" }} />
      </div>

      {/* setup */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-rocket" color="var(--green)" />
        <h2>Let&apos;s get you set up</h2>
      </div>
      <p className={styles.lead}>3 quick steps. Tap any black box to copy.</p>

      <Step n={1} title="Get Claude Code">
        <p>
          Open <b>Google Chrome</b> or <b>Safari</b>, go to this site, download &amp;
          install:
        </p>
        <CopyBox variant="url" label="OPEN IN YOUR BROWSER" copyText="claude.com/download" />
        <p style={{ marginTop: 12 }}>Prefer a Terminal? Paste one of these &amp; press Enter:</p>
        <div className={styles.termNote}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.termIco} src="/assets/terminal-icon.svg" alt="Terminal app icon" />
          <div className={styles.tn}>
            <b>Terminal</b> is an app already on your computer. <b>Mac:</b> search
            “Terminal”. <b>Windows:</b> search “PowerShell”.
          </div>
        </div>
        <CopyBox label="PASTE IN TERMINAL · MAC / LINUX" copyText="curl -fsSL https://claude.ai/install.sh | bash" />
        <CopyBox label="PASTE IN POWERSHELL · WINDOWS" copyText="irm https://claude.ai/install.ps1 | iex" />
      </Step>

      <Step n={2} title="Open it & sign in">
        <p>
          Open the app and sign in. You&apos;ll need a <b>Claude Pro or Max</b> plan.
        </p>
        <p style={{ marginTop: 6 }}>Used the Terminal? Launch it with:</p>
        <CopyBox label="RUN IN TERMINAL" copyText="claude" />
      </Step>

      <Step n={3} title="Make your first thing">
        <p>Type your wish. Paste this to start:</p>
        <CopyBox variant="prompt" label="YOUR FIRST PROMPT" copyText={PROMPT}>
          Build me a cute one-page{" "}
          <span className={styles.k}>landing page for my coffee brand</span>. Soft
          pastel colours, a big friendly headline, a sign-up button, and a little
          about-me section. <span className={styles.k2}>Make it gorgeous.</span>
        </CopyBox>
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          be specific. be delusional. your yap is your superpower.
        </p>
      </Step>

      {/* big idea */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-light-bulb-on" color="var(--cyan)" />
        <h2>
          Okay… but what <i>is</i> it?
        </h2>
      </div>
      <p className={styles.lead}>Let&apos;s start with the one sentence that explains everything.</p>
      <div className={`${styles.clay} ${styles.bigAnalogy}`}>
        <div className={styles.q}>
          Claude Code is like a <b>super-smart friend who lives inside your computer.</b>
          <br />
          You tell it what you want — in{" "}
          <span className={styles.hl}>normal everyday words</span> — and it{" "}
          <b>builds it for you.</b>
        </div>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -15, right: 40, transform: "rotate(6deg)" }} />
      </div>
      <div className={`${styles.clay} ${styles.explain}`}>
        <Chip icon="iconoir-emoji-talking-happy" color="var(--lilac)" />
        <div>
          <h3>Explain it like I&apos;m 5?</h3>
          <p>
            It&apos;s a magic helper. You <b>tell it your wish</b> (“make me a website
            for my bakery”) and it <b>makes the thing appear</b> — right in front of you.
            You watch it happen, like magic. No spells required.
          </p>
        </div>
      </div>

      {/* vs */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-percentage-circle" color="var(--magenta)" />
        <h2>Wait — is this the Claude app?</h2>
      </div>
      <p className={styles.lead}>Almost! Same brain — but two very different jobs.</p>
      <div className={styles.two}>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsApp}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-chat-bubble-question" color="#fff" />
            <h3>The Claude app</h3>
          </div>
          <p>
            You <b>chat</b>, it <b>talks back</b>. Like texting a genius friend. Great for
            answers, ideas and advice.
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-chat-lines" style={{ color: "var(--lilac)" }} /> It tells you things
          </span>
        </div>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsCode}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-tools" color="#fff" />
            <h3>Claude Code</h3>
          </div>
          <p>
            It doesn&apos;t just talk — it <b>builds.</b> Websites, files, tools… it
            actually <b>makes the thing,</b> live.
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-sparks" style={{ color: "var(--green-deep)" }} /> It makes things
          </span>
        </div>
        <div className={styles.vsBubble}>VS</div>
      </div>

      {/* quote */}
      <div className={`${styles.clay} ${styles.quote}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.qFace} src="/assets/wendy-talk.svg" alt="Wendy" />
        <div>
          <div className={styles.qText}>
            “Zero coding skills — and I use Claude better than most engineers.”
          </div>
          <div className={styles.qWho}>— Wendy, your AI Bestie</div>
        </div>
      </div>

      {/* what it can make */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-gift" color="var(--sky)" />
        <h2>So… what can it make for you?</h2>
      </div>
      <p className={styles.lead}>A little taste. You describe it — Claude Code builds it.</p>
      <div className={styles.grid6}>
        {MAKES.map((m) => (
          <div className={styles.clay} key={m.title}>
            <Chip icon={m.icon} color={m.color} />
            <div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.clay} ${styles.super}`}>
        <h3>The only skill you actually need</h3>
        <p>
          Knowing <span className={styles.pop}>what you want</span>. That&apos;s it. The
          more you describe, the better it builds — so be specific, be{" "}
          <span className={styles.pop2}>delusional</span>, dream big.
        </p>
        <p className={styles.yap}>your yap is your superpower</p>
        <div className={`${styles.tape} ${styles.tapeMag}`} style={{ top: -14, left: 40, transform: "rotate(-6deg)" }} />
      </div>

      {/* roadmap */}
      <Roadmap
        items={[
          { title: <>What is<br />Claude Code</>, status: "done" },
          { title: <>Claude in<br />VS Code</>, status: "next" },
          { title: <>Chat vs Co-work<br />vs Code</>, status: "lock" },
          { title: <>Build a<br />Website</>, status: "lock" },
        ]}
      />

      {/* footer */}
      <div className={styles.footer}>
        <span>
          Lesson <span className={styles.dot}>1</span> of 4 · The AI Bestie Course
        </span>
        <a className={styles.insta} href="https://instagram.com/the.ai.bestie" target="_blank" rel="noopener">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </div>
    </Lesson>
  );
}
