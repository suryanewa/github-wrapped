import { cn } from "@/lib/utils";

interface FileHeaderProps {
  filename: string;
  type?: 'diff' | 'file';
  className?: string;
}

export function FileHeader({ filename, type = 'diff', className }: FileHeaderProps) {
  return (
    <div className={cn('bg-diff-surface border-b border-diff-neutral/30 px-6 py-3', className)}>
      {type === 'diff' ? (
        <div className="font-mono text-sm space-y-0.5">
          <div className="text-diff-deletion">--- a/{filename}</div>
          <div className="text-diff-addition">+++ b/{filename}</div>
        </div>
      ) : (
        <div className="font-mono text-sm text-diff-neutral">
          {filename}
        </div>
      )}
    </div>
  );
}
