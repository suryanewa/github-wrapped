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
              <StatusBadge status="neutral" label="YAML" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Collaboration profile
              </span>
            </div>
            <StatusBadge
              status={collaboration.workStyle === 'community_builder' ? 'success' :
                     collaboration.workStyle === 'team_player' ? 'warning' : 'neutral'}
              label={message.title}
              icon={false}
            />
          </div>

          {/* YAML Content with Line Numbers */}
          <div className="relative">
            {/* Line numbers gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-diff-gutter border-r border-diff-border flex flex-col font-mono text-xs text-diff-gutter-text text-right pr-3 py-4 select-none">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="leading-relaxed h-6">
                  {num}
                </div>
              ))}
            </div>

            {/* YAML content */}
            <div className="pl-14 pr-6 py-4 font-mono text-sm space-y-0">
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.1 }}
                className="leading-relaxed h-6 text-diff-comment"
              >
                # Collaboration Profile
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.15 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">work_style</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-string">"{collaboration.workStyle}"</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.2 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">external_repos</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-keyword">{collaboration.externalRepos}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.25 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">unique_days</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-keyword">{collaboration.uniqueDays}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.3 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">diverse_projects</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-keyword">{collaboration.diverseProjects ? 'true' : 'false'}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.35 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">archetype</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-string">"{message.title}"</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.4 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">description</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-string">"{message.description}"</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.45 }}
                className="leading-relaxed h-6"
              >
                <span className="text-diff-keyword">collaboration_score</span>
                <span className="text-foreground">: </span>
                <span className="text-diff-keyword">{Math.round(collaborationScore)}</span>
              </motion.div>
            </div>
          </div>

          {/* Visualization Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6 border-t border-diff-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 font-mono">
                Collaboration Network
              </h3>
              <p className="text-xs text-diff-neutral font-mono">
                {message.description}
              </p>
            </div>

            {/* Network visualization */}
            <div className="relative h-32 bg-diff-gutter rounded-lg overflow-hidden flex items-center justify-center">
              {/* Center node (user) */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isActive ? 1 : 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
                className="absolute w-12 h-12 rounded-full bg-diff-comment border-2 border-diff-border z-10 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-foreground" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.75.75 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z" />
                </svg>
              </motion.div>

              {/* External repos (nodes around center) */}
              {Array.from({ length: Math.min(collaboration.externalRepos, 8) }).map((_, index) => {
                const angle = (index / Math.min(collaboration.externalRepos, 8)) * Math.PI * 2;
                const radius = 48;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: isActive ? 1 : 0,
                      x: isActive ? x : 0,
                      y: isActive ? y : 0
                    }}
                    transition={{
                      delay: 0.65 + index * 0.05,
                      type: 'spring',
                      stiffness: 150
                    }}
                    className="absolute w-6 h-6 rounded-full bg-diff-addition border border-diff-border"
                  />
                );
              })}

              {/* Connection lines */}
              {Array.from({ length: Math.min(collaboration.externalRepos, 8) }).map((_, index) => {
                const angle = (index / Math.min(collaboration.externalRepos, 8)) * Math.PI * 2;
                const radius = 48;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.svg
                    key={`line-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.3 : 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="absolute w-full h-full pointer-events-none"
                    style={{ left: 0, top: 0 }}
                  >
                    <line
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-diff-comment"
                    />
                  </motion.svg>
                );
              })}
            </div>

            {/* Stats badges */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-diff-bg border border-diff-border rounded p-3">
                <div className="text-xs text-diff-neutral font-mono mb-1">External Repos</div>
                <div className="text-lg text-diff-addition font-mono font-bold">
                  {collaboration.externalRepos}
                </div>
              </div>
              <div className="bg-diff-bg border border-diff-border rounded p-3">
                <div className="text-xs text-diff-neutral font-mono mb-1">Active Days</div>
                <div className="text-lg text-diff-comment font-mono font-bold">
                  {collaboration.uniqueDays}
                </div>
              </div>
            </div>
          </motion.div>

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
