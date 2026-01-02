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
            @@ {year} Activity Summary @@
          </div>

          {/* HERO NUMBER - Make it unmissable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 pt-8 pb-6 text-center border-b border-diff-border"
          >
            <div className="text-xs text-diff-neutral font-mono mb-2 uppercase tracking-wider">
              Total Contributions
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-7xl md:text-8xl font-bold font-mono text-diff-addition mb-2"
            >
              {contributions.total.toLocaleString()}
            </motion.div>
            <div className="text-sm text-diff-neutral font-mono">
              commits pushed, PRs opened, issues engaged in {year}
            </div>
          </motion.div>

          {/* Breakdown - Cleaner grid layout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.3 }}
            className="px-6 py-6 border-b border-diff-border"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="bg-diff-bg border border-diff-border rounded p-3 text-center"
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold font-mono text-diff-addition mb-1">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-diff-neutral font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Heatmap Section - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6"
          >
            <div className="mb-3">
              <h3 className="text-xs text-diff-neutral font-mono uppercase tracking-wider">
                Activity Heatmap
              </h3>
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
            transition={{ delay: 0.6 }}
            className="px-6 pb-6 border-t border-diff-border pt-4"
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
