import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, GraduationCap } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Reveal, Section, SectionHeading } from "@/components/site/Section";
import renderRaw from "simple-icons/icons/render.svg?raw";
import googlegeminiRaw from "simple-icons/icons/googlegemini.svg?raw";
import ollamaRaw from "simple-icons/icons/ollama.svg?raw";
import asanaRaw from "simple-icons/icons/asana.svg?raw";
import calendlyRaw from "simple-icons/icons/calendly.svg?raw";
import claudeImg from "../../icons/icons8-claude-48.png";
import lovableImg from "../../icons/icons8-lovable-48.png";
import googleImg from "../../icons/icons8-google-48.png";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Certifications — Roy Heinrich Delgado" },
      {
        name: "description",
        content:
          "Technical skills across IT Application Support, Full-Stack Web Development, Databases, Networking, OS Support, and Applied AI, along with certifications.",
      },
      {
        property: "og:title",
        content: "Skills & Certifications — Roy Heinrich Delgado",
      },
      {
        property: "og:description",
        content:
          "A categorized view of technical skills, tools, and eligibility credentials.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

const categories = [
  {
    name: "IT Application Support",
    skills: [
      { label: "Helpdesk & End-User Support", level: 5 },
      { label: "Systems & UAT Testing", level: 5 },
      { label: "Incident Documentation & SLA", level: 5 },
      { label: "Application Rollout Support", level: 4 },
    ],
  },
  {
    name: "Frameworks & Languages",
    skills: [
      { label: "React 19 & TypeScript", level: 5 },
      { label: "TanStack Start / Router / Query", level: 5 },
      { label: "PHP & Laravel / Python", level: 4 },
      { label: "REST APIs & Tailwind CSS", level: 5 },
    ],
  },
  {
    name: "Databases & Cloud APIs",
    skills: [
      { label: "MySQL & PostgreSQL (Neon)", level: 4 },
      { label: "Supabase & Redis Caching", level: 4 },
      { label: "Query Optimization", level: 4 },
      { label: "Git / GitHub / Hostinger", level: 5 },
    ],
  },
  {
    name: "Networking & OS Admin",
    skills: [
      { label: "Windows & Linux Support", level: 5 },
      { label: "TCP/IP & DNS Diagnostics", level: 4 },
      { label: "Command-Line (Bash/CLI)", level: 4 },
      { label: "Network Troubleshooting", level: 4 },
    ],
  },
  {
    name: "Applied AI & NLP",
    skills: [
      { label: "NLP Chatbots (NLTK/TextBlob)", level: 5 },
      { label: "FastAPI REST Integration", level: 4 },
      { label: "OTP & SMTP Authentication", level: 4 },
      { label: "Session & Rate-Limiting", level: 4 },
    ],
  },
  {
    name: "Data & Operations",
    skills: [
      { label: "Excel Data Validation", level: 5 },
      { label: "SheetJS (xlsx) & CSV Parsing", level: 5 },
      { label: "Technical Document Writing", level: 5 },
      { label: "Microsoft Office Suite", level: 5 },
    ],
  },
];

const certs = [
  {
    icon: ShieldCheck,
    title: "CSC Professional Eligibility",
    issuer: "Civil Service Commission (March 2025)",
  },
  {
    icon: Award,
    title: "Director's Honor List & Academic Excellence",
    issuer: "Aklan State University (2023-2026)",
  },
  {
    icon: GraduationCap,
    title: "Technical Support Fundamentals",
    issuer: "Google Career Certificates (June 2026)",
  },
  {
    icon: ShieldCheck,
    title: "IT Security: Defense Against the Digital Dark Arts",
    issuer: "Coursera (July 2026)",
  },
  {
    icon: GraduationCap,
    title: "Computer Networking & OS Support",
    issuer: "Coursera (July 2026)",
  },
  {
    icon: Award,
    title: "DICT VA Training Medalist",
    issuer: "Department of Information and Communications Technology (June 2026)",
  },
];

// External hosting removed: prefer only local `/certs/...` images.

function getLocalCertUrl(item: any): string {
  const fileName = item?.name ?? item?.title ?? "";
  if (!fileName) return "";
  return `/certs/${encodeURIComponent(fileName)}`;
}

function getImageUrl(item: any): string {
  // Prefer local certs in `public/certs` only. External Drive/Dropbox links are ignored.
  return getLocalCertUrl(item);
}

// PDFs removed: always use image previews from the `public/certs` folder or previewUrl/directUrl
// The app no longer hosts or renders PDFs via a separate viewer.

// (Removed PDF SVG placeholder — using direct previews instead)

function SkillsPage() {
  const [certFiles, setCertFiles] = useState<Array<any>>([]);
  const [modalItem, setModalItem] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCerts() {
      try {
        const [localResponse] = await Promise.allSettled([fetch('/certs/index.json')]);

        const localData =
          localResponse.status === 'fulfilled' && localResponse.value.ok
            ? await localResponse.value.json()
            : [];

        if (!mounted) return;

        const localList = Array.isArray(localData) ? localData : [];

        if (localList.length === 0) {
          setCertFiles([]);
          return;
        }

        setCertFiles(
          localList.map((item) => ({
            ...item,
            // Ensure all references point to the local `/certs/...` path.
            url: getLocalCertUrl(item) || (item.url ?? ""),
            previewUrl: getLocalCertUrl(item) || (item.previewUrl ?? item.url ?? ""),
            directUrl: getLocalCertUrl(item) || (item.directUrl ?? item.url ?? ""),
          }))
        );
      } catch (err) {
        if (mounted) {
          setCertFiles([]);
        }
      }
    }

    loadCerts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Section className="pt-12 md:pt-20">
        <SectionHeading
          eyebrow="Skills"
          title="A categorized, honest view of what I do well."
          subtitle="Levels reflect day-to-day fluency, not slideware. If something isn't here, I'll tell you up front."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                <ul className="mt-5 space-y-3">
                  {c.skills.map((s) => (
                    <li key={s.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{s.label}</span>
                        <span
                          className="flex items-center gap-1"
                          aria-label={`Proficiency ${s.level} of 5`}
                        >
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1.5 w-4 rounded-full ${
                                idx < s.level ? "bg-accent" : "bg-muted"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-8">
        <SectionHeading
          eyebrow="Certificates"
          title="My Certificates"
          subtitle="Click to open the full certificate image."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr items-stretch">
          {certFiles.length === 0 ? (
            <div className="text-sm text-muted-foreground">No certificates found. Add image files to <strong>public/certs</strong> and create <strong>public/certs/index.json</strong>.</div>
          ) : (
            certFiles.map((f, i) => (
              <Reveal key={f.id ?? f.name ?? i} delay={i * 0.03}>
                <div className="h-full">
                  <button
                    type="button"
                    onClick={() => setModalItem(f)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
                  >
                  <div className="relative w-full h-36 sm:h-44 border-b border-border/60 bg-muted/20 p-0">
                    <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl bg-background/70">
                      <CertificatePreview item={f} cover />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <p
                      className="text-base font-semibold leading-snug"
                      style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {f.name ?? f.title ?? (f.id ?? `Certificate ${i + 1}`)}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-border bg-background px-2.5 py-1 font-medium text-foreground">
                        {f.certificateType ?? 'Certificate'}
                      </span>
                      <span className="rounded-full border border-border bg-background px-2.5 py-1 text-muted-foreground">
                        {f.date ?? 'Date unavailable'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 break-all">
                      {f.name ?? f.previewUrl ?? f.url}
                    </p>
                  </div>
                </button>
              </div>
            </Reveal>
            ))
          )}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          eyebrow="Trust & Credentials"
          title="Receipts, not just claims."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {certs.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-10">
        <SectionHeading eyebrow="Tools" title="Online Tools I Use" />

        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {[
            { name: "Meta", icons8: "meta", href: "https://about.facebook.com/meta" },
            { name: "Grammarly", icons8: "grammarly", href: "https://grammarly.com" },
            { name: "OpenAI", icons8: "chatgpt", href: "https://openai.com" },
            { name: "Gemini", iconRaw: googlegeminiRaw, iconColor: "text-sky-600", href: "https://ai.google/" },
            { name: "Render", iconRaw: renderRaw, iconColor: "text-sky-600", href: "https://render.com" },
            { name: "Asana", iconRaw: asanaRaw, iconColor: "text-rose-500", href: "https://asana.com" },
            { name: "Microsoft Office", iconUrl: "https://img.icons8.com/color/48/microsoft-office-2019.png", href: "https://www.microsoft.com/microsoft-365" },
            { name: "Supabase", icons8: "supabase", href: "https://supabase.com" },
            { name: "Canva", icons8: "canva", href: "https://canva.com" },
            { name: "Calendly", iconRaw: calendlyRaw, iconColor: "text-sky-600", href: "https://calendly.com" },
            { name: "LinkedIn", icons8: "linkedin", href: "https://linkedin.com" },
            { name: "Google Workspace", iconUrl: googleImg, href: "https://workspace.google.com/" },
            { name: "Ollama", iconRaw: ollamaRaw, iconColor: "text-sky-600", href: "https://ollama.ai" },
            { name: "Lovable", iconUrl: lovableImg, href: "https://lovable.app" },
            { name: "Trello", icons8: "trello", href: "https://trello.com" },
            { name: "Claude", iconUrl: claudeImg, href: "https://www.anthropic.com/" },
          ].map((t) => (
            <ToolTile
              key={t.name}
              href={t.href}
              name={t.name}
              icon={t.icons8}
              iconUrl={(t as any).iconUrl}
              iconRaw={(t as any).iconRaw}
              iconColor={(t as any).iconColor}
            />
          ))}
        </div>
      </Section>
      {modalItem ? <CertModal item={modalItem} onClose={() => setModalItem(null)} /> : null}
    </>
  );
}

function OllamaIcon({ svg, colorClass }: { svg: string; colorClass?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [colorValue, setColorValue] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const dark = document.documentElement.classList.contains("dark") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDark(Boolean(dark));
    };

    update();

    // watch for class changes on <html> (theme toggles)
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // listen to prefers-color-scheme changes
    let mql: MediaQueryList | null = null;
    if (window.matchMedia) {
      mql = window.matchMedia("(prefers-color-scheme: dark)");
      if (mql.addEventListener) mql.addEventListener("change", update);
      else if ((mql as any).addListener) (mql as any).addListener(update);
    }

    // compute explicit color value from provided colorClass (if any)
    if (colorClass) {
      const el = document.createElement('span');
      el.className = colorClass;
      el.style.display = 'none';
      document.body.appendChild(el);
      const val = getComputedStyle(el).color;
      document.body.removeChild(el);
      setColorValue(val);
    }

    return () => {
      mo.disconnect();
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener("change", update);
        else if ((mql as any).removeListener) (mql as any).removeListener(update);
      }
    };
  }, []);

  if (!mounted) return <span className="h-6 w-6" />;

  let modified = svg.replace('<svg', '<svg class="h-6 w-6"');
  // remove any hardcoded fills or strokes on elements
  modified = modified.replace(/fill=".*?"/g, '');
  modified = modified.replace(/stroke=".*?"/g, '');
  // ensure the svg itself uses currentColor for both fill and stroke
  modified = modified.replace(
    '<svg class="h-6 w-6"',
    '<svg class="h-6 w-6" fill="currentColor" stroke="currentColor"'
  );

  const cls = colorClass ?? (isDark ? "text-white" : "text-sky-900");

  return (
    <span
      className={colorValue ? undefined : cls}
      style={colorValue ? { color: colorValue } : undefined}
      dangerouslySetInnerHTML={{ __html: modified }}
    />
  );
}

function isImageCertificate(item: any): boolean {
  return /\.(png|jpe?g|webp|gif|bmp|svg)$/i.test(
    item?.name ?? item?.title ?? item?.previewUrl ?? item?.directUrl ?? item?.url ?? ''
  );
}

function normalizeDropboxUrl(url: string | undefined) {
  if (!url) return "";
  try {
    const parsed = new URL(url, "https://example.com");
    const host = parsed.hostname.toLowerCase();
    if (host.endsWith("dropbox.com") || host.endsWith("dropboxusercontent.com")) {
      if (host === "www.dropbox.com" || host === "dropbox.com") {
        parsed.hostname = "dl.dropboxusercontent.com";
      }
      parsed.searchParams.delete("dl");
      parsed.searchParams.delete("raw");
      parsed.searchParams.set("raw", "1");
      return parsed.toString();
    }
    return url;
  } catch {
    if (url.includes("dropbox.com") && !url.includes("raw=1")) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}raw=1`;
    }
    return url;
  }
}

function normalizeAssetUrl(url: string | undefined) {
  return normalizeDropboxUrl(url);
}

function getImageSrc(item: any): string {
  if (item?.directUrl) return normalizeAssetUrl(item.directUrl);
  if (item?.previewUrl) return normalizeAssetUrl(item.previewUrl);
  if (item?.url) return normalizeAssetUrl(item.url);
  return '';
}

function ToolTile({ href, name, icon, iconUrl, iconRaw, iconColor }: { href: string; name: string; icon?: string; iconUrl?: string; iconRaw?: string; iconColor?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-soft"
      title={name}
    >
      {iconRaw ? (
        <OllamaIcon svg={iconRaw ?? ""} colorClass={iconColor} />
      ) : iconUrl ? (
        <img src={iconUrl} alt={name} className="h-6 w-6 object-contain" />
      ) : (
        <img
          src={`https://img.icons8.com/color/48/${icon}.png`}
          alt={name}
          className="h-6 w-6 object-contain"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.style.display = "none";
          }}
        />
      )}
      <span className="mt-2 text-xs text-muted-foreground">{name}</span>
    </a>
  );
}

function buildCandidatesFromName(name: string) {
  if (!name) return [];
  const candidates = new Set<string>();

  const raw = `/certs/${name}`;
  candidates.add(raw);

  try {
    candidates.add(`/certs/${encodeURI(name)}`);
    candidates.add(`/certs/${encodeURIComponent(name)}`);
  } catch {
    // ignore
  }

  // common quote variants
  const variants = ["'", "’", "\u2019"]; // ASCII and curly
  for (const v of variants) {
    if (name.includes(v)) {
      const replaceWith = ["'", "’", ""].map((r) => name.split(v).join(r));
      for (const s of replaceWith) {
        candidates.add(`/certs/${s}`);
        try {
          candidates.add(`/certs/${encodeURIComponent(s)}`);
        } catch {}
      }
    }
  }

  // try removing common suffixes like " 1 of 1"
  const suffixRegex = /\s1 of 1/i;
  if (suffixRegex.test(name)) {
    const stripped = name.replace(suffixRegex, "");
    candidates.add(`/certs/${stripped}`);
    try {
      candidates.add(`/certs/${encodeURIComponent(stripped)}`);
    } catch {}
  }

  return Array.from(candidates);
}

// Simple global resolver queue to limit concurrent image loads and avoid network bursts
let __activeResolvers = 0;
const __resolverQueue: Array<() => void> = [];
const __MAX_ACTIVE = 6;
function __enqueueResolver(fn: () => void) {
  if (__activeResolvers < __MAX_ACTIVE) {
    __activeResolvers++;
    fn();
  } else {
    __resolverQueue.push(fn);
  }
}
function __resolverDone() {
  __activeResolvers = Math.max(0, __activeResolvers - 1);
  const next = __resolverQueue.shift();
  if (next) {
    __activeResolvers++;
    next();
  }
}

function useResolvableImage(item: any) {
  const [src, setSrc] = useState<string | null>(null);
  return src;
}

function useResolvableImageLazy(item: any, enabled: boolean) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let mounted = true;
    const name = item?.name ?? item?.title ?? item?.id ?? "";
    const candidates = buildCandidatesFromName(name);

    // run the whole resolution process inside the global queue to limit concurrency
    __enqueueResolver(() => {
      let idx = 0;
      function tryNext() {
        if (!mounted) return finish();
        if (idx >= candidates.length) return finish();

        const url = candidates[idx++];
        const img = new Image();
        let started = false;
        img.onload = () => {
          if (!mounted) return finish();
          setSrc(url);
          finish();
        };
        img.onerror = () => {
          // small backoff to avoid many simultaneous retries
          setTimeout(tryNext, 30);
        };
        try {
          started = true;
          img.src = url;
        } catch {
          setTimeout(tryNext, 30);
        }
      }

      function finish() {
        // finish this resolver and allow next queued resolver to run
        __resolverDone();
      }

      tryNext();
    });

    return () => {
      mounted = false;
    };
  }, [item, enabled]);

  return src;
}

function useInView<T extends Element>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
        }
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref.current]);

  return { ref, inView };
}

function CertificatePreview({ item, className, cover }: { item: any; className?: string; cover?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '300px' });
  const src = useResolvableImageLazy(item, inView);
  const alt = item?.title ?? item?.name ?? "Certificate";
  const emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const placeholder = item?.placeholder ?? null;
  const [loaded, setLoaded] = useState(false);
  const previewSrc = item?.thumbnail ?? src ?? emptyGif;

  return (
    <div ref={ref} className={`relative overflow-hidden h-full w-full ${className ?? ''}`}>
      <div
        aria-hidden
        className={`absolute inset-0 rounded-2xl bg-center bg-cover transition-opacity duration-300 pointer-events-none ${loaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: placeholder ? `url(${placeholder})` : undefined, filter: 'blur(6px) brightness(0.9)'}}
      />
      <img
        src={previewSrc}
        alt={alt}
        title={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative z-10 h-full w-full rounded-2xl transition-opacity duration-300 ${cover ? 'object-cover' : 'object-contain'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

// Modal viewer (image or embedded Drive preview)
function CertModal({ item, onClose }: { item: any; onClose: () => void }) {
  if (!item) return null;

  const isImage = isImageCertificate(item);
  const fullSrc = useResolvableImageLazy(item, true);
  const emptyGif = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const [zoom, setZoom] = useState(1);

  const increaseZoom = () => setZoom((z) => Math.min(3, Math.round((z + 0.25) * 100) / 100));
  const decreaseZoom = () => setZoom((z) => Math.max(0.25, Math.round((z - 0.25) * 100) / 100));
  const resetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-6xl overflow-auto rounded-3xl border border-border bg-card shadow-elegant">
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">{item.title ?? item.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.certificateType ?? 'Certificate'} · {item.date ?? 'Date unavailable'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1">
              <button onClick={decreaseZoom} className="text-sm px-2 py-1 hover:bg-muted rounded">−</button>
              <button onClick={resetZoom} className="text-sm px-2 py-1 hover:bg-muted rounded">100%</button>
              <button onClick={increaseZoom} className="text-sm px-2 py-1 hover:bg-muted rounded">+</button>
            </div>
            <button onClick={onClose} className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted">
              Close
            </button>
          </div>
        </div>
        <div className="bg-muted/20 p-4 sm:p-6 overflow-auto">
          <div className="mx-auto max-h-[78vh]">
            <img
              src={fullSrc ?? item?.thumbnail ?? emptyGif}
              alt={item.title ?? item.name}
              title={item.title ?? item.name}
              className={`mx-auto object-contain`}
              style={{ transform: `scale(${zoom})`, transformOrigin: 'center top', transition: 'transform .12s' }}
            />
          </div>
        </div>
        <div className="border-t border-border px-4 py-4 text-sm text-muted-foreground sm:px-6">
          {item.name}
        </div>
      </div>
    </div>
  );
}
