import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Roy Heinrich Delgado" },
      {
        name: "description",
        content:
          "Professional timeline: DICT internship, student assistant role, and technical staff experience across IT, AI, and operations.",
      },
      {
        property: "og:title",
        content: "Experience — Roy Heinrich Delgado",
      },
      {
        property: "og:description",
        content:
          "A grounded track record across public-sector IT, education, and applied AI.",
      },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

const timeline = [
  {
    period: "Present",
    role: "Available — Free for you",
    org: "Independent",
    points: [
      "Open for short-term and long-term engagements",
      "Contact or hire me for VA, automation, and AI tasks",
    ],
    tech: ["React", "Node", "OpenAI", "Supabase", "n8n"],
  },
  {
    period: "May 2026",
    role: "GVA (General Virtual Assistant) Trainee",
    org: "Independent",
    points: [
      "Training in virtual assistance and AI-driven automation",
      "Built AI chatbots and automation flows for SMEs and educators",
    ],
    tech: ["React", "Node", "OpenAI", "Supabase"],
  },
  {
    period: "2023 — 2024",
    role: "IT Intern",
    org: "DICT (Department of Information & Communications Technology)",
    points: [
      "Supported public-sector IT operations and on-site troubleshooting",
      "Helped digitize manual processes (logbook, reporting)",
      "Authored documentation for internal workflows",
    ],
    tech: ["Networking", "Docs", "Support"],
  },
  {
    period: "2022 — 2023",
    role: "GCSO Student Assistant",
    org: "Aklan State University - GCSO",
    points: [
      "Frontline tech support for staff and students",
      "Maintained lab systems, accounts, and access workflows",
      "Trained peers on internal tools and best practices",
    ],
    tech: ["Helpdesk", "AD Basics", "Hardware", "Training"],
  },
];

function ExperiencePage() {
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeading
        eyebrow="Experience"
        title="A grounded track record across IT, AI, and operations."
        subtitle="From public-sector internships to applied AI, every role compounded the same skill: making systems run smoother."
      />

      <div className="relative mt-8">
        <div
          aria-hidden
          className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-border md:left-1/2 md:block"
        />
        <div
          aria-hidden
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-border md:hidden"
        />

        <ol className="space-y-10">
          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li key={item.role} className="relative pl-10 md:pl-0">
                <div
                  className={`grid items-start gap-6 md:grid-cols-2 ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className={left ? "md:pr-12 md:text-right" : "md:pl-12"}>
                    <Reveal>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/80">
                        {item.period}
                      </span>
                      <h3 className="mt-1 font-display text-xl font-semibold">
                        {item.role}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.org}
                      </p>
                    </Reveal>
                  </div>

                  <div className={left ? "md:pl-12" : "md:pr-12"}>
                    <Reveal delay={0.05}>
                      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                        <ul className="space-y-2 text-sm text-foreground">
                          {item.points.map((p) => (
                            <li key={p} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* node dot */}
                <span
                  aria-hidden
                  className="absolute left-4 top-2 -ml-1.25 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background md:left-1/2"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
