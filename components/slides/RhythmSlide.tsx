'use client';

import { motion } from 'framer-motion';
import { DiffLine, FileHeader, ReviewComment, SlideDocument, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function RhythmSlide({ data, isActive }: SlideProps) {
  const { rhythm, collaboration } = data;

  // Fallback for collaboration data (for cached/old API responses)
  const uniqueDays = collaboration?.uniqueDays ?? rhythm.longestStreak;

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const getTimeOfDayLabel = (hour: number): string => {
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const weekendPercentage = Math.round(rhythm.weekendRatio * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="activity-patterns.log" type="file" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Header */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="LOG" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Temporal activity analysis
              </span>
            </div>
            <div className="text-xs text-diff-neutral font-mono">
              {uniqueDays} active days
            </div>
          </div>

          <SlideDocument
            isActive={isActive}
            primary={
              <div className="py-6 md:py-10">
                <div className="text-[10px] text-diff-neutral/70 font-mono uppercase tracking-widest mb-4">
                  Peak hour
                </div>
                <div className="font-mono text-7xl md:text-9xl leading-none tracking-tighter text-diff-addition font-bold">
                  {formatHour(rhythm.peakHour)}
                </div>
                <div className="mt-4 font-mono text-base md:text-lg text-diff-neutral/80">
                  Peak hour. {getTimeOfDayLabel(rhythm.peakHour)} coder.
                </div>
              </div>
            }
            secondary={
              <div className="space-y-1">
                <DiffLine type="neutral" lineNumber={1}>
                  peak day: {rhythm.peakDay}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={2}>
                  active days: {uniqueDays}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={3}>
                  longest streak: {rhythm.longestStreak}
                </DiffLine>
                <DiffLine type="neutral" lineNumber={4}>
                  weekends: {weekendPercentage}%
                </DiffLine>
              </div>
            }
          />

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.9 }}
            className="px-6 pb-6 pt-4 border-t border-diff-border"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {rhythm.peakHour >= 22 || rhythm.peakHour <= 4
                ? `Night owl pattern detected. Peak activity at ${formatHour(rhythm.peakHour)} suggests deep work happens when distractions fade. ${rhythm.longestStreak}-day streak shows sustained nocturnal productivity.`
                : rhythm.peakHour >= 5 && rhythm.peakHour <= 9
                ? `Early bird developer. ${formatHour(rhythm.peakHour)} peak indicates morning clarity drives your best work. ${uniqueDays} active days reflects disciplined routine.`
                : weekendPercentage > 40
                ? `Weekend-heavy pattern (${weekendPercentage}%). Peak on ${rhythm.peakDay} suggests side projects and passion work dominate free time. ${rhythm.longestStreak}-day streak shows consistent engagement.`
                : `Balanced rhythm with ${rhythm.peakDay} peak and ${weekendPercentage}% weekend activity. ${uniqueDays} active days across ${rhythm.longestStreak}-day streak demonstrates sustainable long-term engagement.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
