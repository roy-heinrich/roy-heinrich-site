import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Roy Heinrich — IT Professional & VA Specialist" },
      {
        name: "description",
        content:
          "Roy Heinrich Delgado is an IT professional blending virtual assistance, technical support, AI, and full-stack development to streamline modern teams.",
      },
      {
        property: "og:title",
        content: "About Roy Heinrich — IT Professional & VA Specialist",
      },
      {
        property: "og:description",
        content:
          "From DICT internship to chatbots and full-stack systems — a systems-first operator built for modern teams.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const highlights = [
  "DICT Internship — public-sector IT operations",
  "Built multilingual AI chatbots for education",
  "Full-stack systems & internal tooling",
  "Frontline technical support & documentation",
  "Clear, client-focused communication",
  "Workflow optimization mindset",
];

const traits = [
  "Detail-oriented",
  "Fast learner",
  "Reliable communication",
  "Tech-savvy",
  "Knowledgeable in digital workflows",
  "Responsive and goal-driven",
  "Committed to delivering quality work",
  "Organized and efficient",
  "Strong problem-solving skills",
  "Strong internet research skills",
];

function AboutPage() {
  return (
    <>
      <Section className="pb-10 pt-12 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> About
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
              Operations, engineering, and AI — under one roof.
            </h1>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              As an IT student transitioning into the Virtual Assistant field, I recently completed Virtual Assistant training that strengthened my skills in organization, communication, and digital tools. While I’m still building hands-on client experience, I’m highly adaptable, detail-oriented, tech-savvy, and committed to providing reliable support that helps clients stay productive and organized.
            </p>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              My background spans a DICT internship, building multilingual chatbots, shipping full-stack tools, and providing day-to-day technical support. The throughline: clear thinking, calm execution, and systems that compound.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
              {traits.map((t) => (
                <div
                  key={t}
                  className="rounded-lg border border-border bg-card/40 px-4 py-2 text-sm text-foreground shadow-sm hover:shadow-md transition-colors"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/contact">
                  Work with me <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/experience">See experience</Link>
              </Button>
            </div>
          </Reveal>

          

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-secondary p-1 shadow-elegant bg-gradient-hero dark:shadow-[0_0_24px_color-mix(in_oklab,var(--yellow)_20%,transparent)] dark:ring-1 dark:ring-accent/20">
                <div className="relative h-full w-full rounded-[22px] bg-gradient-hero">
                  <img
                    src="/about-photo.jpg"
                    alt="Roy Heinrich Delgado"
                    className="h-full w-full object-cover rounded-[22px]"
                  />

                  {/* Gradient overlay to improve text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent rounded-[22px]" />

                  {/* Responsive overlay text */}
                  <div className="absolute left-6 right-6 bottom-6 flex flex-col items-start text-white md:left-8 md:right-auto">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 md:text-sm">
                      About
                    </p>
                    <h2 className="mt-2 text-2xl font-display font-bold leading-tight md:text-3xl">
                      Roy Heinrich Delgado
                    </h2>
                    <p className="mt-1 text-sm text-white/90 md:text-base">
                      VA · AI Systems · Full-Stack
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 hidden rounded-2xl border border-white/20 bg-black/55 px-5 py-4 shadow-elegant backdrop-blur-md md:block">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                  Based remotely
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Working with teams worldwide
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="pt-10">
        <SectionHeading
          eyebrow="Highlights"
          title="A blend of operations, engineering, and AI fluency."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h} delay={i * 0.04}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 border-l-4 border-accent">
                <p className="text-sm text-foreground">{h}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      
    </>
  );
}
