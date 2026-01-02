'use client';

import { motion } from 'framer-motion';
import { MetricBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function SummarySlide({ data }: SlideProps) {
  const { username, year, archetype, contributions, repositories, languages, impact } = data;

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

  return (
    <div className="w-full min-h-[600px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl"
      >
        {/* PR Summary Card */}
        <div className="bg-diff-surface border-2 border-diff-addition rounded-xl p-8 md:p-10 shadow-2xl">
          {/* PR Header */}
          <div className="flex items-start gap-3 mb-6 pb-6 border-b border-diff-neutral/30">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-diff-addition flex items-center justify-center">
              <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
                Pull Request: {year} Year in Review
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
          <div className="mb-6 pb-6 border-b border-diff-neutral/30">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎭</span>
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
          <div className="space-y-3 mb-6">
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
                <span className="text-diff-highlight font-mono font-bold text-lg">
                  ⭐ {impact.starsEarned.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-diff-neutral/30 flex items-center justify-between">
            <div className="text-xs text-diff-neutral font-mono">
              github-wrapped.dev
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-diff-addition"></div>
              <span className="text-sm text-diff-addition font-mono">Review Complete</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center space-y-3"
        >
          <p className="text-diff-neutral font-mono text-sm">
            Press <span className="text-diff-highlight">Esc</span> to create another review
          </p>
          <p className="text-diff-neutral/50 font-mono text-xs">
            Screenshot this card and share your year in code
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
