import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GAME_STATE, GAME_CONFIG } from '@/game/config';

export function Controls({ gameState, bet, setBet, balance, multiplier, currentRow, onStart, onReset, onCashOut }) {
  const isPlaying = gameState === GAME_STATE.PLAYING;

  return (
    <div className="flex flex-col gap-3">
      {/* Multiplier display */}
      <div className="text-center text-4xl font-extrabold text-multiplier tracking-tight">
        {multiplier.toFixed(1)}x
      </div>

      {!isPlaying ? (
        <>
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground whitespace-nowrap">Bet</label>
            <Input
              type="number"
              value={bet}
              min={GAME_CONFIG.MIN_BET}
              max={Math.min(GAME_CONFIG.MAX_BET, balance)}
              onChange={(e) => setBet(Number(e.target.value))}
            />
          </div>
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={gameState === GAME_STATE.IDLE ? onStart : onReset}
          >
            {gameState === GAME_STATE.IDLE ? 'Start' : 'Play Again'}
          </Button>
        </>
      ) : (
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          onClick={onCashOut}
          disabled={currentRow === 0}
        >
          Cash Out {GAME_CONFIG.CURRENCY}{(bet * multiplier).toFixed(2)}
        </Button>
      )}
    </div>
  );
}
