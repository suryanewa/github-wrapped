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
          {/* Language badge */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="TypeScript" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Interface definition
              </span>
            </div>
            <div className={cn(
              'px-2 py-1 rounded text-xs font-mono font-semibold',
              config.color,
              config.bg
            )}>
              {config.label}
            </div>
          </div>

          {/* Code Editor View */}
          <div className="relative">
            {/* Line numbers gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-diff-gutter border-r border-diff-border flex flex-col font-mono text-xs text-diff-gutter-text text-right pr-3 py-4 select-none">
              {codeLines.map((_, i) => (
                <div key={i} className="leading-relaxed h-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code content */}
            <div className="pl-14 pr-6 py-4 font-mono text-sm">
              {codeLines.map((line, index) => {
                const getColorClass = (type: string) => {
                  switch (type) {
                    case 'keyword': return 'text-diff-keyword';
                    case 'function': return 'text-diff-function';
                    case 'string': return 'text-diff-string';
                    case 'comment': return 'text-diff-comment';
                    default: return 'text-foreground';
                  }
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -8
                    }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.2,
                      ease: 'easeOut'
                    }}
                    className="leading-relaxed h-6"
                  >
                    <span className={getColorClass(line.type)}>
                      {line.text}
                    </span>
                    {index === codeLines.length - 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          delay: 0.1 + codeLines.length * 0.05,
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 0.5
                        }}
                        className="inline-block w-2 h-4 bg-foreground ml-1 align-middle"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Archetype Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.8 }}
            className="px-6 py-6 border-t border-diff-border"
          >
            <div className="space-y-4">
              {/* Name & Rarity */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-foreground font-mono">
                    {archetype.name}
                  </h3>
                  <div className={cn(
                    'px-2 py-1 rounded text-xs font-mono font-semibold',
                    config.color,
                    config.bg
                  )}>
                    {config.label}
                  </div>
                </div>
                <p className="text-foreground/80 font-mono text-sm leading-relaxed">
                  {archetype.description}
                </p>
              </div>

              {/* Behavioral Traits */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-diff-bg border border-diff-border rounded p-3">
                  <div className="text-xs text-diff-neutral font-mono mb-1">Pattern</div>
                  <div className="text-sm text-foreground font-mono">
                    {archetype.rarity === 'legendary' ? 'Exceptional' :
                     archetype.rarity === 'rare' ? 'Distinctive' :
                     archetype.rarity === 'uncommon' ? 'Notable' : 'Consistent'}
                  </div>
                </div>
                <div className="bg-diff-bg border border-diff-border rounded p-3">
                  <div className="text-xs text-diff-neutral font-mono mb-1">Classification</div>
                  <div className="text-sm text-foreground font-mono">
                    {archetype.rarity.charAt(0).toUpperCase() + archetype.rarity.slice(1)}
                  </div>
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
