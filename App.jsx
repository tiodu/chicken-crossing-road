import { useGameState } from './hooks/useGameState';
import { GAME_STATE, GAME_CONFIG } from './game/config';
import './index.css';

export default function App() {
  const {
    gameState, bet, setBet, balance,
    currentRow, multiplier, board,
    revealedCells, startGame, selectCell,
    cashOut, reset,
  } = useGameState();

  const isPlaying = gameState === GAME_STATE.PLAYING;

  return (
    <div className="app">
      <header>
        <h1>🐔 Chicken Road</h1>
        <div className="balance">{GAME_CONFIG.CURRENCY}{balance.toFixed(2)}</div>
      </header>

      <main>
        <div className="board">
          {board.length === 0 && (
            <div className="board-empty">Place your bet and start crossing</div>
          )}
          {board.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`row ${rowIdx === currentRow && isPlaying ? 'row--active' : ''}`}
            >
              {row.map((_, colIdx) => {
                const key = `${rowIdx}-${colIdx}`;
                const revealed = revealedCells[key];
                return (
                  <button
                    key={colIdx}
                    className={`cell ${revealed ? `cell--${revealed}` : ''}`}
                    onClick={() => selectCell(rowIdx, colIdx)}
                    disabled={!isPlaying || rowIdx !== currentRow}
                  >
                    {revealed === 'car' ? '🚗' : revealed === 'safe' ? '✅' : '?'}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {gameState === GAME_STATE.DEAD && (
          <div className="status status--dead">💥 Hit by a car! You lost {GAME_CONFIG.CURRENCY}{bet.toFixed(2)}</div>
        )}
        {gameState === GAME_STATE.WIN && (
          <div className="status status--win">🎉 Cashed out {GAME_CONFIG.CURRENCY}{(bet * multiplier).toFixed(2)}!</div>
        )}

        <div className="controls">
          <div className="multiplier">{multiplier.toFixed(1)}x</div>

          {!isPlaying ? (
            <>
              <div className="bet-control">
                <label>Bet</label>
                <input
                  type="number"
                  value={bet}
                  min={GAME_CONFIG.MIN_BET}
                  max={Math.min(GAME_CONFIG.MAX_BET, balance)}
                  onChange={(e) => setBet(Number(e.target.value))}
                />
              </div>
              <button className="btn btn--primary" onClick={gameState === GAME_STATE.IDLE ? startGame : reset}>
                {gameState === GAME_STATE.IDLE ? 'Start' : 'Play Again'}
              </button>
            </>
          ) : (
            <button className="btn btn--cashout" onClick={cashOut} disabled={currentRow === 0}>
              Cash Out {GAME_CONFIG.CURRENCY}{(bet * multiplier).toFixed(2)}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
