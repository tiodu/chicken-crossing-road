import { useState, useCallback } from 'react';
import { GAME_CONFIG, GAME_STATE } from '../game/config';

function generateBoard() {
  // For each row, randomly place a car in one of the columns
  return Array.from({ length: GAME_CONFIG.ROWS }, () => {
    const carIndex = Math.floor(Math.random() * 3); // 3 columns
    return [0, 1, 2].map((col) => col === carIndex ? 'car' : 'safe');
  });
}

export function useGameState() {
  const [gameState, setGameState] = useState(GAME_STATE.IDLE);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [currentRow, setCurrentRow] = useState(0);
  const [multiplier, setMultiplier] = useState(GAME_CONFIG.BASE_MULTIPLIER);
  const [board, setBoard] = useState([]);
  const [revealedCells, setRevealedCells] = useState({});

  const startGame = useCallback(() => {
    if (bet > balance || bet < GAME_CONFIG.MIN_BET) return;
    setBalance((b) => b - bet);
    setBoard(generateBoard());
    setRevealedCells({});
    setCurrentRow(0);
    setMultiplier(GAME_CONFIG.BASE_MULTIPLIER);
    setGameState(GAME_STATE.PLAYING);
  }, [bet, balance]);

  const selectCell = useCallback((row, col) => {
    if (gameState !== GAME_STATE.PLAYING) return;
    if (row !== currentRow) return;

    const cell = board[row][col];
    setRevealedCells((prev) => ({ ...prev, [`${row}-${col}`]: cell }));

    if (cell === 'car') {
      // Reveal entire board on death
      const allRevealed = {};
      board.forEach((r, rIdx) =>
        r.forEach((c, cIdx) => { allRevealed[`${rIdx}-${cIdx}`] = c; })
      );
      setRevealedCells(allRevealed);
      setGameState(GAME_STATE.DEAD);
    } else {
      const nextRow = currentRow + 1;
      const newMultiplier = parseFloat(
        (multiplier + GAME_CONFIG.MULTIPLIER_STEP).toFixed(2)
      );
      setMultiplier(newMultiplier);

      if (nextRow >= GAME_CONFIG.ROWS) {
        // Crossed all rows — auto cashout
        setBalance((b) => b + bet * newMultiplier);
        setGameState(GAME_STATE.WIN);
      } else {
        setCurrentRow(nextRow);
      }
    }
  }, [gameState, currentRow, board, multiplier, bet]);

  const cashOut = useCallback(() => {
    if (gameState !== GAME_STATE.PLAYING || currentRow === 0) return;
    setBalance((b) => b + bet * multiplier);
    setGameState(GAME_STATE.WIN);
  }, [gameState, currentRow, bet, multiplier]);

  const reset = useCallback(() => {
    setGameState(GAME_STATE.IDLE);
    setCurrentRow(0);
    setMultiplier(GAME_CONFIG.BASE_MULTIPLIER);
    setBoard([]);
    setRevealedCells({});
  }, []);

  return {
    gameState, bet, setBet, balance,
    currentRow, multiplier, board,
    revealedCells, startGame, selectCell,
    cashOut, reset,
  };
}
