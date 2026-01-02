import { cn } from "@/lib/utils";

interface MetricBadgeProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'addition' | 'deletion' | 'highlight';
  className?: string;
}

export function MetricBadge({
  label,
  value,
  variant = 'default',
  className
}: MetricBadgeProps) {
  const variantStyles = {
    default: 'bg-diff-neutral/10 text-diff-neutral border-diff-neutral/30',
    addition: 'bg-diff-addition/10 text-diff-addition border-diff-addition/30',
    deletion: 'bg-diff-deletion/10 text-diff-deletion border-diff-deletion/30',
    highlight: 'bg-diff-highlight/10 text-diff-highlight border-diff-highlight/30',
  };

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-md border font-mono text-xs',
      variantStyles[variant],
      className
    )}>
      <span className="opacity-70">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
