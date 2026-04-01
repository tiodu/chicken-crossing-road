import { GAME_STATE, GAME_CONFIG } from '@/game/config';

export function StatusBanner({ gameState, bet, multiplier }) {
  if (gameState === GAME_STATE.DEAD) {
    return (
      <div className="rounded-lg bg-danger border border-danger-foreground px-4 py-3 text-center text-sm font-semibold text-danger-foreground">
        💥 Hit by a car! You lost {GAME_CONFIG.CURRENCY}{bet.toFixed(2)}
      </div>
    );
  }
  if (gameState === GAME_STATE.WIN) {
    return (
      <div className="rounded-lg bg-safe border border-safe-foreground px-4 py-3 text-center text-sm font-semibold text-safe-foreground">
        🎉 Cashed out {GAME_CONFIG.CURRENCY}{(bet * multiplier).toFixed(2)}!
      </div>
    );
  }
  return null;
}
