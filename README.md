# Portfolio

Three portfolio designs sharing one set of content, in an npm-workspaces monorepo.

```
apps/
  comic/   Comic/cartoon design (Bangers + Nunito, ink borders, sticker shadows)
  neon/    Dark neon design (Anton + Inter, big condensed type, green accent)
  noir/    Editorial design (Geist + Instrument Serif, time-of-day palette, flow field)
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
npm run build:noir
```

## Settings

[`packages/content/src/settings.ts`](packages/content/src/settings.ts) controls all three designs:

- `activeDesign` — which design your primary domain should serve (`"comic" | "neon" | "noir"`).
- `sections.blog / experience / stats` — toggle whole sections on and off everywhere.
- Per-project `visible` / `featured` flags live in
  [`packages/content/src/projects.ts`](packages/content/src/projects.ts).

Edit content once in `packages/content` and every design picks it up.

## Design switcher

Each app footer links to the other two designs. The URLs come from env vars and
fall back to the local dev ports, so it works out of the box in development:

```
NEXT_PUBLIC_COMIC_URL   (default http://localhost:3000)
NEXT_PUBLIC_NEON_URL    (default http://localhost:3001)
NEXT_PUBLIC_NOIR_URL    (default http://localhost:3002)
```

## Deploying (Vercel)

Each app is its own Vercel project, deployed through Vercel's Git integration
(push to `main` deploys, PRs get previews). Set `NEXT_PUBLIC_SITE_URL` plus the
three `NEXT_PUBLIC_*_URL` env vars on every project so the design switcher links
across the deployments. Full setup steps are in [DEPLOY.md](DEPLOY.md).
