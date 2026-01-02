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

          {/* HERO - Work Style - Cinematic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="px-6 pt-12 pb-10 text-center border-b border-diff-border relative overflow-hidden"
          >
            {/* Subtle background shimmer */}
            <div className="absolute inset-0 animate-shimmer" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[10px] text-diff-neutral/60 font-mono mb-3 uppercase tracking-[0.2em] font-medium"
            >
              Your Work Style
            </motion.div>

            {/* Work Style Title with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.85,
                filter: isActive ? "blur(0px)" : "blur(10px)"
              }}
              transition={{
                delay: 0.25,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative inline-block mb-6"
            >
              <h2 className={cn(
                "text-5xl md:text-6xl font-bold font-mono text-display relative z-10",
                collaboration.workStyle === 'community_builder' && 'text-diff-addition text-glow-green',
                collaboration.workStyle === 'team_player' && 'text-diff-comment text-glow-blue',
                collaboration.workStyle === 'lone_wolf' && 'text-diff-highlight'
              )}>
                {message.title}
              </h2>
              {/* Glow layer for community_builder and team_player */}
              {collaboration.workStyle !== 'lone_wolf' && (
                <div className="absolute inset-0 blur-2xl opacity-30" style={{
                  background: collaboration.workStyle === 'community_builder' ? 'var(--diff-addition)' : 'var(--diff-comment)'
                }} />
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-foreground/90 font-mono text-base md:text-lg text-body-refined leading-relaxed max-w-xl mx-auto mb-8"
            >
              {message.description}
            </motion.p>

            {/* Key stats - Glass Morphism Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid grid-cols-2 gap-3 max-w-md mx-auto"
            >
              {[
                { label: 'external repos', value: collaboration.externalRepos, color: 'text-diff-addition', glow: true },
                { label: 'active days', value: collaboration.uniqueDays, color: 'text-diff-comment', glow: false }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    delay: 0.65 + index * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="glass-panel rounded-lg p-4 group hover-lift cursor-default relative overflow-hidden"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    stat.color === 'text-diff-addition' ? 'from-diff-addition/5' : 'from-diff-comment/5'
                  )} />
                  <div className="relative z-10">
                    <div className={cn(
                      "text-4xl font-bold font-mono text-display mb-1 transition-all duration-300",
                      stat.color,
                      stat.glow && "group-hover:text-glow-green"
                    )}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-diff-neutral/80 font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Supporting details - Glass Panel */}
          {collaboration.diverseProjects && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-6 py-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 15,
                  scale: isActive ? 1 : 0.95
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="max-w-md mx-auto glass-panel rounded-lg p-4 text-center group hover-lift cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-diff-comment/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-[10px] text-diff-neutral/80 font-mono mb-2 uppercase tracking-wider">
                    Diverse Contributor
                  </div>
                  <div className="text-sm text-foreground/90 font-mono text-body-refined">
                    Active across multiple project types and technologies
                  </div>
                </div>
              </motion.div>
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
