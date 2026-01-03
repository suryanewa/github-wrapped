'use client';

import { motion } from 'framer-motion';
import { DiffLine, FileHeader, ReviewComment, SlideDocument, StatusBadge } from '@/components/primitives';
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

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  One thing you wrote in
                </div>
                <div className="mt-4 font-mono text-6xl md:text-7xl leading-none tracking-tight text-diff-comment">
                  {primaryLang.name}
                </div>
                <div className="mt-4 font-mono text-sm text-diff-neutral">
                  {primaryLang.percentage}% of your year’s code.
                </div>
              </div>
            }
            secondary={
              secondaryLangs.length > 0 ? (
                <div className="space-y-1">
                  {secondaryLangs.map((lang, i) => (
                    <DiffLine key={lang.name} type="neutral" lineNumber={30 + i}>
                      {lang.name}: {lang.percentage}% ({lang.linesWritten.toLocaleString()} lines)
                    </DiffLine>
                  ))}
                  {languages.length > 4 && (
                    <DiffLine type="neutral" lineNumber={30 + secondaryLangs.length}>
                      +{languages.length - 4} more
                    </DiffLine>
                  )}
                </div>
              ) : (
                <div className="text-sm text-diff-neutral font-mono">
                  No secondary languages this year.
                </div>
              )
            }
          />

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.9 }}
            className="px-6 pb-6 pt-8 border-t border-diff-border"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {languages.length >= 5
                ? `You worked across ${languages.length} languages — versatile by design.`
                : languages.length >= 3
                ? `Depth in ${languages[0].name}, breadth across ${languages.length - 1} others.`
                : languages.length === 2
                ? `${languages[0].name} + ${languages[1].name}: focused stack, clear defaults.`
                : `Single-language year: all-in on ${languages[0].name}.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
