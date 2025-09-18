# Math‑RPG (Chapter 1 Starter)

Self‑contained, vanilla JS project to prototype your Math‑RPG. No build tools required—open `index.html` in a modern browser.

## What’s here
- **Separated structure** for easy expansion (chapters, puzzles, UI, a11y).
- **Narration + TTS** (toggleable).
- **Key Stage toggle** at the top of the screen instantly swaps KS3 / KS4 question sets and updates the HUD.
- **Chapter 1**: refreshed story flow + 3 starter challenges (fight, lock, oxygen puzzle) with a live score tracker.
- **Accessible**: keyboard friendly, large type, ARIA live regions, high‑contrast mode, screen‑reader hints.

## Run
1. Download and unzip.
2. Open `index.html` (double‑click) in Chrome/Edge.
3. Use **Space/Enter** to advance; **1‑4** to answer MCQs. `T` toggles narration, `H` toggles high contrast.

## Structure
```
math-rpg/
├─ index.html
├─ README.md
├─ public/
│  ├─ styles/main.css
│  └─ assets/images/logo.svg
└─ src/
   ├─ a11y/aria.js
   ├─ ui/ui.js
   ├─ game/
   │  ├─ engine.js
   │  ├─ puzzles/oxygen.js
   │  └─ chapters/
   │     ├─ chapter1.js
   │     └─ index.js
   ├─ tts.js
   └─ main.js
```

## Notes
- You can add new chapters as ES modules under `src/game/chapters` and register them in `chapters/index.js` (which exposes `getChapter` and `chapterIds`).
- Puzzles can be added under `src/game/puzzles` and referenced by an `id` inside a chapter step of type `"puzzle"`.
- Styling lives in `public/styles/main.css`. Brand colours and fonts at the top.
