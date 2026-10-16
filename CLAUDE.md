# Built4You hub

The series hub for Built4You, an Instagram build-in-public series: friends send app ideas, I build one per episode and post the build as stories. One static page at `built4you.jasperntc.dev`: what Built4You is, how to send an idea (Instagram), the episode list, and a footer link to `jasperntc.dev`.

@AGENTS.md

## Stack

- Next.js and TypeScript with `strict: true`. No `any` and no `@ts-ignore` without a comment explaining why.
- Static export (`output: "export"`), `images: { unoptimized: true }`, no `basePath`. No server code, API routes, middleware or ISR.
- Tailwind CSS v4 and Vitest, the same versions and config as the portfolio repo.
- Hosted on Cloudflare Workers static assets and deployed with Wrangler. `built4you.jasperntc.dev` is a Custom Domain on this Worker, so this Worker is the hostname's origin and creates its DNS record.

## Routing

- Episodes without logins are separate repos and Workers, mounted at `built4you.jasperntc.dev/<slug>` by a Worker route in their own `wrangler.jsonc`. Routes take precedence over a Custom Domain on the same hostname, so `/<slug>` requests go to the episode Worker and everything else falls through to this hub.
- Episode routes need this hub's DNS record, so the hub must be deployed before any episode.
- Never create a page, folder or file in `out/` at an episode's slug path. A test enforces this.
- Link to an episode with a plain `<a href>`, never `next/link`. The hub doesn't have those routes, so `next/link` would prefetch and navigate client-side to pages that don't exist here.
- Episodes with logins or user data live at `<slug>.jasperntc.online` instead, and are linked by full URL.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `next typegen`, then `tsc --noEmit` |
| `npm test` | Vitest, including the data checks |
| `npm run build` | Static export to `out/`, then the build guard (`tests/postbuild/`): fails if `out/` holds env files, keys, dumps, git data, backups, logs, or a private or live secret key |
| `npm run preview` | Build, then serve `out/` with Wrangler at http://localhost:8787 |
| `npm run deploy` | Build, then deploy by hand. Only with my approval. CI normally does this. |

CI runs audit, lint, typecheck, test and build on every PR. Run all of them before saying a PR is ready.

A merge to `main` deploys: once the checks pass, the `deploy` job in `.github/workflows/check.yml` runs `npm run deploy` with the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets from the `production` environment. Merging is deploying, so it needs my approval like any deploy.

## Episode data

- Episodes live in `content/episodes.ts`, typed against `Episode`. Change the type only with my approval.
- Fields: `number`, `title`, `slug`, `stage` (`idea` | `picked` | `building` | `shipped`), `to`, `description` (one line), optional `link`, and optional `credit`.
- `slug` is a stable URL path segment: lowercase letters, digits and hyphens. Never rename one. Episode numbers are unique and sequential from 1.
- `to` names who the app is for without naming them, for the To: line: "the friend who can't decide".
- `link` is present only when `stage` is `shipped`, and is `/<slug>` for hub-mounted episodes or `https://<slug>.jasperntc.online` for login apps. Nothing else. Other stages show their stage instead.
- `credit` is `{ name: string; agreedOn: string }` (`YYYY-MM-DD`, not in the future). Set it only after the idea-giver has agreed to be credited, and only I add it. Never infer a name from notes, commits or other repos.
- With no `credit`, the page shows no idea-giver name at all. Don't write `credit: undefined` or `link: undefined`. Leave the key out.
- Tests enforce these rules. Never weaken a test to make data pass.

## Copy

- The name is spelled `Built4You` everywhere, and the hashtag is `#Built4You`. Never "Built4you", "Built 4 You" or "Built For You". A test checks the copy.
- Ideas go to Instagram `@jasperntc`.
- Keep "makan mana" out of all copy. An existing app uses that name.
- Wheel spins are real and never rigged. Don't write copy that implies otherwise.

## Brand

- docs/brand.md and docs/brand-logos.md are the rules for colour, type, logo and copy. They win over any skill's defaults.
- Use only the CSS variables in app/brand-tokens.css. No raw hex values in components.
- Use the frontend-design skill for layout, hierarchy, copy and motion decisions inside those rules.
- Spacing uses only the steps in app/brand-tokens.css (1, 2, 3, 4, 6, 8, 12, 16).
- Type sizes (`text-display-xl`, `text-display`, `text-title`, `text-stamp-text`, `text-body`, `text-body-sm`, `text-button`, `text-hand`) are defined in `app/globals.css` from the design system's values, until the token export includes them. Use only these roles.
- Stamps are the only rotated element (−4°, Shipped −7°); nothing else tilts.
- It must not look like the portfolio.
- Works at phone width first. Most visitors come from an Instagram story.

## Storage

- No logins, cookies or stored user data.
- Episodes share this origin. If the hub ever uses `localStorage` or `sessionStorage`, prefix keys with `hub:` and wrap reads and writes in `try`/`catch`.

## Won't (v1)

An idea submission form, a per-episode page on the hub, a blog, analytics, and logins. Point it out instead of building it if a task drifts into one of these.

## Workflow

- Small PRs, one concern each, on a branch. I review every one.
- Never merge, deploy or push to `main` without my approval.
- When a mistake is caught in review, by me or by you, add a row to `REVIEW_LOG.md`: date, where, mistake, caught by, fix. Newest first.
- No secrets, tokens or `.env` files in commits. No absolute local paths in committed files, including docs, scripts and config.
