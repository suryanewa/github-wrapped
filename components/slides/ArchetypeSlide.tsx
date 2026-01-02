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

          {/* HERO - Archetype Name - Cinematic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="px-6 pt-12 pb-10 text-center border-b border-diff-border relative overflow-hidden"
          >
            {/* Subtle background shimmer */}
            <div className="absolute inset-0 animate-shimmer" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-[10px] text-diff-neutral/60 font-mono mb-4 uppercase tracking-[0.2em] font-medium"
            >
              Your Developer Archetype
            </motion.div>

            {/* Archetype Name with Rarity-based Glow */}
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
              className="relative inline-block mb-6"
            >
              <h2 className={cn(
                "text-6xl md:text-7xl font-bold font-mono text-display relative z-10",
                config.color,
                archetype.rarity === 'legendary' && 'text-glow-blue',
                archetype.rarity === 'rare' && 'text-glow-blue'
              )}>
                {archetype.name}
              </h2>
              {/* Glow layer for legendary/rare */}
              {(archetype.rarity === 'legendary' || archetype.rarity === 'rare') && (
                <div className="absolute inset-0 blur-2xl opacity-30" style={{
                  background: archetype.rarity === 'legendary' ? 'var(--diff-highlight)' : 'var(--diff-comment)'
                }} />
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-foreground/90 font-mono text-base md:text-lg text-body-refined max-w-2xl mx-auto leading-relaxed"
            >
              {archetype.description}
            </motion.p>
          </motion.div>

          {/* Supporting Details - Glass Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="px-6 py-8"
          >
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
              {[
                { label: 'Rarity', value: config.label, color: config.color },
                { label: 'Pattern', value: archetype.rarity === 'legendary' ? 'Exceptional' :
                   archetype.rarity === 'rare' ? 'Distinctive' :
                   archetype.rarity === 'uncommon' ? 'Notable' : 'Consistent', color: 'text-foreground' },
                { label: 'Prevalence', value: archetype.rarity === 'legendary' ? '<5%' :
                   archetype.rarity === 'rare' ? '<15%' :
                   archetype.rarity === 'uncommon' ? '<35%' : '~50%', color: 'text-foreground' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
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
                  <div className="absolute inset-0 bg-gradient-to-br from-diff-comment/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="text-[10px] text-diff-neutral/80 font-mono mb-2 uppercase tracking-wider">
                      {item.label}
                    </div>
                    <div className={cn("text-xl font-bold font-mono text-display", item.color)}>
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
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
