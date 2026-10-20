# Review log

Mistakes caught during review, mine and the AI's. Newest first.

| Date | Where | Mistake | Caught by | Fix |
|---|---|---|---|---|
| 2026-10-20 | `.github/dependabot.yml` | `react` and `react-dom` updated in separate Dependabot PRs; `react-dom@19.3.1` needs `react@^19.3.1`, so a lone react-dom bump fails `npm ci` | Lapar Wheel PR #4 CI, which copies this config | Group `react` with `react-dom`. |
| 2026-10-16 | `tests/build/` | The build guard was first put in `tests/build/`, which `.gitignore`'s `build/` rule hides, so it would never have been committed | Claude Code, checking `git status` before review | Moved to `tests/postbuild/` and confirmed with `git check-ignore`. |
| 2026-10-14 | Brand kit | Claude (chat)'s kit exported no type sizes though the design system defines them | Claude Code, planning hub/brand-styling | Sizes defined in globals.css from the design system values. |
| 2026-10-14 | Hub brief | Claude (chat)'s hub brief assumed episode content with a `stage` field; there was none and CLAUDE.md said `status` | Claude Code, planning hub/brand-styling | Episode data split into its own PR; field renamed to `stage`. |
| 2026-10-14 | Brand docs | Claude (chat)'s brand.md said to load fonts with next/font while the kit's CSS used @font-face | Claude Code, during brand/foundation | brand.md now describes the @font-face + preload setup. |
| 2026-10-13 | Setup | Claude (chat)'s brand/foundation prompt assumed a Next.js app on main that didn't exist | Claude Code, during plan review | Split out this scaffold PR first. |
