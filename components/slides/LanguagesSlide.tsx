'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, MetricBadge, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function LanguagesSlide({ data }: SlideProps) {
  const { languages } = data;

  if (languages.length === 0) {
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileHeader filename="tech-stack.md" type="file" />
          <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
            <p className="text-diff-neutral font-mono">
              No language data available for this year.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Single language focus
  if (languages.length === 1) {
    const lang = languages[0];
    return (
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileHeader filename="tech-stack.md" type="file" />
          <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
            <h3 className="font-serif text-3xl text-foreground mb-6">
              Laser-Focused on {lang.name}
            </h3>
            <div className="space-y-2">
              <DiffLine type="addition">
                {lang.percentage}% of your codebase
              </DiffLine>
              <DiffLine type="addition">
                ~{lang.linesWritten.toLocaleString()} lines written
              </DiffLine>
            </div>
            <ReviewComment>
              Deep mastery comes from focus. You're building expertise in one domain.
            </ReviewComment>
          </div>
        </motion.div>
      </div>
    );
  }

  // Multiple languages
  const topLanguage = languages[0];
  const otherLanguages = languages.slice(1);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="tech-stack.md" type="diff" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Your Tech Stack
          </h3>

          {/* Primary language */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-semibold text-foreground">
                  {topLanguage.name}
                </span>
                <MetricBadge
                  label="Primary"
                  value={`${topLanguage.percentage}%`}
                  variant="addition"
                />
              </div>
            </div>
            <div className="w-full bg-diff-bg rounded-full h-3 overflow-hidden border border-diff-neutral/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${topLanguage.percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-diff-addition"
              />
            </div>
            <p className="text-sm text-diff-neutral font-mono mt-1">
              ~{topLanguage.linesWritten.toLocaleString()} lines
            </p>
          </div>

          {/* Other languages */}
          <div className="space-y-4">
            {otherLanguages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-foreground">
                    {lang.name}
                  </span>
                  <span className="font-mono text-sm text-diff-neutral">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="w-full bg-diff-bg rounded-full h-2 overflow-hidden border border-diff-neutral/20">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                    className="h-full bg-diff-comment"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <ReviewComment>
            {languages.length >= 5
              ? 'A true polyglot. You navigate multiple languages with confidence.'
              : languages.length >= 3
              ? 'Versatile tech stack. You balance specialization with breadth.'
              : 'Focused toolset. You know your strengths and play to them.'}
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
