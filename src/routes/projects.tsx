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
          "Featured projects including a Multilingual School Chatbot and the DICT Digital Logbook System.",
      },
      {
        property: "og:title",
        content: "Projects — Featured Work by Roy Heinrich",
      },
      {
        property: "og:description",
        content:
          "Selected case studies across AI, automation, and full-stack systems.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    tag: "AI · NLP · Education",
    title: "Multilingual School Chatbot",
    overview:
      "A conversational assistant deployed for an academic institution, capable of handling student inquiries across multiple languages.",
    problem:
      "Staff were overwhelmed answering repetitive admission, enrollment, and policy questions — especially across language groups.",
    stack: ["Python", "NLP", "React", "FastAPI", "OpenAI"],
    impact: [
      "Reduced repetitive inquiries by an estimated 60%",
      "24/7 multilingual coverage for students and parents",
      "Centralized FAQ knowledge into a versioned source of truth",
    ],
    github: "https://github.com/roy-heinrich/TomasChatBot",
  },
  {
    tag: "Full-Stack · Education",
    title: "PFLC Alumni Tracker",
    overview:
      "A full-stack alumni tracking and administration platform designed to streamline student record management and administrative workflows.",
    problem:
      "Administrative staff spent hours manually processing student spreadsheets, risking duplicate records, data inconsistencies, and data loss during upload interruptions.",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "PHP",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
    ],
    impact: [
      "Streamlined administrative workflows by replacing manual spreadsheet data entry with a validated bulk Excel/CSV import and side-by-side duplicate resolution",
      "Strengthened platform security with secure multi-role auth, SMTP-based OTP recovery, session controls, and rate limiting (HTTP 429)",
      "Ensured data upload continuity through a custom REST API with transactional data handling and local storage fallback mechanisms",
      "Optimized dashboard responsiveness and data retrieval through query caching and structured PostgreSQL database design",
    ],
    github: "https://github.com/roy-heinrich/PFLCAlumniTracker",
    live: "https://pflcalumnitracker.onrender.com/",
  },
  {
    tag: "Full-Stack · Government",
    title: "DICT Digital Logbook System",
    overview:
      "An internal logbook and reporting platform built during a DICT engagement to replace manual paper-based tracking.",
    problem:
      "Manual logs were slow, lossy, and made reporting nearly impossible at scale across multiple offices.",
    stack: ["React", "Node", "PostgreSQL", "Auth", "Reports"],
    impact: [
      "Digitized daily logging with role-based access",
      "Automated weekly and monthly reporting exports",
      "Cut admin reporting time from hours to minutes",
    ],
    github: "https://github.com/roy-heinrich/dtc_logbook",
    live: "https://dtc-logbook.onrender.com/",
  },
];

function ProjectsPage() {
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Selected work — built for clarity, shipped for impact."
        subtitle="Two recent builds that capture the range: applied AI for education and full-stack tooling for the public sector."
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
