'use client';

import { useState } from 'react';
import { UsernameInput } from '@/components/experience/UsernameInput';
import { ExperienceController } from '@/components/experience/ExperienceController';
import { WrappedData } from '@/lib/types';

export default function Home() {
  const [stage, setStage] = useState<'input' | 'experience'>('input');
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameSubmit = async (username: string) => {
    setIsLoading(true);

    try {
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
  };

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
