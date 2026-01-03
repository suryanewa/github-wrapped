'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WrappedData } from '@/lib/types';
import { SLIDE_DECK } from '@/lib/slides';

interface ExperienceControllerProps {
  data: WrappedData;
  onExit?: () => void;
}

export function ExperienceController({ data, onExit }: ExperienceControllerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [headerSlide, setHeaderSlide] = useState(0);
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);
  const [direction, setDirection] = useState(1);
  const totalSlides = SLIDE_DECK.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'j':
        case 'l':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'k':
        case 'h':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
        case 'q':
          e.preventDefault();
          onExit?.();
          break;
        case '?':
          e.preventDefault();
          setShowKeyboardHints(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onExit]);

  // Each slide should read like a fresh document; reset scroll on slide change.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [headerSlide]);

  const currentFile = SLIDE_DECK[headerSlide].file || 'slide.tsx';
  const progress = ((headerSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-diff-bg relative">
      {/* Minimal editor header (quiet chrome) */}
      <div className="sticky top-0 z-50 border-b border-diff-border/80 bg-diff-bg/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 font-mono text-[11px] text-diff-neutral flex items-center gap-2">
              <span className="truncate">{data.username}</span>
              <span className="text-diff-neutral-subtle select-none">/</span>
              <span className="text-diff-neutral truncate">github-wrapped-{data.year}</span>
              <span className="text-diff-neutral-subtle select-none">/</span>
              <span className="text-foreground truncate">{currentFile}</span>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-mono text-[11px] text-diff-neutral-subtle">
                {currentSlide + 1}/{totalSlides}
              </span>
              <button
                onClick={() => setShowKeyboardHints(!showKeyboardHints)}
                className="px-2 py-1 rounded border border-diff-border/60 text-diff-neutral hover:text-foreground hover:border-diff-border transition-colors font-mono text-[11px]"
                title="Keyboard shortcuts (?)"
              >
                ?
              </button>
            </div>
          </div>

          {/* Subtle progress */}
          <div className="mt-2 h-px bg-diff-border/60">
            <motion.div
              className="h-px bg-diff-neutral/50 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Keyboard Hints Overlay */}
      <AnimatePresence>
        {showKeyboardHints && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-diff-bg/90 backdrop-blur-sm"
            onClick={() => setShowKeyboardHints(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-diff-surface border border-diff-border rounded-lg p-6 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 font-mono">
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {[
                  { keys: ['→', 'Space', 'j', 'l'], action: 'Next slide' },
                  { keys: ['←', 'h', 'k'], action: 'Previous slide' },
                  { keys: ['Esc', 'q'], action: 'Exit review' },
                  { keys: ['?'], action: 'Toggle shortcuts' },
                ].map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-diff-neutral">{shortcut.action}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, j) => (
                        <kbd
                          key={j}
                          className="px-2 py-1 bg-diff-gutter border border-diff-border rounded text-xs text-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div ref={scrollRef} className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <AnimatePresence
            mode="wait"
            custom={direction}
            onExitComplete={() => setHeaderSlide(currentSlide)}
          >
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.32,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {(() => {
                const slide = SLIDE_DECK[currentSlide];
                const SlideComponent = slide.component;
                return <SlideComponent data={data} isActive={true} />;
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
