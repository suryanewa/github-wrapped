import { cn } from "@/lib/utils";

interface FileHeaderProps {
  filename: string;
  type?: 'diff' | 'file' | 'review';
  status?: 'modified' | 'added' | 'deleted';
  className?: string;
}

export function FileHeader({
  filename,
  type = 'diff',
  status,
  className
}: FileHeaderProps) {
  const statusIndicator = status && {
    modified: { label: 'M', color: 'text-diff-warning' },
    added: { label: 'A', color: 'text-diff-success' },
    deleted: { label: 'D', color: 'text-diff-error' },
  }[status];

  return (
    <div
      className={cn(
        'bg-diff-surface border border-diff-border rounded-t-lg',
        'flex items-center justify-between px-4 py-2.5',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {statusIndicator && (
          <span
            className={cn(
              'inline-flex items-center justify-center w-5 h-5 rounded text-xs font-bold',
              statusIndicator.color
            )}
            title={status}
          >
            {statusIndicator.label}
          </span>
        )}

        {type === 'diff' ? (
          <div className="font-mono text-xs space-y-0.5">
            <div className="text-diff-deletion">--- a/{filename}</div>
            <div className="text-diff-addition">+++ b/{filename}</div>
          </div>
        ) : type === 'review' ? (
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-diff-comment"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-mono text-sm text-diff-neutral">{filename}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-diff-neutral"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-mono text-sm text-foreground">{filename}</span>
          </div>
        )}
      </div>

      {/* File actions (decorative) */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1 hover:bg-diff-surface-hover rounded text-diff-neutral hover:text-foreground transition-colors"
          title="View file"
          aria-label="View file"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
