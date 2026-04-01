import { Coins } from 'lucide-react';
import { GAME_CONFIG } from '@/game/config';

export function Header({ balance }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-extrabold tracking-tight">🐔 Chicken Road</h1>
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5">
        <Coins className="h-4 w-4 text-accent" />
        <span className="text-sm font-bold text-accent">
          {GAME_CONFIG.CURRENCY}{balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
