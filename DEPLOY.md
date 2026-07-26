# Deployment

This monorepo ships **three separate portfolio designs**, each deployed as its
own Vercel project on its own domain:

| App          | Vercel project | Domain (repo variable) |
| ------------ | -------------- | ---------------------- |
| `apps/comic` | comic          | `COMIC_DOMAIN`         |
| `apps/neon`  | neon           | `NEON_DOMAIN`          |
| `apps/noir`  | noir           | `NOIR_DOMAIN`          |

CI/CD lives in [.github/workflows](.github/workflows):

- **ci.yml** — lint + build all workspaces on every pull request and push.
- **deploy.yml** — on every push to `main`, builds each app on Vercel and points
  its domain at the new deployment. Runs the three apps in parallel.

No domains, tokens, or project IDs are hardcoded — the deploy workflow reads them
from repo **Secrets** and **Variables**, so this is safe to keep public.

---

## One-time setup

### 1. Create the three Vercel projects

For each app, create a Vercel project linked to this repo with the **Root
Directory** set to the app folder. Easiest via the CLI (run once per app):

```bash
npm i -g vercel
cd apps/comic && vercel link      # create/select the "comic" project
cd ../neon    && vercel link      # "neon"
cd ../noir    && vercel link      # "noir"
```

In each project's **Settings → General**, confirm:

- **Root Directory** = `apps/comic` (resp. `apps/neon`, `apps/noir`)
- **Include files outside the root directory** = enabled (needed so the shared
  `packages/content` workspace resolves)
- Framework preset = **Next.js**

Grab the IDs you'll need:

```bash
cat apps/comic/.vercel/project.json   # -> { "orgId": "...", "projectId": "..." }
```

`orgId` is the same for all three; `projectId` is per app.

> The `.vercel/` folders are git-ignored and only used locally to read the IDs —
> the workflow pulls settings fresh on each run.

### 2. Add GitHub Secrets

Repo → **Settings → Secrets and variables → Actions → Secrets**:

| Secret                    | Value                                                            |
| ------------------------- | --------------------------------------------------------------- |
| `VERCEL_TOKEN`            | A Vercel access token (Vercel → Account Settings → Tokens)      |
| `VERCEL_ORG_ID`           | `orgId` from any `project.json`                                  |
| `VERCEL_PROJECT_ID_COMIC` | `projectId` of the comic project                                |
| `VERCEL_PROJECT_ID_NEON`  | `projectId` of the neon project                                 |
| `VERCEL_PROJECT_ID_NOIR`  | `projectId` of the noir project                                 |

### 3. Add GitHub Variables (the domains)

Repo → **Settings → Secrets and variables → Actions → Variables**:

| Variable       | Example              |
| -------------- | -------------------- |
| `COMIC_DOMAIN` | `comic.example.com`  |
| `NEON_DOMAIN`  | `neon.example.com`   |
| `NOIR_DOMAIN`  | `studio.example.com` |

Use bare hostnames (no `https://`). These feed two things: each site's own
`NEXT_PUBLIC_SITE_URL`, and the three `NEXT_PUBLIC_*_URL` values the design
switcher uses to link between the sites.

### 4. Point DNS at Vercel

Add each domain to its Vercel project (**Settings → Domains**, or
`vercel domains add <domain>`), then create the DNS record your registrar needs
(usually a `CNAME` to `cname.vercel-dns.com`, or Vercel's `A` record for an apex
domain). The workflow's `vercel alias` step can only attach a domain once DNS
resolves to Vercel.

---

## How a deploy runs

1. Push to `main` (or run **Deploy** manually from the Actions tab).
2. For each app in parallel: `vercel pull` → `vercel deploy --prod` (build runs on
   Vercel, respecting each project's Root Directory) → `vercel alias set` to move
   the domain onto the fresh deployment.
3. The run summary lists each app and its live URL.

If a required secret or variable is missing, the job fails fast and names exactly
what's absent.

## Local development

```bash
npm install
npm run dev         # comic on :3000
npm run dev:neon    # neon  on :3001
npm run dev:noir    # noir  on :3002
```

Without the `NEXT_PUBLIC_*_URL` variables set, the switcher falls back to those
localhost ports (see `packages/content/src/designs.ts`).
