"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type LangItem = {
  key: string;
  label: string;
  kind: "ts" | "py" | string;
};

export function LangToggle({
  containerId,
  languages,
  defaultLang,
}: {
  containerId: string;
  languages: LangItem[];
  defaultLang: string;
}) {
  const [active, setActive] = useState(defaultLang);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const slots = Array.from(
      container.querySelectorAll<HTMLElement>("[data-lang-slot]")
    );
    for (const el of slots) {
      const key = el.getAttribute("data-lang-slot");
      if (key === active) {
        el.classList.remove("hidden");
        el.classList.add("block");
      } else {
        el.classList.add("hidden");
        el.classList.remove("block");
      }
    }
  }, [active, containerId]);

  return (
    <div className="inline-flex items-center gap-1 p-1 bg-accent rounded-full border border-border">
      {languages.map((l) => (
        <button
          key={l.key}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === l.key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={active === l.key}
          onClick={() => setActive(l.key)}
        >
          <LangIcon kind={l.kind} className="w-4 h-4" />
          <span className="hidden sm:inline">{l.label}</span>
        </button>
      ))}
    </div>
  );
}

function LangIcon({ kind, className = "h-4 w-4" }: { kind: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className} role="img">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
      </svg>
    );
  }

  if (kind === "ts")
    return (
      <Image
        src="/typescript.svg"
        alt="TypeScript"
        width={16}
        height={16}
        className={className}
        priority={false}
        onError={() => setFailed(true)}
      />
    );
  if (kind === "py")
    return (
      <Image
        src="/python.svg"
        alt="Python"
        width={16}
        height={16}
        className={className}
        priority={false}
        onError={() => setFailed(true)}
      />
    );
  if (kind === "go")
    return (
      <Image
        src="/go.svg"
        alt="Go"
        width={16}
        height={16}
        className={className}
        priority={false}
        onError={() => setFailed(true)}
      />
    );
  if (kind === "php")
    return (
      <Image
        src="/php.svg"
        alt="PHP"
        width={16}
        height={16}
        className={className}
        priority={false}
        onError={() => setFailed(true)}
      />
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} role="img">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export default LangToggle;
