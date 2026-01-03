'use client';

import { motion } from 'framer-motion';
import { DiffLine, FileHeader, ReviewComment, SlideDocument } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function ArchetypeSlide({ data, isActive }: SlideProps) {
  const { archetype } = data;

  const rarityConfig = {
    common: { color: 'text-diff-neutral', label: 'Common', prevalence: '~50%', pattern: 'Consistent' },
    uncommon: { color: 'text-diff-success', label: 'Uncommon', prevalence: '<35%', pattern: 'Notable' },
    rare: { color: 'text-diff-comment', label: 'Rare', prevalence: '<15%', pattern: 'Distinctive' },
    legendary: { color: 'text-diff-highlight', label: 'Legendary', prevalence: '<5%', pattern: 'Exceptional' },
  };

  const config = rarityConfig[archetype.rarity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="developer-archetype.ts" type="file" status="added" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          <div className="px-6 py-3 bg-diff-bg border-b border-diff-border font-mono text-xs text-diff-neutral">
            @@ developer-archetype.ts @@
          </div>

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[11px] text-diff-neutral/70 font-mono uppercase tracking-[0.22em]">
                  Your archetype
                </div>
                <div className={`mt-4 font-mono text-6xl md:text-7xl leading-tight tracking-tight ${config.color}`}>
                  {archetype.name}
                </div>
                <div className="mt-4 font-mono text-sm text-diff-neutral max-w-2xl">
                  {archetype.description}
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  rarity: {config.label}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={2}>
                  pattern: {config.pattern}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={3}>
                  prevalence: {config.prevalence}
                </DiffLine>
              </div>
            }
            footer={
              <ReviewComment author="github-wrapped-bot" timestamp="just now">
                {archetype.rarity === 'legendary'
                  ? `A rare signature — it shows up in less than 5% of profiles.`
                  : archetype.rarity === 'rare'
                  ? `Distinctive pattern — you stand out.`
                  : archetype.rarity === 'uncommon'
                  ? `Notable pattern — consistent choices, consistent output.`
                  : `Reliable pattern — steady work compounds.`}
              </ReviewComment>
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
