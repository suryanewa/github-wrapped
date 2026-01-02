'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment } from '@/components/primitives';
import { ContributionHeatmap } from '@/components/primitives/ContributionHeatmap';
import { SlideProps } from '@/lib/types';

export function ContributionsSlide({ data, isActive }: SlideProps) {
  const { contributions, year } = data;

  const stats = [
    { label: 'Total contributions', value: contributions.total, icon: '📊' },
    { label: 'Commits pushed', value: contributions.commits, icon: '💾' },
    { label: 'Pull requests', value: contributions.prs, icon: '🔀' },
    { label: 'Issues engaged', value: contributions.issues, icon: '💬' },
    ...(contributions.reviews > 0 ? [{ label: 'Code reviews', value: contributions.reviews, icon: '👀' }] : []),
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
          {/* Diff Header */}
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border font-mono text-xs text-diff-comment">
            @@ -1,1 +1,{stats.length} @@
          </div>

          {/* Stats as Diff Lines */}
          <div className="px-6 py-4 space-y-1">
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
              transition={{ delay: 0.1 }}
            >
              <DiffLine type="deletion" lineNumber={1} showGutter={false}>
                {year - 1} contributions
              </DiffLine>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
              transition={{ delay: 0.15 }}
            >
              <DiffLine type="addition" lineNumber={2} showGutter={false}>
                <span className="font-bold text-xl">{contributions.total.toLocaleString()}</span>
                {' '}contributions made in {year}
              </DiffLine>
            </motion.div>

            {/* Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.2 }}
              className="pt-4"
            >
              <div className="text-xs text-diff-neutral font-mono mb-2 px-6">
                This year, you added:
              </div>
              <div className="space-y-1">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                    transition={{ delay: 0.25 + index * 0.05 }}
                  >
                    <DiffLine type="addition" lineNumber={3 + index} showGutter={false}>
                      <span className="inline-flex items-center gap-2">
                        <span>{stat.icon}</span>
                        <span className="font-semibold">{stat.value.toLocaleString()}</span>
                        <span className="text-diff-neutral">{stat.label}</span>
                      </span>
                    </DiffLine>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Heatmap Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6 border-t border-diff-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 font-mono">
                Contribution Activity
              </h3>
              <p className="text-xs text-diff-neutral font-mono">
                {year} activity visualization
              </p>
            </div>
            <ContributionHeatmap
              totalContributions={contributions.total}
              year={year}
              isActive={isActive}
            />
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.7 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {contributions.total > 500
                ? `${contributions.total.toLocaleString()} contributions represents exceptional momentum throughout ${year}. Your consistency demonstrates dedication to the craft and sustained focus on shipping.`
                : contributions.total > 200
                ? `Solid contribution pattern with ${contributions.total.toLocaleString()} events. You maintained steady progress throughout the year, balancing velocity with thoughtfulness.`
                : contributions.total > 50
                ? `${contributions.total.toLocaleString()} contributions shows deliberate work. Quality takes time, and every contribution moves the needle forward on meaningful projects.`
                : 'Building foundations takes patience. Every line of code, every commit, every review is a step forward in your developer journey.'}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
