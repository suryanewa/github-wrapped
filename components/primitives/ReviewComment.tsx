import { cn } from "@/lib/utils";

interface ReviewCommentProps {
  children: React.ReactNode;
  author?: string;
  timestamp?: string;
  resolved?: boolean;
  className?: string;
}

export function ReviewComment({
  children,
  author = "github-wrapped",
  timestamp,
  resolved = false,
  className
}: ReviewCommentProps) {
  return (
    <div
      className={cn(
        'relative border border-diff-border rounded-md bg-diff-surface/50 my-4 overflow-hidden',
        'transition-all duration-200',
        resolved && 'opacity-75',
        className
      )}
    >
      {/* Comment thread indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-diff-comment" />

      <div className="pl-4 pr-3 py-3">
        {/* Author header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-diff-comment/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-diff-comment"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-diff-comment">{author}</span>
          </div>

          {timestamp && (
            <>
              <span className="text-diff-neutral-subtle text-xs">•</span>
              <span className="text-xs text-diff-neutral-subtle">{timestamp}</span>
            </>
          )}

          {resolved && (
            <>
              <span className="text-diff-neutral-subtle text-xs">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-diff-success">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Resolved
              </span>
            </>
          )}
        </div>

        {/* Comment content */}
        <div className="text-sm text-foreground/90 leading-relaxed font-mono">
          {children}
        </div>
      </div>

      {/* Hover effect border */}
      <div
        className="absolute inset-0 pointer-events-none border border-diff-comment/0 rounded-md transition-colors group-hover:border-diff-comment/30"
        aria-hidden="true"
      />
    </div>
  );
}
