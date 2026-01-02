'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function LanguagesSlide({ data, isActive }: SlideProps) {
  const { languages } = data;

  if (languages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="w-full"
      >
        <div className="max-w-4xl">
          <FileHeader filename="languages.json" type="file" status="modified" />
          <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg p-6">
            <p className="text-diff-neutral font-mono">
              No language data available for this year.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Primary and secondary languages
  const primaryLang = languages[0];
  const secondaryLangs = languages.slice(1, 4); // Show top 4 total

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="tech-stack.md" type="file" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="Technology Stack" icon={false} />
            </div>
            <div className="text-xs text-diff-neutral font-mono">
              {languages.length} {languages.length === 1 ? 'language' : 'languages'}
            </div>
          </div>

          {/* HERO - Primary Language - Cinematic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="px-6 pt-12 pb-10 text-center border-b border-diff-border relative overflow-hidden"
          >
            <div className="absolute inset-0 animate-shimmer" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[10px] text-diff-neutral/60 font-mono mb-3 uppercase tracking-[0.2em] font-medium"
            >
              Primary Language
            </motion.div>

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
              className="relative inline-block mb-8"
            >
              <div className="text-7xl md:text-8xl font-bold font-mono text-diff-comment text-display text-glow-blue relative z-10">
                {primaryLang.name}
              </div>
              <div className="absolute inset-0 blur-2xl bg-diff-comment/20 scale-110" />
            </motion.div>

            {/* Percentage bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-diff-neutral font-mono text-body-refined">
                  of your codebase
                </span>
                <span className="text-4xl font-bold font-mono text-diff-comment text-display">
                  {primaryLang.percentage}%
                </span>
              </div>
              <div className="w-full bg-diff-gutter rounded-full h-3 overflow-hidden border border-diff-border/50 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${primaryLang.percentage}%` : 0 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-diff-comment to-diff-comment/80 shadow-lg"
                  style={{ boxShadow: '0 0 10px var(--diff-comment)' }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: 0.8 }}
                className="text-xs text-diff-neutral/80 font-mono mt-2"
              >
                ~{primaryLang.linesWritten.toLocaleString()} lines written
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Secondary Languages - Glass Morphism Cards */}
          {secondaryLangs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-6 py-8"
            >
              <div className="mb-4">
                <h3 className="text-xs text-diff-neutral font-mono uppercase tracking-wider">
                  Also Using
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {secondaryLangs.map((lang, index) => (
                  <motion.div
                    key={lang.name}
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
                    className="glass-panel rounded-lg p-4 text-center group hover-lift cursor-default relative overflow-hidden"
                  >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-diff-addition/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <div className="text-xl font-bold font-mono text-foreground mb-1">
                        {lang.name}
                      </div>
                      <div className="text-2xl font-bold font-mono text-diff-addition text-display mb-2 group-hover:text-glow-green transition-all duration-300">
                        {lang.percentage}%
                      </div>
                      <div className="w-full bg-diff-gutter rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isActive ? `${lang.percentage}%` : 0 }}
                          transition={{ delay: 0.7 + index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-diff-addition"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Show count if more languages */}
              {languages.length > 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center mt-4"
                >
                  <span className="text-xs text-diff-neutral font-mono">
                    + {languages.length - 4} more {languages.length - 4 === 1 ? 'language' : 'languages'}
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.7 }}
            className="px-6 pb-6 border-t border-diff-border pt-4"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {languages.length >= 5
                ? `Polyglot developer working across ${languages.length} languages. Your versatility enables you to choose the right tool for each problem.`
                : languages.length >= 3
                ? `Balanced tech stack with ${languages.length} languages. You combine depth in ${languages[0].name} (${languages[0].percentage}%) with breadth across complementary tools.`
                : languages.length === 2
                ? `Focused on ${languages[0].name} (${languages[0].percentage}%) with ${languages[1].name} as a secondary tool. Strategic specialization drives mastery.`
                : `Deep expertise in ${languages[0].name}. Single-language focus accelerates mastery and compounds knowledge over time.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
