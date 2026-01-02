import { cn } from "@/lib/utils";

interface ReviewCommentProps {
  children: React.ReactNode;
  author?: string;
  className?: string;
}

export function ReviewComment({ children, author = "GitHub Wrapped", className }: ReviewCommentProps) {
  return (
    <div className={cn('border-l-2 border-diff-comment bg-diff-comment/5 p-4 my-4', className)}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-diff-comment/20 flex items-center justify-center">
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
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-diff-comment">{author}</span>
            <span className="text-xs text-diff-neutral">commented</span>
          </div>
          <div className="text-sm text-foreground/90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
