'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function ContributionsSlide({ data }: SlideProps) {
  const { contributions, year } = data;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="year-in-review.md" type="diff" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          {/* Diff header */}
          <div className="mb-6 font-mono text-sm text-diff-comment">
            @@ -1,1 +1,1 @@
          </div>

          {/* Previous year (deleted) */}
          <DiffLine type="deletion" lineNumber={1}>
            {year - 1} contributions
          </DiffLine>

          {/* Current year (added) */}
          <DiffLine type="addition" lineNumber={2}>
            <span className="font-bold text-2xl">{contributions.total.toLocaleString()}</span> contributions made in {year}
          </DiffLine>

          {/* Breakdown */}
          <div className="mt-8 space-y-2">
            <div className="font-mono text-sm text-diff-neutral mb-3">
              This year, you added:
            </div>
            <DiffLine type="addition">
              {contributions.commits.toLocaleString()} commits across your repositories
            </DiffLine>
            <DiffLine type="addition">
              {contributions.prs.toLocaleString()} pull requests opened
            </DiffLine>
            <DiffLine type="addition">
              {contributions.issues.toLocaleString()} issues engaged with
            </DiffLine>
            {contributions.reviews > 0 && (
              <DiffLine type="addition">
                {contributions.reviews.toLocaleString()} code reviews provided
              </DiffLine>
            )}
          </div>

          {/* Review comment */}
          <ReviewComment>
            {contributions.total > 500
              ? 'Exceptional momentum throughout the year. Your consistency shows dedication to the craft.'
              : contributions.total > 200
              ? 'Solid contribution pattern. You maintained steady progress all year.'
              : contributions.total > 50
              ? 'Quality work takes time. Every contribution moves the needle forward.'
              : 'Building foundations. Every line of code is a step forward.'}
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
