'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DiffLine } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function BootSlide({ data, isActive }: SlideProps) {
  const [lineIndex, setLineIndex] = useState(0);

  const lines = [
    '> Initializing review session...',
    `> Fetching commits from ${data.year}...`,
    `> Analyzing ${data.contributions.total} contributions...`,
    '> Computing developer archetype...',
    '> Ranking repositories by impact...',
    '> Detecting coding patterns...',
    '> Generating insights...',
    '> Review ready.',
  ];

  useEffect(() => {
    if (!isActive) {
      setLineIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLineIndex((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [isActive, lines.length]);

  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="space-y-1">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: index <= lineIndex ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <DiffLine type="neutral">
                <span className="text-diff-neutral">{line}</span>
              </DiffLine>
            </motion.div>
          ))}

          {lineIndex === lines.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-diff-highlight font-mono text-sm">
                Press Space or → to continue
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
