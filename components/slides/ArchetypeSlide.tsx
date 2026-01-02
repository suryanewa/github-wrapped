'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ArchetypeSlide({ data, isActive }: SlideProps) {
  const { archetype } = data;

  const rarityConfig = {
    common: { color: 'text-diff-neutral', bg: 'bg-diff-neutral/10', label: 'Common' },
    uncommon: { color: 'text-diff-success', bg: 'bg-diff-success/10', label: 'Uncommon' },
    rare: { color: 'text-diff-comment', bg: 'bg-diff-comment/10', label: 'Rare' },
    legendary: { color: 'text-diff-highlight', bg: 'bg-diff-highlight/10', label: 'Legendary' },
  };

  const config = rarityConfig[archetype.rarity];

  // TypeScript-style code with syntax highlighting
  const codeLines = [
    { type: 'keyword', text: 'interface' },
    { type: 'function', text: ' Developer ' },
    { type: 'neutral', text: '{' },
    { type: 'neutral', text: '  archetype', indent: 1 },
    { type: 'neutral', text: ': ' },
    { type: 'string', text: `"${archetype.name}"` },
    { type: 'neutral', text: ';' },
    { type: 'neutral', text: '  description', indent: 1 },
    { type: 'neutral', text: ': ' },
    { type: 'string', text: `"${archetype.description}"` },
    { type: 'neutral', text: ';' },
    { type: 'neutral', text: '  rarity', indent: 1 },
    { type: 'neutral', text: ': ' },
    { type: 'string', text: `"${archetype.rarity}"` },
    { type: 'neutral', text: ';' },
    { type: 'neutral', text: '}' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="developer-archetype.ts" type="file" status="added" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header with rarity */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="Developer Classification" icon={false} />
            </div>
            <div className={cn(
              'px-3 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider',
              config.color,
              config.bg
            )}>
              {config.label}
            </div>
          </div>

          {/* HERO - Archetype Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 pt-12 pb-8 text-center border-b border-diff-border"
          >
            <div className="text-xs text-diff-neutral font-mono mb-4 uppercase tracking-wider">
              Your Developer Archetype
            </div>
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={cn(
                "text-5xl md:text-6xl font-bold font-mono mb-4",
                config.color
              )}
            >
              {archetype.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.4 }}
              className="text-foreground/90 font-mono text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {archetype.description}
            </motion.p>
          </motion.div>

          {/* Supporting Details - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6"
          >
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
              <div className="bg-diff-bg border border-diff-border rounded p-4 text-center">
                <div className="text-xs text-diff-neutral font-mono mb-2">Rarity</div>
                <div className={cn("text-lg font-bold font-mono", config.color)}>
                  {config.label}
                </div>
              </div>
              <div className="bg-diff-bg border border-diff-border rounded p-4 text-center">
                <div className="text-xs text-diff-neutral font-mono mb-2">Pattern</div>
                <div className="text-lg font-bold font-mono text-foreground">
                  {archetype.rarity === 'legendary' ? 'Exceptional' :
                   archetype.rarity === 'rare' ? 'Distinctive' :
                   archetype.rarity === 'uncommon' ? 'Notable' : 'Consistent'}
                </div>
              </div>
              <div className="bg-diff-bg border border-diff-border rounded p-4 text-center">
                <div className="text-xs text-diff-neutral font-mono mb-2">Prevalence</div>
                <div className="text-lg font-bold font-mono text-foreground">
                  {archetype.rarity === 'legendary' ? '<5%' :
                   archetype.rarity === 'rare' ? '<15%' :
                   archetype.rarity === 'uncommon' ? '<35%' : '~50%'}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 1 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {archetype.rarity === 'legendary'
                ? `${archetype.name} represents a truly exceptional development pattern. This behavioral signature appears in less than 5% of analyzed developers.`
                : archetype.rarity === 'rare'
                ? `The ${archetype.name} archetype indicates distinctive work patterns. Your approach shows unique characteristics that set you apart.`
                : archetype.rarity === 'uncommon'
                ? `${archetype.name} is an uncommon but valuable pattern. Your development style reflects thoughtful choices and consistent execution.`
                : `${archetype.name} represents solid, reliable development patterns. Consistency and steady progress define your approach to code.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
