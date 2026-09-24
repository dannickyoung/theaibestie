import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import CopyBox from "@/components/lesson/CopyBox";
import Star from "@/components/lesson/Star";

const TITLE = "Lesson 21: Spot the AI Scammer · The AI Bestie";
const DESCRIPTION =
  "AI can copy your voice from a few seconds of video. Here are 3 signs it's a scammer, 1 easy fix, and a family code word. Send this to your parents.";

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

const CHEAT_SHEET = `IS IT REALLY THEM? 5 signs it is a scam

1. They rush you. "Right now. Do not tell anyone."
2. They want it kept secret from the rest of the family.
3. They want gift cards, crypto, cash, or money sent to a new bank account.
4. They dodge questions only the real person would know.
5. They ask for a code sent to your phone (OTP), or ask you to install an app. Your bank will never ask for this.

WHAT TO DO
Hang up. It is not rude. It is smart.
Call back on the number you already have saved.
Ask for the family code word. No code word, no money.
Not sure? In Singapore, call the ScamShield Helpline 1799, any time, 24/7.
Already sent money? Call your bank right away.`;

const SIGNS = [
  { icon: "iconoir-timer", color: "var(--magenta)", title: "They rush you", text: "\"Right now. Do not tell anyone.\" Real family can wait five minutes." },
  { icon: "iconoir-lock", color: "var(--lilac)", title: "They want a secret", text: "\"Don't tell Dad.\" Real trouble is something the whole family helps with." },
  { icon: "iconoir-gift", color: "var(--cyan)", title: "Weird way to pay", text: "Gift cards, crypto, cash, or a brand new bank account." },
  { icon: "iconoir-chat-bubble-question", color: "var(--sky)", title: "They dodge questions", text: "Ask something only the real person would know. Watch it fall apart." },
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
          AI can now copy your voice from <b>a few seconds of video</b>. So the next call
          your mom gets might sound exactly like you. <b>Send this to your parents.</b>
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
            A scammer takes <b>a few seconds of your voice</b> from one of your videos. AI
            makes it say anything. So your mom gets a call. It&apos;s you. Crying.{" "}
            <i>&quot;Mom, I&apos;m in trouble. Please send money.&quot;</i> It sounds like you.{" "}
            <b>It is not you.</b>
          </p>
        </div>
      </div>

      <div className={`${styles.clay} ${styles.bigAnalogy}`}>
        <div className={styles.q}>
          Honestly? <b>I would fall for it.</b> I cry at insurance ads. So this is not
          about being smart. It&apos;s about having <span className={styles.hl}>a plan</span>{" "}
          before the call comes.
        </div>
      </div>

      {/* the 3 signs */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-warning-triangle" color="var(--magenta)" />
        <h2>Mom, Dad, this part is for you</h2>
      </div>
      <p className={styles.lead}>Three signs it&apos;s a scammer. You only need to spot one.</p>

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

      {/* the fix */}
      <div className={styles.hRow}>
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

      <Step n="B" title="Pick a family code word, tonight">
        <p>
          Something silly only your family knows, like <b>&quot;pineapple tart&quot;</b>. Share
          it in person or on a call, never in a text. Then the rule is simple:{" "}
          <b>no code word, no money.</b>
        </p>
        <p className={styles.note} style={{ fontSize: 19, marginTop: 9, color: "#3a4047" }}>
          not even for the favourite grandchild.
        </p>
      </Step>

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

      {/* all the red flags */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-eye" color="var(--sky)" />
        <h2>Every red flag, in one place</h2>
      </div>
      <p className={styles.lead}>Spot even one of these? Hang up and call back.</p>
      <div className={styles.grid6}>
        {SIGNS.map((s) => (
          <div className={styles.clay} key={s.title}>
            <Chip icon={s.icon} color={s.color} />
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* cheat sheet for the group chat */}
      <div style={{ breakInside: "avoid" }}>
        <div className={styles.hRow}>
          <Chip icon="iconoir-send" color="var(--green)" />
          <h2>Drop this in the family group chat</h2>
        </div>
        <p className={styles.lead}>Tap the black box to copy. Paste it in the chat. That&apos;s it.</p>
        <CopyBox variant="prompt" collapsible label="THE CHEAT SHEET" copyText={CHEAT_SHEET} />
      </div>

      {/* help numbers */}
      <div className={`${styles.clay} ${styles.super}`}>
        <h3>Not sure? Ask for help. Any time.</h3>
        <p>
          In Singapore, call the <span className={styles.pop}>ScamShield Helpline 1799</span>,
          24/7. Already sent money? <span className={styles.pop2}>Call your bank right away.</span>{" "}
          The faster you call, the better the chance of getting it back.
        </p>
        <p className={styles.yap}>it sounds like you. it is not you.</p>
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

      {/* cta */}
      <div style={{ breakInside: "avoid" }}>
        <div className={styles.hRow}>
          <Chip icon="iconoir-heart" color="var(--magenta)" />
          <h2>Tonight&apos;s homework</h2>
        </div>
        <p className={styles.lead}>Five minutes. Could save your family a lot more than that.</p>
        <div className={`${styles.clay} ${styles.super}`} style={{ marginTop: 14 }}>
          <h3>Pick your code word tonight.</h3>
          <p>
            Send this page to <span className={styles.pop}>Mom, Dad, Grandma, Grandpa</span>.
            Pick something silly. Say it out loud, together. Then{" "}
            <span className={styles.pop2}>no code word, no money</span>.
          </p>
          <p className={styles.yap}>comment SAFE and I&apos;ll send you the big-font cheat sheet</p>
          <div className={`${styles.tape} ${styles.tapeMag}`} style={{ top: -14, right: 40, transform: "rotate(6deg)" }} />
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
