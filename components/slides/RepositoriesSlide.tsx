'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function RepositoriesSlide({ data }: SlideProps) {
  const { repositories } = data;

  if (repositories.length === 0) {
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileHeader filename="top-projects.md" type="file" />
          <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
            <p className="text-diff-neutral font-mono">
              No repository activity detected this year.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Handle single repo focus
  if (repositories.length === 1) {
    const repo = repositories[0];
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileHeader filename="deep-focus.md" type="file" />
          <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
            <h3 className="font-serif text-3xl text-foreground mb-6">
              Deep Focus
            </h3>
            <DiffLine type="addition">
              <span className="font-bold text-xl">{repo.name}</span>
            </DiffLine>
            <div className="mt-4 space-y-1">
              <DiffLine type="neutral">
                {repo.commits.toLocaleString()} commits
              </DiffLine>
              <DiffLine type="addition">
                +{repo.additions.toLocaleString()} additions
              </DiffLine>
              <DiffLine type="deletion">
                -{repo.deletions.toLocaleString()} deletions
              </DiffLine>
            </div>
            <ReviewComment>
              Laser-focused on mastering one domain. Deep work over scattered effort.
            </ReviewComment>
          </div>
        </motion.div>
      </div>
    );
  }

  // Multiple repos - show ranking
  const topRepos = repositories.slice(0, 5);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="top-projects.diff" type="diff" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Top Repositories by Activity
          </h3>

          <div className="space-y-4">
            {topRepos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-diff-bg rounded-lg p-4 border border-diff-neutral/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-diff-neutral font-mono text-sm">
                        #{index + 1}
                      </span>
                      <span className="font-mono text-foreground font-semibold">
                        {repo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-xs">
                      <span className="text-diff-neutral">
                        {repo.commits} commits
                      </span>
                      <span className="text-diff-addition">
                        +{repo.additions.toLocaleString()}
                      </span>
                      <span className="text-diff-deletion">
                        -{repo.deletions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <ReviewComment>
            {repositories.length > 10
              ? `Active across ${repositories.length} repositories. You balance breadth and depth effectively.`
              : repositories.length > 5
              ? 'A healthy mix of projects. You maintain focus while exploring new ideas.'
              : 'Focused contribution pattern. Quality engagement across key projects.'}
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
