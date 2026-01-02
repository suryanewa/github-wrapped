'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment } from '@/components/primitives';
import { ContributionHeatmap } from '@/components/primitives/ContributionHeatmap';
import { SlideProps } from '@/lib/types';
import { BarChart3, GitCommit, GitPullRequest, MessageSquare, Eye } from 'lucide-react';

export function ContributionsSlide({ data, isActive }: SlideProps) {
  const { contributions, year } = data;

  const stats = [
    { label: 'Total contributions', value: contributions.total, Icon: BarChart3 },
    { label: 'Commits pushed', value: contributions.commits, Icon: GitCommit },
    { label: 'Pull requests', value: contributions.prs, Icon: GitPullRequest },
    { label: 'Issues engaged', value: contributions.issues, Icon: MessageSquare },
    ...(contributions.reviews > 0 ? [{ label: 'Code reviews', value: contributions.reviews, Icon: Eye }] : []),
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

          {/* HERO NUMBER - Cinematic Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="px-6 pt-12 pb-10 text-center border-b border-diff-border relative overflow-hidden"
          >
            {/* Subtle background shimmer */}
            <div className="absolute inset-0 animate-shimmer" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[10px] text-diff-neutral/60 font-mono mb-3 uppercase tracking-[0.2em] font-medium"
            >
              Total Contributions
            </motion.div>

            {/* Hero Number with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.85,
                filter: isActive ? "blur(0px)" : "blur(10px)"
              }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative inline-block"
            >
              <div className="text-8xl md:text-9xl font-bold font-mono text-diff-addition text-display text-glow-green mb-4 relative z-10">
                {contributions.total.toLocaleString()}
              </div>
              {/* Glow layer */}
              <div className="absolute inset-0 blur-2xl bg-diff-addition/20 scale-110" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-sm text-diff-neutral font-mono text-body-refined max-w-md mx-auto"
            >
              commits pushed, PRs opened, issues engaged in {year}
            </motion.div>
          </motion.div>

          {/* Breakdown - Glass Morphism Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="px-6 py-8 border-b border-diff-border"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    delay: 0.65 + index * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="glass-panel rounded-lg p-4 text-center group hover-lift cursor-default relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-diff-addition/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                      animate={{
                        scale: isActive ? 1 : 0.8,
                        opacity: isActive ? 1 : 0,
                        rotate: isActive ? 0 : -10
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                      }}
                      transition={{ delay: 0.7 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-2 filter drop-shadow-lg cursor-pointer"
                    >
                      <stat.Icon className="w-6 h-6 text-diff-addition" strokeWidth={2} />
                    </motion.div>
                    <div className="text-3xl font-bold font-mono text-diff-addition text-display mb-2 group-hover:text-glow-green transition-all duration-300">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-diff-neutral/80 font-mono uppercase tracking-wider text-mono-tight">
                      {stat.label}
                    </div>
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
              dailyContributions={contributions.dailyContributions}
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
