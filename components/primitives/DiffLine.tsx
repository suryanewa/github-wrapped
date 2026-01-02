import { cn } from "@/lib/utils";

interface DiffLineProps {
  type?: 'addition' | 'deletion' | 'neutral' | 'context';
  children: React.ReactNode;
  lineNumber?: number;
  className?: string;
  showGutter?: boolean;
}

export function DiffLine({
  type = 'neutral',
  children,
  lineNumber,
  className,
  showGutter = true,
}: DiffLineProps) {
  const prefix = type === 'addition' ? '+' : type === 'deletion' ? '-' : type === 'context' ? ' ' : ' ';

  const colorClass = {
    addition: 'text-diff-addition-fg bg-diff-addition border-l-2 border-diff-addition',
    deletion: 'text-diff-deletion-fg bg-diff-deletion border-l-2 border-diff-deletion',
    neutral: 'text-diff-neutral',
    context: 'text-foreground',
  }[type];

  return (
    <div
      className={cn(
        'group flex items-start font-mono text-sm leading-relaxed transition-colors',
        'hover:bg-diff-surface-hover/50',
        colorClass,
        className
      )}
    >
      {showGutter && lineNumber !== undefined && (
        <span
          className="inline-block w-12 flex-shrink-0 select-none text-diff-gutter-text text-right pr-3 py-0.5 bg-diff-gutter border-r border-diff-border/50"
          aria-label={`Line ${lineNumber}`}
        >
          {lineNumber}
        </span>
      )}
      <span
        className={cn(
          "inline-block w-6 flex-shrink-0 select-none text-center py-0.5",
          type !== 'neutral' && type !== 'context' ? 'opacity-90' : 'opacity-40'
        )}
      >
        {prefix}
      </span>
      <span className="flex-1 whitespace-pre-wrap break-words py-0.5 pr-4">
        {children}
      </span>
    </div>
  );
}
