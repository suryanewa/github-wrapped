'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
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
          {/* PR Header Section */}
          <div className="p-6 border-b border-diff-border">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-diff-border bg-diff-gutter">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-diff-success rounded-full border-2 border-diff-surface flex items-center justify-center">
                  <svg className="w-3 h-3 text-diff-bg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-semibold text-foreground mb-1 font-mono">
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-diff-neutral font-mono">@{username}</span>
                    <span className="text-diff-neutral-subtle">•</span>
                    <StatusBadge status="success" label="Active contributor" icon={false} />
                  </div>

                  {profile.bio && (
                    <p className="text-sm text-foreground/80 mb-3 font-mono leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-diff-neutral" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-foreground font-semibold">{profile.followers.toLocaleString()}</span>
                      <span className="text-diff-neutral">followers</span>
                    </div>
                    <span className="text-diff-neutral-subtle">•</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-diff-neutral" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-diff-neutral">Reviewing {year}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* PR Description */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-2 font-mono flex items-center gap-2">
                  <svg className="w-4 h-4 text-diff-comment" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Review Summary
                </h3>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-start gap-2 text-diff-neutral">
                    <span className="text-diff-neutral-subtle select-none">→</span>
                    <span>Preparing comprehensive review of {username}'s {year} contributions</span>
                  </div>
                  <div className="flex items-start gap-2 text-diff-neutral">
                    <span className="text-diff-neutral-subtle select-none">→</span>
                    <span>Analysis includes commits, pull requests, issues, and reviews</span>
                  </div>
                  <div className="flex items-start gap-2 text-diff-neutral">
                    <span className="text-diff-neutral-subtle select-none">→</span>
                    <span>Developer archetype computed from behavioral patterns</span>
                  </div>
                </div>
              </div>

              {/* Metadata badges - Glass Morphism */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-diff-border">
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                  className="inline-flex items-center gap-1 px-2 py-1 glass-panel rounded text-xs font-mono text-diff-neutral hover:scale-105 transition-transform"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {year}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="inline-flex items-center gap-1 px-2 py-1 glass-panel rounded text-xs font-mono text-diff-neutral hover:scale-105 transition-transform"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  github-wrapped
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                  className="inline-flex items-center gap-1 px-2 py-1 glass-panel rounded text-xs font-mono text-diff-neutral hover:scale-105 transition-transform"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  automated-review
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.4 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {profile.followers > 100
                ? `With ${profile.followers.toLocaleString()} followers watching, your contributions resonate beyond your repositories. The developer community recognizes your work.`
                : profile.followers > 50
                ? 'Building an audience through consistent contributions. Your code speaks louder than words.'
                : profile.followers > 10
                ? 'Growing your presence in the developer community. Every follower represents someone who believes in your work.'
                : 'Early in your open source journey. The best developers focus on the craft first, the audience follows naturally.'}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
