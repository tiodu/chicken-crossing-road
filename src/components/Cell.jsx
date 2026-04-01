import { cn } from '@/lib/utils';

export function Cell({ revealed, onClick, disabled }) {
  return (
    <button
      className={cn(
        'flex-1 h-14 rounded-lg border text-xl font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        // default: unselected cell
        !revealed && 'border-border bg-card text-muted-foreground enabled:hover:bg-secondary enabled:hover:border-ring disabled:cursor-default disabled:opacity-40',
        // safe cell
        revealed === 'safe' && 'border-safe-foreground bg-safe text-safe-foreground cursor-default',
        // car cell
        revealed === 'car'  && 'border-danger-foreground bg-danger text-danger-foreground cursor-default',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {revealed === 'car' ? '🚗' : revealed === 'safe' ? '✅' : '?'}
    </button>
  );
}
