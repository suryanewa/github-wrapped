'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function ImpactSlide({ data }: SlideProps) {
  const { impact, profile } = data;

  const hasImpact = impact.starsEarned > 0 || impact.forksEarned > 0;

  if (!hasImpact) {
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileHeader filename="community-reach.md" type="file" />
          <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
            <h3 className="font-serif text-2xl text-foreground mb-6">
              Building Foundations
            </h3>
            <div className="space-y-4">
              <DiffLine type="addition">
                Every project starts somewhere
              </DiffLine>
              <DiffLine type="addition">
                {profile.followers} developers following your journey
              </DiffLine>
            </div>
            <ReviewComment>
              Impact isn't always measured in stars. Building in public, learning openly, and contributing consistently—these are the foundations of lasting influence.
            </ReviewComment>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="community-reach.diff" type="diff" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Community Impact
          </h3>

          {/* Diff header */}
          <div className="mb-4 font-mono text-sm text-diff-comment">
            @@ Community Reach @@
          </div>

          {/* Stars and Forks */}
          <div className="space-y-2 mb-8">
            <DiffLine type="addition">
              <span className="font-bold text-xl">{impact.starsEarned.toLocaleString()}</span> stars earned across your work
            </DiffLine>
            <DiffLine type="addition">
              <span className="font-bold text-xl">{impact.forksEarned.toLocaleString()}</span> forks by other developers
            </DiffLine>
            <DiffLine type="addition">
              <span className="font-bold text-xl">{profile.followers.toLocaleString()}</span> followers tracking your journey
            </DiffLine>
          </div>

          {/* Top Project */}
          {impact.topStarredRepo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⭐</span>
                <span className="font-mono text-sm text-diff-neutral">Most Popular Project</span>
              </div>
              <div className="font-mono text-xl text-diff-addition font-bold">
                {impact.topStarredRepo}
              </div>
              <div className="text-sm text-diff-neutral mt-2">
                Your work resonates with the community
              </div>
            </motion.div>
          )}

          {/* Review Comment */}
          <ReviewComment>
            {impact.starsEarned > 1000
              ? 'Exceptional reach. Your work impacts thousands of developers worldwide.'
              : impact.starsEarned > 100
              ? 'Significant impact. Developers are finding value in your contributions.'
              : impact.starsEarned > 10
              ? 'Growing influence. Your work is being discovered and appreciated.'
              : 'Early traction. Every star represents someone who found your work valuable.'}
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
