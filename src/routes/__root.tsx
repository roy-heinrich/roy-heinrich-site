import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "Roy Heinrich — Virtual Assistant & AI Systems Specialist",
        },
        {
          name: "description",
          content:
            "Roy Heinrich Delgado helps founders, agencies, and SMEs run smarter through premium virtual assistance, technical support, automation, and AI-powered systems.",
        },
        { name: "author", content: "Roy Heinrich Delgado" },
        { property: "og:site_name", content: "Roy Heinrich" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content:
            "Roy Heinrich — Virtual Assistant & AI Systems Specialist",
        },
        {
          property: "og:description",
          content:
            "Premium virtual assistance, automation, and AI systems for teams that want to move faster.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { title: "Lovable App" },
        { property: "og:title", content: "Lovable App" },
        { name: "twitter:title", content: "Lovable App" },
        { name: "description", content: "Roy Systems is a premium personal brand website showcasing expertise in virtual assistance, AI, and systems development." },
        { property: "og:description", content: "Roy Systems is a premium personal brand website showcasing expertise in virtual assistance, AI, and systems development." },
        { name: "twitter:description", content: "Roy Systems is a premium personal brand website showcasing expertise in virtual assistance, AI, and systems development." },
        { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8cc18f7-ffb5-4ef0-9369-bfd7be3a7505/id-preview-aca8df37--cccfb902-714d-492c-82c6-061a75b2d166.lovable.app-1779759112470.png" },
        { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a8cc18f7-ffb5-4ef0-9369-bfd7be3a7505/id-preview-aca8df37--cccfb902-714d-492c-82c6-061a75b2d166.lovable.app-1779759112470.png" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
        },
      ],
      scripts: [
        {
          children:
            "(() => { try { const saved = localStorage.getItem('theme'); if (saved === 'dark') { document.documentElement.classList.add('dark'); } else { document.documentElement.classList.remove('dark'); } } catch {} })();",
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Roy Heinrich Delgado",
            jobTitle: "Virtual Assistant & AI Systems Specialist",
            description:
              "IT professional specializing in virtual assistance, technical support, automation, AI chatbots, and modern web systems.",
            url: "/",
            sameAs: ["https://linkedin.com", "https://github.com"],
          }),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
