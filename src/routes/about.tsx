import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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

const testimonies = [
  {
    quote:
      "As a team leader, I appreciate Roy’s professionalism, teamwork, and effort in handling the web search, data entry, and CRM tasks with his co-member for the 5 mock clients. He showed good coordination, organized workflow, and effective follow-up communication throughout the project. His contribution helped the team complete the tasks efficiently and professionally. Keep up the good work, Roy, and continue developing your communication and client management skills.",
    author: "Abbie Cebuano",
    role: "Team Leader, Virtual Assistant Training",
  }
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
              <div className="aspect-4/5 overflow-hidden rounded-3xl border border-secondary p-1 shadow-elegant bg-gradient-hero dark:shadow-[0_0_24px_color-mix(in_oklab,var(--yellow)_20%,transparent)] dark:ring-1 dark:ring-accent/20">
                <div className="relative h-full w-full rounded-[22px] bg-gradient-hero">
                  <img
                    src="/about-photo.jpg"
                    alt="Roy Heinrich Delgado"
                    className="h-full w-full object-cover rounded-[22px]"
                  />

                  {/* Gradient overlay to improve text legibility */}
                  <div className="absolute inset-0 rounded-[22px] bg-linear-to-t from-black/60 via-black/25 to-transparent" />

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
              <div className="flex items-start gap-3 rounded-xl border border-border border-l-4 border-l-accent bg-card p-4">
                <p className="text-sm text-foreground">{h}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-24 md:pt-32">
        <SectionHeading eyebrow="Testimonies" title="What people say" />

        <div className="mt-6">
          <TestimoniesCarousel items={testimonies} />
        </div>
      </Section>

      
    </>
  );
}

function TestimoniesCarousel({ items }: { items: typeof testimonies }) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const syncControls = React.useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;

    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!api) return;

    syncControls(api);
    api.on("select", syncControls);
    api.on("reInit", syncControls);

    let id: number | undefined;
    if (!isHovered) {
      id = window.setInterval(() => {
        api.scrollNext();
      }, 4000);
    }

    return () => {
      if (id) window.clearInterval(id);
      api.off("select", syncControls);
      api.off("reInit", syncControls);
    };
  }, [api, isHovered, syncControls]);

  return (
    <div className="mx-auto w-full max-w-4xl" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-border/40 pb-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">
            Testimonies
          </p>
          <p className="text-xs text-muted-foreground">Swipe or use the arrows</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden min-w-16 text-right text-xs font-medium tabular-nums text-muted-foreground md:block">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/60 text-foreground transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous testimony"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/60 text-foreground transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next testimony"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Carousel opts={{ loop: true, containScroll: "keepSnaps" }} setApi={setApi} className="w-full">
        <CarouselContent className="flex touch-pan-y select-none">
          {items.map((t, i) => (
            <CarouselItem key={i} className="pl-6 first:pl-6 md:pl-8 md:first:pl-8">
              <Reveal delay={i * 0.04}>
                <div className="mx-auto w-[calc(100%-1rem)] rounded-[2rem] border border-border/50 bg-linear-to-br from-card via-card/90 to-background p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:w-[calc(100%-1.5rem)] md:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Featured testimony
                  </p>
                  <p className="mt-6 max-w-3xl text-2xl leading-tight text-foreground md:text-3xl">
                    “{t.quote}”
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-foreground/10" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
