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
  "You are my personal brand strategist. Interview me to find out what makes me special and what my brand should be. Ask me one or two questions at a time, not a big list. Dig deeper when my answer is interesting or vague. After about 8 to 10 questions, stop and give me: (1) my core brand idea in one sentence, (2) the 3 things I stand for, (3) who I am for, (4) what I sound like, and (5) 5 content ideas that only I could make. Keep everything in simple, plain words. No jargon.";

const PROMPT_POSTS = `You are my personal social media strategist and data analyst. Your job is to study my real social accounts, study the top creators in my space, name my niche, and then hand me a specific 30-day content plan I can start posting tomorrow. Work through the steps in order. Do not skip ahead. Show me what you find at each step before moving on.

STEP 0A — ASK ME FOR MY DETAILS FIRST
Before you do anything else, ask me these questions and wait for my answers. Do not move on until I have filled them in. If I leave one blank, ask again.
• My main account(s): (handles + platform, e.g. Instagram @__, TikTok @__, LinkedIn __)
• What I currently post about:
• What I sell or want to be known for:
• Time I can give per week:

STEP 0B — SET UP THE TOOL
• Check if the Apify connector is installed and connected. If it is not, install/enable it first, then confirm it is working before you continue.
• If you cannot connect it, stop and tell me exactly what to click to fix it. Do not fake or guess the data.

STEP 1 — ANALYSE MY OWN ACCOUNT (use Apify)
• Pull my last 30 to 60 posts.
• For each post grab: format (Reel, carousel, static, text), topic, hook/first line, caption length, hashtags, post time, and the engagement numbers (views, likes, comments, shares, saves).
• Then give me:
  1. My top 5 posts and the pattern they share.
  2. My bottom 5 posts and why they likely flopped.
  3. My real average engagement rate (not vanity followers).
  4. My best format, best topic, and best posting time.
  5. What my content currently signals I am about, in one plain sentence.
• Show this as a short table plus 5 bullet takeaways.

STEP 2 — NAME MY NICHE
• Based on step 1 plus my details, tell me my specific niche. Not "business" or "marketing." Something sharp, like "AI content systems for non-technical founders." Give me the exact niche in one line, then 2 backup angles.
• Tell me who my content is FOR (the exact person) and what they want.

STEP 3 — ANALYSE THE VIRAL CREATORS IN MY NICHE (use Apify)
• Find 5 to 8 creators who are winning in my niche right now.
• For each, pull their recent top posts with Apify and report: what they post, their hooks, their formats, their posting frequency, and what is clearly working for them.
• Then give me:
  1. The 5 content patterns that repeat across the winners.
  2. The hook styles that get the most views.
  3. The gaps nobody is filling (my opening).
  4. What I can borrow, and the one thing I should do differently to stand out.

STEP 4 — MY CONTENT STRATEGY
• Give me 4 to 5 content pillars (the buckets I post about) with a one-line description of each and why it fits my niche.
• Give me my brand voice in 3 rules and 5 words I sound like.
• Give me my hook formula and 10 ready-to-use hook templates for my niche.

STEP 5 — THE 30-DAY PLAN (be very specific)
• Build a day-by-day calendar for 30 days. For each posting day give me: the date/day, the pillar, the format, the exact hook line, a 1-line concept, the call to action, and the best time to post.
• Base the number of posts per week on the time I said I have.
• Front-load the first week with my safest winning bets from step 1.
• Put it in a clean table I can copy into a sheet.
• End with: the 3 metrics I should watch, and a simple weekly check-in routine so I know if it is working.

RULES
• Use real Apify data, not assumptions. If a number is missing, say so.
• Keep all writing in plain, simple words. No jargon. No em dashes.
• Be specific. "Post a Reel" is useless. "Post a 20-second Reel, hook: '...', showing X" is what I want.
• Pause after Step 1, Step 3, and Step 5 so I can react before you continue.`;

const PROMPT_SITE = `Great. Now use everything you just learned about me (my niche, my audience, my pillars, my voice, my winning content) to turn my personal brand into a website that sells digital products. Work through the steps in order. Pause where I ask you to pause. Keep all writing in plain, simple words. No jargon. No em dashes.

STEP 1 — CONFIRM THE FOUNDATION
Before building, pull forward from our earlier work and restate in a few lines:
• My niche in one sentence.
• The exact person I serve and the problem they will pay to solve.
• My brand voice and the 3 words I want the site to feel like.
If any of these are missing, ask me before you continue.

STEP 2 — DESIGN MY DIGITAL PRODUCT LADDER
Give me a "value ladder" of 3 to 5 digital products, from cheap and easy to premium. For each product give me:
• The name (real, sellable, on-brand).
• What it is (format: guide, template pack, mini-course, notion system, cohort, etc.)
• The exact problem it solves for my audience.
• Why only I could make it (tie it to my unique edge from the brand work).
• A suggested price.
• Roughly how long it takes me to make it.
Rank them so I know which ONE to build first for the fastest first sale. Pause here and let me pick.

STEP 3 — WRITE THE FLAGSHIP PRODUCT
For the product I pick, give me the full outline: what is inside, the sections or modules, and the promise/transformation. Make it something I can actually build this week. Keep it lean, not bloated.

STEP 4 — PLAN THE WEBSITE
Map out the full site, page by page. For each page tell me the goal and the sections in order. At minimum cover:
• Home (who I am, who I help, the promise, proof, the offer, clear call to action)
• About (my story told in my voice, why I am the person for this)
• Products / Shop (the value ladder, priced, with buy buttons)
• A sales page for the flagship product (hook, problem, solution, what is inside, proof, price, guarantee, FAQ, call to action)
• Free lead magnet + email capture (so I grow a list, not just sell once)
• Contact / links
Tell me the ideal page order and what the visitor should feel at each step.

STEP 5 — WRITE THE COPY
Write the real, ready-to-paste copy for the Home page and the flagship sales page, in my voice. Include the headlines, subheads, body, and the exact button text. Make the headline specific to my niche, not generic.

STEP 6 — BUILD IT AND DEPLOY ON GITHUB
Build the website as a clean, modern, responsive project I can deploy on GitHub Pages.
• Use plain HTML/CSS/JS so it runs on GitHub Pages with no build step, unless you have a strong reason to suggest better, in which case tell me why.
• Make it fast, mobile-first, and on-brand with my voice and feel.
• Wire up the email capture and add clear spots to plug in a payment link (Stripe / Gumroad / Lemon Squeezy). Show me exactly where to paste my links.
• Give me the full code for every file, with the correct file names and folder structure for a GitHub Pages site (index.html at the root, etc.).
• Then walk me through deploying it on GitHub, step by step:
  1. Create the repo (tell me the exact steps and a good repo name).
  2. Add the files (give me the exact git commands, or the click path if I use the GitHub website).
  3. Turn on GitHub Pages in the repo settings and pick the right branch/folder.
  4. Give me the live URL it will publish to.
  5. Tell me how to connect a custom domain later if I want one (CNAME file + DNS steps).
• If anything can go wrong (Pages not enabled, wrong branch, cache delay), warn me and tell me how to fix it.

STEP 7 — LAUNCH PLAN
Give me a simple 7-day launch plan that reuses my 30-day content calendar: which posts tease the product, which post opens sales, what to say in my email, and the exact call to action each day. Tie every step back to the content I am already planning to post.

RULES
• Be specific and practical. I want to actually ship this, not read theory.
• If you need a decision from me, ask one clear question and wait.
• Keep the whole thing doable by one non-technical founder.`;

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

      <Step n={3} title="Let it find your angle">
        <p>
          Don&apos;t dump everything — let Fable 5 <b>interview you</b> and pull out what
          makes you, you. Paste this and just answer honestly:
        </p>
        <CopyBox variant="prompt" label="PASTE THIS PROMPT" copyText={PROMPT_ABOUT}>
          You are my <span className={styles.k}>personal brand strategist</span>.{" "}
          <span className={styles.k}>Interview me</span> to find out what makes me
          special and what my brand should be. Ask me one or two questions at a time,
          not a big list. Dig deeper when my answer is interesting or vague. After about
          8 to 10 questions, stop and give me: (1) my core brand idea in one sentence,
          (2) the 3 things I stand for, (3) who I am for, (4) what I sound like, and (5){" "}
          <span className={styles.k2}>5 content ideas that only I could make</span>.
          Keep everything in simple, plain words. No jargon.
        </CopyBox>
      </Step>

      <Step n={4} title="Get a 30-day plan from your real numbers">
        <p>
          Same chat. This one has Fable 5 study <b>your real accounts</b> and the top
          creators in your niche, then hand you a day-by-day plan. It uses the{" "}
          <b>Apify connector</b> — the prompt sets it up for you.
        </p>
        <CopyBox variant="prompt" collapsible label="PASTE THIS PROMPT" copyText={PROMPT_POSTS} />
      </Step>

      <Step n={5} title="Turn it into a site that sells">
        <p>
          Still the same chat. It turns your brand into a website with digital products
          — and walks you through <b>putting it live on GitHub Pages</b>, step by step.
        </p>
        <CopyBox variant="prompt" collapsible label="PASTE THIS PROMPT" copyText={PROMPT_SITE} />
        <p className={styles.note} style={{ fontSize: 18, marginTop: 9, color: "#3a4047" }}>
          big prompt, big payoff — let it work through each step with you.
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
