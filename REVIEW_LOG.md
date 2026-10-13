# Review log

Mistakes caught during review, mine and the AI's. Newest first.

| Date | Where | Mistake | Caught by | Fix |
|---|---|---|---|---|
| 2026-10-14 | Brand docs | Claude (chat)'s brand.md said to load fonts with next/font while the kit's CSS used @font-face | Claude Code, during brand/foundation | brand.md now describes the @font-face + preload setup. |
| 2026-10-13 | Setup | Claude (chat)'s brand/foundation prompt assumed a Next.js app on main that didn't exist | Claude Code, during plan review | Split out this scaffold PR first. |
