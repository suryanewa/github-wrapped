'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment, SlideDocument } from '@/components/primitives';
import { ContributionHeatmap } from '@/components/primitives/ContributionHeatmap';
import { SlideProps } from '@/lib/types';

export function ContributionsSlide({ data, isActive }: SlideProps) {
  const { contributions, year } = data;
  const hasActivity = contributions.total > 0;
  const hasHeatmap =
    hasActivity &&
    contributions.dailyContributions &&
    Object.values(contributions.dailyContributions).some((v) => v > 0);

  const secondaryLines: Array<{ label: string; value: number }> = [
    { label: 'commits', value: contributions.commits },
    { label: 'pull requests', value: contributions.prs },
    { label: 'issues', value: contributions.issues },
    ...(contributions.reviews > 0 ? [{ label: 'reviews', value: contributions.reviews }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="contributions.diff" type="diff" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border font-mono text-xs text-diff-neutral">
            @@ {year} Activity Summary @@
          </div>

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  {hasActivity ? 'You shipped.' : 'Quiet year.'}
                </div>
                <div
                  className={[
                    'mt-4 font-mono text-7xl md:text-8xl leading-none tracking-tight',
                    hasActivity ? 'text-diff-addition' : 'text-foreground',
                  ].join(' ')}
                >
                  {hasActivity ? `+${contributions.total.toLocaleString()}` : contributions.total.toLocaleString()}
                </div>
                <div className="mt-4 font-mono text-sm text-diff-neutral">
                  contributions in {year}.
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                {secondaryLines.map((line, i) => (
                  <DiffLine key={line.label} type="neutral" lineNumber={10 + i}>
                    {line.value.toLocaleString()} {line.label}
                  </DiffLine>
                ))}
              </div>
            }
          >
            {hasHeatmap && (
              <div className="border-t border-diff-border pt-6">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em] mb-3">
                  Activity map
                </div>
                <ContributionHeatmap
                  totalContributions={contributions.total}
                  year={year}
                  dailyContributions={contributions.dailyContributions}
                  isActive={isActive}
                />
              </div>
            )}
          </SlideDocument>

          <div className="px-6 pb-6 pt-8">
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {contributions.total === 0
                ? `No public contributions detected in ${year}.`
                : contributions.total > 500
                ? `Relentless momentum — you shipped ${contributions.total.toLocaleString()} times in ${year}.`
                : contributions.total > 200
                ? `Steady cadence — ${contributions.total.toLocaleString()} contributions across the year.`
                : contributions.total > 50
                ? `Deliberate progress — ${contributions.total.toLocaleString()} meaningful steps forward.`
                : `Foundations year — every contribution compounds.`}
            </ReviewComment>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
