import { cn } from "@/lib/utils";

interface DiffLineProps {
  type?: 'addition' | 'deletion' | 'neutral';
  children: React.ReactNode;
  lineNumber?: number;
  className?: string;
}

export function DiffLine({
  type = 'neutral',
  children,
  lineNumber,
  className
}: DiffLineProps) {
  const prefix = type === 'addition' ? '+' : type === 'deletion' ? '-' : ' ';

  const colorClass = {
    addition: 'text-diff-addition bg-diff-addition/10',
    deletion: 'text-diff-deletion bg-diff-deletion/10',
    neutral: 'text-foreground',
  }[type];

  return (
    <div className={cn('flex items-start font-mono text-sm', colorClass, className)}>
      {lineNumber !== undefined && (
        <span className="inline-block w-12 flex-shrink-0 select-none text-diff-neutral opacity-50 text-right pr-4">
          {lineNumber}
        </span>
      )}
      <span className="inline-block w-4 flex-shrink-0 select-none opacity-70">
        {prefix}
      </span>
      <span className="flex-1 whitespace-pre-wrap break-words">
        {children}
      </span>
    </div>
  );
}
