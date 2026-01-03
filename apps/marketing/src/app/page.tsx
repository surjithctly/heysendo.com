import Image from "next/image";
import { SiteFooter } from "~/components/SiteFooter";
import { GitHubStarsButton } from "~/components/GitHubStarsButton";
import { Button } from "@usesend/ui/src/button";
import { TopNav } from "~/components/TopNav";
import { FeatureCard } from "~/components/FeatureCard";
import { FeatureCardPlain } from "~/components/FeatureCardPlain";
import { PricingCalculator } from "~/components/PricingCalculator";
import CodeExample from "~/components/CodeExample";
import { Avatar, AvatarFallback, AvatarImage } from "@usesend/ui/src/avatar";

const APP_URL = "https://app.heysendo.com";

export default function Page() {
  return (
    <main className="min-h-screen text-foreground bg-background">
      <TopNav />
      <Hero />
      <TrustedBy />
      <Features />
      <CodeExample />
      <Pricing />
      <About />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-background to-background pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent border border-border text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            Open source email platform
          </div>
        </div>

        {/* Main heading - using Instrument Serif */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-serif text-foreground leading-[1.1] tracking-tight">
          Send emails that
          <br />
          <span className="italic">actually get delivered</span>
        </h1>

        <p className="mt-6 text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The open source email platform for product, transactional and
          marketing emails.{" "}
          <span className="text-foreground">Pay only for what you send</span> —
          not for storing contacts.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="px-8 h-12 rounded-full text-base font-medium">
              Start sending for free
            </Button>
          </a>
          <GitHubStarsButton />
        </div>

        {/* Trust indicators */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Open source · Set up in minutes · Free tier included
        </p>

        {/* Sponsor */}
        {/* <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Proudly sponsored by
          </p>
          <a
            href="https://web3forms.com/?utm_source=heysendo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition-opacity">
            <Image
              src="https://web3forms.com/img/logo-light.svg"
              alt="Code Rabbit"
              width={180}
              height={90}
              className="dark:hidden"
            />
            <Image
              src="https://web3forms.com/img/web3forms-logo.svg"
              alt="Code Rabbit"
              width={180}
              height={90}
              className="hidden dark:block"
            />
          </a>
        </div> */}

        {/* Hero image */}
        <div className="mt-16 sm:mt-20">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5">
            <Image
              src="/hero-light.webp"
              alt="useSend dashboard"
              width={3456}
              height={1914}
              className="w-full h-auto block dark:hidden"
              sizes="(min-width: 1024px) 900px, 100vw"
              loading="eager"
              priority
            />
            <Image
              src="/hero-dark.webp"
              alt="useSend dashboard"
              width={3456}
              height={1914}
              className="w-full h-auto hidden dark:block"
              sizes="(min-width: 1024px) 900px, 100vw"
              loading="eager"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const featured = [
    {
      quote:
        "Transitioned recently to open source email sender useSend for our 30k and growing newsletter. It's such a great product and amazing oss experience.",
      author: "Marc Seitz",
      company: "papermark.com",
      image:
        "https://pbs.twimg.com/profile_images/1176854646343852032/iYnUXJ-m_400x400.jpg",
    },
    {
      quote:
        "useSend was extremely easy to set up, and I love that it's open source. Koushik has been an absolute awesome person to deal with and helps us with any issues or feedback.",
      author: "Tommerty",
      company: "doras.to",
      image:
        "https://cdn.doras.to/doras/user/83bda65b-8d42-4011-9bf0-ab23402776f2-0.890688178917765.webp",
    },
  ];

  const quick = [
    {
      quote: "don't sleep on useSend",
      author: "shellscape",
      company: "jsx.email",
      image:
        "https://pbs.twimg.com/profile_images/1698447401781022720/b0DZSc_D_400x400.jpg",
    },
    {
      quote: "Thank you for making useSend!",
      author: "Andras Bacsai",
      company: "coolify.io",
      image:
        "https://pbs.twimg.com/profile_images/1884210412524027905/jW4NB4rx_400x400.jpg",
    },
    {
      quote: "I KNOW WHAT TO DO",
      author: "VicVijayakumar",
      company: "onetimefax.com",
      image:
        "https://pbs.twimg.com/profile_images/1665351804685524995/W4BpDx5Z_400x400.jpg",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-accent/30">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-sm text-muted-foreground mb-10">
          Builders and open source teams love{" "}
          <span className="text-foreground font-medium">Sendo</span>
        </p>

        {/* Featured testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((t) => (
            <figure
              key={t.author + t.company}
              className="bg-card rounded-xl border border-border p-6 hover-lift">
              <blockquote className="text-foreground leading-relaxed">
                "{t.quote}"
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-border">
                  <AvatarImage src={t.image} alt={t.author} />
                  <AvatarFallback>{t.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <figcaption>
                  <div className="font-medium text-foreground">{t.author}</div>
                  <a
                    href={`https://${t.company}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary-light transition-colors">
                    {t.company}
                  </a>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        {/* Quick testimonials */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quick.map((t) => (
            <figure
              key={t.author + t.company}
              className="bg-card rounded-xl border border-border p-5 hover-lift">
              <blockquote className="text-foreground text-sm leading-relaxed">
                "{t.quote}"
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={t.image} alt={t.author} />
                  <AvatarFallback className="text-xs">
                    {t.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <figcaption className="text-sm">
                  <span className="font-medium text-foreground">
                    {t.author}
                  </span>
                  <span className="text-muted-foreground"> · </span>
                  <a
                    href={`https://${t.company}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary-light transition-colors">
                    {t.company}
                  </a>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const top = [
    {
      key: "feature-analytics",
      title: "Analytics",
      content:
        "Track deliveries, opens, clicks, bounces and unsubscribes in real time with a simple, searchable log. Filter by domain, status, api key and export them.",
      imageLightSrc: "/emails-search-light.webp",
      imageDarkSrc: "/emails-search-dark.webp",
    },
    {
      key: "feature-editor",
      title: "Marketing Email Editor",
      content:
        "Design beautiful campaigns without code using a visual, notion-like WYSIWYG editor that works in major email clients.",
      imageLightSrc: "/editor-light.webp",
      imageDarkSrc: "/editor-dark.webp",
    },
  ];

  const bottom = [
    {
      key: "feature-contacts",
      title: "Contact Management",
      content:
        "Manage contacts, lists, and consent in one place. Import and export easily, keep per-list subscription status.",
    },
    {
      key: "feature-suppression",
      title: "Suppression List",
      content:
        "Prevent accidental sends. Automatically populated from bounces and complaints, manage via import/export or API.",
    },
    {
      key: "feature-smtp",
      title: "SMTP Relay",
      content:
        "Drop-in SMTP relay that works with any app or framework. No vendor lock-in. Works great with Supabase.",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Everything you need to send emails
          </h2>
        </div>

        {/* Feature cards with images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {top.map((f) => (
            <FeatureCard
              key={f.key}
              title={f.title}
              content={f.content}
              imageLightSrc={f.imageLightSrc}
              imageDarkSrc={f.imageDarkSrc}
            />
          ))}
        </div>

        {/* Feature cards without images */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bottom.map((f) => (
            <FeatureCardPlain key={f.key} title={f.title} content={f.content} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const freePerks = [
    "Send up to 3,000 emails per month",
    "Send up to 100 emails per day",
    "1 contact book",
    "1 domain",
    "1 team member",
  ];

  const paidPerks = [
    "$10 monthly usage credits",
    "Transactional emails at $0.0004 each",
    "Marketing emails at $0.001 each",
    "Unlimited contact books",
    "Unlimited domains",
    "Unlimited team members",
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-accent/30">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pay for what you use. The most affordable email platform.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <PricingCard
            title="Free"
            price="$0"
            note="per month"
            perks={freePerks}
          />
          <PricingCard
            title="Pro"
            price="$10"
            note="minimum per month"
            perks={paidPerks}
            highlighted
          />
        </div>

        {/* Calculator */}
        <div className="mt-12">
          <PricingCalculator />
        </div>
      </div>
    </section>
  );
}

type PricingCardProps = {
  title: string;
  price: string;
  note: string;
  perks: string[];
  highlighted?: boolean;
};

function PricingCard({
  title,
  price,
  note,
  perks,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 flex flex-col h-full ${
        highlighted
          ? "bg-primary text-primary-foreground"
          : "bg-card border border-border"
      }`}>
      <div>
        <h3
          className={`text-lg font-medium ${highlighted ? "text-primary-foreground" : "text-foreground"}`}>
          {title}
        </h3>
        <div className="mt-4">
          <span
            className={`text-4xl sm:text-5xl font-serif ${highlighted ? "text-primary-foreground" : "text-foreground"}`}>
            {price}
          </span>
          <span
            className={`ml-2 text-sm ${highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            {note}
          </span>
        </div>
      </div>

      <ul className="mt-8 space-y-3 flex-1">
        {perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3">
            <CheckIcon
              className={`w-5 h-5 mt-0.5 shrink-0 ${highlighted ? "text-primary-foreground" : "text-primary"}`}
            />
            <span
              className={`text-sm ${highlighted ? "text-primary-foreground/90" : "text-foreground"}`}>
              {perk}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <a href={APP_URL} target="_blank" rel="noopener noreferrer">
          <Button
            className={`w-full rounded-full h-11 font-medium ${
              highlighted
                ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                : ""
            }`}
            variant={highlighted ? "secondary" : "default"}>
            Get started
          </Button>
        </a>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="section-label mb-3">About</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-foreground mb-8">
          Built for developers, by developers
        </h2>

        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Sendo is an email marketing platform created on top of open source
            platform{" "}
            <a
              href="https://github.com/usesend/useSend/"
              target="_blank"
              className="underline"
              rel="noopener noreferrer">
              useSend
            </a>
            . <br /> Storing a few contacts in a database shouldn't cost a
            fortune. Sendo give developers and startups an affordable
            alternative to traditional email service providers.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
