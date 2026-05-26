import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Reveal, Section } from "@/components/site/Section";

const SUCCESS_VISIBLE_MS = 3000;
const RATE_LIMIT_MS = 30000;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Let's Build Smarter Systems Together" },
      {
        name: "description",
        content:
          "Get in touch with Roy Heinrich Delgado for virtual assistance, technical support, web development, or AI & automation engagements.",
      },
      {
        property: "og:title",
        content: "Contact — Let's Build Smarter Systems Together",
      },
      {
        property: "og:description",
        content:
          "Start a project, ask a question, or scope an engagement.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formVersion, setFormVersion] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const successTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    },
    [],
  );

  const handleSuccess = () => {
    setShowSuccess(true);
    setCooldownUntil(Date.now() + RATE_LIMIT_MS);

    if (successTimerRef.current) {
      window.clearTimeout(successTimerRef.current);
    }

    successTimerRef.current = window.setTimeout(() => {
      setShowSuccess(false);
      setFormVersion((current) => current + 1);
    }, SUCCESS_VISIBLE_MS);
  };

  return (
    <Section className="pt-12 md:pt-20">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Contact
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
            Let's build smarter systems together.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
            Tell me what you're working on and what you'd like to offload,
            automate, or build. I usually reply within 24 hours.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href="mailto:hello@royheinrich.com"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </p>
                <p className="text-sm font-medium">streamlinedbyheinz@gmail.com</p>
              </div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Linkedin className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  LinkedIn
                </p>
                <p className="text-sm font-medium">royheinrich-andrade-delgado</p>
              </div>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
                <Github className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  GitHub
                </p>
                <p className="text-sm font-medium">@royheinrich</p>
              </div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {showSuccess ? (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
              <h2 className="font-display text-2xl font-semibold">
                Thanks, your message is in.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                I’ve received your inquiry through Formspree and will get back to you soon.
              </p>
            </div>
          ) : (
            <ContactForm
              key={formVersion}
              onSuccess={handleSuccess}
              cooldownUntil={cooldownUntil}
            />
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function ContactForm({
  onSuccess,
  cooldownUntil,
}: {
  onSuccess: () => void;
  cooldownUntil: number;
}) {
  const [state, handleSubmit] = useForm("xwvzragb");
  const handledSuccess = useRef(false);
  const [now, setNow] = useState(() => Date.now());
  const isRateLimited = now < cooldownUntil;
  const cooldownSeconds = Math.max(
    1,
    Math.ceil((cooldownUntil - now) / 1000),
  );

  useEffect(() => {
    if (!isRateLimited) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [cooldownUntil, isRateLimited]);

  useEffect(() => {
    if (state.succeeded && !handledSuccess.current) {
      handledSuccess.current = true;
      onSuccess();
    }
  }, [onSuccess, state.succeeded]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isRateLimited) {
      event.preventDefault();
      return;
    }

    return handleSubmit(event);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="mt-1.5"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="mt-1.5"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="type">Project type</Label>
        <select
          id="type"
          name="type"
          required
          className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Pick what fits best</option>
          <option value="Virtual Assistance">Virtual Assistance</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Web Development">Web Development</option>
          <option value="AI & Automation">AI & Automation</option>
          <option value="Other">Other</option>
        </select>
        <ValidationError prefix="Project type" field="type" errors={state.errors} />
      </div>

      <div className="mt-4">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="A short description of what you'd like to build or offload…"
          className="mt-1.5"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <ValidationError errors={state.errors} className="mt-4 text-sm text-destructive" />

      <Button
        type="submit"
        disabled={state.submitting || isRateLimited}
        className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
        size="lg"
      >
        {state.submitting
          ? "Sending…"
          : isRateLimited
            ? `Wait ${cooldownSeconds}s`
            : "Send inquiry"}
        <Send className="ml-1.5 h-4 w-4" />
      </Button>
      {isRateLimited ? (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Please wait {cooldownSeconds} seconds before sending another message.
        </p>
      ) : null}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your inquiry.
      </p>
    </form>
  );
}
