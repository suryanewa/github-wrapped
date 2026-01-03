'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { DiffLine, ReviewComment, SlideDocument } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function SummarySlide({ data, isActive }: SlideProps) {
  const { username, year, archetype, contributions, repositories, languages, impact } = data;
  const [copied, setCopied] = useState(false);

  const topLanguage = languages[0]?.name || 'N/A';
  const topRepo = repositories[0]?.name || 'N/A';

  const handleCopyLink = () => {
    const url = `${window.location.origin}?username=${username}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareTwitter = () => {
    const text = `My ${year} GitHub Wrapped 🎉\n${contributions.total.toLocaleString()} contributions | ${archetype.name} archetype | ${topLanguage} developer`;
    const url = `${window.location.origin}?username=${username}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full"
      >
        <div id="summary-card" className="bg-diff-surface border border-diff-border rounded-lg">
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border font-mono text-xs text-diff-neutral">
            @@ year-review-summary.md @@
          </div>

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  Year summary
                </div>
                <div className="mt-4 font-mono text-4xl md:text-5xl leading-tight tracking-tight text-foreground">
                  {archetype.name}.
                </div>
                <div className="mt-3 font-mono text-sm text-diff-neutral max-w-xl">
                  +{contributions.total.toLocaleString()} contributions. Primary: {topLanguage}.
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  user: @{username}
                </DiffLine>
                <DiffLine type="addition" lineNumber={2}>
                  + {contributions.total.toLocaleString()} contributions
                </DiffLine>
                <DiffLine type="neutral" lineNumber={3}>
                  repos touched: {repositories.length}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={4}>
                  top repo: {topRepo}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={5}>
                  primary language: {topLanguage}
                </DiffLine>
                {impact.starsEarned > 0 && (
                  <DiffLine type="neutral" lineNumber={6}>
                    stars earned: {impact.starsEarned.toLocaleString()}
                  </DiffLine>
                )}
              </div>
            }
            footer={
              <div className="pt-2">
                <ReviewComment author="github-wrapped-bot" timestamp={`${year}`}>
                  {archetype.description}
                </ReviewComment>
              </div>
            }
          />
        </div>

        {/* Share Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-diff-surface hover:bg-diff-surface-hover text-foreground border border-diff-border font-mono text-sm rounded transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                  </svg>
                  Copy Link
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShareTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-diff-surface hover:bg-diff-surface-hover text-foreground border border-diff-border font-mono text-sm rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on 𝕏
            </motion.button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4 text-diff-neutral font-mono text-xs">
              <span>
                Press <kbd className="px-2 py-1 bg-diff-gutter border border-diff-border rounded text-diff-neutral">Esc</kbd> to create another
              </span>
              <span className="text-diff-neutral/50">•</span>
              <span>
                <kbd className="px-2 py-1 bg-diff-gutter border border-diff-border rounded text-diff-neutral">?</kbd> for shortcuts
              </span>
            </div>
            <p className="text-diff-neutral/50 font-mono text-xs">
              Screenshot this card to share your year in code
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
