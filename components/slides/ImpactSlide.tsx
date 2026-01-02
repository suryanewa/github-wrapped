'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ImpactSlide({ data, isActive }: SlideProps) {
  const { impact, profile } = data;

  const hasImpact = impact.starsEarned > 0 || impact.forksEarned > 0;
  const totalImpact = impact.starsEarned + impact.forksEarned + profile.followers;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader
          filename="community-impact.metrics"
          type="file"
          status={hasImpact ? "added" : "modified"}
        />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="METRICS" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Community reach analysis
              </span>
            </div>
            <div className="text-xs text-diff-neutral font-mono">
              {totalImpact.toLocaleString()} total reach
            </div>
          </div>

          {hasImpact ? (
            <>
              {/* Metric Cards - Glass Morphism */}
              <div className="px-6 py-8 space-y-3">
                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    delay: 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="glass-panel rounded-lg p-5 group hover-lift cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-diff-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-diff-highlight/20 flex items-center justify-center border border-diff-highlight/30">
                          <span className="text-xl">⭐</span>
                        </div>
                        <div>
                          <div className="text-[10px] text-diff-neutral/80 font-mono mb-1 uppercase tracking-wider">Stars Earned</div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-2xl text-diff-highlight font-mono font-bold text-display"
                          >
                            {impact.starsEarned.toLocaleString()}
                          </motion.div>
                        </div>
                      </div>
                      <StatusBadge
                        status={impact.starsEarned > 100 ? 'success' :
                               impact.starsEarned > 10 ? 'warning' : 'neutral'}
                        label={impact.starsEarned > 100 ? 'High' :
                              impact.starsEarned > 10 ? 'Growing' : 'Early'}
                        icon={false}
                      />
                    </div>

                    <div className="w-full bg-diff-gutter rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${Math.min((impact.starsEarned / 1000) * 100, 100)}%` : 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-diff-highlight"
                        style={{ boxShadow: '0 0 6px var(--diff-highlight)' }}
                      />
                    </div>
                    <div className="text-xs text-diff-neutral/80 font-mono mt-2">
                      Developers who bookmarked your work
                    </div>
                  </div>
                </motion.div>

                {/* Forks */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    delay: 0.18,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="glass-panel rounded-lg p-5 group hover-lift cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-diff-addition/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-diff-addition/20 flex items-center justify-center border border-diff-addition/30">
                          <svg className="w-5 h-5 text-diff-addition" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[10px] text-diff-neutral/80 font-mono mb-1 uppercase tracking-wider">Forks Created</div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ delay: 0.23 }}
                            className="text-2xl text-diff-addition font-mono font-bold text-display group-hover:text-glow-green transition-all duration-300"
                          >
                            {impact.forksEarned.toLocaleString()}
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-diff-gutter rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${Math.min((impact.forksEarned / 200) * 100, 100)}%` : 0 }}
                        transition={{ delay: 0.28, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-diff-addition"
                        style={{ boxShadow: '0 0 6px var(--diff-addition)' }}
                      />
                    </div>
                    <div className="text-xs text-diff-neutral/80 font-mono mt-2">
                      Developers building on your code
                    </div>
                  </div>
                </motion.div>

                {/* Followers */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                    scale: isActive ? 1 : 0.95
                  }}
                  transition={{
                    delay: 0.26,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="glass-panel rounded-lg p-5 group hover-lift cursor-default relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-diff-comment/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-diff-comment/20 flex items-center justify-center border border-diff-comment/30">
                          <svg className="w-5 h-5 text-diff-comment" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.482-.236 5.507 5.507 0 00-3.034-4.084A3.002 3.002 0 0011 4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[10px] text-diff-neutral/80 font-mono mb-1 uppercase tracking-wider">Followers</div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isActive ? 1 : 0 }}
                            transition={{ delay: 0.31 }}
                            className="text-2xl text-diff-comment font-mono font-bold text-display"
                          >
                            {profile.followers.toLocaleString()}
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-diff-gutter rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${Math.min((profile.followers / 500) * 100, 100)}%` : 0 }}
                        transition={{ delay: 0.36, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-diff-comment"
                      />
                    </div>
                    <div className="text-xs text-diff-neutral/80 font-mono mt-2">
                      Developers following your journey
                    </div>
                  </div>
                </motion.div>

                {/* Top Project */}
                {impact.topStarredRepo && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 15,
                      scale: isActive ? 1 : 0.95
                    }}
                    transition={{
                      delay: 0.34,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="glass-panel rounded-lg p-5 group hover-lift cursor-default relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-diff-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🏆</span>
                        <span className="text-[10px] text-diff-neutral/80 font-mono uppercase tracking-wider">Most Popular</span>
                      </div>
                      <div className="font-mono text-lg text-foreground font-bold text-display">
                        {impact.topStarredRepo}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          ) : (
            <div className="px-6 py-8">
              <div className="text-center space-y-4">
                <div className="text-4xl">🌱</div>
                <h3 className="font-mono text-xl text-foreground">
                  Building Foundations
                </h3>
                <p className="text-diff-neutral font-mono text-sm max-w-md mx-auto">
                  {profile.followers} developers following your journey. Every project starts somewhere.
                </p>
              </div>
            </div>
          )}

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: hasImpact ? 0.6 : 0.3 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {!hasImpact
                ? `Impact isn't always measured in stars. With ${profile.followers} followers, you're building in public and establishing your presence. Consistency compounds over time.`
                : impact.starsEarned > 1000
                ? `${impact.starsEarned.toLocaleString()} stars represents exceptional community reach. Your work influences thousands of developers worldwide. ${impact.forksEarned} forks show others building on your foundation.`
                : impact.starsEarned > 100
                ? `Significant traction with ${impact.starsEarned} stars and ${impact.forksEarned} forks. Developers are discovering value in your work. ${profile.followers} followers track your ongoing contributions.`
                : impact.starsEarned > 10
                ? `Growing influence: ${impact.starsEarned} stars earned, ${impact.forksEarned} forks created. Early adopters recognize quality. Continue building and sharing.`
                : `Early momentum with ${impact.starsEarned} stars. Every star represents someone who found your work valuable. ${profile.followers} followers see potential in your trajectory.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
