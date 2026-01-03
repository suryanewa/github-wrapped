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
  // Auto-focus the container for keyboard events
  useEffect(() => {
    scrollRef.current?.focus();
  }, []);

  const currentFile = SLIDE_DECK[currentSlide].file || 'slide.tsx';
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-diff-bg relative selection:bg-diff-highlight selection:text-white">
      {/* Minimal editor header (quiet chrome) - Removing border for seamless feel */}
      <div className="sticky top-0 z-50 bg-diff-bg/95 backdrop-blur-md transition-all duration-500">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 font-mono text-[10px] tracking-widest text-diff-neutral/60 uppercase flex items-center gap-3">
              <span className="truncate hover:text-foreground transition-colors cursor-default">{data.username}</span>
              <span className="text-diff-neutral/20 select-none">/</span>
              <span className="text-foreground font-medium truncate">{currentFile}</span>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowKeyboardHints(!showKeyboardHints)}
                className="w-6 h-6 flex items-center justify-center rounded-full border border-diff-border/40 text-diff-neutral/60 hover:text-foreground hover:border-diff-border hover:bg-diff-surface transition-all font-mono text-[10px]"
                title="Keyboard shortcuts (?)"
              >
                ?
              </button>
            </div>
          </div>

          {/* Subtle progress - thinner, darker */}
          <div className="mt-3 h-[1px] bg-diff-border/20 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-foreground/30 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Apple-style ease
            />
          </div>
        </div>
      </div>

      {/* Keyboard Hints Overlay */}
      <AnimatePresence>
        {showKeyboardHints && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setShowKeyboardHints(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[#0d1117] border border-[#30363d] rounded-xl p-8 max-w-sm w-full shadow-2xl shadow-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-medium text-diff-neutral mb-6 font-mono uppercase tracking-widest text-center">
                Shortcuts
              </h3>
              <div className="space-y-3 font-mono text-[13px]">
                {[
                  { keys: ['→', 'Space'], action: 'Next slide' },
                  { keys: ['←'], action: 'Previous slide' },
                  { keys: ['Esc'], action: 'Exit' },
                ].map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="text-diff-neutral group-hover:text-foreground transition-colors">{shortcut.action}</span>
                    <div className="flex gap-1.5">
                      {shortcut.keys.map((key, j) => (
                        <kbd
                          key={j}
                          className="min-w-[24px] h-6 px-1.5 flex items-center justify-center bg-[#161b22] border border-[#30363d] rounded text-diff-neutral-subtle group-hover:text-foreground group-hover:border-diff-neutral/50 transition-colors"
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
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-auto outline-none" 
        tabIndex={-1} // Allow focus
      >
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
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
