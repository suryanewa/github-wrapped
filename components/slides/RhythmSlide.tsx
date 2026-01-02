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

          {/* HERO - Peak Hour - Cinematic */}
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
              className="text-[10px] text-diff-neutral/60 font-mono mb-3 uppercase tracking-[0.2em] font-medium"
            >
              Peak Coding Time
            </motion.div>

            {/* Peak Hour with Glow */}
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
              className="relative inline-block mb-4"
            >
              <div className="text-7xl md:text-8xl font-bold font-mono text-diff-addition text-display text-glow-green relative z-10">
                {formatHour(rhythm.peakHour)}
              </div>
              <div className="absolute inset-0 blur-2xl bg-diff-addition/20 scale-110" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg text-diff-neutral font-mono text-body-refined mb-8"
            >
              {getTimeOfDayLabel(rhythm.peakHour)} developer
            </motion.div>

            {/* Key stats - Glass Morphism Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-xl mx-auto"
            >
              {[
                { label: 'active days', value: uniqueDays, color: 'text-diff-comment', glow: false },
                { label: 'day streak', value: rhythm.longestStreak, color: 'text-diff-highlight', glow: true },
                { label: 'weekends', value: `${weekendPercentage}%`, color: 'text-foreground', glow: false }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
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
                  className="glass-panel rounded-lg p-4 group hover-lift cursor-default relative overflow-hidden"
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    stat.color === 'text-diff-comment' ? 'from-diff-comment/5' :
                    stat.color === 'text-diff-highlight' ? 'from-diff-highlight/5' : 'from-diff-addition/5'
                  )} />
                  <div className="relative z-10">
                    <div className={cn(
                      "text-3xl font-bold font-mono text-display mb-1 transition-all duration-300",
                      stat.color,
                      stat.glow && "group-hover:drop-shadow-[0_0_8px_rgba(240,136,62,0.5)]"
                    )}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-diff-neutral/80 font-mono uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Weekly Pattern - Glass Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="px-6 py-8"
          >
            <div className="mb-4">
              <h3 className="text-xs text-diff-neutral font-mono uppercase tracking-wider">
                Weekly Pattern
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.98 }}
              transition={{ delay: 0.65, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-lg p-6 max-w-xl mx-auto"
            >
              <div className="flex items-end gap-2 h-24">
                {daysOfWeek.map((day, index) => {
                  const activity = weeklyActivity[index];
                  const height = (activity / maxWeeklyActivity) * 100;
                  const isPeak = day === rhythm.peakDay;
                  const isWeekend = index === 0 || index === 6;

                  return (
                    <motion.div
                      key={day}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isActive ? `${height}%` : 0,
                        opacity: isActive ? 1 : 0
                      }}
                      transition={{
                        delay: 0.7 + index * 0.05,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="flex-1 flex flex-col items-center group"
                    >
                      <div className={cn(
                        'w-full rounded-t transition-all duration-300 cursor-pointer',
                        isPeak ? 'bg-diff-addition shadow-[0_0_8px_var(--diff-addition)]' :
                        isWeekend ? 'bg-diff-highlight' : 'bg-diff-comment',
                        'group-hover:brightness-125 group-hover:scale-105'
                      )}
                        title={`${day}: ${Math.round(activity)}% activity`}
                      />
                      <span className={cn(
                        'text-xs font-mono mt-2 transition-all duration-300',
                        isPeak ? 'text-diff-addition font-bold text-display' :
                        isWeekend ? 'text-diff-highlight' : 'text-diff-neutral'
                      )}>
                        {day}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.7 }}
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
