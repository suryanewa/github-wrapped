/**
 * Analysis Helpers
 * Process GitHub data into meaningful insights
 */

interface Event {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: any;
}

interface Repo {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

interface RepositoryStats {
  name: string;
  commits: number;
  additions: number;
  deletions: number;
}

interface LanguageStats {
  name: string;
  percentage: number;
  linesWritten: number;
}

interface RhythmStats {
  peakHour: number;
  peakDay: string;
  weekendRatio: number;
  longestStreak: number;
}

interface ContributionStats {
  total: number;
  commits: number;
  prs: number;
  issues: number;
  reviews: number;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Analyze contribution counts from events
 */
export function analyzeContributions(events: Event[]): ContributionStats {
  let commits = 0;
  let prs = 0;
  let issues = 0;
  let reviews = 0;

  for (const event of events) {
    switch (event.type) {
      case 'PushEvent':
        commits += event.payload.commits?.length || 1;
        break;
      case 'PullRequestEvent':
        prs++;
        break;
      case 'IssuesEvent':
      case 'IssueCommentEvent':
        issues++;
        break;
      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent':
        reviews++;
        break;
    }
  }

  return {
    total: events.length,
    commits,
    prs,
    issues,
    reviews,
  };
}

/**
 * Rank repositories by activity
 */
export function rankRepositories(events: Event[]): RepositoryStats[] {
  const repoMap = new Map<string, {
    commits: number;
    additions: number;
    deletions: number;
  }>();

  for (const event of events) {
    if (event.type === 'PushEvent') {
      const repoName = event.repo.name.split('/')[1] || event.repo.name;
      const existing = repoMap.get(repoName) || { commits: 0, additions: 0, deletions: 0 };

      const commits = event.payload.commits?.length || 1;

      // Estimate additions/deletions (GitHub doesn't provide this in events)
      // Using a heuristic: average ~50 lines per commit
      const estimatedLines = commits * 50;

      repoMap.set(repoName, {
        commits: existing.commits + commits,
        additions: existing.additions + Math.floor(estimatedLines * 0.7),
        deletions: existing.deletions + Math.floor(estimatedLines * 0.3),
      });
    }
  }

  return Array.from(repoMap.entries())
    .map(([name, stats]) => ({
      name,
      ...stats,
    }))
    .sort((a, b) => b.commits - a.commits)
    .slice(0, 10);
}

/**
 * Analyze language distribution
 */
export function analyzeLanguages(
  repos: Repo[],
  languageData: Record<string, Record<string, number>>
): LanguageStats[] {
  const languageTotals = new Map<string, number>();

  // Aggregate bytes across all repos
  for (const [repoName, languages] of Object.entries(languageData)) {
    for (const [lang, bytes] of Object.entries(languages)) {
      languageTotals.set(lang, (languageTotals.get(lang) || 0) + bytes);
    }
  }

  // If we don't have language data from the API, fall back to repo.language
  if (languageTotals.size === 0) {
    for (const repo of repos) {
      if (repo.language) {
        languageTotals.set(repo.language, (languageTotals.get(repo.language) || 0) + 1000);
      }
    }
  }

  const totalBytes = Array.from(languageTotals.values()).reduce((a, b) => a + b, 0);

  return Array.from(languageTotals.entries())
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
      linesWritten: Math.floor(bytes / 50), // Rough estimate: 50 bytes per line
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}

/**
 * Analyze coding rhythm and patterns
 */
export function analyzeRhythm(events: Event[]): RhythmStats {
  const hourCounts = new Map<number, number>();
  const dayCounts = new Map<string, number>();
  const dateCounts = new Map<string, number>();
  let weekendEvents = 0;

  for (const event of events) {
    const date = new Date(event.created_at);
    const hour = date.getHours();
    const dayOfWeek = DAYS[date.getDay()];
    const dateStr = date.toISOString().split('T')[0];

    hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    dayCounts.set(dayOfWeek, (dayCounts.get(dayOfWeek) || 0) + 1);
    dateCounts.set(dateStr, (dateCounts.get(dateStr) || 0) + 1);

    if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
      weekendEvents++;
    }
  }

  // Find peak hour
  let peakHour = 12;
  let maxHourCount = 0;
  for (const [hour, count] of hourCounts.entries()) {
    if (count > maxHourCount) {
      maxHourCount = count;
      peakHour = hour;
    }
  }

  // Find peak day
  let peakDay = 'Monday';
  let maxDayCount = 0;
  for (const [day, count] of dayCounts.entries()) {
    if (count > maxDayCount) {
      maxDayCount = count;
      peakDay = day;
    }
  }

  // Calculate longest streak
  const sortedDates = Array.from(dateCounts.keys()).sort();
  let longestStreak = 0;
  let currentStreak = 0;
  let lastDate: Date | null = null;

  for (const dateStr of sortedDates) {
    const currentDate = new Date(dateStr);

    if (lastDate) {
      const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    lastDate = currentDate;
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    peakHour,
    peakDay,
    weekendRatio: events.length > 0 ? weekendEvents / events.length : 0,
    longestStreak,
  };
}

/**
 * Calculate impact metrics
 */
export function analyzeImpact(repos: Repo[]): {
  starsEarned: number;
  forksEarned: number;
  topStarredRepo: string;
} {
  if (repos.length === 0) {
    return {
      starsEarned: 0,
      forksEarned: 0,
      topStarredRepo: '',
    };
  }

  const starsEarned = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const forksEarned = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const topRepo = repos.reduce((top, repo) =>
    repo.stargazers_count > top.stargazers_count ? repo : top
  );

  return {
    starsEarned,
    forksEarned,
    topStarredRepo: topRepo.name,
  };
}

/**
 * Analyze collaboration patterns
 */
export function analyzeCollaboration(
  events: Event[],
  username: string
): {
  externalRepos: number;
  diverseProjects: boolean;
  workStyle: 'lone_wolf' | 'team_player' | 'community_builder';
  uniqueDays: number;
} {
  const externalRepoSet = new Set<string>();
  const uniqueDaysSet = new Set<string>();

  // Find repos that don't belong to the user (external contributions)
  for (const event of events) {
    const repoOwner = event.repo.name.split('/')[0];

    // Count unique days
    const dateStr = event.created_at.split('T')[0];
    uniqueDaysSet.add(dateStr);

    // Track external repos (not owned by user)
    if (repoOwner.toLowerCase() !== username.toLowerCase()) {
      externalRepoSet.add(event.repo.name);
    }
  }

  const externalRepos = externalRepoSet.size;
  const diverseProjects = externalRepos > 3;
  const uniqueDays = uniqueDaysSet.size;

  // Determine work style
  let workStyle: 'lone_wolf' | 'team_player' | 'community_builder';
  if (externalRepos === 0) {
    workStyle = 'lone_wolf';
  } else if (externalRepos < 5) {
    workStyle = 'team_player';
  } else {
    workStyle = 'community_builder';
  }

  return {
    externalRepos,
    diverseProjects,
    workStyle,
    uniqueDays,
  };
}
