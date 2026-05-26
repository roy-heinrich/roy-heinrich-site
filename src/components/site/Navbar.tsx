import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const setSiteTheme = (nextTheme: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: observe page sections and highlight corresponding nav item
  const [activePath, setActivePath] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const sectionToPath: Record<string, string | undefined> = {
      hero: "/",
      services: "/services",
      highlights: undefined,
      projects: "/projects",
      "contact-cta": "/contact",
    };

    const ids = Object.keys(sectionToPath);

    let attempts = 0;
    const maxAttempts = 8;
    let observer: IntersectionObserver | undefined;

    const tryInit = () => {
      attempts += 1;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (sections.length === 0) {
        if (attempts < maxAttempts) {
          // try again after a short delay (sections may render after mount)
          setTimeout(tryInit, 200);
        }
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          if (visible?.target?.id) {
            const mapped = sectionToPath[visible.target.id];
            if (mapped) setActivePath(mapped);
            else if (visible.target.id === "hero") setActivePath("/");
          }
        },
        { root: null, rootMargin: "-24% 0px -45% 0px", threshold: [0.2, 0.4, 0.6, 0.8] },
      );

      sections.forEach((s) => observer!.observe(s));
    };

    tryInit();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Listen for client-side navigation (pushState/replaceState/popstate)
  useEffect(() => {
    const handleLocationChange = () => setActivePath(window.location.pathname);

    const origPush = history.pushState;
    const origReplace = history.replaceState;

    // wrap pushState/replaceState to emit a custom event we can listen to
    history.pushState = function (...args: any[]) {
      const ret = origPush.apply(this, args as any);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    history.replaceState = function (...args: any[]) {
      const ret = origReplace.apply(this, args as any);
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("locationchange", handleLocationChange as EventListener);

    return () => {
      history.pushState = origPush;
      history.replaceState = origReplace;
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("locationchange", handleLocationChange as EventListener);
    };
  }, []);

  const isHome = typeof window !== "undefined" && window.location.pathname === "/";
  const pathToHash: Record<string, string | undefined> = {
    "/": "#hero",
    "/services": "#services",
    "/projects": "#projects",
    "/contact": "#contact-cta",
  };

  useEffect(() => {
    const initialTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(initialTheme);
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground"
          >
            RH
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-base font-semibold tracking-tight"
          >
            Roy Heinrich
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {!mounted ? (
            // Server-safe fallback: render simple Links (no motion highlight)
            links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))
          ) : (
            <LayoutGroup>
              {links.map((l) => {
                const isActive = activePath === l.to;
                const hash = pathToHash[l.to as string];

                if (isHome && hash) {
                  return (
                    <a
                      key={l.to}
                      href={hash}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.querySelector(hash);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={cn(
                        "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-nav"
                          className={cn(
                            "absolute inset-0 rounded-full",
                            theme === "dark" ? "bg-white/6" : "bg-sky-900/10",
                          )}
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative z-10">{l.label}</span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    activeProps={{ className: "text-foreground" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav"
                        className={cn(
                          "absolute inset-0 rounded-full",
                          theme === "dark" ? "bg-white/6" : "bg-sky-900/10",
                        )}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </Link>
                );
              })}
            </LayoutGroup>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
            <Button
              type="button"
              size="sm"
              variant={theme === "light" ? "default" : "ghost"}
              className="h-8 rounded-full px-3"
              onClick={() => setSiteTheme("light")}
              aria-pressed={theme === "light"}
            >
              <Sun className="mr-1 h-3.5 w-3.5" /> Light
            </Button>
            <Button
              type="button"
              size="sm"
              variant={theme === "dark" ? "default" : "ghost"}
              className="h-8 rounded-full px-3"
              onClick={() => setSiteTheme("dark")}
              aria-pressed={theme === "dark"}
            >
              <Moon className="mr-1 h-3.5 w-3.5" /> Dark
            </Button>
          </div>

          <Button
            asChild
            size="sm"
            className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex"
          >
            <Link to="/contact">Hire Me</Link>
          </Button>
          <button
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            <div className="mb-2 flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <Button
                type="button"
                size="sm"
                variant={theme === "light" ? "default" : "ghost"}
                className="flex-1 rounded-full"
                onClick={() => setSiteTheme("light")}
                aria-pressed={theme === "light"}
              >
                <Sun className="mr-1 h-3.5 w-3.5" /> Light
              </Button>
              <Button
                type="button"
                size="sm"
                variant={theme === "dark" ? "default" : "ghost"}
                className="flex-1 rounded-full"
                onClick={() => setSiteTheme("dark")}
                aria-pressed={theme === "dark"}
              >
                <Moon className="mr-1 h-3.5 w-3.5" /> Dark
              </Button>
            </div>

            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setOpen(false)}
            >
              <Link to="/contact">Hire Me</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
