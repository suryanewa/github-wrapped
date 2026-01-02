'use client';

import { useState, useEffect, useCallback } from 'react';
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

  const currentFile = SLIDE_DECK[currentSlide].file || 'slide.tsx';
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-diff-bg relative">
      {/* Top Status Bar - GitHub PR style */}
      <div className="sticky top-0 z-50 border-b border-diff-border bg-diff-surface/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            {/* Left: File path breadcrumb */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <svg className="w-4 h-4 text-diff-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-diff-neutral">{data.username}</span>
              <span className="text-diff-neutral-subtle">/</span>
              <span className="text-diff-neutral">year-in-review-{data.year}</span>
              <span className="text-diff-neutral-subtle">/</span>
              <span className="text-foreground">{currentFile}</span>
            </div>

            {/* Right: Progress & actions */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-diff-neutral">
                {currentSlide + 1} / {totalSlides}
              </span>
              <button
                onClick={() => setShowKeyboardHints(!showKeyboardHints)}
                className="p-1.5 hover:bg-diff-surface-hover rounded text-diff-neutral hover:text-foreground transition-colors"
                title="Keyboard shortcuts (?)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="h-0.5 bg-diff-success origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
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
      <div className="flex-1 flex">
        {/* Left Gutter - File indicators */}
        <div className="w-16 bg-diff-gutter border-r border-diff-border flex-shrink-0">
          <div className="sticky top-20 py-4 space-y-1">
            {SLIDE_DECK.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className="w-full group relative"
                title={slide.file || slide.id}
              >
                {/* Active indicator */}
                {index === currentSlide && (
                  <motion.div
                    layoutId="active-slide"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-diff-comment"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Dot indicator */}
                <div className="flex items-center justify-center h-8">
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-diff-comment scale-125'
                        : index < currentSlide
                        ? 'bg-diff-success'
                        : 'bg-diff-neutral/30'
                    }`}
                  />
                </div>

                {/* Hover tooltip */}
                <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-diff-surface border border-diff-border rounded px-2 py-1 text-xs font-mono text-foreground whitespace-nowrap shadow-lg">
                    {slide.file || slide.id}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
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

      {/* Bottom Status Bar - Terminal style */}
      <div className="sticky bottom-0 border-t border-diff-border bg-diff-surface/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-4 text-diff-neutral">
              <span>
                <kbd className="px-1.5 py-0.5 bg-diff-gutter border border-diff-border rounded text-xs mr-1">
                  Space
                </kbd>
                Next
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-diff-gutter border border-diff-border rounded text-xs mr-1">
                  ←
                </kbd>
                Back
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-diff-gutter border border-diff-border rounded text-xs mr-1">
                  ?
                </kbd>
                Help
              </span>
            </div>
            <div className="text-diff-neutral-subtle font-mono text-[10px] tracking-wider">
              commit: {Math.abs(data.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 16777215).toString(16).padStart(7, '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
