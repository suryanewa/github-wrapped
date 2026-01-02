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

          {/* HERO - Top Repository */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 pt-12 pb-8 text-center border-b border-diff-border"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-diff-highlight/20 flex items-center justify-center">
                <span className="text-lg font-bold font-mono text-diff-highlight">#1</span>
              </div>
              <span className="text-xs text-diff-neutral font-mono uppercase tracking-wider">
                Most Active Repository
              </span>
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-4xl md:text-5xl font-bold font-mono text-foreground mb-6"
            >
              {topRepo.name}
            </motion.div>

            {/* Stats for top repo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-3xl font-bold font-mono text-diff-comment mb-1">
                    {topRepo.commits}
                  </div>
                  <div className="text-xs text-diff-neutral font-mono">commits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-mono text-diff-addition mb-1">
                    +{topRepo.additions.toLocaleString()}
                  </div>
                  <div className="text-xs text-diff-neutral font-mono">additions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-mono text-diff-deletion mb-1">
                    −{topRepo.deletions.toLocaleString()}
                  </div>
                  <div className="text-xs text-diff-neutral font-mono">deletions</div>
                </div>
              </div>

              {/* Diff bar for top repo */}
              <div className="flex h-3 rounded-full overflow-hidden bg-diff-gutter">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${(topRepo.additions / (topRepo.additions + topRepo.deletions)) * 100}%` : 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                  className="bg-diff-addition"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${(topRepo.deletions / (topRepo.additions + topRepo.deletions)) * 100}%` : 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                  className="bg-diff-deletion"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Other Top Repos */}
          {otherRepos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-6"
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
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ delay: 0.55 + index * 0.08 }}
                    className="bg-diff-bg border border-diff-border rounded p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-diff-neutral">#{index + 2}</span>
                        <span className="font-mono text-foreground font-semibold">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-diff-comment font-bold">
                        {repo.commits} commits
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex h-1.5 rounded-full overflow-hidden bg-diff-gutter">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? `${(repo.additions / (repo.additions + repo.deletions)) * 100}%` : 0 }}
                          transition={{ delay: 0.6 + index * 0.08, duration: 0.6, ease: 'easeOut' }}
                          className="bg-diff-addition"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? `${(repo.deletions / (repo.additions + repo.deletions)) * 100}%` : 0 }}
                          transition={{ delay: 0.6 + index * 0.08, duration: 0.6, ease: 'easeOut' }}
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
