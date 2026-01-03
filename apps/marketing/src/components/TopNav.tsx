"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@usesend/ui/src/button";
import { ThemeToggle } from "./ThemeToggle";

const REPO = "usesend/usesend";
const REPO_URL = `https://github.com/${REPO}`;
const APP_URL = "https://app.heysendo.com";

export function TopNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const pricingHref = isHome ? "#pricing" : "/#pricing";
  const featuresHref = isHome ? "#features" : "/#features";

  return (
    <header className="py-5 sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-lg">
              s
            </span>
          </div>
          <span className="text-foreground font-medium text-base tracking-tight">
            Sendo
          </span>
        </Link>

        {/* Desktop nav - center */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <Link
            href={featuresHref}
            className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <span className="text-border">/</span>
          <Link
            href={pricingHref}
            className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <span className="text-border">/</span>
          <a
            href="https://docs.usesend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </a>
          <span className="text-border">/</span>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </a>
        </nav>

        {/* Right side - CTA + Theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="px-4 h-9 rounded-full font-medium">
              Get started
            </Button>
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile - hamburger + theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setOpen((v) => !v)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-5 h-5">
              {open ? (
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 8h16M4 16h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1">
            <Link
              href={featuresHref}
              className="py-2.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              Features
            </Link>
            <Link
              href={pricingHref}
              className="py-2.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              Pricing
            </Link>
            <a
              href="https://docs.usesend.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              Docs
            </a>
            {/* <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen(false)}>
              GitHub
            </a> */}
            <div className="pt-3 mt-2 border-t border-border/50">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full font-medium">
                  Get started
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
