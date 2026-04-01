import { cn } from '@/lib/utils';
import { Cell } from './Cell';
import { GAME_STATE } from '@/game/config';

export function Board({ board, revealedCells, currentRow, gameState, onSelectCell }) {
  const isPlaying = gameState === GAME_STATE.PLAYING;

  if (board.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center text-muted-foreground text-sm">
        Place your bet and start crossing
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-2">
      {board.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className={cn(
            'flex gap-2 transition-opacity duration-200',
            rowIdx === currentRow && isPlaying ? 'opacity-100' : 'opacity-40',
          )}
        >
          {row.map((_, colIdx) => {
            const key = `${rowIdx}-${colIdx}`;
            return (
              <Cell
                key={colIdx}
                revealed={revealedCells[key]}
                onClick={() => onSelectCell(rowIdx, colIdx)}
                disabled={!isPlaying || rowIdx !== currentRow}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
