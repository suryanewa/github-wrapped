'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { cn } from '@/lib/utils';

export function CollaborationSlide({ data, isActive }: SlideProps) {
  const { collaboration } = data;

  // Determine messaging based on work style
  const getMessage = () => {
    switch (collaboration.workStyle) {
      case 'lone_wolf':
        return {
          title: 'The Lone Wolf',
          description: 'Building in isolation, shipping solo.',
          comment: 'No external repos detected. Pure focus on personal projects.',
        };
      case 'team_player':
        return {
          title: 'Team Player',
          description: `Contributing to ${collaboration.externalRepos} external ${collaboration.externalRepos === 1 ? 'repo' : 'repos'}.`,
          comment: 'Balanced approach: personal projects + selective collaboration.',
        };
      case 'community_builder':
        return {
          title: 'Community Builder',
          description: `Active across ${collaboration.externalRepos} external repos.`,
          comment: 'High collaboration signal. Building in public, shipping with others.',
        };
    }
  };

  const message = getMessage();

  // Visual representation of collaboration network
  const collaborationScore = collaboration.externalRepos > 0
    ? Math.min(100, (collaboration.externalRepos / 10) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="collaboration.yml" type="file" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="Work Style Classification" icon={false} />
            </div>
            <StatusBadge
              status={collaboration.workStyle === 'community_builder' ? 'success' :
                     collaboration.workStyle === 'team_player' ? 'warning' : 'neutral'}
              label={collaboration.workStyle.replace('_', ' ')}
              icon={false}
            />
          </div>

          {/* HERO - Work Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 pt-12 pb-8 text-center border-b border-diff-border"
          >
            <div className="text-xs text-diff-neutral font-mono mb-4 uppercase tracking-wider">
              Your Work Style
            </div>
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={cn(
                "text-5xl md:text-6xl font-bold font-mono mb-4",
                collaboration.workStyle === 'community_builder' ? 'text-diff-addition' :
                collaboration.workStyle === 'team_player' ? 'text-diff-comment' :
                'text-diff-highlight'
              )}
            >
              {message.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="text-foreground/90 font-mono text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-6"
            >
              {message.description}
            </motion.p>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4 max-w-md mx-auto"
            >
              <div>
                <div className="text-4xl font-bold font-mono text-diff-addition mb-1">
                  {collaboration.externalRepos}
                </div>
                <div className="text-xs text-diff-neutral font-mono">external repos</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono text-diff-comment mb-1">
                  {collaboration.uniqueDays}
                </div>
                <div className="text-xs text-diff-neutral font-mono">active days</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Supporting details - simplified */}
          {collaboration.diverseProjects && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-6"
            >
              <div className="max-w-md mx-auto bg-diff-bg border border-diff-border rounded p-4 text-center">
                <div className="text-xs text-diff-neutral font-mono mb-2 uppercase tracking-wider">
                  Diverse Contributor
                </div>
                <div className="text-sm text-foreground/90 font-mono">
                  Active across multiple project types and technologies
                </div>
              </div>
            </motion.div>
          )}

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.9 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {message.comment}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
