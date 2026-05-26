
# Roy Heinrich — Personal Brand Website

A premium, multi-route personal brand site positioning Roy Heinrich Delgado as a Virtual Assistant & AI Systems Specialist. Apple-minimal aesthetic with Framer-style smoothness, navy/yellow/blue palette on warm off-white.

Note on stack: the project runs on **TanStack Start + Tailwind v4** (not Next.js). All requested capabilities — SSR, file-routing, SEO meta, responsiveness, Framer Motion — work identically. I'll flag this so there are no surprises.

## Brand & Design System

Tokens added to `src/styles.css` (oklch conversions of your hexes):
- `--primary` Navy `#060b37` — structure, headings, footer
- `--accent` Yellow `#ffd230` — CTAs, highlights, underline accents
- `--secondary` Blue `#2c3586` — cards, secondary surfaces
- `--background` Off-white `#f7f8f1` — page background
- Plus foreground, muted, border, ring, gradients (`--gradient-hero`, `--gradient-card`), shadows (`--shadow-elegant`, `--shadow-glow`)

Typography: Inter (body) + a display serif/grotesk pair for large hero type (e.g. Space Grotesk or Sora). Large tracking-tight headings, generous line-height for body.

Motion: Framer Motion with restrained presets — fade-up on scroll (IntersectionObserver via `whileInView`), 200–400ms eases, subtle hover lifts, no parallax-heavy or cursor effects.

Glassmorphism: `backdrop-blur` cards over soft navy→blue gradient blobs.

## Route Architecture

Each major section is its own route for SEO (per project conventions), plus an index that stitches the hero + condensed previews together with anchor links for one-page feel.

```
src/routes/
  __root.tsx          sitewide shell, sticky navbar, footer, Org JSON-LD
  index.tsx           hero + condensed previews of every section
  about.tsx           full About
  services.tsx        4 service cards in detail
  experience.tsx      animated timeline
  projects.tsx        featured project showcases
  skills.tsx          categorized skill grid
  contact.tsx         form + channels
```

Each route gets unique `head()` meta (title, description, og:title, og:description, og:url) + canonical on leaves.

## Section Breakdown

**1. Hero (index)**
- Headline: "Helping Businesses Run Smarter Through Virtual Assistance & AI-Powered Systems"
- Sub: 2-line value prop covering VA, tech support, automation, AI, web
- Buttons: `Hire Me` (yellow primary), `View Projects` (ghost), `Download CV` (outline)
- Availability pill: green dot + "Available for new projects"
- Floating skill badges (Chatbots, Automation, Full-Stack, Tech Support) with subtle y-axis float loop
- Background: soft navy→blue radial gradient + faint grid

**2. About** — Story-driven: IT background → DICT internship → chatbot work → systems thinking. Two-column: portrait/initials block + prose with pull-quotes.

**3. Services** — 4 premium cards (Virtual Assistance, Technical Support, Web Development, AI & Automation). Each: Lucide icon in yellow circle, title, 4-bullet deliverables list, hover lift + border-glow, "Learn more" CTA.

**4. Experience** — Vertical timeline, alternating sides on desktop, stacked on mobile. Each node: role, org, dates, 2–3 achievements with metrics, tech chips.

**5. Featured Projects**
- Multilingual School Chatbot — problem, stack (Python/NLP/React), outcome metric, GitHub/demo
- DICT Digital Logbook System — problem, stack, outcome metric, GitHub/demo
- Mockup-style card with browser chrome frame

**6. Skills** — 5 category cards (Virtual Assistance, Tech Support, Development, AI & Automation, Deployment & Tools); each lists tools as animated chips with subtle staggered entrance. Progress dots (●●●●○) for proficiency.

**7. Trust & Certifications** — Badge row: CSC Professional Eligibility, Director's Honor List, Cisco. Glass cards with credential icon + issuer + year.

**8. Contact**
- Headline: "Let's Build Smarter Systems Together."
- Form: name, email, project type select, message (Zod validated, react-hook-form)
- Channels: email, LinkedIn, GitHub with icons
- Form submission stubbed (mailto fallback) unless backend requested later

**9. Footer** — 3 columns: brand + tagline, nav links, social icons. Yellow underline accent on hover. Copyright + "Built with care."

## Navbar
Sticky, blurred on scroll, navy logo wordmark left, route links center, yellow "Hire Me" CTA right. Mobile: sheet drawer.

## Responsive
Mobile-first. Hero stacks, services 1→2→4 cols, timeline single rail on mobile, footer stacks.

## SEO
Per-route `head()` with VA/AI-Specialist keywords. Org JSON-LD in `__root.tsx`. Person JSON-LD on About. Semantic HTML, single H1 per route, alt text everywhere.

## Animation Inventory
- Hero text: fade-up stagger on mount
- Sections: `whileInView` fade-up with 60px offset, once: true
- Cards: hover `y: -4` + shadow grow
- Badges: infinite gentle `y: [0, -6, 0]` loop
- Page transitions: 200ms fade between routes

## Technical Details
- **Stack**: TanStack Start (Vite) + Tailwind v4 + Framer Motion + shadcn/ui (Button, Card, Input, Textarea, Badge, Sheet, Sonner for toasts) + Lucide icons + react-hook-form + Zod
- New deps to install: `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod` (most already present)
- All colors via semantic tokens in `src/styles.css` — zero hard-coded hexes in components
- CV download: placeholder `/cv.pdf` in `public/` (user can replace)
- Image strategy: no AI-generated portraits; use a tasteful initials monogram block + abstract gradient blobs. If you want a real photo, drop it into `src/assets/` later.

## Out of Scope (ask before adding)
- Backend for contact form submissions (currently mailto / toast confirmation)
- CMS for projects
- Blog
- Analytics integration

Ready to build on approval.
