'use client';

import { useEffect, useRef, useState } from 'react';
import { UsernameInput } from '@/components/experience/UsernameInput';
import { ExperienceController } from '@/components/experience/ExperienceController';
import { WrappedData } from '@/lib/types';

export default function Home() {
  const [stage, setStage] = useState<'input' | 'experience'>('input');
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasAutoStartedFromUrl = useRef(false);

  const handleUsernameSubmit = async (username: string) => {
    setIsLoading(true);

    try {
      // Keep URL shareable while loading/running the experience.
      const nextUrl = `/?username=${encodeURIComponent(username)}`;
      window.history.replaceState(null, '', nextUrl);

      const response = await fetch(`/api/github/${username}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch GitHub data');
      }

      const data: WrappedData = await response.json();

      setWrappedData(data);
      setStage('experience');
    } catch (error) {
      console.error('Failed to fetch wrapped data:', error);
      alert(error instanceof Error ? error.message : 'Failed to fetch GitHub data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExit = () => {
    setStage('input');
    setWrappedData(null);
    window.history.replaceState(null, '', '/');
  };

  // Deep-link support: visiting /?username=foo should auto-run the experience.
  useEffect(() => {
    if (hasAutoStartedFromUrl.current) return;
    if (stage !== 'input') return;
    if (isLoading) return;

    const username = new URLSearchParams(window.location.search).get('username');
    if (!username) return;

    // In dev, React strict-mode may mount/unmount and re-run effects; avoid duplicate auto-fetches.
    const w = window as unknown as { __gw_autostart_username?: string };
    if (w.__gw_autostart_username === username) return;
    w.__gw_autostart_username = username;

    hasAutoStartedFromUrl.current = true;
    handleUsernameSubmit(username);
  }, [stage, isLoading]);

  return (
    <>
      {stage === 'input' && (
        <UsernameInput onSubmit={handleUsernameSubmit} isLoading={isLoading} />
      )}
      {stage === 'experience' && wrappedData && (
        <ExperienceController data={wrappedData} onExit={handleExit} />
      )}
    </>
  );
}
