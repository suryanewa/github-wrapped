'use client';

import { motion } from 'framer-motion';
import { FileHeader, DiffLine, MetricBadge, ReviewComment } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function RhythmSlide({ data }: SlideProps) {
  const { rhythm, collaboration } = data;

  const formatHour = (hour: number): string => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  const getTimeOfDayLabel = (hour: number): string => {
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const weekendPercentage = Math.round(rhythm.weekendRatio * 100);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileHeader filename="coding-patterns.log" type="file" />

        <div className="bg-diff-surface border border-diff-neutral/30 border-t-0 rounded-b-lg p-6 md:p-8">
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Your Coding Rhythm
          </h3>

          {/* Peak Activity */}
          <div className="space-y-6">
            {/* Peak Hour */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⏰</span>
                    <span className="font-mono text-sm text-diff-neutral">Peak Hour</span>
                  </div>
                  <div className="font-mono text-2xl text-diff-addition font-bold">
                    {formatHour(rhythm.peakHour)}
                  </div>
                  <div className="text-sm text-diff-neutral mt-1">
                    Most productive during the {getTimeOfDayLabel(rhythm.peakHour).toLowerCase()}
                  </div>
                </div>
                <MetricBadge
                  label={getTimeOfDayLabel(rhythm.peakHour)}
                  value="Peak"
                  variant="addition"
                />
              </div>
            </motion.div>

            {/* Peak Day */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📅</span>
                    <span className="font-mono text-sm text-diff-neutral">Peak Day</span>
                  </div>
                  <div className="font-mono text-2xl text-diff-comment font-bold">
                    {rhythm.peakDay}
                  </div>
                  <div className="text-sm text-diff-neutral mt-1">
                    Your most active day of the week
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grid: Days Active + Weekend Ratio + Longest Streak */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📆</span>
                  <span className="font-mono text-sm text-diff-neutral">Days Active</span>
                </div>
                <div className="font-mono text-2xl text-diff-addition font-bold">
                  {collaboration.uniqueDays}
                </div>
                <div className="text-sm text-diff-neutral mt-1">
                  {collaboration.uniqueDays > 200
                    ? 'Highly consistent'
                    : collaboration.uniqueDays > 100
                    ? 'Regular contributor'
                    : collaboration.uniqueDays > 50
                    ? 'Active developer'
                    : 'Building momentum'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏖️</span>
                  <span className="font-mono text-sm text-diff-neutral">Weekend Work</span>
                </div>
                <div className="font-mono text-2xl text-foreground font-bold">
                  {weekendPercentage}%
                </div>
                <div className="text-sm text-diff-neutral mt-1">
                  {weekendPercentage > 40
                    ? 'Weekend warrior mode'
                    : weekendPercentage > 20
                    ? 'Balanced schedule'
                    : 'Weekday focused'}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-diff-bg rounded-lg p-5 border border-diff-neutral/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <span className="font-mono text-sm text-diff-neutral">Longest Streak</span>
                </div>
                <div className="font-mono text-2xl text-diff-highlight font-bold">
                  {rhythm.longestStreak} days
                </div>
                <div className="text-sm text-diff-neutral mt-1">
                  {rhythm.longestStreak > 30
                    ? 'Exceptional consistency'
                    : rhythm.longestStreak > 14
                    ? 'Strong momentum'
                    : rhythm.longestStreak > 7
                    ? 'Building habits'
                    : 'Every day counts'}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Review Comment */}
          <ReviewComment>
            {rhythm.peakHour >= 22 || rhythm.peakHour <= 4
              ? 'Night owl detected. Your late-night coding sessions fuel tomorrow\'s breakthroughs.'
              : rhythm.peakHour >= 5 && rhythm.peakHour <= 9
              ? 'Early bird gets the commit. Morning clarity drives your best work.'
              : weekendPercentage > 40
              ? 'Weekend builder. Side projects and passion work happen when others rest.'
              : 'Consistent work rhythm. You\'ve found a cadence that works for you.'}
          </ReviewComment>
        </div>
      </motion.div>
    </div>
  );
}
