import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Thank you! — The AI Bestie",
  description: "Your purchase is confirmed.",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="intro" style={{ marginTop: 34 }}>
          <span className="free-badge">★ ORDER CONFIRMED</span>
          <h1>
            You&apos;re in — <span className="hl">thank you!</span>
          </h1>
          <p>
            Check your inbox: Polar (our payment partner) just emailed you your
            receipt and everything included in your purchase. That email is also
            your way back in later — keep it handy.
          </p>
          <p style={{ marginTop: 12 }}>
            Nothing arrived after a few minutes? Peek in spam, or reach out on
            Instagram and we&apos;ll sort you out.
          </p>
        </div>
        <div className="hero-cta">
          <a className="btn btn-primary" href="/lessons">
            <i className="iconoir-bookmark-book" /> Back to the lessons
          </a>
          <a className="btn btn-ghost" href="https://instagram.com/the.ai.bestie">
            <i className="iconoir-instagram" /> @the.ai.bestie
          </a>
        </div>
      </div>
    </>
  );
}
