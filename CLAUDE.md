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
| `npm run build` | Static export to `out/` |
| `npm run preview` | Build, then serve `out/` with Wrangler at http://localhost:8787 |
| `npm run deploy` | Build, then deploy. Only with my approval. |

CI runs audit, lint, typecheck, test and build on every PR. Run all of them before saying a PR is ready.

## Episode data

- Episodes live in `content/episodes.ts`, typed against `Episode`. Change the type only with my approval.
- Fields: `number`, `title`, `slug`, `status` (`planned` | `building` | `live`), `description` (one line), `link`, and optional `credit`.
- `slug` is a stable URL path segment: lowercase letters, digits and hyphens. Never rename one. Episode numbers are unique and sequential from 1.
- `link` is `/<slug>` for hub-mounted episodes or `https://<slug>.jasperntc.online` for login apps. Nothing else.
- Only `live` episodes render their link as clickable. `planned` and `building` show their status instead.
- `credit` is `{ name: string; agreedOn: string }` (`YYYY-MM-DD`, not in the future). Set it only after the idea-giver has agreed to be credited, and only I add it. Never infer a name from notes, commits or other repos.
- With no `credit`, the page shows no idea-giver name at all. Don't write `credit: undefined`. Leave the key out.
- Tests enforce these rules. Never weaken a test to make data pass.

## Copy

- The name is spelled `Built4You` everywhere, and the hashtag is `#Built4You`. Never "Built4you", "Built 4 You" or "Built For You". A test checks the copy.
- Ideas go to Instagram `@jasperntc`.
- Keep "makan mana" out of all copy. An existing app uses that name.
- Wheel spins are real and never rigged. Don't write copy that implies otherwise.

## Look

- Playful, matching my Instagram stories: sky blue, yellow and sticky notes. It must not look like the portfolio.
- Colours are CSS custom properties in `app/globals.css`. No one-off hex values in components.
- Body text meets WCAG AA (4.5:1). Yellow is a surface colour (sticky notes, highlights), never text on sky blue.
- Respect `prefers-reduced-motion`: no tilt or wobble animation when it's set.
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
