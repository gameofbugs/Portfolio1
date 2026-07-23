# Portfolio Website — Hero Section Redesign

> Scope: Hero section only. All other section notes removed for now — will revisit those separately later.
> Frontend/animation/layout only — no data or backend changes.

---

## Problem with current hero

Right now the hero has too many things competing for attention at once, side by side: profile card, flip card, floating "players"/"years" chips, spinning rings, and a typewriter line — all sharing one row, all animating simultaneously. It reads as mixed/cluttered rather than premium.

## Direction (confirmed)

- **Flip card stays** — but becomes the single, centered visual anchor of the hero, not one of several competing elements.
- **Typewriter** (looping role titles) moves to sit directly below the flip card, as a caption to it — instead of floating separately beside the old profile card.
- **Orb / floating stat chips** (players, years) move to sit below the typewriter line, as a small inline row — instead of being absolutely-positioned "floating" badges next to the card.
- Layout becomes a **single centered column** (top to bottom) instead of the current two-column split.

## Proposed vertical flow

1. Availability eyebrow pill (small, centered, top)
2. Name + gradient-highlighted title
3. One-line tagline
4. CTA buttons (primary + outline)
5. **Flip card** — large, centered, the visual anchor
6. **Typewriter** looping role text — directly under the card, like a caption
7. **Stat chips** (players / years) — small inline row under the typewriter
8. Existing 3-column stat bar (Games Published / Years Active / Community Reach) — unchanged, below the fold as before

This turns the hero into one clear vertical story — read the headline, see the card, see it "speak" via the typewriter, then see the numbers — instead of several elements pulling the eye in different directions at once.

---

## Wireframe

```
+--------------------------------------------------------+
|                                                          |
|              o Available for Collaboration               |
|                                                          |
|                    Alex Mercer                          |
|               Indie Game Developer                      |
|                                                          |
|         6 years shipping games that players              |
|                    remember.                             |
|                                                          |
|        [ View Projects v ]   ( About Me )                |
|                                                          |
|                                                          |
|              +---------------------+                    |
|              |                     |                    |
|              |      FLIP CARD      |                    |
|              |     (centerpiece)   |                    |
|              |                     |                    |
|              +---------------------+                    |
|                                                          |
|         >_ Unity Gameplay Programmer_                    |
|              (typewriter, looping)                       |
|                                                          |
|           ( players: 120K+ )  ( years: 6+ )              |
|                                                          |
|  +--------------+--------------+---------------------+  |
|  |       1      |      6+      |       120K+          |  |
|  | Games         | Years        | Community            |  |
|  | Published     | Active       | Reach                |  |
|  +--------------+--------------+---------------------+  |
|                                                          |
+--------------------------------------------------------+
```

**Notes on the wireframe:**
- Everything is centered on one vertical axis - no left/right split anymore.
- The flip card is visually the largest single element after the headline text.
- Typewriter text sits close under the card so it reads as "belonging" to it.
- Stat chips are now inline pills in a row, not floating/orbiting elements - same info, calmer presentation.
- Bottom stat bar is untouched from the current site.

---

## Open questions for you

- Should the CTA buttons stay above the flip card (as drawn), or move below everything, right before the stat bar?
- Should the stat chips (players/years) keep any subtle animation (e.g. gentle fade/bob), or go fully static now that they're inline instead of floating?
- Any preference on how large the flip card should be relative to the text above it - dominant/full-width, or modest/contained?
