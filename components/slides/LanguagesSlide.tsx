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

          {/* HERO - Primary Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 pt-12 pb-8 text-center border-b border-diff-border"
          >
            <div className="text-xs text-diff-neutral font-mono mb-4 uppercase tracking-wider">
              Primary Language
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl md:text-7xl font-bold font-mono text-diff-comment mb-6"
            >
              {primaryLang.name}
            </motion.div>

            {/* Percentage bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-diff-neutral font-mono">
                  of your codebase
                </span>
                <span className="text-3xl font-bold font-mono text-diff-comment">
                  {primaryLang.percentage}%
                </span>
              </div>
              <div className="w-full bg-diff-gutter rounded-full h-4 overflow-hidden border border-diff-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${primaryLang.percentage}%` : 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-diff-comment"
                />
              </div>
              <div className="text-xs text-diff-neutral font-mono mt-2">
                ~{primaryLang.linesWritten.toLocaleString()} lines written
              </div>
            </motion.div>
          </motion.div>

          {/* Secondary Languages - if more than 1 */}
          {secondaryLangs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-6"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ delay: 0.55 + index * 0.08 }}
                    className="bg-diff-bg border border-diff-border rounded p-4 text-center"
                  >
                    <div className="text-xl font-bold font-mono text-foreground mb-1">
                      {lang.name}
                    </div>
                    <div className="text-2xl font-bold font-mono text-diff-addition mb-2">
                      {lang.percentage}%
                    </div>
                    <div className="w-full bg-diff-gutter rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${lang.percentage}%` : 0 }}
                        transition={{ delay: 0.6 + index * 0.08, duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-diff-addition"
                      />
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
