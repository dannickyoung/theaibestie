import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Bestie — AI tutorials even your mom can understand",
  description:
    "The AI Bestie course. Tiny, beginner-friendly AI lessons. Zero coding. Start with Lesson 1: What is Claude Code?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800;900&family=Press+Start+2P&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/iconoir@7.10.1/css/iconoir.css"
        />
      </head>
      <body>
        {children}
        <a
          className="ig-float"
          href="https://instagram.com/the.ai.bestie"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow @the.ai.bestie on Instagram"
        >
          <i className="iconoir-instagram" />
        </a>
      </body>
    </html>
  );
}
