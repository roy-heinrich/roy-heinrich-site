import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  Calendar,
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
      { title: "Services — Virtual Assistance, Tech Support, AI & Web" },
      {
        name: "description",
        content:
          "Premium virtual assistance, technical support, web development, and AI & automation services for founders, agencies, and SMEs.",
      },
      {
        property: "og:title",
        content: "Services — Virtual Assistance, Tech Support, AI & Web",
      },
      {
        property: "og:description",
        content:
          "Four core service tracks designed to streamline operations and ship smarter systems.",
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
    icon: Calendar,
    title: "Virtual Assistance",
    tagline: "Day-to-day operations, handled with care.",
    bullets: [
      { icon: Inbox, text: "Inbox management & triage" },
      { icon: Calendar, text: "Calendar scheduling & coordination" },
      { icon: Mail, text: "Client communication & follow-ups" },
      { icon: FileText, text: "Administrative & research support" },
    ],
  },
  {
    icon: Headphones,
    title: "Technical Support",
    tagline: "Reliable IT support without the runaround.",
    bullets: [
      { icon: Wrench, text: "IT troubleshooting & resolution" },
      { icon: ShieldCheck, text: "System maintenance & monitoring" },
      { icon: FileText, text: "Internal documentation & SOPs" },
      { icon: Headphones, text: "End-user training & support" },
    ],
  },
  {
    icon: Globe,
    title: "Web Development",
    tagline: "Modern websites and internal tools, built to last.",
    bullets: [
      { icon: Globe, text: "Portfolio & business websites" },
      { icon: LayoutDashboard, text: "Dashboards & admin panels" },
      { icon: Plug, text: "Backend systems & REST APIs" },
      { icon: ShieldCheck, text: "Auth, roles, and secure data flows" },
    ],
  },
  {
    icon: Bot,
    title: "AI & Automation",
    tagline: "Smart systems that work while you sleep.",
    bullets: [
      { icon: Bot, text: "AI chatbots & assistants" },
      { icon: Workflow, text: "Workflow automation pipelines" },
      { icon: Plug, text: "AI integrations into existing tools" },
      { icon: ShieldCheck, text: "Guardrails, prompts & evaluation" },
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
            Four tracks. One operator.
          </h1>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Pick a single service or combine them into a fully managed
            operations layer. Every engagement starts with a short audit to
            scope what's actually worth your time.
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
