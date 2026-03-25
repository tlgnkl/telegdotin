# TODOs

## Design OG Social Card
**What:** Create a designed 1200×630 OG image with name, role, and a key metric for social sharing
**Why:** Current OG image is just /photo.jpg — when shared on Telegram/LinkedIn, the link shows a cropped photo with no context
**Pros:** Better social sharing conversion, professional first impression
**Cons:** Requires design + generation
**Depends on:** DESIGN.md (run /design-consultation first for consistent design tokens)

## Audit and Delete Unused Assets
**What:** Check which images/videos in `public/cases/` are actually referenced in code. Delete unreferenced files (e.g., 8.3MB `media-6-3.mp4`, potentially unused PNGs).
**Why:** Compressing unused files wastes time and bloats the repo. Delete junk first, compress what's left.
**Pros:** Smaller repo, faster clone, accurate compression targets
**Cons:** Risk of deleting a file referenced via dynamic path — grep for all references first
**Effort:** S (CC: ~10 min)
**Priority:** P0 — do before image compression
**Depends on:** Nothing
**Source:** /plan-ceo-review 2026-03-24, Codex outside voice finding #5

## Deploy Sequence: All Fixes Before First Deploy
**What:** Reorder implementation: do ALL content fixes (CTA update, HR/Elektro differentiation, takeaways), image compression, OG card locally. Deploy as the LAST step, not the first.
**Why:** Deploying first caches wrong content ("Ищу роль", "сейчас в Рэй") on Vercel CDN. First public impression should be correct.
**Pros:** No "fix in production" scramble. Clean first impression.
**Cons:** Slightly slower to go live (hours, not minutes)
**Effort:** N/A (sequencing note, not a task)
**Priority:** P0 — implementation order
**Depends on:** All P0 + P1 tasks complete
**Source:** /plan-ceo-review 2026-03-24, Codex outside voice finding #2

## Error Boundary for React Routes
**What:** Wrap `<AnimatedRoutes>` in `main.tsx` with an `<ErrorBoundary>` component that catches render crashes and shows a friendly fallback with a link to the homepage.
**Why:** If any case page component throws (missing import, bad data reference), the entire app dies to a white screen. No visible error.
**Pros:** Safety net, graceful degradation, no changes to existing components
**Cons:** Adds ~30 lines. Overkill for a static site with no dynamic data.
**Effort:** S (CC: ~10 min)
**Priority:** P3
**Depends on:** Nothing
**Source:** /plan-ceo-review 2026-03-24, cherry-pick #1 (deferred)
