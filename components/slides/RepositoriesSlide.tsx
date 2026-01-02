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

  const topRepos = repositories.slice(0, 5);
  const totalCommits = topRepos.reduce((sum, repo) => sum + repo.commits, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="repositories.diff" type="diff" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Diff header */}
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border font-mono text-xs text-diff-comment">
            @@ Showing {topRepos.length} changed {topRepos.length === 1 ? 'file' : 'files'} with {totalCommits.toLocaleString()} commits @@
          </div>

          {/* Repository list */}
          <div className="divide-y divide-diff-border">
            {topRepos.map((repo, index) => {
              const totalChanges = repo.additions + repo.deletions;
              const additionPercent = totalChanges > 0 ? (repo.additions / totalChanges) * 100 : 50;
              const deletionPercent = totalChanges > 0 ? (repo.deletions / totalChanges) * 100 : 50;

              return (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="px-6 py-4 hover:bg-diff-surface-hover/30 transition-colors"
                >
                  {/* Repository header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <StatusBadge status="neutral" label={`#${index + 1}`} icon={false} />
                      <span className="font-mono text-foreground font-semibold">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-diff-neutral" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z" />
                      </svg>
                      <span className="font-mono text-sm text-diff-neutral">
                        {repo.commits.toLocaleString()} {repo.commits === 1 ? 'commit' : 'commits'}
                      </span>
                    </div>
                  </div>

                  {/* Diff stat visualization */}
                  <div className="flex items-center gap-3">
                    {/* Visual bar */}
                    <div className="flex-1 flex h-2 rounded-full overflow-hidden bg-diff-gutter">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${additionPercent}%` : 0 }}
                        transition={{
                          delay: 0.2 + index * 0.08,
                          duration: 0.5,
                          ease: 'easeOut'
                        }}
                        className="bg-diff-addition"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${deletionPercent}%` : 0 }}
                        transition={{
                          delay: 0.2 + index * 0.08,
                          duration: 0.5,
                          ease: 'easeOut'
                        }}
                        className="bg-diff-deletion"
                      />
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 font-mono text-xs shrink-0">
                      <span className="text-diff-addition font-semibold">
                        +{repo.additions.toLocaleString()}
                      </span>
                      <span className="text-diff-deletion font-semibold">
                        −{repo.deletions.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Impact indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="mt-2 flex items-center gap-2"
                  >
                    <div className={cn(
                      'h-1 rounded-full',
                      repo.commits > 50 ? 'w-16 bg-diff-addition' :
                      repo.commits > 20 ? 'w-12 bg-diff-comment' :
                      repo.commits > 10 ? 'w-8 bg-diff-highlight' :
                      'w-4 bg-diff-neutral'
                    )} />
                    <span className="text-xs font-mono text-diff-neutral">
                      {repo.commits > 50 ? 'High activity' :
                       repo.commits > 20 ? 'Active' :
                       repo.commits > 10 ? 'Moderate' :
                       'Light contributions'}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary stats */}
          {repositories.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.5 + topRepos.length * 0.08 }}
              className="px-6 py-4 border-t border-diff-border bg-diff-gutter/30"
            >
              <div className="flex items-center justify-between font-mono text-xs text-diff-neutral">
                <span>Showing top {topRepos.length} of {repositories.length} repositories</span>
                <span>{repositories.length - 5} more not shown</span>
              </div>
            </motion.div>
          )}

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.7 + topRepos.length * 0.08 }}
            className="px-6 pb-6 pt-4"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {repositories.length > 10
                ? `Distributed focus across ${repositories.length} repositories. You balance exploration with depth, maintaining active engagement across diverse projects.`
                : repositories.length > 5
                ? `Working across ${repositories.length} repositories demonstrates versatility. ${topRepos[0].name} leads with ${topRepos[0].commits} commits, showing strategic prioritization.`
                : repositories.length > 2
                ? `Concentrated effort in ${repositories.length} key projects. ${topRepos[0].name} received ${Math.round((topRepos[0].commits / totalCommits) * 100)}% of commits—clear focus drives impact.`
                : repositories.length === 2
                ? `Dual-repository focus on ${topRepos[0].name} and ${topRepos[1].name}. Parallel development streams enable efficient context switching.`
                : `Single-repository focus on ${topRepos[0].name} with ${topRepos[0].commits} commits. Depth over breadth accelerates mastery and cumulative progress.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
