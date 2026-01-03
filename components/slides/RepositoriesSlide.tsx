'use client';

import { motion } from 'framer-motion';
import { DiffLine, FileHeader, ReviewComment, SlideDocument, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

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

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  Your top repository
                </div>
                <div className="mt-4 font-mono text-6xl md:text-7xl leading-tight tracking-tight text-diff-highlight">
                  {topRepo.name}
                </div>
                <div className="mt-4 font-mono text-sm text-diff-neutral">
                  {topRepo.commits.toLocaleString()} commits.
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  commits: {topRepo.commits.toLocaleString()}
                </DiffLine>
                <DiffLine type="addition" lineNumber={2}>
                  +{topRepo.additions.toLocaleString()} additions
                </DiffLine>
                <DiffLine type="deletion" lineNumber={3}>
                  -{topRepo.deletions.toLocaleString()} deletions
                </DiffLine>
                {otherRepos.map((repo, i) => (
                  <DiffLine key={repo.name} type="neutral" lineNumber={10 + i}>
                    #{i + 2} {repo.name} — {repo.commits} commits
                  </DiffLine>
                ))}
                {repositories.length > 4 && (
                  <DiffLine type="neutral" lineNumber={10 + otherRepos.length}>
                    +{repositories.length - 4} more repositories
                  </DiffLine>
                )}
              </div>
            }
          />

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.9 }}
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
