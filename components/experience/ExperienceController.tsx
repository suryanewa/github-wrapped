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
  const totalSlides = SLIDE_DECK.length;

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          e.preventDefault();
          onExit?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onExit]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-diff-surface/80 backdrop-blur-sm border-b border-diff-neutral/30">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-mono text-sm text-diff-neutral">
            Review checkpoints: {currentSlide + 1}/{totalSlides}
          </div>
          <div className="font-mono text-xs text-diff-neutral/50">
            {data.username}/year-in-review
          </div>
        </div>
        {/* Progress bar */}
        <motion.div
          className="h-0.5 bg-diff-addition"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Slide container */}
      <div className="flex-1 flex items-center justify-center pt-16 pb-8">
        <div className="w-full max-w-4xl px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
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

      {/* Navigation hints */}
      <div className="fixed bottom-0 left-0 right-0 bg-diff-surface/80 backdrop-blur-sm border-t border-diff-neutral/30 py-3">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between font-mono text-xs text-diff-neutral">
          <div className="flex items-center gap-4">
            <span>← Prev</span>
            <span>Space/→ Next</span>
            <span>Esc Exit</span>
          </div>
          <div className="font-mono text-xs text-diff-neutral/50">
            commit: {Math.abs(data.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 16777215).toString(16).padStart(7, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}
