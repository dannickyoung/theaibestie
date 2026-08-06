"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/lessons", label: "Lessons", match: ["/lessons"] },
  {
    href: "/packs",
    label: "Packs",
    match: ["/packs", "/starter-pack", "/assistant-pack"],
  },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="nav-brand" href="/" aria-label="The AI Bestie home">
          <span className="nav-wm">THE AI BESTIE</span>
        </Link>

        <div className="nav-tabs">
          {TABS.map((t) => {
            const active =
              t.href === "/"
                ? pathname === "/"
                : t.match.some((m) => pathname.startsWith(m));
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`nav-tab${active ? " active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
