import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-primary text-primary-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-display text-sm font-bold text-accent-foreground">
              RH
            </span>
            <span className="font-display text-lg font-semibold">
              Roy Heinrich
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Premium virtual assistance and AI-powered systems for founders,
            teams, and operators who want to move faster — without the chaos.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/about", "About"],
              ["/services", "Services"],
              ["/experience", "Experience"],
              ["/projects", "Projects"],
              ["/skills", "Skills"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-primary-foreground/80 transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Connect
          </h4>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="mailto:hello@royheinrich.com"
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/70">
            Available for select freelance &amp; consulting engagements.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} Roy Heinrich Delgado. All rights
            reserved.
          </p>
          <p>Built with care · Systems &amp; intent, end-to-end.</p>
        </div>
      </div>
    </footer>
  );
}
