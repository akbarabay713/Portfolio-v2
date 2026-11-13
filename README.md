# Portfolio

Four portfolio designs sharing one set of content, in an npm-workspaces monorepo.

```
apps/
  waybill/ Primary design: shipping paperwork (Archivo + JetBrains Mono, kraft and paper)
  comic/   Comic/cartoon design (Bangers + Nunito, ink borders, sticker shadows)
  neon/    Dark neon design (Anton + Inter, big condensed type, green accent)
  noir/    Editorial design (Geist + Instrument Serif, time-of-day palette, flow field)
packages/
  content/ Shared data: projects, bio, experience, studies, site config — and settings
```

## Commands

```bash
npm install            # once, at the repo root

npm run dev:comic      # comic   → http://localhost:3000
npm run dev:neon       # neon    → http://localhost:3001
npm run dev:noir       # noir    → http://localhost:3002
npm run dev:waybill    # waybill → http://localhost:3003

npm run build          # build every workspace
npm run build:waybill  # build one app
```

## Settings

[`packages/content/src/settings.ts`](packages/content/src/settings.ts) controls every design:

- `activeDesign` — which design your primary domain should serve (`"comic" | "neon" | "noir" | "waybill"`).
- `sections.blog / experience / stats / designSwitcher` — toggle whole sections on and off everywhere.
- Per-project `visible` / `featured` flags live in
  [`packages/content/src/projects.ts`](packages/content/src/projects.ts).

Edit content once in `packages/content` and every design picks it up.

### Waybill notes

- Featured projects get a large screenshot; the rest are listed in a table.
- Project screenshots are 1920×1200 WebP captures of each live site's first
  screen (1440×900 at 1.33× scale). Every app keeps the same set in
  `public/projects`.
- Each live URL is checked when the page is generated (and again daily). A site
  that doesn't respond shows "Not responding" instead of a link.

## Design switcher

When `sections.designSwitcher` is on, each app links to the other designs. The
URLs come from env vars and fall back to the local dev ports:

```
NEXT_PUBLIC_COMIC_URL    (default http://localhost:3000)
NEXT_PUBLIC_NEON_URL     (default http://localhost:3001)
NEXT_PUBLIC_NOIR_URL     (default http://localhost:3002)
NEXT_PUBLIC_WAYBILL_URL  (default http://localhost:3003)
```

## Deploying (Vercel)

Each app is its own Vercel project, deployed through Vercel's Git integration
(push to `main` deploys, PRs get previews). Set `NEXT_PUBLIC_SITE_URL` on every
project, plus the `NEXT_PUBLIC_*_URL` env vars if the design switcher is on.
Full setup steps are in [DEPLOY.md](DEPLOY.md).
