'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';
import { cn } from '@/lib/utils';

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

  // Generate hourly activity visualization (simulated distribution based on peak hour)
  const generateHourlyActivity = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const distance = Math.min(
        Math.abs(hour - rhythm.peakHour),
        Math.abs(hour + 24 - rhythm.peakHour),
        Math.abs(hour - 24 - rhythm.peakHour)
      );
      const baseActivity = Math.max(0, 100 - (distance * 15));
      const variance = Math.random() * 20 - 10;
      return Math.max(5, Math.min(100, baseActivity + variance));
    });
  };

  const hourlyActivity = generateHourlyActivity();
  const maxActivity = Math.max(...hourlyActivity);

  // Day of week activity (simulated based on peak day)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const peakDayIndex = daysOfWeek.indexOf(rhythm.peakDay);

  const generateWeeklyActivity = () => {
    return daysOfWeek.map((day, index) => {
      const distance = Math.abs(index - peakDayIndex);
      const baseActivity = Math.max(0, 100 - (distance * 20));
      const isWeekend = index === 0 || index === 6;
      const weekendMultiplier = isWeekend ? rhythm.weekendRatio : 1;
      return Math.max(10, baseActivity * weekendMultiplier);
    });
  };

  const weeklyActivity = generateWeeklyActivity();
  const maxWeeklyActivity = Math.max(...weeklyActivity);

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

          {/* Activity Timeline - Hourly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.1 }}
            className="px-6 py-6 border-b border-diff-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 font-mono">
                24-Hour Activity Pattern
              </h3>
              <p className="text-xs text-diff-neutral font-mono">
                Peak: {formatHour(rhythm.peakHour)} ({getTimeOfDayLabel(rhythm.peakHour)})
              </p>
            </div>

            {/* Hour labels and bars */}
            <div className="space-y-1">
              {hourlyActivity.map((activity, hour) => {
                const isPeak = hour === rhythm.peakHour;
                const height = (activity / maxActivity) * 100;

                return (
                  <motion.div
                    key={hour}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
                    transition={{ delay: 0.15 + hour * 0.015 }}
                    className="flex items-center gap-2 group"
                  >
                    <span className={cn(
                      'text-xs font-mono w-12 text-right',
                      isPeak ? 'text-diff-addition font-bold' : 'text-diff-neutral'
                    )}>
                      {formatHour(hour)}
                    </span>
                    <div className="flex-1 bg-diff-gutter rounded-sm h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? `${height}%` : 0 }}
                        transition={{
                          delay: 0.2 + hour * 0.015,
                          duration: 0.4,
                          ease: 'easeOut'
                        }}
                        className={cn(
                          'h-full transition-colors',
                          isPeak ? 'bg-diff-addition' : 'bg-diff-comment/60 group-hover:bg-diff-comment'
                        )}
                      />
                    </div>
                    {isPeak && (
                      <span className="text-xs font-mono text-diff-addition">←</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Activity Timeline - Weekly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.5 }}
            className="px-6 py-6 border-b border-diff-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 font-mono">
                Weekly Distribution
              </h3>
              <p className="text-xs text-diff-neutral font-mono">
                Most active: {rhythm.peakDay} • Weekend work: {weekendPercentage}%
              </p>
            </div>

            <div className="flex items-end gap-2 h-32">
              {daysOfWeek.map((day, index) => {
                const activity = weeklyActivity[index];
                const height = (activity / maxWeeklyActivity) * 100;
                const isPeak = day === rhythm.peakDay;
                const isWeekend = index === 0 || index === 6;

                return (
                  <motion.div
                    key={day}
                    initial={{ height: 0 }}
                    animate={{ height: isActive ? `${height}%` : 0 }}
                    transition={{
                      delay: 0.55 + index * 0.05,
                      duration: 0.4,
                      ease: 'easeOut'
                    }}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div className={cn(
                      'w-full rounded-t transition-colors cursor-pointer',
                      isPeak ? 'bg-diff-addition' :
                      isWeekend ? 'bg-diff-highlight' : 'bg-diff-comment',
                      'hover:brightness-110'
                    )}
                      title={`${day}: ${Math.round(activity)}% activity`}
                    />
                    <span className={cn(
                      'text-xs font-mono mt-2',
                      isPeak ? 'text-diff-addition font-bold' :
                      isWeekend ? 'text-diff-highlight' : 'text-diff-neutral'
                    )}>
                      {day}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.8 }}
            className="px-6 py-6 border-b border-diff-border"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-diff-bg border border-diff-border rounded p-3">
                <div className="text-xs text-diff-neutral font-mono mb-1">Longest Streak</div>
                <div className="text-lg text-diff-highlight font-mono font-bold">
                  {rhythm.longestStreak}d
                </div>
              </div>
              <div className="bg-diff-bg border border-diff-border rounded p-3">
                <div className="text-xs text-diff-neutral font-mono mb-1">Active Days</div>
                <div className="text-lg text-diff-addition font-mono font-bold">
                  {uniqueDays}
                </div>
              </div>
              <div className="bg-diff-bg border border-diff-border rounded p-3">
                <div className="text-xs text-diff-neutral font-mono mb-1">Weekend %</div>
                <div className="text-lg text-diff-comment font-mono font-bold">
                  {weekendPercentage}%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 1 }}
            className="px-6 pb-6 pt-4"
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
