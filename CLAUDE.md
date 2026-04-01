# Chicken Road — Claude Code Context

## What is this game?
A casino-style game where the player bets and guides a chicken across multiple roads. Each road crossed increases the multiplier. A hidden car on any row ends the round. The player can cash out at any time after crossing at least one row.

## Tech stack
- React (Vite)
- No external game libraries — pure React + CSS
- No backend (yet) — all game logic is client-side

## Folder structure
```
src/
  game/       # Pure logic: config, RNG, odds calculations
  hooks/      # React hooks (useGameState is the main one)
  components/ # UI components (Board, Cell, Controls, etc.)
  App.jsx     # Root shell
  index.css   # Global styles
```

## Core game rules
- 8 rows, 3 columns per row
- 1 car hidden per row (random position, generated at game start)
- Multiplier starts at 1.0x, increases by 0.5x per row crossed
- Player can cash out after row 1+ is cleared
- Hitting a car = full bet lost, board revealed

## Key files
- `src/game/config.js` — all tunable constants (rows, multiplier step, bet limits)
- `src/hooks/useGameState.js` — all game state and logic
- `src/App.jsx` — UI shell, wires hooks to components

## Conventions
- Game logic stays in `src/game/` and `src/hooks/` — never in components
- Components are presentational only
- CSS uses BEM-ish naming: `.block`, `.block--modifier`, `.block__element`
- Currency is € by default (configurable in config.js)
- No TypeScript for now — keep it simple

## Planned features (pick these up as branches)
- [ ] Animated chicken sprite moving across rows
- [ ] Sound effects (cross, hit, cashout)
- [ ] Bet history / session stats panel
- [ ] Provably fair RNG display
- [ ] Mobile-responsive layout
- [ ] Difficulty modes (more cars per row)

## Branch naming
`feature/<short-name>` — e.g. `feature/chicken-animation`, `feature/sound-effects`
Always branch from `main`, PR back to `main`.
