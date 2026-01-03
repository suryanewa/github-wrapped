'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { DiffLine, FileHeader, ReviewComment, SlideDocument, StatusBadge } from '@/components/primitives';

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

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  Work style
                </div>
                <div className="mt-4 font-mono text-5xl md:text-6xl leading-tight tracking-tight text-foreground">
                  {message.title}
                </div>
                <div className="mt-4 font-mono text-sm text-diff-neutral max-w-xl">
                  {message.description}
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  external repos: {collaboration.externalRepos}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={2}>
                  active days: {collaboration.uniqueDays}
                </DiffLine>
                {collaboration.diverseProjects && (
                  <DiffLine type="neutral" lineNumber={3}>
                    note: diverse contributor
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
