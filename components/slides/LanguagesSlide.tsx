'use client';

import { motion } from 'framer-motion';
import { FileHeader, ReviewComment, StatusBadge } from '@/components/primitives';
import { SlideProps } from '@/lib/types';

export function LanguagesSlide({ data, isActive }: SlideProps) {
  const { languages } = data;

  if (languages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="w-full"
      >
        <div className="max-w-4xl">
          <FileHeader filename="languages.json" type="file" status="modified" />
          <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg p-6">
            <p className="text-diff-neutral font-mono">
              No language data available for this year.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Calculate total lines for percentage bars
  const totalLines = languages.reduce((sum, lang) => sum + lang.linesWritten, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      className="w-full"
    >
      <div className="max-w-4xl">
        <FileHeader filename="languages.json" type="file" status="modified" />

        <div className="bg-diff-surface border-x border-b border-diff-border rounded-b-lg">
          {/* Language badge */}
          <div className="px-6 py-3 border-b border-diff-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusBadge status="neutral" label="JSON" icon={false} />
              <span className="text-xs text-diff-neutral font-mono">
                Language distribution analysis
              </span>
            </div>
            <div className="text-xs text-diff-neutral font-mono">
              {languages.length} {languages.length === 1 ? 'language' : 'languages'}
            </div>
          </div>

          {/* Code Editor View with Line Numbers */}
          <div className="relative">
            {/* Line numbers gutter */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-diff-gutter border-r border-diff-border flex flex-col font-mono text-xs text-diff-gutter-text text-right pr-3 py-4 select-none">
              {['1', '2', ...languages.map((_, i) => String(3 + i)), String(3 + languages.length)].map((num, i) => (
                <div key={i} className="leading-relaxed h-6">
                  {num}
                </div>
              ))}
            </div>

            {/* JSON content */}
            <div className="pl-14 pr-6 py-4 font-mono text-sm space-y-0">
              {/* Opening brace */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.1 }}
                className="leading-relaxed h-6 text-foreground"
              >
                {'{'}
              </motion.div>

              {/* "languages" key */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.15 }}
                className="leading-relaxed h-6"
              >
                <span className="text-foreground">  </span>
                <span className="text-diff-string">"languages"</span>
                <span className="text-foreground">: [</span>
              </motion.div>

              {/* Language entries */}
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="leading-relaxed h-6"
                >
                  <span className="text-foreground">    {'{ '}</span>
                  <span className="text-diff-string">"name"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-diff-string">"{lang.name}"</span>
                  <span className="text-foreground">, </span>
                  <span className="text-diff-string">"percentage"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-diff-keyword">{lang.percentage}</span>
                  <span className="text-foreground">, </span>
                  <span className="text-diff-string">"lines"</span>
                  <span className="text-foreground">: </span>
                  <span className="text-diff-keyword">{lang.linesWritten.toLocaleString()}</span>
                  <span className="text-foreground"> {'}'}{index < languages.length - 1 ? ',' : ''}</span>
                </motion.div>
              ))}

              {/* Closing bracket */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.2 + languages.length * 0.05 }}
                className="leading-relaxed h-6 text-foreground"
              >
                {'  ]'}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                transition={{ delay: 0.25 + languages.length * 0.05 }}
                className="leading-relaxed h-6 text-foreground"
              >
                {'}'}
              </motion.div>
            </div>
          </div>

          {/* Visual Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ delay: 0.4 + languages.length * 0.05 }}
            className="px-6 py-6 border-t border-diff-border"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground mb-1 font-mono">
                Distribution Visualization
              </h3>
              <p className="text-xs text-diff-neutral font-mono">
                Relative language usage by lines of code
              </p>
            </div>

            {/* Horizontal stacked bar */}
            <div className="w-full h-8 bg-diff-gutter rounded overflow-hidden flex mb-4">
              {languages.map((lang, index) => {
                const colors = [
                  'bg-diff-addition',
                  'bg-diff-comment',
                  'bg-diff-highlight',
                  'bg-diff-warning',
                  'bg-diff-deletion',
                ];
                const color = colors[index % colors.length];

                return (
                  <motion.div
                    key={lang.name}
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${lang.percentage}%` : 0 }}
                    transition={{
                      delay: 0.5 + languages.length * 0.05 + index * 0.1,
                      duration: 0.6,
                      ease: 'easeOut'
                    }}
                    className={`${color} flex items-center justify-center text-xs font-mono font-bold text-black hover:brightness-110 transition-all cursor-pointer`}
                    title={`${lang.name}: ${lang.percentage}%`}
                  >
                    {lang.percentage > 8 && lang.name}
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang, index) => {
                const colors = [
                  { bg: 'bg-diff-addition/10', text: 'text-diff-addition', dot: 'bg-diff-addition' },
                  { bg: 'bg-diff-comment/10', text: 'text-diff-comment', dot: 'bg-diff-comment' },
                  { bg: 'bg-diff-highlight/10', text: 'text-diff-highlight', dot: 'bg-diff-highlight' },
                  { bg: 'bg-diff-warning/10', text: 'text-diff-warning', dot: 'bg-diff-warning' },
                  { bg: 'bg-diff-deletion/10', text: 'text-diff-deletion', dot: 'bg-diff-deletion' },
                ];
                const colorSet = colors[index % colors.length];

                return (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -8 }}
                    transition={{ delay: 0.7 + languages.length * 0.05 + index * 0.05 }}
                    className={`${colorSet.bg} ${colorSet.text} px-3 py-2 rounded flex items-center gap-2`}
                  >
                    <div className={`w-2 h-2 rounded-full ${colorSet.dot}`} />
                    <span className="text-xs font-mono font-semibold flex-1">{lang.name}</span>
                    <span className="text-xs font-mono">{lang.percentage}%</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Review Comment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: 0.9 + languages.length * 0.05 }}
            className="px-6 pb-6"
          >
            <ReviewComment author="github-wrapped-bot" timestamp="just now">
              {languages.length >= 5
                ? `Polyglot developer working across ${languages.length} languages. Your versatility enables you to choose the right tool for each problem.`
                : languages.length >= 3
                ? `Balanced tech stack with ${languages.length} languages. You combine depth in ${languages[0].name} (${languages[0].percentage}%) with breadth across complementary tools.`
                : languages.length === 2
                ? `Focused on ${languages[0].name} (${languages[0].percentage}%) with ${languages[1].name} as a secondary tool. Strategic specialization drives mastery.`
                : `Deep expertise in ${languages[0].name}. Single-language focus accelerates mastery and compounds knowledge over time.`}
            </ReviewComment>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
