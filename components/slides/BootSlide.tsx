'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideProps } from '@/lib/types';

export function BootSlide({ data, isActive }: SlideProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const lines = [
    { text: `> github-wrapped init --user=${data.username}`, delay: 0 },
    { text: `> Resolving dependencies...`, delay: 300 },
    { text: `✓ Connected to GitHub API`, delay: 600 },
    { text: `> Fetching activity data for ${data.year}...`, delay: 900 },
    { text: `✓ Retrieved ${data.contributions.total.toLocaleString()} contribution events`, delay: 1200 },
    { text: `> Analyzing patterns...`, delay: 1500 },
    { text: `✓ Computed developer archetype: ${data.archetype.name}`, delay: 1800 },
    { text: `✓ Ranked ${data.repositories.length} repositories`, delay: 2100 },
    { text: `✓ Detected ${data.languages.length} primary languages`, delay: 2400 },
    { text: `> Generating insights...`, delay: 2700 },
    { text: `✓ Review session ready`, delay: 3000 },
  ];

  useEffect(() => {
    if (!isActive) {
      setLineIndex(0);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];

    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLineIndex(index + 1);
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isActive]);

  // Cursor blink effect
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        {/* Terminal Header */}
        <div className="bg-diff-surface border border-diff-border rounded-t-lg px-4 py-2.5 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-diff-deletion" />
            <div className="w-3 h-3 rounded-full bg-diff-warning" />
            <div className="w-3 h-3 rounded-full bg-diff-success" />
          </div>
          <div className="flex-1 text-center font-mono text-xs text-diff-neutral">
            {data.username}@github-wrapped: ~/year-in-review-{data.year}
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-diff-bg border-x border-b border-diff-border rounded-b-lg p-6 font-mono text-sm space-y-1">
          <AnimatePresence mode="popLayout">
            {lines.slice(0, lineIndex).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="flex items-start gap-2"
              >
                {line.text.startsWith('✓') ? (
                  <>
                    <span className="text-diff-success flex-shrink-0">✓</span>
                    <span className="text-diff-neutral">{line.text.slice(2)}</span>
                  </>
                ) : line.text.startsWith('>') ? (
                  <>
                    <span className="text-diff-comment flex-shrink-0">$</span>
                    <span className="text-foreground">{line.text.slice(2)}</span>
                  </>
                ) : (
                  <span className="text-diff-neutral">{line.text}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Blinking cursor */}
          {lineIndex > 0 && lineIndex < lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 h-5"
            >
              <span className="text-diff-comment">$</span>
              <span
                className={`inline-block w-2 h-4 bg-foreground transition-opacity ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </motion.div>
          )}

          {/* Ready state */}
          {lineIndex === lines.length && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="pt-6 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-diff-comment">$</span>
                <span className="text-foreground">start review</span>
                <span
                  className={`inline-block w-2 h-4 bg-foreground ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <div className="border-t border-diff-border pt-4 mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-diff-neutral">
                    Press <kbd className="px-1.5 py-0.5 bg-diff-gutter border border-diff-border rounded mx-1">Space</kbd> or
                    <kbd className="px-1.5 py-0.5 bg-diff-gutter border border-diff-border rounded mx-1">→</kbd> to continue
                  </span>
                  <span className="text-diff-neutral-subtle">? for help</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
