'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DiffLine } from '@/components/primitives/DiffLine';

interface UsernameInputProps {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
}

export function UsernameInput({ onSubmit, isLoading = false }: UsernameInputProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim()) {
      setError('Username required');
      return;
    }

    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
      setError('Invalid username format');
      return;
    }

    setError('');
    onSubmit(username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Terminal-style header */}
        <div className="mb-8 space-y-2">
          <DiffLine type="neutral">
            <span className="text-diff-neutral">$ git clone https://github.com/wrapped/year-in-review.git</span>
          </DiffLine>
          <DiffLine type="neutral">
            <span className="text-diff-neutral">Cloning into 'year-in-review'...</span>
          </DiffLine>
        </div>

        {/* Main content */}
        <div className="bg-diff-surface rounded-lg border border-diff-neutral/30 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              GitHub Wrapped
            </h1>
            <p className="text-diff-neutral text-lg">
              Review your year in code, the way developers review code: as a diff.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block font-mono text-sm text-diff-neutral mb-2">
                Enter your GitHub username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-diff-neutral font-mono">
                  @
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  placeholder="octocat"
                  disabled={isLoading}
                  className="w-full bg-diff-bg border border-diff-neutral/30 rounded-lg px-4 pl-8 py-3 font-mono text-foreground placeholder:text-diff-neutral/50 focus:outline-none focus:ring-2 focus:ring-diff-comment focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-diff-deletion font-mono">
                  ! {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-diff-addition text-black font-mono font-semibold py-3 px-6 rounded-lg hover:bg-diff-addition/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Fetching commits...
                </span>
              ) : (
                'Start Review →'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-diff-neutral/30">
            <p className="text-sm text-diff-neutral font-mono">
              <span className="text-diff-highlight">!</span> No login required. We only use public GitHub data.
            </p>
          </div>
        </div>

        {/* Footer hint */}
        <div className="mt-6 text-center">
          <p className="text-xs text-diff-neutral/50 font-mono">
            Try: suryanewa, torvalds, or your own username
          </p>
        </div>
      </motion.div>
    </div>
  );
}
