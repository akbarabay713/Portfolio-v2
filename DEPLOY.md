# Deployment

This monorepo ships **four separate portfolio designs**, each deployed as its
own Vercel project on its own domain:

| App            | Vercel project | Root Directory |
| -------------- | -------------- | -------------- |
| `apps/waybill` | waybill        | `apps/waybill` |
| `apps/comic`   | comic          | `apps/comic`   |
| `apps/neon`    | neon           | `apps/neon`    |
| `apps/noir`    | noir           | `apps/noir`    |

Deploys run through **Vercel's Git integration**: every push to `main` builds and
deploys automatically, and pull requests get preview URLs. GitHub Actions only
runs checks — see [.github/workflows/ci.yml](.github/workflows/ci.yml) (lint +
build on every PR and push).

---

## One-time setup

### 1. Create the projects

For each app: **vercel.com → Add New… → Project → import `Portfolio-v2`**, then
before the first deploy:

- **Root Directory** → Edit → pick the app folder (`apps/comic`, etc.).
- Enable **Include files outside the Root Directory** (so the shared
  `packages/content` workspace resolves).
- Framework preset auto-detects **Next.js**; leave build/install as default.
- Deploy, and name the project `waybill` / `comic` / `neon` / `noir`.

### 2. Environment variables

In **each** project → **Settings → Environment Variables** (Production +
Preview), set that project's own domain:

```
NEXT_PUBLIC_SITE_URL     = https://<this project's own domain>
```

If `sections.designSwitcher` is on, also set every design's URL in every
project, so each site links to the others. Without them, the switcher falls
back to the local dev ports (see `packages/content/src/designs.ts`).

```
NEXT_PUBLIC_WAYBILL_URL  = https://<waybill domain>
NEXT_PUBLIC_COMIC_URL    = https://<comic domain>
NEXT_PUBLIC_NEON_URL     = https://<neon domain>
NEXT_PUBLIC_NOIR_URL     = https://<noir domain>
```

### 3. Domains + DNS

In **each** project → **Settings → Domains** → add that project's domain, then
create the DNS record Vercel shows at your registrar:

- Subdomain (`neon.example.com`) → **CNAME** to `cname.vercel-dns.com`.
- Apex (`example.com`) → the **A record** Vercel displays (e.g. `76.76.21.21`).

Wait for **Valid Configuration**.

### 4. Redeploy

Env vars only apply to new builds, so after setting them: each project →
**Deployments → ⋯ → Redeploy**. After that, every push to `main` deploys on its
own.

---

## Local development

```bash
npm install
npm run dev         # comic on :3000
npm run dev:neon    # neon  on :3001
npm run dev:noir    # noir  on :3002
npm run dev:waybill # waybill on :3003
```

## Which app is "primary"

`packages/content/src/settings.ts` has `activeDesign` — the design your main
domain serves and that each app uses to label itself. Point your primary domain
at whichever project matches it.
