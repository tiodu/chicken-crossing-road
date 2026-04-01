import { useGameState } from '@/hooks/useGameState';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Board } from '@/components/Board';
import { StatusBanner } from '@/components/StatusBanner';
import { Controls } from '@/components/Controls';

export default function App() {
  const {
    gameState, bet, setBet, balance,
    currentRow, multiplier, board,
    revealedCells, startGame, selectCell,
    cashOut, reset,
  } = useGameState();

  return (
    <div className="w-[420px] flex flex-col gap-5 p-4">
      <Header balance={balance} />

      <Card>
        <CardContent className="p-5 flex flex-col gap-4">
          <Board
            board={board}
            revealedCells={revealedCells}
            currentRow={currentRow}
            gameState={gameState}
            onSelectCell={selectCell}
          />

          <StatusBanner gameState={gameState} bet={bet} multiplier={multiplier} />

          <Controls
            gameState={gameState}
            bet={bet}
            setBet={setBet}
            balance={balance}
            multiplier={multiplier}
            currentRow={currentRow}
            onStart={startGame}
            onReset={reset}
            onCashOut={cashOut}
          />
        </CardContent>
      </Card>
    </div>
  );
}
