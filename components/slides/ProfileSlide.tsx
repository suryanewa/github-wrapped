'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { FileHeader } from '@/components/primitives/FileHeader';
import { DiffLine } from '@/components/primitives/DiffLine';
import { ReviewComment } from '@/components/primitives/ReviewComment';
import Image from 'next/image';

export function ProfileSlide({ data, isActive }: SlideProps) {
  const { profile, username, year } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="h-full flex flex-col items-center justify-center px-8"
    >
      <div className="w-full max-w-3xl space-y-6">
        <FileHeader filename={`${username}-${year}.pr`} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.2 }}
          className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-8"
        >
          {/* PR Header */}
          <div className="flex items-start gap-6 mb-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-diff-addition"
            >
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-foreground mb-1"
              >
                {profile.name}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                transition={{ delay: 0.45 }}
                className="font-mono text-diff-neutral mb-3"
              >
                @{username}
              </motion.div>

              {profile.bio && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-diff-neutral mb-3"
                >
                  {profile.bio}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-4 text-sm"
              >
                <div className="flex items-center gap-1">
                  <span className="text-diff-addition font-mono font-bold">
                    {profile.followers.toLocaleString()}
                  </span>
                  <span className="text-diff-neutral">followers</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* PR Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.6 }}
            className="border-t border-diff-neutral/20 pt-6 space-y-2"
          >
            <DiffLine type="neutral" lineNumber={1}>
              Pull Request: {year} Year in Review
            </DiffLine>
            <DiffLine type="addition" lineNumber={2}>
              + wants to merge all of your {year} contributions
            </DiffLine>
            <DiffLine type="neutral" lineNumber={3}>
              into your developer story
            </DiffLine>
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.7 }}
            className="pt-6"
          >
            <ReviewComment author="github-wrapped-bot" line={3}>
              {profile.followers > 100
                ? `With ${profile.followers.toLocaleString()} followers watching, your work resonates beyond your repos.`
                : profile.followers > 50
                ? 'Building an audience. Your code speaks louder than words.'
                : profile.followers > 10
                ? 'Growing your presence. Every follower is someone who believes in your work.'
                : 'Starting your journey. The best developers focus on the craft, not the audience.'}
            </ReviewComment>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
