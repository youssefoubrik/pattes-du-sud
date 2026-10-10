<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project

Pattes du Sud is a nonprofit animal-protection association based in Mirleft, Morocco.

The website exists primarily to:

1. Establish trust immediately.
2. Explain clearly what the association does.
3. Encourage donations.
4. Make contacting the association extremely easy.
5. Work excellently for international visitors, especially on mobile.

This is a real public-facing nonprofit website.

Do not treat it like a SaaS dashboard, developer portfolio, or experimental UI.

---

## Brand

Brand assets:

- `/public/brand/*`

Use semantic color tokens rather than generic/raw colors in components.

Example: `bg-primary text-primary-foreground` not: `bg-orange-500 text-white`

Define colors once in global CSS/Tailwind tokens.

## Color system

Use the website color palette consistently. Do not introduce new colors unless there is a clear UX reason.

### Palette

- Primary orange: `#E75015`
- Dark brown: `#5A1F08`
- Background ivory: `#FFF9F3`
- Soft sand section background: `#F6E5D2`
- Main text: `#2C1810`
- Muted text: `#76645B`
- Mediterranean blue accent: `#168EB5`
- Soft peach accent: `#F5A25D`
- Borders: `#E9D7C7`
- White: `#FFFFFF`

### Usage rules

- Use `#FFF9F3` as the default page background.
- Use `#F6E5D2` for occasional alternate sections to create separation.
- Use `#2C1810` for normal body text.
- Use `#5A1F08` for headings, strong labels, and important dark UI elements.
- Use `#E75015` for the main CTA, especially **Donate**.
- Main CTA text should normally be white.
- Use a darker orange such as `#C9400E` for primary-button hover states.
- Use `#168EB5` sparingly for links, small highlights, informational elements, or secondary accents.
- Use `#F5A25D` only as a subtle decorative accent.
- Use `#E9D7C7` for borders, dividers, and subtle card outlines.
- Avoid large areas of saturated orange or brown.

### Visual balance

Aim roughly for:

- 70% ivory / white
- 15% brown / dark text
- 10% orange
- 5% blue or secondary accents

The site should feel warm, calm, trustworthy, and Mediterranean.

Orange should attract attention, not dominate the interface.

The **Donate** button should usually be the strongest colored element on the page.

### Accessibility

- Maintain good text/background contrast.
- Keep body text dark enough for comfortable reading.
- Do not rely on color alone to communicate state or meaning.

---

## Rendering

Default to Server Components.

Use `"use client"` only when interaction requires it.

Do not make an entire page a Client Component because one small element is interactive.

Prefer static generation for public content.

Keep client-side JavaScript minimal.

---

## Routes

Expected public structure:

## Routes

Public:

- `/` — Home
- `/about` — Association story, team, work, and registration details
- `/animals` — Animals gallery
- `/animals/[slug]` — Animal details
- `/adopt` — Adoption process, requirements, and local/international adoption guidance
- `/donate` — Donate
- `/donate/thank-you` — Thank-you page
- `/mirleft` — QR landing page
- `/contact` — Contact
- `/volunteer` — Volunteer opportunities and how to arrange a visit
- `/privacy` — Privacy

Admin:

- `/admin`
- `/admin/animals`
- `/admin/settings`

Languages use locale prefixes:
`/en`, `/fr`, `/de`, `/ar`

The public header navigation includes About, Animals, Volunteer, and Contact,
alongside a language selector and a prominent Donate button.

The Animals gallery links to the dedicated Adopt page explaining how adoption works.

The website does not have a news section or news administration routes.

## Visual Direction

The website should feel:

- warm
- trustworthy
- calm
- compassionate
- modern
- Mediterranean / Moroccan coastal
- nonprofit rather than corporate

---

## Responsive Design

Mobile-first.

Support:

- ~320px phones
- normal smartphones
- tablets
- laptops
- wide desktops

---

## Internationalization

Support:

- English
- French
- German
- Arabic

Do not produce awkward literal Arabic translations.

---

## SEO

Every public page must have meaningful metadata.

Implement where applicable:

- title
- description
- canonical URL
- Open Graph metadata
- social metadata
- `robots.ts`
- `sitemap.ts`

Requirements:

- semantic HTML
- logical heading order
- human-readable URLs
- meaningful image alt text
- unique animal detail metadata

---

## Performance

Rules:

- use `next/image`
- define image dimensions/aspect ratios
- optimize the real LCP image
- lazy-load offscreen media
- use `next/font`
- minimize JavaScript
- minimize hydration
- avoid unnecessary third-party scripts
- avoid background videos
- avoid oversized images
- avoid large dependencies for trivial behavior

Prefer simple solutions over premature optimization.

---

## Accessibility

Accessibility is required.

Requirements:

- semantic landmarks
- keyboard-accessible navigation
- visible focus states
- accessible form labels
- meaningful alt text
- sufficient contrast
- buttons must be buttons
- links must be links
- icon-only controls need accessible labels
- menus/dialogs must handle focus correctly
- respect `prefers-reduced-motion`

Do not communicate essential information using color alone.

---

## Components

Create reusable components when repetition actually exists, and prefer readability.

Likely reusable components:

- Container
- Section
- Header
- MobileNavigation
- Footer
- Button
- AnimalCard
- LanguageSwitcher
- CTASection

Avoid:

- giant components
- unnecessary abstractions

---

## Content

Do not hard-code editable content directly inside page JSX.

For now, store editable content in typed local data and translation files.

Structure it so the source can later be replaced by a CMS without rewriting UI components.

---

## Editable Images

Images representing editable content must also go through the content/data layer.

Do not hard-code these image paths deep inside UI components.

The current implementation may use local files, but image references must be easy to replace with CMS-managed URLs later.

---

## Animation

Motion should be subtle and functional.

Good:

- small hover transitions
- menu transitions
- restrained entrance effects

Avoid:

- scroll hijacking
- parallax-heavy pages
- bouncing CTAs
- animated gradients everywhere
- excessive reveal animations
- anything delaying navigation or reading

Respect `prefers-reduced-motion`.

---

## Error Handling

Users should never see raw exceptions.

Use appropriate:

- not-found states
- route fallback states
- error boundaries where useful

---

## Code Quality

Code must be straightforward and reviewable.

---

## Reviewability and Git Workflow

The produced code must be easy for a human engineer to review.

Prefer small, focused changes over large rewrites.

Git:

- create a new focused branch whenever it facilitates review
- use small logical commits
- one logical change per commit
- do not mix feature work with unrelated formatting/refactors
- use conventionnal commit messages

When preparing a PR:

- keep scope focused
- summarize what changed
- mention important implementation decisions
- mention known limitations
- explain how the change was verified

---

## Autonomous Agent Behavior

When implementing a task:

. Read this file first.
. Inspect the existing project.
. Understand existing patterns before introducing new ones.
. Reuse existing components when appropriate.
. Do not casually add dependencies.
. Do not rewrite unrelated working code.
. Summarize changed files.
. Mention genuine remaining limitations.
. If several implementation approaches are reasonable, choose the simplest production-quality solution.
. Do not overengineer.
