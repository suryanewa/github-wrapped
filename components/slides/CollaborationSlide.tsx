'use client';

import { motion } from 'framer-motion';
import { SlideProps } from '@/lib/types';
import { FileHeader } from '@/components/primitives/FileHeader';
import { DiffLine } from '@/components/primitives/DiffLine';
import { ReviewComment } from '@/components/primitives/ReviewComment';

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
      className="h-full flex flex-col items-center justify-center px-8"
    >
      <div className="w-full max-w-3xl space-y-6">
        <FileHeader filename="collaboration-signal.md" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Title */}
          <div className="space-y-2">
            <DiffLine type="addition" lineNumber={1}>
              # {message.title}
            </DiffLine>
            <DiffLine type="neutral" lineNumber={2}>
              {message.description}
            </DiffLine>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.4 }}
            className="space-y-2 pt-4"
          >
            <DiffLine type="neutral" lineNumber={4}>
              ## Stats
            </DiffLine>
            <DiffLine type="addition" lineNumber={5}>
              External repos: {collaboration.externalRepos}
            </DiffLine>
            <DiffLine type="addition" lineNumber={6}>
              Days active: {collaboration.uniqueDays}
            </DiffLine>
            {collaboration.diverseProjects && (
              <DiffLine type="addition" lineNumber={7}>
                Diverse contributor: true
              </DiffLine>
            )}
          </motion.div>

          {/* Style classification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 pt-4"
          >
            <DiffLine type="neutral" lineNumber={9}>
              ## Classification
            </DiffLine>
            <DiffLine type="deletion" lineNumber={10}>
              - work_style: "unknown"
            </DiffLine>
            <DiffLine type="addition" lineNumber={11}>
              + work_style: "{collaboration.workStyle}"
            </DiffLine>
          </motion.div>

          {/* Review comment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.8 }}
            className="pt-6"
          >
            <ReviewComment author="github-wrapped-bot">
              {message.comment}
            </ReviewComment>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
