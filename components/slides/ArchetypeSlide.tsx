'use client';

import { motion } from 'framer-motion';
import { FileHeader, MetricBadge, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function ArchetypeSlide({ data }: SlideProps) {
  const { archetype, username, rhythm } = data;

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
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="developer-identity.ts" type="file" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          {/* Code block */}
          <div className="bg-diff-bg rounded-lg p-6 font-mono text-sm border border-diff-neutral/20">
            <div className="space-y-1">
              <div>
                <span className="text-diff-comment">const</span>{' '}
                <span className="text-diff-highlight">developer</span>{' '}
                <span className="text-diff-neutral">=</span>{' '}
                <span className="text-diff-neutral">{'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-diff-addition">username</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-deletion">"{username}"</span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-4">
                <span className="text-diff-addition">archetype</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-deletion">"{archetype.name}"</span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-4">
                <span className="text-diff-addition">rarity</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-deletion">"{rarityLabels[archetype.rarity]}"</span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-4">
                <span className="text-diff-addition">traits</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-neutral">{'{'}</span>
              </div>
              <div className="pl-8">
                <span className="text-diff-addition">peakActivity</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-deletion">
                  "{rhythm.peakHour}:00 - {(rhythm.peakHour + 2) % 24}:00"
                </span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-8">
                <span className="text-diff-addition">favoriteDay</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-deletion">"{rhythm.peakDay}"</span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-8">
                <span className="text-diff-addition">longestStreak</span>
                <span className="text-diff-neutral">:</span>{' '}
                <span className="text-diff-highlight">{rhythm.longestStreak}</span>
                <span className="text-diff-neutral">,</span>
              </div>
              <div className="pl-4">
                <span className="text-diff-neutral">{'}'}</span>
              </div>
              <div>
                <span className="text-diff-neutral">{'}'};</span>
              </div>
            </div>
          </div>

          {/* Archetype details */}
          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-serif text-3xl text-foreground mb-2">
                {archetype.name}
              </h3>
              <div className="flex items-center gap-3">
                <MetricBadge
                  label="Rarity"
                  value={rarityLabels[archetype.rarity]}
                  variant={rarityColors[archetype.rarity]}
                />
              </div>
            </div>

            <p className="text-lg text-diff-neutral">
              {archetype.description}
            </p>
          </div>

          {/* Review comment */}
          <ReviewComment>
            Your coding patterns reveal a unique workflow. This archetype emerged from analyzing your commit timing, repository focus, and contribution rhythm throughout the year.
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
