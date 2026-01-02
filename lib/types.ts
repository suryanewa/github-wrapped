export interface WrappedData {
  username: string;
  year: number;
  profile: {
    name: string;
    avatarUrl: string;
    bio: string;
    followers: number;
  };
  contributions: {
    total: number;
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
  };
  archetype: {
    name: string;
    description: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  };
  repositories: {
    name: string;
    commits: number;
    additions: number;
    deletions: number;
  }[];
  languages: {
    name: string;
    percentage: number;
    linesWritten: number;
  }[];
  rhythm: {
    peakHour: number;
    peakDay: string;
    weekendRatio: number;
    longestStreak: number;
  };
  impact: {
    starsEarned: number;
    forksEarned: number;
    topStarredRepo: string;
  };
  collaboration: {
    externalRepos: number;
    diverseProjects: boolean;
    workStyle: 'lone_wolf' | 'team_player' | 'community_builder';
    uniqueDays: number;
  };
}

export interface SlideProps {
  data: WrappedData;
  isActive: boolean;
}

export interface Slide {
  id: string;
  component: React.ComponentType<SlideProps>;
  file?: string;
}
