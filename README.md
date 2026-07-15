# Portfolio

Two portfolio designs sharing one set of content, in an npm-workspaces monorepo.

```
apps/
  comic/   Comic/cartoon design (Bangers + Nunito, ink borders, sticker shadows)
  neon/    Dark neon design (Anton + Inter, big condensed type, green accent)
packages/
  content/ Shared data: projects, bio, experience, site config — and settings
```

## Commands

```bash
npm install          # once, at the repo root

npm run dev:comic    # comic  → http://localhost:3000
npm run dev:neon     # neon   → http://localhost:3001

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

## Deploying (Vercel)

Create one Vercel project per app and set **Root Directory** to `apps/comic` or
`apps/neon`. Point your main domain at whichever app `activeDesign` says, and the
other at a subdomain (e.g. `neon.yourdomain.com`).
