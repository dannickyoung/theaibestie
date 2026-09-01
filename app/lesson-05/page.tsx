import type { Metadata } from "next";
import styles from "@/components/lesson/lesson.module.css";
import Lesson from "@/components/lesson/Lesson";
import CoverBanner from "@/components/lesson/CoverBanner";
import Chip from "@/components/lesson/Chip";
import Step from "@/components/lesson/Step";
import CopyBox from "@/components/lesson/CopyBox";
import Star from "@/components/lesson/Star";

const TITLE = "Lesson 5: Your Photos Folder Is a Crime Scene · The AI Bestie";
const DESCRIPTION =
  "3,000 trip photos, all named IMG_4821? Claude Code reads the date on every one, renames them by day, sorts them into folders, and pulls out the blurry shots. One prompt, done while you make coffee.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/lesson-05" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/lesson-05",
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

const PROMPT = `I just came back from a trip and my photos and videos are a mess. Please organize them for me.

Folder: [paste the path to your folder, e.g. Desktop/Phuket Trip]

My trip: [destination], [start date] to [end date]. Rough plan: Day 1 [what you did], Day 2 [what you did], Day 3 [what you did], and so on.

Here is exactly how I want it organized:

Go through every file in the folder: photos, videos, and screenshots.

Read the date taken on each file. If the file has a location saved in it, read that too.

Create one folder per day, named so the folders sort in order: "2026-08-12 - Day 1 - Phuket Old Town".

Inside each day folder, create three subfolders: "Photos", "Videos", and "Screenshots". Move each file into the right one based on its file type.

Rename every file so it sorts perfectly in time order, like this: "2026-08-12 - Phuket Old Town - 001", "2026-08-12 - Phuket Old Town - 002", and so on. Keep the original file extension. Use the location in the name when you know it, otherwise use my day plan above.

Put any clearly blurry or accidental shots into one folder called "Maybe Delete". Do not delete anything yourself.

Never delete or overwrite any file. Only rename and move.

When you are done, show me a summary of how many files went where.

If you are not sure which day or place a file belongs to, ask me instead of guessing.`;

const DOES = [
  { icon: "iconoir-calendar", color: "var(--cyan)", title: "Reads the date", text: "Every photo has the day it was taken saved inside it. Claude reads it." },
  { icon: "iconoir-map-pin", color: "var(--lilac)", title: "Knows the place", text: "If a location is saved in the file, it uses that in the name too." },
  { icon: "iconoir-edit-pencil", color: "var(--magenta)", title: "Renames every file", text: "IMG_4821 becomes Day 1 Phuket Old Town 001. In perfect time order." },
  { icon: "iconoir-folder", color: "var(--sky)", title: "One folder per day", text: "Day one, day two, day three. They sort themselves in order." },
  { icon: "iconoir-media-video", color: "var(--green)", title: "Photos, videos, screenshots", text: "Each day gets three little piles. Nothing mixed up." },
  { icon: "iconoir-trash", color: "var(--cyan)", title: "Catches the junk", text: "Blurry shots and accidental screenshots go into their own pile." },
];

const FILE = { fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12.5, fontWeight: 700, lineHeight: 1.5, color: "#33383e" } as const;

export default function Lesson5Page() {
  return (
    <Lesson label="Lesson 5" pdfHref="/lesson-05-organize-your-travel-photos.pdf">
      <CoverBanner tab="LESSON 05" faceSrc="/assets/wendy-cool.svg" />

      {/* title */}
      <div className={`${styles.clay} ${styles.titleCard}`}>
        <span className={styles.badge}>
          <i className="iconoir-media-image" /> LESSON 5
        </span>
        <h1>
          Your Photos Folder
          <br />
          Is a Crime Scene.
        </h1>
        <p className={styles.sub} style={{ maxWidth: "68%" }}>
          3,000 photos, all named <b>IMG_4821</b>, and you are never going to sort them.{" "}
          <b>Claude Code</b> will. <b>While you make coffee</b>.
        </p>
        <div className={styles.ccSticker} style={{ background: "#FFEAFB" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/wendy-vacay.png" alt="Wendy on vacation" style={{ imageRendering: "auto", width: 104, height: 104, objectFit: "contain" }} />
        </div>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -14, left: 120, transform: "rotate(-7deg)" }} />
        <Star fill="#FF12E6" style={{ position: "absolute", right: 26, top: 56, width: 40, transform: "rotate(-12deg)" }} />
      </div>

      {/* promise */}
      <div className={styles.promise}>
        <div className={styles.clay}>
          <Chip icon="iconoir-edit-pencil" color="var(--cyan)" />
          <h3>Renamed</h3>
          <p>Every single file, by day and place.</p>
        </div>
        <div className={styles.clay}>
          <Chip icon="iconoir-sort" color="var(--lilac)" />
          <h3>Sorted</h3>
          <p>Perfect time order, day by day.</p>
        </div>
        <div className={styles.clay}>
          <Chip icon="iconoir-folder" color="var(--magenta)" />
          <h3>Foldered</h3>
          <p>One folder per day. Junk in its own pile.</p>
        </div>
      </div>

      {/* the thing nobody tells you */}
      <div className={`${styles.clay} ${styles.explain}`}>
        <Chip icon="iconoir-light-bulb-on" color="var(--lilac)" />
        <div>
          <h3>Here&apos;s the thing nobody tells you</h3>
          <p>
            Your photos are <b>already sitting on your computer</b>. Claude Code can go{" "}
            <b>right into that folder</b> and clean up the whole mess for you. No apps.
            No subscriptions. No dragging 3,000 files around by hand. Just VS Code, the
            same way you set it up in Lesson 2.
          </p>
        </div>
      </div>

      {/* the steps */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-rocket" color="var(--green)" />
        <h2>Do it in 5 steps</h2>
      </div>
      <p className={styles.lead}>Same VS Code setup as Lesson 2. About 5 minutes of you, then Claude does the rest. Tap any black box to copy.</p>

      <Step n={1} title="Open VS Code">
        <p>
          Remember Lesson 2? The app <i>talks</i>, VS Code <i>builds</i>. This is the
          same trick, just pointed at your photos. Open <b>VS Code</b> like any app.
        </p>
        <p style={{ marginTop: 8 }}>Not set up yet? These two get you there:</p>
        <div>
          <a className={styles.lessonLink} href="/lesson-01">
            <i className="iconoir-bookmark-book" /> Lesson 1: What is Claude Code? <i className="iconoir-arrow-right" />
          </a>
          <a className={styles.lessonLink} href="/lesson-02">
            <i className="iconoir-code" /> Lesson 2: Claude inside VS Code <i className="iconoir-arrow-right" />
          </a>
        </div>
      </Step>

      <Step n={2} title="Put the whole trip in one folder">
        <p>
          Get every photo, video and screenshot from the trip into <b>one folder</b> on
          your computer. Call it something like <b>Phuket Trip</b> and pop it on your
          Desktop.
        </p>
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          tip: on iPhone, AirDrop the whole trip to your Mac in one go.
        </p>
      </Step>

      <Step n={3} title="Drag the folder onto VS Code">
        <p>
          Grab your <b>Phuket Trip</b> folder and <b>drag it onto the VS Code window</b>.
          That&apos;s it. Your photos show up in the left sidebar. Then click the{" "}
          <b>✱ spark</b> icon to open Claude.
        </p>
        <div className={styles.termNote}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.termIco} src="/assets/vscode.png" alt="VS Code" style={{ imageRendering: "auto" }} />
          <div className={styles.tn}>
            <b>Why open the folder?</b> Because now Claude is <b>inside</b> it. No file
            paths, no typing. It can see every photo and move them around for you.
          </div>
        </div>
      </Step>

      <Step n={4} title="Paste the prompt & fill in the blanks">
        <p>
          Change the <b>trip details</b> to yours. A rough day plan is enough:{" "}
          <i>Day 1 Old Town, Day 2 beach club, Day 3 island hopping.</i> For the{" "}
          <b>Folder</b> line, just type the folder name, like <b>Phuket Trip</b>. Claude is
          already inside it.
        </p>
        <CopyBox variant="prompt" collapsible label="PASTE THIS PROMPT" copyText={PROMPT} />
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          watch the folders appear in the sidebar, live. then go make your coffee.
        </p>
      </Step>

      <Step n={5} title="Check the Maybe Delete pile">
        <p>
          When it&apos;s done, Claude shows you a <b>summary</b> of how many files went
          where. Open the <b>Maybe Delete</b> folder, keep what you love, bin the rest.{" "}
          <b>You</b> make that call. Never Claude.
        </p>
      </Step>

      {/* before vs after */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-percentage-circle" color="var(--magenta)" />
        <h2>Before vs after</h2>
      </div>
      <p className={styles.lead}>Same folder. Same 3,000 photos. Totally different life.</p>
      <div className={styles.two}>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsApp}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-warning-triangle" color="#fff" />
            <h3>Before</h3>
          </div>
          <div style={FILE}>
            IMG_4821.HEIC
            <br />
            IMG_4822.HEIC
            <br />
            IMG_4823.MOV
            <br />
            IMG_4824.PNG
            <br />
            IMG_4825.HEIC
            <br />
            … and 2,995 more
          </div>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-emoji-puzzled" style={{ color: "var(--lilac)" }} /> a crime scene
          </span>
        </div>
        <div className={`${styles.clay} ${styles.vsCard} ${styles.vsCode}`}>
          <div className={styles.vsTop}>
            <Chip icon="iconoir-folder" color="#fff" />
            <h3>After</h3>
          </div>
          <div style={FILE}>
            2026-08-12 - Day 1 - Phuket Old Town
            <br />
            &nbsp;&nbsp;Photos · Videos · Screenshots
            <br />
            2026-08-13 - Day 2 - Beach Club
            <br />
            2026-08-14 - Day 3 - Island Hopping
            <br />
            Maybe Delete
          </div>
          <span className={styles.pill} style={{ marginTop: 12, fontSize: 13 }}>
            <i className="iconoir-sparks" style={{ color: "var(--green-deep)" }} /> sorted by day
          </span>
        </div>
        <div className={styles.vsBubble}>VS</div>
      </div>

      {/* what it actually does */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-sparks" color="var(--sky)" />
        <h2>What it actually does</h2>
      </div>
      <p className={styles.lead}>No code. It just reads what your phone already saved in each file.</p>
      <div className={styles.grid6}>
        {DOES.map((d) => (
          <div className={styles.clay} key={d.title}>
            <Chip icon={d.icon} color={d.color} />
            <div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* safety */}
      <div className={`${styles.clay} ${styles.super}`}>
        <h3>It never deletes. Ever.</h3>
        <p>
          The prompt tells Claude to <span className={styles.pop}>only rename and move</span>.
          Blurry shots go into a Maybe Delete folder and <span className={styles.pop2}>you</span>{" "}
          make the call. Not sure which day a file belongs to? It asks you instead of guessing.
        </p>
        <p className={styles.yap}>three thousand photos. while you make coffee.</p>
        <div className={`${styles.tape} ${styles.tapeMag}`} style={{ top: -14, left: 40, transform: "rotate(-6deg)" }} />
      </div>

      {/* quote */}
      <div className={`${styles.clay} ${styles.quote}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.qFace} src="/assets/wendy-talk.svg" alt="Wendy" />
        <div>
          <div className={styles.qText}>
            “Your photos folder is a crime scene. Claude can fix it in minutes.”
          </div>
          <div className={styles.qWho}>· Wendy, your AI Bestie</div>
        </div>
      </div>

      {/* cta */}
      <div className={styles.hRow}>
        <Chip icon="iconoir-heart" color="var(--magenta)" />
        <h2>Your next trip is already sorted</h2>
      </div>
      <p className={styles.lead}>Keep this prompt. Every holiday from now on, it&apos;s one paste and done.</p>
      <div className={`${styles.clay} ${styles.super}`} style={{ marginTop: 14 }}>
        <h3>You do not need to know any code.</h3>
        <p>
          You just need <span className={styles.pop}>the right prompt</span>. And I wrote it
          for you. Save this page, and next time you come home with{" "}
          <span className={styles.pop2}>3,000 photos</span>, you already know what to do.
        </p>
        <p className={styles.yap}>save this &amp; comment HOLIDAY for the exact prompt</p>
        <div className={`${styles.tape} ${styles.tapeCyan}`} style={{ top: -14, right: 40, transform: "rotate(6deg)" }} />
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <span>
          Lesson <span className={styles.dot}>5</span> · The AI Bestie Course
        </span>
        <a className={styles.insta} href="https://instagram.com/the.ai.bestie" target="_blank" rel="noopener">
          <i className="iconoir-instagram" /> @the.ai.bestie
        </a>
      </div>
    </Lesson>
  );
}
