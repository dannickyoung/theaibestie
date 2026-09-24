import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import Star from "@/components/lesson/Star";

const TITLE = "Lesson 21: Spot the AI Scammer · The AI Bestie";
const DESCRIPTION =
  "AI can copy anyone's voice from a few seconds of video. Here are 3 signs it's a scammer, 1 easy fix, and a family code word that stops them cold.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lesson-21" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lesson-21",
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

/** A bordered card that groups one section, so each part of the lesson reads as its own block. */
const SECTION = { marginTop: 40, padding: "22px 24px 24px" } as const;
const SECTION_HEAD = { marginTop: 0 } as const;

const MORE_FLAGS = [
  { icon: "iconoir-lock", color: "var(--lilac)", title: "They want a secret", text: "\"Don't tell Dad.\" Real trouble is something the whole family helps with." },
  { icon: "iconoir-smartphone-device", color: "var(--green)", title: "They want your code", text: "The code sent to your phone, or an app to install. Your bank never asks." },
  { icon: "iconoir-emoji-sad", color: "var(--magenta)", title: "They cry. A lot.", text: "Big feelings stop you from thinking. That is exactly the point." },
];

export default function Lesson21Page() {
  return (
    <Lesson label="Lesson 21" pdfHref="/lesson-21-spot-the-ai-scammer.pdf">
      <CoverBanner tab="LESSON 21" faceSrc="/assets/wendy-cool.svg" />

      {/* title */}
      <div className={`${styles.clay} ${styles.titleCard}`}>
        <span className={styles.badge}>
          <i className="iconoir-shield-check" /> LESSON 21
        </span>
        <h1>
          Spot the
          <br />
          AI Scammer.
        </h1>
        <p className={styles.sub} style={{ maxWidth: "68%" }}>
          AI can now copy anyone&apos;s voice from <b>a few seconds of video</b>. Here&apos;s
          how to tell when that call from family is <b>really a scammer</b>.
        </p>
        <div className={styles.ccSticker} style={{ background: "#FFEAFB" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/wendy-wink.png" alt="Wendy" style={{ imageRendering: "auto", width: 104, height: 104, objectFit: "contain" }} />
        </div>
        <div className={`${styles.tape} ${styles.tapeMag}`} style={{ top: -14, left: 120, transform: "rotate(-7deg)" }} />
        <Star fill="#FF12E6" style={{ position: "absolute", right: 26, top: 56, width: 40, transform: "rotate(-12deg)" }} />
      </div>

      {/* promise */}
      <div className={styles.promise}>
        <div className={styles.clay}>
          <Chip icon="iconoir-eye" color="var(--cyan)" />
          <h3>3 signs</h3>
          <p>How to tell it&apos;s a scammer, fast.</p>
        </div>
        <div className={styles.clay}>
          <Chip icon="iconoir-phone" color="var(--lilac)" />
          <h3>1 easy fix</h3>
          <p>Hang up. Call back. Done.</p>
        </div>
        <div className={styles.clay}>
          <Chip icon="iconoir-key" color="var(--magenta)" />
          <h3>1 code word</h3>
          <p>No code word, no money. Ever.</p>
        </div>
      </div>

      {/* how the scam works */}
      <div className={`${styles.clay} ${styles.explain}`}>
        <Chip icon="iconoir-sound-high" color="var(--lilac)" />
        <div>
          <h3>Here&apos;s what scams look like now</h3>
          <p>
            A scammer grabs <b>a few seconds of someone&apos;s voice</b> from a video they
            posted. AI makes it say anything. Then the call comes. It&apos;s your grandchild.
            Crying. <i>&quot;I&apos;m in trouble. Please send money.&quot;</i> It sounds exactly
            like them. <b>It is not them.</b>
          </p>
          <p>
            Anyone can fall for this. What protects you is <b>a plan you make before the call comes</b>.
          </p>
        </div>
      </div>

      {/* the 3 signs */}
      <div className={styles.clay} style={SECTION}>
        <div className={styles.hRow} style={SECTION_HEAD}>
          <Chip icon="iconoir-warning-triangle" color="var(--magenta)" />
          <h2>3 signs it&apos;s a scammer</h2>
        </div>
        <p className={styles.lead}>You only need to spot one.</p>

        <Step n={1} title="They rush you">
          <p>
            <i>&quot;Right now. Do not tell anyone.&quot;</i> Scammers need you panicking, not
            thinking. <b>Real family can wait five minutes. Scammers cannot.</b>
          </p>
        </Step>

        <Step n={2} title="They want money in a weird way">
          <p>
            <b>Gift cards. Crypto. A brand new bank account.</b> Nobody in real trouble asks
            for a stack of gift cards.
          </p>
          <p className={styles.note} style={{ fontSize: 19, marginTop: 9, color: "#3a4047" }}>
            your real grandkids ask for snacks, not gift cards.
          </p>
        </Step>

        <Step n={3} title="They dodge questions">
          <p>
            Ask something <b>only the real person would know</b>. Like{" "}
            <i>&quot;What did we eat at Grandma&apos;s last Sunday?&quot;</i> A scammer
            changes the subject, cries louder, or hangs up. <b>Watch the lie fall apart.</b>
          </p>
        </Step>
      </div>

      {/* more red flags */}
      <div style={{ breakInside: "avoid" }}>
        <div className={styles.hRow}>
          <Chip icon="iconoir-eye" color="var(--sky)" />
          <h2>Also watch out for</h2>
        </div>
        <p className={styles.lead}>Spot any of these? Same answer: hang up and call back.</p>
        <div className={styles.grid6}>
          {MORE_FLAGS.map((s) => (
            <div className={styles.clay} key={s.title}>
              <Chip icon={s.icon} color={s.color} />
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* the fix */}
      <div className={styles.clay} style={SECTION}>
        <div className={styles.hRow} style={SECTION_HEAD}>
          <Chip icon="iconoir-phone" color="var(--green)" />
          <h2>The fix is so easy</h2>
        </div>
        <p className={styles.lead}>Two moves. No tech needed. Works on every scam call, AI or not.</p>

        <Step n="A" title="Hang up. Call back.">
          <p>
            <b>Hang up.</b> It is not rude. It is smart. Then <b>call back on the number you
            already have saved</b>. Not the number that just called you. If it was really
            them, they pick up.
          </p>
        </Step>

        <Step n="B" title="Pick a family code word">
          <p>
            Something silly only your family knows, like <b>&quot;pineapple tart&quot;</b>. Share
            it in person or on a call, never in a text. Then the rule is simple:{" "}
            <b>no code word, no money.</b>
          </p>
          <p className={styles.note} style={{ fontSize: 19, marginTop: 9, color: "#3a4047" }}>
            not even for the favourite grandchild.
          </p>
        </Step>
      </div>

      {/* scammer vs real family */}
      <div style={{ breakInside: "avoid" }}>
        <div className={styles.hRow}>
          <Chip icon="iconoir-percentage-circle" color="var(--magenta)" />
          <h2>Scammer vs real family</h2>
        </div>
        <p className={styles.lead}>Same voice. Totally different behaviour.</p>
        <div className={styles.two}>
          <div className={`${styles.clay} ${styles.vsCard} ${styles.vsApp}`}>
            <div className={styles.vsTop}>
              <Chip icon="iconoir-warning-triangle" color="#fff" />
              <h3>Scammer</h3>
            </div>
            <p>Needs money right now.</p>
            <p>Says keep it a secret.</p>
            <p>Wants gift cards or crypto.</p>
            <p>Dodges your questions.</p>
            <p>Doesn&apos;t know the code word.</p>
            <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
              <i className="iconoir-xmark-circle" style={{ color: "var(--magenta)" }} /> hang up
            </span>
          </div>
          <div className={`${styles.clay} ${styles.vsCard} ${styles.vsCode}`}>
            <div className={styles.vsTop}>
              <Chip icon="iconoir-heart" color="#fff" />
              <h3>Real family</h3>
            </div>
            <p>Can wait five minutes.</p>
            <p>Fine with you telling everyone.</p>
            <p>Asks for snacks, not gift cards.</p>
            <p>Answers anything you ask.</p>
            <p>Knows the code word.</p>
            <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
              <i className="iconoir-check-circle" style={{ color: "var(--green-deep)" }} /> picks up when you call back
            </span>
          </div>
          <div className={styles.vsBubble}>VS</div>
        </div>
      </div>

      {/* help numbers */}
      <div className={`${styles.clay} ${styles.super}`} style={{ marginTop: 40 }}>
        <h3>Not sure? Ask for help. Any time.</h3>
        <p>
          In Singapore, call the <span className={styles.pop}>ScamShield Helpline 1799</span>,
          24/7. Already sent money? <span className={styles.pop2}>Call your bank right away.</span>{" "}
          The faster you call, the better the chance of getting it back.
        </p>
        <p className={styles.yap}>it sounds like them. it is not them.</p>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -14, right: 40, transform: "rotate(-6deg)" }} />
      </div>

      {/* quote */}
      <div className={`${styles.clay} ${styles.quote}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.qFace} src="/assets/wendy-talk.svg" alt="Wendy" />
        <div>
          <div className={styles.qText}>
            “Real family can wait five minutes. Scammers cannot.”
          </div>
          <div className={styles.qWho}>· Wendy, your AI Bestie</div>
        </div>
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <span>
          Lesson <span className={styles.dot}>21</span> · The AI Bestie Course
        </span>
        <a className={styles.insta} href="https://instagram.com/the.ai.bestie" target="_blank" rel="noopener">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </div>
    </Lesson>
  );
}
