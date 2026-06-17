import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import CopyBox from "@/components/lesson/CopyBox";
import Roadmap from "@/components/lesson/Roadmap";
import Star from "@/components/lesson/Star";

const TITLE = "Lesson 2: You're Using Claude All Wrong — The AI Bestie";
const DESCRIPTION =
  "Most people only chat with Claude. The real magic is inside VS Code, where it builds for you — live. Set it up in 3 free steps.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lesson-02" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lesson-02",
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
  "Build me a gorgeous landing page for my coffee brand — soft pastel colours, a big friendly headline, a sign-up button, and a little about-me section. Make it stunning.";

export default function Lesson2Page() {
  return (
    <Lesson label="Lesson 2" pdfHref="/lesson-02-youre-using-claude-all-wrong.pdf">
      <CoverBanner tab="LESSON 02" faceSrc="/assets/wendy-talk.svg" />

      {/* title */}
      <div className={`${styles.clay} ${styles.titleCard}`}>
        <span className={styles.badge}>
          <i className="iconoir-bookmark-book" /> LESSON 2
        </span>
        <h1>
          You&apos;re Using
          <br />
          Claude All Wrong
        </h1>
        <p className={styles.sub}>
          Most people only <i>chat</i> with Claude. But the real magic is when it
          actually <b>builds</b> for you — live, inside VS Code.
        </p>
        <div className={styles.ccSticker}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/vscode.png" alt="VS Code" style={{ imageRendering: "auto", width: 92, height: 92 }} />
        </div>
        <div className={`${styles.tape} ${styles.tapeLilac}`} style={{ top: -14, left: 120, transform: "rotate(-7deg)" }} />
        <Star fill="#FF12E6" style={{ position: "absolute", right: 26, top: 56, width: 40, transform: "rotate(-12deg)" }} />
      </div>

      {/* set it up — instructions first */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-rocket" color="var(--green)" />
        <h2>Set it up in 3 steps</h2>
      </div>
      <p className={styles.lead}>Free, and about 5 minutes. Tap any black box to copy.</p>

      <Step n={1} title="Get VS Code">
        <p>
          Download <b>Visual Studio Code</b> — it&apos;s free. Open Chrome or Safari and
          go here:
        </p>
        <CopyBox variant="url" label="OPEN IN YOUR BROWSER" copyText="code.visualstudio.com" />
        <p style={{ marginTop: 6 }}>Download, install, and open it like any app.</p>
      </Step>

      <Step n={2} title="Add Claude Code">
        <p>
          Inside VS Code, open <b>Extensions</b>, search <b>“Claude Code”</b>, and click
          <b> Install</b>. Then sign in (you&apos;ll need a Claude Pro or Max plan).
        </p>
        <div className={styles.termNote}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.termIco} src="/assets/vscode.png" alt="VS Code" style={{ imageRendering: "auto" }} />
          <div className={styles.tn}>
            <b>Where&apos;s Extensions?</b> The four-squares icon in the left sidebar — or
            press <b>Cmd/Ctrl + Shift + X</b>. Then click the <b>✱ spark</b> icon to open
            Claude.
          </div>
        </div>
      </Step>

      <Step n={3} title="Open a folder & make something">
        <p>Open any folder, then tell Claude your wish. Paste this to start:</p>
        <CopyBox variant="prompt" label="TRY THIS PROMPT" copyText={PROMPT}>
          Build me a gorgeous{" "}
          <span className={styles.k}>landing page for my coffee brand</span> — soft pastel
          colours, a big friendly headline, a sign-up button, and a little about-me
          section. <span className={styles.k2}>Make it stunning.</span>
        </CopyBox>
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          watch it build, right in front of you.
        </p>
      </Step>

      {/* the mistake */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-warning-triangle" color="var(--magenta)" />
        <h2>Here&apos;s the mistake</h2>
      </div>
      <p className={styles.lead}>The thing almost everyone gets wrong with Claude Code.</p>
      <div className={`${styles.clay} ${styles.explain}`}>
        <Chip icon="iconoir-chat-bubble-xmark" color="var(--lilac)" />
        <div>
          <h3>Talking ≠ building</h3>
          <p>
            Claude Code inside the <b>Claude app</b> just <b>talks</b> to you. It gives
            you answers — but it doesn&apos;t actually build anything. The fun happens
            somewhere else…
          </p>
        </div>
      </div>

      {/* app vs vs code */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-percentage-circle" color="var(--cyan)" />
        <h2>Answers vs. actually building</h2>
      </div>
      <p className={styles.lead}>Same Claude — totally different powers.</p>
      <div className={styles.two}>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsApp}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-chat-bubble-question" color="#fff" />
            <h3>In the Claude app</h3>
          </div>
          <p>
            You get <b>answers</b>. It talks back, suggests, explains… but nothing
            actually gets built.
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-chat-lines" style={{ color: "var(--lilac)" }} /> just talks
          </span>
        </div>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsCode}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-code" color="#fff" />
            <h3>Inside VS Code</h3>
          </div>
          <p>
            Claude <b>makes the thing</b> — websites, files, tools — <b>live, right in
            front of your eyes.</b>
          </p>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-sparks" style={{ color: "var(--green-deep)" }} /> it builds, live
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
            “The app talks. VS Code builds. Once you see it happen, you can&apos;t go back.”
          </div>
          <div className={styles.qWho}>— Wendy, your AI Bestie</div>
        </div>
      </div>

      {/* the secret */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-sparks" color="var(--sky)" />
        <h2>The secret to great results</h2>
      </div>
      <p className={styles.lead}>Why some people get stunning sites and others get basic ones.</p>
      <div className={`${styles.clay} ${styles.super}`}>
        <h3>Be specific. Be delusional.</h3>
        <p>
          Describe your <span className={styles.pop}>biggest, wildest vision</span> — the
          colours, the vibe, every detail. The more you describe, the better it builds. Not
          the <span className={styles.pop2}>basic designs</span> everyone and their uncle is
          making.
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
          Lesson <span className={styles.dot}>2</span> of 4 · The AI Bestie Course
        </span>
        <a className={styles.insta} href="https://instagram.com/the.ai.bestie" target="_blank" rel="noopener">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </div>
    </Lesson>
  );
}
