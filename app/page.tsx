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
      // TODO: Replace with actual API call
      // For now, use mock data to demonstrate the UI
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData: WrappedData = {
        username,
        year: 2025,
        profile: {
          name: username,
          avatarUrl: `https://github.com/${username}.png`,
          bio: 'Developer',
          followers: 100,
        },
        contributions: {
          total: 1247,
          commits: 847,
          prs: 89,
          issues: 156,
          reviews: 155,
        },
        archetype: {
          name: 'Night Owl Architect',
          description: 'Deep focus, late-night momentum',
          rarity: 'uncommon',
        },
        repositories: [
          { name: 'my-awesome-project', commits: 234, additions: 5432, deletions: 1234 },
          { name: 'another-cool-repo', commits: 156, additions: 3210, deletions: 890 },
        ],
        languages: [
          { name: 'TypeScript', percentage: 64, linesWritten: 12453 },
          { name: 'Python', percentage: 23, linesWritten: 4532 },
          { name: 'JavaScript', percentage: 13, linesWritten: 2341 },
        ],
        rhythm: {
          peakHour: 23,
          peakDay: 'Tuesday',
          weekendRatio: 0.25,
          longestStreak: 42,
        },
        impact: {
          starsEarned: 234,
          forksEarned: 45,
          topStarredRepo: 'my-awesome-project',
        },
      };

      setWrappedData(mockData);
      setStage('experience');
    } catch (error) {
      console.error('Failed to fetch wrapped data:', error);
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
