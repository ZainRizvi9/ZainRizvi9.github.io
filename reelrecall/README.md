# ReelRecall 🎬
**SEG3125 Assignment 3 — Movie Memory Game**

Match movie posters to their titles. React + Vite, real posters via TMDB API.

---

## Quick Start

```bash
npm install
npm run dev
```
Open http://localhost:5173

## Deploy to Portfolio

```bash
npm run build
```
Upload the `dist/` folder to GitHub Pages, Netlify, or Vercel.

---

## File Structure

```
reelrecall/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx        ← React root
    ├── App.jsx         ← All components + game logic
    ├── App.css         ← All styles (Gestalt comments throughout)
    └── data.js         ← Movie data, TMDB key, difficulty config
```

---

## Design Decisions (for Report)

### Typography
| Role | Font | Size | Usage |
|------|------|------|-------|
| Display | DM Serif Display | 54px | Wordmark, card titles, end screen — cinematic, editorial |
| Display italic | DM Serif Display Italic | 76px | "That's a *Wrap!*" — emotional payoff moment |
| Body | Space Grotesk | 13–15px | Config, labels, buttons — modern, legible |
| Micro | Space Grotesk | 9–11px | HUD labels, card type tags |

### Color System
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#070709` | Base — near-black for cinematic depth |
| Surface 1 | `#0e0e12` | Hero, topbar, stat cards |
| Surface 2 | `#161619` | Card backs, pill buttons |
| Accent | `#E8001C` | Active, matched, score, italic wordmark |
| Text | `#f4f4f5` | Primary readable content |
| Muted | `#6b6b72` | Secondary labels, unselected state |
| Dim | `#3a3a40` | Micro labels, card type tags |

### Gestalt Principles Applied
| Principle | Where |
|-----------|-------|
| **Similarity** | All cards identical size/shape → grid reads as one unified object |
| **Proximity** | Genre pills + level pills tightly clustered → each cluster = one decision |
| **Figure/Ground** | Red on near-black → maximum contrast, focal elements pop |
| **Closure** | Film perforations on card backs imply a full filmstrip (incomplete shape) |
| **Common Region** | Topbar groups Moves/Pairs/Time into one HUD zone |
| **Common Fate** | Both mismatched cards shake together → grouped as a failed attempt |

### Attention Principles (from lecture slides)
- **Microinteractions**: card flip cubic-bezier, shake on miss, pulse ring on match, arrow hover
- **Feedback visibility**: colour-coded feedback bar (red=match, amber=miss) — information visible when it needs attending to
- **Avoid clutter**: negative space in setup hero, no decorative elements without purpose

### Memory Mechanics
- Cards face-down → player must remember spatial position of previously seen posters
- Poster ↔ Title pairing tests associative short-term memory
- Difficulty scales grid: Easy 4×3 (6 pairs), Medium 4×4 (8 pairs), Hard 5×4 (10 pairs)
- Score formula: `max(0, round(9000/moves × totalPairs − time × 2))`

---

## Inspiration
1. https://letterboxd.com — dark cinematic aesthetic, editorial typography
2. https://www.helpfulgames.com/subjects/brain-training/memory.html — classic grid flip mechanic
