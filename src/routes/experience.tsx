import { createFileRoute } from "@tanstack/react-router";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Roy Heinrich Delgado" },
      {
        name: "description",
        content:
          "Professional timeline: DICT IT Application Support internship, Guidance & Counseling Technical Support assistant role, and Job Fair technical setup.",
      },
      {
        property: "og:title",
        content: "Experience — Roy Heinrich Delgado",
      },
      {
        property: "og:description",
        content:
          "A solid technical track record across IT systems support, software development, and database operations.",
      },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

const timeline = [
  {
    period: "June 2026 — Present",
    role: "Digital Solutions & Tech Consultant",
    org: "Independent",
    points: [
      "Completed intensive DICT training focused on digital productivity, remote infrastructure, and client communication (awarded Medalist distinction).",
      "Engaged in client consulting for web search, CRM management, data entry validation, and team workflows.",
      "Building and deploying bespoke chatbot utilities and full-stack record tracking software.",
    ],
    tech: ["React 19", "Vite", "FastAPI", "CRM", "Automations"],
  },
  {
    period: "Jan 2026 — Apr 2026",
    role: "OJT Intern - IT Application & Technical Support",
    org: "Department of Information and Communications Technology (DICT) - Aklan Provincial Field Office",
    points: [
      "Developed and deployed the DICT DTC Aklan Digital Logbook System using Laravel/PHP, achieving 90% uptime and supporting 100+ daily entries at launch.",
      "Validated and compared 100+ daily log entries using advanced Excel matching to verify data accuracy, eliminating discrepancies prior to supervisor review.",
      "Authored and submitted 5 technical documents per week, including detailed system logs, step-by-step process guides, and incident reports.",
      "Provided on-site ICT technical helpdesk support for two large-scale Skills Training programs and a 3-day eLGU System Refresher Training.",
    ],
    tech: ["PHP", "Laravel", "MySQL", "Excel", "Helpdesk", "Docs"],
  },
  {
    period: "May 2024",
    role: "Technical Staff - ASU Job Fair 2024",
    org: "Guidance and Counseling Service Office, Aklan State University",
    points: [
      "Configured and maintained 5 dedicated computer systems for 300+ attendees, reducing applicant wait times by ~30% through proactive setup and monitoring.",
      "Assisted 80+ job applicants in navigating digital registration forms and online career platforms, resolving UI/navigation queries on the spot.",
      "Resolved all on-site technical issues within a 5-10 minute average, sustaining 100% system uptime for the full duration of the event.",
    ],
    tech: ["Systems Setup", "Troubleshooting", "Hardware Support"],
  },
  {
    period: "Sep 2023 — Sep 2024",
    role: "Student Assistant - Technical Support",
    org: "Guidance and Counseling Service Office, Aklan State University",
    points: [
      "Deployed and maintained an informational GCSO website (Hostinger), tripling student access to resources and centralizing counselor access for 200+ students.",
      "Implemented a WordPress/Hostinger CMS structure for non-technical staff, reducing manual announcement distribution time by ~40% and eliminating IT dependency.",
      "Diagnosed and resolved system and application issues during on-campus events within 5-10 minutes, maintaining uninterrupted operations.",
      "Provided IT helpdesk-style assistance to 30+ faculty and students per semester, documenting recurring issues and resolving them in under 15 minutes on average.",
    ],
    tech: ["Hostinger", "CMS", "Helpdesk Support", "Problem Solving"],
  },
];

function ExperiencePage() {
  return (
    <Section className="pt-12 md:pt-20">
      <SectionHeading
        eyebrow="Experience"
        title="A track record across application support and full-stack development."
        subtitle="From government-level IT support and ASU administrative assistance to custom database and chatbot engineering."
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
