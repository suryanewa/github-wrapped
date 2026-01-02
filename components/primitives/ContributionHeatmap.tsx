import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContributionHeatmapProps {
  totalContributions: number;
  year: number;
  isActive?: boolean;
}

export function ContributionHeatmap({ totalContributions, year, isActive = true }: ContributionHeatmapProps) {
  // Generate simulated contribution data (in production, this would come from actual data)
  const weeks = 52;
  const daysInWeek = 7;

  // Create a distribution that looks realistic
  const generateLevel = (weekIndex: number, dayIndex: number) => {
    // More activity in middle of year, less at edges
    const yearProgress = weekIndex / weeks;
    const baseProbability = Math.sin(yearProgress * Math.PI) * 0.7 + 0.3;

    // Less activity on weekends
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    const dayMultiplier = isWeekend ? 0.5 : 1;

    const random = Math.random();
    const adjustedRandom = random * baseProbability * dayMultiplier;

    if (adjustedRandom < 0.2) return 0;
    if (adjustedRandom < 0.4) return 1;
    if (adjustedRandom < 0.6) return 2;
    if (adjustedRandom < 0.8) return 3;
    return 4;
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-diff-gutter';
      case 1: return 'bg-diff-success/20';
      case 2: return 'bg-diff-success/40';
      case 3: return 'bg-diff-success/60';
      case 4: return 'bg-diff-success';
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
                  const level = generateLevel(weekIndex, dayIndex);
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
                        level > 0 && 'hover:ring-1 hover:ring-diff-success hover:scale-110 cursor-pointer'
                      )}
                      title={`${level} contributions`}
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
