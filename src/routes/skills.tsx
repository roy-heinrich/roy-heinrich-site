import { createFileRoute } from "@tanstack/react-router";
import { Award, ShieldCheck, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
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
      { title: "Skills & Certifications — Roy Heinrich" },
      {
        name: "description",
        content:
          "Skills across virtual assistance, technical support, development, AI & automation, and deployment — plus CSC, Director's Honor List, and Cisco credentials.",
      },
      {
        property: "og:title",
        content: "Skills & Certifications — Roy Heinrich",
      },
      {
        property: "og:description",
        content:
          "A categorized view of skills, tools, and credentials.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

const categories = [
  {
    name: "Virtual Assistance",
    skills: [
      { label: "Inbox & Calendar", level: 5 },
      { label: "Client Communication", level: 5 },
      { label: "Research & Reporting", level: 4 },
      { label: "Notion / Docs / Sheets", level: 5 },
    ],
  },
  {
    name: "Technical Support",
    skills: [
      { label: "Helpdesk / Troubleshooting", level: 5 },
      { label: "System Maintenance", level: 4 },
      { label: "Documentation / SOPs", level: 5 },
      { label: "User Training", level: 4 },
    ],
  },
  {
    name: "Development",
    skills: [
      { label: "React / TypeScript", level: 5 },
      { label: "Node / APIs", level: 4 },
      { label: "Tailwind / UI", level: 5 },
      { label: "Postgres / Supabase", level: 4 },
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      { label: "Chatbots / LLM Prompts", level: 5 },
      { label: "Workflow Automation", level: 4 },
      { label: "AI Integrations", level: 4 },
      { label: "Evaluation & Guardrails", level: 3 },
    ],
  },
  {
    name: "Deployment & Tools",
    skills: [
      { label: "Git / GitHub", level: 5 },
      { label: "Vercel / Cloudflare", level: 4 },
      { label: "Docker (basics)", level: 3 },
      { label: "n8n / Zapier / Make", level: 4 },
    ],
  },
];

const certs = [
  {
    icon: ShieldCheck,
    title: "CSC Professional Eligibility",
    issuer: "Civil Service Commission",
  },
  {
    icon: Award,
    title: "Director's Honor List",
    issuer: "Academic Recognition",
  },
  {
    icon: GraduationCap,
    title: "Cisco Certifications",
    issuer: "Networking Academy",
  },
];

function normalizeDropboxUrl(url: string): string {
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

function normalizeAssetUrl(url: string): string {
  return normalizeDropboxUrl(url);
}

function toDropboxDirect(shareUrl: string): string {
  return normalizeAssetUrl(shareUrl)
    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
    .replace("?dl=0", "")
    .replace("?raw=1", "")
    .replace("&dl=0", "")
    .replace("&raw=1", "");
}

function getPreviewUrl(item: any): string {
  return item?.previewUrl ?? item?.url ?? item?.directUrl ?? "";
}

function getLocalCertUrl(item: any): string {
  const fileName = item?.name ?? item?.title ?? "";
  if (!fileName) return "";
  return `/certs/${encodeURIComponent(fileName)}`;
}

function getImageUrl(item: any): string {
  return getLocalCertUrl(item) || toDropboxDirect(item?.directUrl ?? item?.url ?? item?.previewUrl ?? "");
}

function getPdfViewerUrl(item: any): string {
  const rawUrl = getLocalCertUrl(item) || toDropboxDirect(getPreviewUrl(item));
  return `/pdf-viewer.html?url=${encodeURIComponent(rawUrl)}`;
}

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
            url: normalizeAssetUrl(item.url),
            previewUrl: normalizeAssetUrl(item.previewUrl ?? item.url),
            directUrl: normalizeAssetUrl(item.directUrl ?? item.url),
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
          subtitle="Click to open the full certificate (PDF or image)."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certFiles.length === 0 ? (
            <div className="text-sm text-muted-foreground">No certificates found. Add files to your Dropbox certs folder, then run <strong>npm run sync:certs</strong> to rebuild <strong>public/certs/index.json</strong>.</div>
          ) : (
            certFiles.map((f, i) => (
              <Reveal key={f.id ?? f.name ?? i} delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() => setModalItem(f)}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-video w-full border-b border-border/60 bg-muted/20 p-4">
                    <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl bg-background/70">
                      <CertificatePreview item={f} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
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

function CertificatePreview({ item }: { item: any }) {
  const isImage = isImageCertificate(item);
  if (!isImage) {
    return (
      <iframe
        src={getPdfViewerUrl(item)}
        title={item.name}
        className="h-full w-full rounded-2xl border-0 bg-white pointer-events-none"
      />
    );
  }

  return <img src={getImageUrl(item)} alt={item.name} className="h-full w-full rounded-2xl object-contain" />;
}

// Modal viewer (image or embedded Drive preview)
function CertModal({ item, onClose }: { item: any; onClose: () => void }) {
  if (!item) return null;

  const isImage = isImageCertificate(item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
        <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">{item.title ?? item.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {item.certificateType ?? 'Certificate'} · {item.date ?? 'Date unavailable'}
            </p>
          </div>
          <button onClick={onClose} className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted">
            Close
          </button>
        </div>
        <div className="bg-muted/20 p-4 sm:p-6">
          {isImage ? (
            <img src={getImageUrl(item)} alt={item.name} className="mx-auto max-h-[78vh] w-full max-w-5xl object-contain" />
          ) : (
            <iframe
              src={getPdfViewerUrl(item)}
              title={item.name}
              className="h-[78vh] w-full rounded-2xl border border-border bg-white"
            />
          )}
        </div>
        <div className="border-t border-border px-4 py-4 text-sm text-muted-foreground sm:px-6">
          {item.name}
        </div>
      </div>
    </div>
  );
}
