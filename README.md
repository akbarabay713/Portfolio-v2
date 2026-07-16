# Portfolio

Two portfolio designs sharing one set of content, in an npm-workspaces monorepo.

```
apps/
  comic/   Comic/cartoon design (Bangers + Nunito, ink borders, sticker shadows)
  neon/    Dark neon design (Anton + Inter, big condensed type, green accent)
  noir/    Editorial design (Geist + Instrument Serif, time-of-day palette, smoke canvas)
packages/
  content/ Shared data: projects, bio, experience, studies, site config — and settings
```

## Commands

```bash
npm install          # once, at the repo root

npm run dev:comic    # comic  → http://localhost:3000
npm run dev:neon     # neon   → http://localhost:3001
npm run dev:noir     # noir   → http://localhost:3002

npm run build        # build every workspace
npm run build:comic  # build one app
npm run build:neon
```

## Settings

[`packages/content/src/settings.ts`](packages/content/src/settings.ts) controls both designs:

- `activeDesign` — which design your primary domain should serve (`"comic" | "neon"`).
- `sections.blog / experience / stats` — toggle whole sections on and off everywhere.
- Per-project `visible` / `featured` flags live in
  [`packages/content/src/projects.ts`](packages/content/src/projects.ts).

Edit content once in `packages/content` and both designs pick it up.

## Design switcher

Each app footer links to the other two designs. The URLs come from env vars and
fall back to the local dev ports, so it works out of the box in development:

```
NEXT_PUBLIC_COMIC_URL   (default http://localhost:3000)
NEXT_PUBLIC_NEON_URL    (default http://localhost:3001)
NEXT_PUBLIC_NOIR_URL    (default http://localhost:3002)
```

## Deploying (Vercel)

Create one Vercel project per app and set **Root Directory** to `apps/comic`,
`apps/neon`, or `apps/noir`. Point your main domain at whichever app
`activeDesign` says, and the others at subdomains (e.g. `neon.yourdomain.com`).
Set the three `NEXT_PUBLIC_*_URL` env vars on every project so the design
switcher links across the deployments.
