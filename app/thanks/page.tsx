import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Thank you! | The AI Bestie",
  description: "Your purchase is confirmed.",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <>
      <NavBar />
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="intro" style={{ marginTop: 90, marginLeft: "auto", marginRight: "auto" }}>
          <span className="free-badge">★ ORDER CONFIRMED</span>
          <h1>
            Thank <span className="hl">you!</span>
          </h1>
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Your kit is on its way to your inbox right now. Go grab it!
          </p>
          <p style={{ marginTop: 12, marginLeft: "auto", marginRight: "auto" }}>
            Nothing after a few minutes? Check spam, or DM @the.ai.bestie.
          </p>
        </div>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
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
