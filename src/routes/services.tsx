import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Cpu,
  Globe,
  Headphones,
  Mail,
  ShieldCheck,
  Workflow,
  Inbox,
  FileText,
  Wrench,
  LayoutDashboard,
  Plug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — IT Application Support, Full-Stack Dev, & AI Systems" },
      {
        name: "description",
        content:
          "IT Application Support, Full-Stack Web Development, Systems & Network Support, and Applied AI/NLP chatbot deployment.",
      },
      {
        property: "og:title",
        content: "Services — IT Application Support, Full-Stack Dev, & AI Systems",
      },
      {
        property: "og:description",
        content:
          "Four technical service tracks designed to build, secure, and support your applications.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

type Service = {
  icon: LucideIcon;
  title: string;
  tagline: string;
  bullets: { icon: LucideIcon; text: string }[];
};

const services: Service[] = [
  {
    icon: Headphones,
    title: "IT Application Support",
    tagline: "SLA-driven resolution and application lifecycle support.",
    bullets: [
      { icon: Wrench, text: "Incident troubleshooting & support" },
      { icon: ShieldCheck, text: "Systems & user acceptance (UAT) testing" },
      { icon: FileText, text: "Audit-ready logs & incident documentation" },
      { icon: Wrench, text: "Application rollout & deployment support" },
    ],
  },
  {
    icon: Cpu,
    title: "Systems & Network Support",
    tagline: "Helpdesk operations and foundational network diagnostics.",
    bullets: [
      { icon: Headphones, text: "On-site ICT helpdesk & end-user training" },
      { icon: Wrench, text: "Windows & Linux OS configuration" },
      { icon: ShieldCheck, text: "TCP/IP & network troubleshooting" },
      { icon: FileText, text: "System logs & process guides preparation" },
    ],
  },
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    tagline: "Secure, performant, and responsive web applications.",
    bullets: [
      { icon: LayoutDashboard, text: "Alumni tracking & admin portal builds" },
      { icon: Plug, text: "Transactional REST APIs in PHP/Laravel/FastAPI" },
      { icon: ShieldCheck, text: "OTP authentication, rate-limiting & security" },
      { icon: Globe, text: "Bulk Excel/CSV import pipelines (SheetJS)" },
    ],
  },
  {
    icon: Bot,
    title: "Applied AI & NLP Chatbots",
    tagline: "Custom natural language engines to automate FAQs.",
    bullets: [
      { icon: Bot, text: "Multilingual chatbots (NLTK & TextBlob)" },
      { icon: Plug, text: "FastAPI endpoints & Supabase storage" },
      { icon: Workflow, text: "In-memory caching pipelines (Redis)" },
      { icon: ShieldCheck, text: "Uptime and response time optimizations" },
    ],
  },
];

function ServiceCard({ s, delay }: { s: Service; delay: number }) {
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  return (
    <Reveal delay={delay}>
      <article
        className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setGlow({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          });
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setGlow({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          });
        }}
        onMouseLeave={() => setGlow((prev) => ({ ...prev, active: false }))}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glow.active ? 1 : 0,
            background: `radial-gradient(220px circle at ${glow.x}px ${glow.y}px, color-mix(in oklab, var(--accent) 24%, transparent), transparent 72%)`,
          }}
        />
        <div className="relative">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <s.icon className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
          <ul className="mt-6 space-y-3">
            {s.bullets.map((b) => (
              <li
                key={b.text}
                className="flex items-center gap-3 text-sm text-foreground"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-accent">
                  <b.icon className="h-4 w-4" />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              asChild
              variant="outline"
              className="border-border hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Link to="/contact">
                Discuss this service <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ServicesPage() {
  return (
    <>
      <Section className="pb-10 pt-12 md:pt-20">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Services
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Four tracks. Dedicated execution.
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Combining application support, system diagnostics, full-stack software development,
            and custom NLP integrations to keep your business workflows fast, secure, and reliable.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} delay={i * 0.06} />
          ))}
        </div>
      </Section>
    </>
  );
}
