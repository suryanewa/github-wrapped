'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MetricBadge, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';
import { Theater, Star } from 'lucide-react';

export function SummarySlide({ data, isActive }: SlideProps) {
  const { username, year, archetype, contributions, repositories, languages, impact } = data;
  const [copied, setCopied] = useState(false);

  const topLanguage = languages[0]?.name || 'N/A';
  const topRepo = repositories[0]?.name || 'N/A';

  const rarityColors = {
    common: 'default' as const,
    uncommon: 'highlight' as const,
    rare: 'addition' as const,
    legendary: 'deletion' as const,
  };

  const rarityLabels = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    legendary: 'Legendary',
  };

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
      className="w-full min-h-[600px] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        {/* PR Summary Card - Premium Glass Morphism */}
        <div id="summary-card" className="glass-panel border-2 border-diff-addition rounded-xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle shimmer effect */}
          <div className="absolute inset-0 animate-shimmer opacity-30" />
          {/* PR Header */}
          <div className="relative z-10 flex items-start gap-3 mb-6 pb-6 border-b border-diff-neutral/30">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-diff-addition flex items-center justify-center">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
                Pull Request: GitHub Wrapped 2025
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-diff-neutral font-mono text-sm">@{username}</span>
                <MetricBadge
                  label="Status"
                  value="Approved"
                  variant="addition"
                />
              </div>
            </div>
          </div>

          {/* Archetype */}
          <div className="relative z-10 mb-6 pb-6 border-b border-diff-neutral/30">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{
                  scale: isActive ? 1 : 0.8,
                  rotate: isActive ? 0 : -10
                }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Theater className="w-6 h-6 text-diff-comment" strokeWidth={2} />
              </motion.div>
              <h3 className="font-serif text-xl text-foreground">
                {archetype.name}
              </h3>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <MetricBadge
                label="Rarity"
                value={rarityLabels[archetype.rarity]}
                variant={rarityColors[archetype.rarity]}
              />
            </div>
            <p className="text-diff-neutral italic">
              "{archetype.description}"
            </p>
          </div>

          {/* Key Stats */}
          <div className="relative z-10 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-diff-neutral font-mono text-sm">Total Contributions</span>
              <span className="text-diff-addition font-mono font-bold text-lg">
                +{contributions.total.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-diff-neutral font-mono text-sm">Repositories Active</span>
              <span className="text-foreground font-mono font-bold text-lg">
                {repositories.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-diff-neutral font-mono text-sm">Top Repository</span>
              <span className="text-foreground font-mono font-bold text-sm">
                {topRepo}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-diff-neutral font-mono text-sm">Primary Language</span>
              <span className="text-diff-comment font-mono font-bold text-sm">
                {topLanguage}
              </span>
            </div>
            {impact.starsEarned > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-diff-neutral font-mono text-sm">Stars Earned</span>
                <span className="text-diff-highlight font-mono font-bold text-lg flex items-center gap-2">
                  <Star className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  {impact.starsEarned.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative z-10 pt-6 border-t border-diff-neutral/30 flex items-center justify-between">
            <div className="text-xs text-diff-neutral font-mono">
              github-wrapped.dev
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-diff-addition"></div>
              <span className="text-sm text-diff-addition font-mono">Review Complete</span>
            </div>
          </div>
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
              className="flex items-center gap-2 px-4 py-2 bg-diff-comment hover:bg-diff-comment/80 text-black font-mono text-sm font-semibold rounded transition-colors"
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
              className="flex items-center gap-2 px-4 py-2 bg-diff-addition hover:bg-diff-addition/80 text-black font-mono text-sm font-semibold rounded transition-colors"
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
                Press <kbd className="px-2 py-1 bg-diff-gutter border border-diff-border rounded text-diff-highlight">Esc</kbd> to create another
              </span>
              <span className="text-diff-neutral/50">•</span>
              <span>
                <kbd className="px-2 py-1 bg-diff-gutter border border-diff-border rounded text-diff-highlight">?</kbd> for shortcuts
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
