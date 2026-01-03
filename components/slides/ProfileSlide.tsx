'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { DiffLine, FileHeader, ReviewComment, SlideDocument } from '@/components/primitives';
import Image from 'next/image';

export function ProfileSlide({ data, isActive }: SlideProps) {
  const { profile, username, year } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader
          filename={`${username}/github-wrapped-2025.md`}
          type="review"
          status="modified"
        />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10 flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-diff-border bg-diff-gutter">
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                    Profile
                  </div>
                  <div className="mt-2 font-mono text-4xl md:text-5xl leading-tight tracking-tight text-foreground">
                    {profile.name}
                  </div>
                  <div className="mt-2 font-mono text-sm text-diff-neutral">
                    @{username}
                  </div>
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  followers: {profile.followers.toLocaleString()}
                </DiffLine>
                {profile.bio && (
                  <DiffLine type="neutral" lineNumber={2}>
                    bio: {profile.bio}
                  </DiffLine>
                )}
              </div>
            }
            footer={
              <ReviewComment author="github-wrapped-bot" timestamp="just now">
                {profile.followers > 100
                  ? `${profile.followers.toLocaleString()} people subscribed to your work.`
                  : profile.followers > 10
                  ? `You’re building in public — and people are noticing.`
                  : `Quiet year, still moving forward.`}
              </ReviewComment>
            }
          />

        </div>
      </div>
    </motion.div>
  );
}
