import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Calendar,
  Cpu,
  Download,
  Globe,
  Headphones,
  Sparkles,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roy Heinrich — Virtual Assistant & AI Systems Specialist" },
      {
        name: "description",
        content:
          "Premium virtual assistance, technical support, automation, and AI systems for founders, agencies, and SMEs.",
      },
      {
        property: "og:title",
        content: "Roy Heinrich — Virtual Assistant & AI Systems Specialist",
      },
      {
        property: "og:description",
        content:
          "Helping businesses run smarter through virtual assistance and AI-powered systems.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const floatingBadges = [
  { label: "AI Chatbots", icon: Bot, x: "8%", y: "12%", d: 0 },
  { label: "Automation", icon: Workflow, x: "82%", y: "18%", d: 0.4 },
  { label: "Full-Stack", icon: Cpu, x: "12%", y: "78%", d: 0.8 },
  { label: "Tech Support", icon: Headphones, x: "78%", y: "72%", d: 1.2 },
];

const servicesPreview = [
  {
    icon: Calendar,
    title: "Virtual Assistance",
    text: "Inbox, calendar, client comms, and admin run smoothly so you can focus on the work that matters.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    text: "IT troubleshooting, system maintenance, documentation, and reliable user support.",
  },
  {
    icon: Globe,
    title: "Web Development",
    text: "Portfolio sites, backends, dashboards, and APIs built with modern, maintainable stacks.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    text: "Chatbots, workflow automations, and intelligent integrations that scale with you.",
  },
];

const heroAreas = [
  { id: "hero", label: "Hero", href: "#hero" },
  { id: "services", label: "Services", href: "#services" },
  { id: "highlights", label: "Highlights", href: "#highlights" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact-cta", label: "CTA", href: "#contact-cta" },
] as const;

function Index() {
  const [activeArea, setActiveArea] = useState<(typeof heroAreas)[number]["id"]>("hero");

  useEffect(() => {
    const sectionIds = heroAreas.map((area) => area.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveArea(visible.target.id as (typeof heroAreas)[number]["id"]);
        }
      },
      {
        root: null,
        rootMargin: "-24% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative isolate overflow-hidden bg-gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        {/* Floating badges */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {floatingBadges.map((b) => (
            <motion.div
              key={b.label}
              className="absolute"
              style={{ left: b.x, top: b.y }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: b.d },
                y: {
                  duration: 5,
                  delay: b.d,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="glass-dark flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-soft">
                <b.icon className="h-3.5 w-3.5 text-accent" />
                {b.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-28 text-center md:pb-36 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white md:text-6xl lg:text-7xl"
          >
            Helping businesses run smarter through{" "}
            <span className="bg-gradient-to-r from-accent to-yellow-200 bg-clip-text text-transparent">
              virtual assistance
            </span>{" "}
            &amp; AI-powered systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base text-white/80 md:text-lg"
          >
            I'm Roy Heinrich — an IT professional combining virtual assistance,
            technical support, automation, and AI to streamline operations and
            ship modern web solutions for teams that want to move faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/contact">
                Hire Me <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-white/85 hover:bg-white/10 hover:text-white"
            >
              <a href="/Roy_Heinrich_Delgado_CV.pdf" download>
                <Download className="mr-1.5 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services preview */}
      <Section id="services">
        <SectionHeading
          eyebrow="What I Do"
          title="A full operations stack — human + intelligent."
          subtitle="From inbox zero to AI workflows, I bring the systems mindset that lets small teams operate like much larger ones."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {servicesPreview.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant">
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Button
            asChild
            variant="ghost"
            className="text-foreground hover:bg-muted"
          >
            <Link to="/services">
              Explore all services <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* Value strip */}
      <Section id="highlights" className="bg-secondary text-secondary-foreground">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              k: "Systems-first",
              v: "Every engagement starts with a workflow audit so we automate what actually moves the needle.",
            },
            {
              k: "Tech-fluent",
              v: "Comfortable across full-stack development, AI integrations, and infrastructure tooling.",
            },
            {
              k: "Client-obsessed",
              v: "Clear communication, predictable delivery, and documentation you can hand to anyone.",
            },
          ].map((v, i) => (
            <Reveal key={v.k} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    {v.k}
                  </span>
                </div>
                <p className="mt-3 text-base text-secondary-foreground/90">
                  {v.v}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Featured projects preview */}
      <Section id="projects">
        <SectionHeading
          eyebrow="Featured Work"
          title="Real systems. Real outcomes."
          subtitle="A glimpse of recent builds — designed for clarity, shipped for impact."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              tag: "AI · NLP",
              title: "Multilingual School Chatbot",
              text: "Conversational assistant serving students in multiple languages — automating FAQs and reducing staff load.",
            },
            {
              tag: "Full-Stack · Education",
              title: "PFLC Alumni Tracker",
              text: "Alumni tracking database and admin portal with bulk imports, custom REST API, and multi-role OTP security.",
            },
            {
              tag: "Full-Stack",
              title: "DICT Digital Logbook System",
              text: "Internal logbook + reporting system replacing manual paper logs, with role-based access and exports.",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                to="/projects"
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[16/10] bg-gradient-hero">
                  <div className="absolute left-4 top-4 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  </div>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="glass-dark rounded-xl px-5 py-3 font-display text-lg font-semibold text-primary-foreground">
                      {p.title}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{p.text}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                    View case study{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section id="contact-cta">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-3xl font-semibold text-balance md:text-5xl">
                  Let's build smarter systems together.
                </h2>
                <p className="mt-4 max-w-xl text-primary-foreground/75">
                  Whether you need an extra set of hands, a chatbot, or a full
                  internal tool — let's scope it out.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link to="/contact">Start a project</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link to="/about">About me</Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
