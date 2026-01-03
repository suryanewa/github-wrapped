'use client';

import { motion } from 'framer-motion';
import { DiffLine, FileHeader, ReviewComment, SlideDocument, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function ImpactSlide({ data, isActive }: SlideProps) {
  const { impact, profile } = data;

  const hasImpact = impact.starsEarned > 0 || impact.forksEarned > 0;
  const totalImpact = impact.starsEarned + impact.forksEarned + profile.followers;
  const primaryLabel = hasImpact
    ? `+${impact.starsEarned.toLocaleString()} stars`
    : `${profile.followers.toLocaleString()} followers`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader
          filename="community-impact.metrics"
          type="file"
          status={hasImpact ? "added" : "modified"}
        />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="METRICS" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Community reach analysis
              </span>
            </div>
            <div className="text-xs text-diff-neutral font-mono">
              {totalImpact.toLocaleString()} total reach
            </div>
          </div>

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[10px] text-diff-neutral/70 font-mono uppercase tracking-widest mb-4">
                  Your impact
                </div>
                <div className={`font-mono text-6xl md:text-9xl leading-none tracking-tighter font-bold ${hasImpact ? "text-diff-highlight" : "text-diff-comment"}`}>
                  {primaryLabel}
                </div>
                <div className="mt-4 font-mono text-base md:text-lg text-diff-neutral/80">
                  Total reach: {totalImpact.toLocaleString()}.
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  stars: {impact.starsEarned.toLocaleString()}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={2}>
                  forks: {impact.forksEarned.toLocaleString()}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={3}>
                  followers: {profile.followers.toLocaleString()}
                </DiffLine>
                {impact.topStarredRepo && (
                  <DiffLine type="neutral" lineNumber={4}>
                    most popular: {impact.topStarredRepo}
                  </DiffLine>
                )}
              </div>
            }
          />

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: hasImpact ? 0.6 : 0.3 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {!hasImpact
                ? `Impact isn’t only stars — you’re building in public.`
                : impact.starsEarned > 1000
                ? `Massive reach — thousands bookmarked your work.`
                : impact.starsEarned > 100
                ? `Real traction — people are finding value in what you ship.`
                : impact.starsEarned > 10
                ? `Growing influence — early adopters are showing up.`
                : `Early momentum — a few stars is still signal.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
