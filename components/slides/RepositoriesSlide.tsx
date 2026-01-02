'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function RepositoriesSlide({ data, isActive }: SlideProps) {
  const { repositories } = data;

  if (repositories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="w-full"
      >
        <div className="max-w-4xl">
          <FileHeader filename="repositories.diff" type="diff" status="modified" />
          <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg p-6">
            <p className="text-diff-neutral font-mono">
              No repository activity detected this year.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const topRepo = repositories[0];
  const otherRepos = repositories.slice(1, 4); // Show top 4 total
  const totalCommits = repositories.reduce((sum, repo) => sum + repo.commits, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="top-projects.md" type="file" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="Top Projects" icon={false} />
            </div>
            <span className="font-mono text-xs text-diff-comment">
              {totalCommits.toLocaleString()} total commits
            </span>
          </div>

          {/* HERO - Top Repository - Cinematic */}
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
              className="flex items-center justify-center gap-2 mb-3"
            >
              <div className="w-8 h-8 rounded-full bg-diff-highlight/20 flex items-center justify-center border border-diff-highlight/30">
                <span className="text-sm font-bold font-mono text-diff-highlight">#1</span>
              </div>
              <span className="text-[10px] text-diff-neutral/60 font-mono uppercase tracking-[0.2em] font-medium">
                Most Active Repository
              </span>
            </motion.div>

            {/* Repository Name with Glow */}
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
              className="relative inline-block mb-8"
            >
              <div className="text-5xl md:text-6xl font-bold font-mono text-diff-highlight text-display relative z-10">
                {topRepo.name}
              </div>
              <div className="absolute inset-0 blur-2xl bg-diff-highlight/20 scale-110" />
            </motion.div>

            {/* Stats Grid - Glass Morphism Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="max-w-xl mx-auto"
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'commits', value: topRepo.commits, color: 'text-diff-comment', glow: false },
                  { label: 'additions', value: topRepo.additions, color: 'text-diff-addition', glow: true, prefix: '+' },
                  { label: 'deletions', value: topRepo.deletions, color: 'text-diff-deletion', glow: false, prefix: '−' }
                ].map((stat, index) => (
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
                    className="glass-panel rounded-lg p-4 group hover-lift cursor-default relative overflow-hidden"
                  >
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      stat.color === 'text-diff-addition' ? 'from-diff-addition/5' :
                      stat.color === 'text-diff-deletion' ? 'from-diff-deletion/5' : 'from-diff-comment/5'
                    )} />
                    <div className="relative z-10">
                      <div className={cn(
                        "text-3xl font-bold font-mono text-display mb-1 transition-all duration-300",
                        stat.color,
                        stat.glow && "group-hover:text-glow-green"
                      )}>
                        {stat.prefix || ''}{stat.value.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-diff-neutral/80 font-mono uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Diff Bar with Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="flex h-3 rounded-full overflow-hidden bg-diff-gutter border border-diff-border/50 shadow-inner"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${(topRepo.additions / (topRepo.additions + topRepo.deletions)) * 100}%` : 0 }}
                  transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-diff-addition"
                  style={{ boxShadow: '0 0 8px var(--diff-addition)' }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${(topRepo.deletions / (topRepo.additions + topRepo.deletions)) * 100}%` : 0 }}
                  transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-diff-deletion"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Other Top Repos - Glass Morphism Cards */}
          {otherRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-6 py-8"
            >
              <div className="mb-4">
                <h3 className="text-xs text-diff-neutral font-mono uppercase tracking-wider">
                  Other Active Projects
                </h3>
              </div>
              <div className="space-y-3 max-w-2xl mx-auto">
                {otherRepos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
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
                    className="glass-panel rounded-lg p-4 group hover-lift cursor-default relative overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-diff-comment/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-diff-neutral/10 flex items-center justify-center border border-diff-neutral/20">
                            <span className="text-[10px] font-bold font-mono text-diff-neutral">#{index + 2}</span>
                          </div>
                          <span className="font-mono text-foreground font-semibold">
                            {repo.name}
                          </span>
                        </div>
                        <span className="text-sm font-mono text-diff-comment font-bold text-display">
                          {repo.commits}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex h-2 rounded-full overflow-hidden bg-diff-gutter">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? `${(repo.additions / (repo.additions + repo.deletions)) * 100}%` : 0 }}
                            transition={{ delay: 0.7 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-diff-addition"
                          />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? `${(repo.deletions / (repo.additions + repo.deletions)) * 100}%` : 0 }}
                            transition={{ delay: 0.7 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-diff-deletion"
                          />
                        </div>
                        <span className="text-xs font-mono text-diff-addition font-semibold">
                          +{repo.additions.toLocaleString()}
                        </span>
                        <span className="text-xs font-mono text-diff-deletion font-semibold">
                          −{repo.deletions.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show count if more repositories */}
              {repositories.length > 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-4"
                >
                  <span className="text-xs text-diff-neutral font-mono">
                    + {repositories.length - 4} more {repositories.length - 4 === 1 ? 'repository' : 'repositories'}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.7 }}
            className="px-6 pb-6 pt-4 border-t border-diff-border"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {repositories.length > 10
                ? `Distributed focus across ${repositories.length} repositories. You balance exploration with depth, maintaining active engagement across diverse projects.`
                : repositories.length > 5
                ? `Working across ${repositories.length} repositories demonstrates versatility. ${topRepo.name} leads with ${topRepo.commits} commits, showing strategic prioritization.`
                : repositories.length > 2
                ? `Concentrated effort in ${repositories.length} key projects. ${topRepo.name} received ${Math.round((topRepo.commits / totalCommits) * 100)}% of commits—clear focus drives impact.`
                : repositories.length === 2
                ? `Dual-repository focus on ${repositories[0].name} and ${repositories[1].name}. Parallel development streams enable efficient context switching.`
                : `Single-repository focus on ${topRepo.name} with ${topRepo.commits} commits. Depth over breadth accelerates mastery and cumulative progress.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
