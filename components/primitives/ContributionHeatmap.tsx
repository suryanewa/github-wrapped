import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContributionHeatmapProps {
  totalContributions: number;
  year: number;
  dailyContributions: Record<string, number>;
  isActive?: boolean;
}

export function ContributionHeatmap({ totalContributions, year, dailyContributions, isActive = true }: ContributionHeatmapProps) {
  const weeks = 52;
  const daysInWeek = 7;

  // Calculate the start date (first Sunday of the year or before)
  const startOfYear = new Date(year, 0, 1);
  const startDay = startOfYear.getDay(); // 0 = Sunday, 6 = Saturday
  const firstSunday = new Date(startOfYear);
  firstSunday.setDate(startOfYear.getDate() - startDay);

  // Calculate max contributions for scaling
  const maxContributions = Math.max(...Object.values(dailyContributions), 1);

  // Get contribution level (0-4) based on count
  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    const ratio = count / maxContributions;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.50) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  };

  // Get date for a specific week/day position
  const getDateForPosition = (weekIndex: number, dayIndex: number): string => {
    const date = new Date(firstSunday);
    date.setDate(firstSunday.getDate() + (weekIndex * 7) + dayIndex);
    return date.toISOString().split('T')[0];
  };

  // Get level color with proper GitHub-style green shades
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-diff-gutter';
      case 1: return 'bg-green-900/40';
      case 2: return 'bg-green-700/60';
      case 3: return 'bg-green-500/80';
      case 4: return 'bg-green-400';
      default: return 'bg-diff-gutter';
    }
  };

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="inline-block min-w-full">
        {/* Month labels */}
        <div className="flex gap-[3px] mb-2 ml-6">
          {monthLabels.map((month, i) => (
            <div
              key={month}
              className="text-[10px] text-diff-neutral font-mono"
              style={{ width: `${(weeks / 12) * 11}px`, minWidth: '30px' }}
            >
              {month}
            </div>
          ))}
        </div>

        <div className="flex gap-[3px]">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] justify-between pr-2">
            {dayLabels.map((day, i) => (
              <div
                key={day}
                className="text-[10px] text-diff-neutral font-mono h-[11px] flex items-center"
              >
                {i % 2 === 1 && day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex gap-[3px]">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[3px]">
                {Array.from({ length: daysInWeek }).map((_, dayIndex) => {
                  const dateStr = getDateForPosition(weekIndex, dayIndex);
                  const count = dailyContributions[dateStr] || 0;
                  const level = getLevel(count);
                  const delay = (weekIndex * daysInWeek + dayIndex) * 0.002;

                  return (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8
                      }}
                      transition={{
                        delay: isActive ? delay : 0,
                        duration: 0.2,
                        ease: 'easeOut'
                      }}
                      className={cn(
                        'w-[11px] h-[11px] rounded-sm border border-diff-border/30 transition-all',
                        getLevelColor(level),
                        level > 0 && 'hover:ring-1 hover:ring-green-400 hover:scale-110 cursor-pointer'
                      )}
                      title={`${dateStr}: ${count} ${count === 1 ? 'contribution' : 'contributions'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 text-xs font-mono text-diff-neutral">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                'w-[11px] h-[11px] rounded-sm border border-diff-border/30',
                getLevelColor(level)
              )}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
