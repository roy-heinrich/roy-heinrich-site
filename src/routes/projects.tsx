import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Featured Work by Roy Heinrich" },
      {
        name: "description",
        content:
          "Featured technical projects including the PFLC Alumni Tracker & Admin Portal, DICT DTC Aklan Digital Logbook, and Multilingual School Chatbot.",
      },
      {
        property: "og:title",
        content: "Projects — Featured Work by Roy Heinrich",
      },
      {
        property: "og:description",
        content:
          "Selected case studies across software engineering, IT systems, and applied AI/NLP development.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    tag: "React 19 · TanStack · PHP · PostgreSQL",
    title: "PFLC Alumni Tracker & Admin Portal",
    overview:
      "A full-stack alumni tracking and administration platform designed to streamline student record management, cohort promotions, and fee tracking for 500+ student records.",
    problem:
      "Administrative staff spent hours manually processing student spreadsheets, risking duplicate records, data inconsistencies, and data loss during upload interruptions.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Start/Router/Query",
      "PHP",
      "Neon PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Radix UI",
      "SheetJS (xlsx)"
    ],
    impact: [
      "Reduced administrative onboarding and registration time by ~80% through bulk Excel/CSV import operations and automated cohort promotion tools.",
      "Designed a custom REST API in PHP using transactional repository patterns and automated memory caching, cutting average API response time to under 200ms.",
      "Built a fallback mechanism redirecting media uploads to local storage during Supabase cloud outages, sustaining 99%+ operational continuity.",
      "Built a multi-step Excel/CSV import pipeline with SheetJS (xlsx) and custom schema validation, processing 500+ legacy records per batch with an interactive duplicate Conflict Resolution Wizard.",
      "Implemented secure, multi-role authentication with SMTP-driven 6-digit OTP recovery, rate-limiting (429 Too Many Requests), and inactivity-based session expiration."
    ],
    github: "https://github.com/roy-heinrich/PFLCAlumniTracker",
    live: "https://pflcalumnitracker.onrender.com/",
  },
  {
    tag: "PHP · Laravel · MySQL · GitHub",
    title: "DICT DTC Aklan Digital Logbook System",
    overview:
      "An internal logbook and reporting platform built during a DICT engagement to replace manual paper-based tracking and automate administrative compliance.",
    problem:
      "Manual logs were slow, lossy, difficult to search, and made weekly/monthly reporting nearly impossible at scale across provincial offices.",
    stack: [
      "PHP",
      "Laravel",
      "JavaScript",
      "HTML",
      "CSS",
      "MySQL",
      "GitHub",
      "Excel Queries"
    ],
    impact: [
      "Developed and deployed the DICT DTC Aklan Digital Logbook System achieving 90% uptime and 100+ daily entries at production launch.",
      "Validated and compared 100+ daily log entries using advanced Excel matching to verify data accuracy, eliminating discrepancies prior to supervisor review.",
      "Prepared and submitted 5 technical documents per week - including system logs, process guides, and incident reports - maintaining a complete and audit-ready documentation trail.",
      "Implemented SQL injection protection, dynamic logging, and maintained version control across 11 active GitHub repositories."
    ],
    github: "https://github.com/roy-heinrich/dtc_logbook",
    live: "https://dtc-logbook.onrender.com/",
  },
  {
    tag: "Python · FastAPI · Redis · Supabase",
    title: "Multilingual School Chatbot - Tomas S.M. Bautista Elementary School",
    overview:
      "A conversational natural language assistant deployed to handle admissions, policies, and general student inquiries across multiple language dialects.",
    problem:
      "Administrative staff were overwhelmed with repetitive inquiry questions in multiple local dialects, especially during enrollment seasons.",
    stack: [
      "Python",
      "FastAPI",
      "NLTK",
      "TextBlob",
      "Redis Caching",
      "Supabase",
      "Render"
    ],
    impact: [
      "Planned and deployed a multilingual chatbot (English, Tagalog, Aklanon) handling 50+ FAQs with 95%+ intent accuracy across 15+ categories, improving query accuracy by 60% over the baseline.",
      "Built a Python NLP engine (NLTK, TextBlob) with FastAPI, RESTful APIs, Redis caching (achieving an 80%+ hit rate), and Supabase integration.",
      "Deployed on Render, sustaining sub-2s response times under simulated loads of 100+ concurrent users."
    ],
    github: "https://github.com/roy-heinrich/TomasChatBot",
  },
];

function ProjectsPage() {
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Selected work — engineered for performance, shipped for impact."
        subtitle="Three recent technical projects covering full-stack administrative platforms, public-sector application rollout, and applied AI/NLP solutions."
      />

      <div className="space-y-10">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <div className="grid md:grid-cols-[1.2fr_1fr]">
                {/* Mockup */}
                <div className="relative isolate min-h-[260px] bg-gradient-hero p-6 md:p-10">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="glass-dark rounded-xl px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        {p.tag}
                      </p>
                      <p className="mt-1 font-display text-xl font-semibold text-white">
                        {p.title}
                      </p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <div className="h-2 w-3/4 rounded-full bg-white/20" />
                      <div className="mt-2 h-2 w-1/2 rounded-full bg-white/15" />
                      <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-12 rounded-lg bg-white/10" />
                      <div className="h-12 rounded-lg bg-accent/30" />
                      <div className="h-12 rounded-lg bg-white/10" />
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <h3 className="font-display text-2xl font-semibold">
                    Overview
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {p.overview}
                  </p>

                  <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                    Problem
                  </h4>
                  <p className="mt-1 text-sm text-foreground">{p.problem}</p>

                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                    Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <h4 className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                    Impact
                  </h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-foreground">
                    {p.impact.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {m}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.github && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <a href={p.github} target="_blank" rel="noreferrer">
                          <Github className="mr-1.5 h-4 w-4" /> GitHub
                        </a>
                      </Button>
                    )}

                    {p.live && (
                      <Button asChild size="sm" variant="outline">
                        <a href={p.live} target="_blank" rel="noreferrer">
                          Live demo <ArrowUpRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
