import { NextResponse } from 'next/server';
import {
  fetchUser,
  fetchUserRepos,
  fetchUserEvents,
  fetchRepoLanguages,
  filterEventsByYear,
  GitHubAPIError,
} from '@/lib/api/github';
import {
  analyzeContributions,
  rankRepositories,
  analyzeLanguages,
  analyzeRhythm,
  analyzeImpact,
  analyzeCollaboration,
} from '@/lib/computation/analysis';
import { calculateArchetype } from '@/lib/computation/archetype';
import { WrappedData } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const year = new Date().getFullYear();

  try {
    // Fetch all data in parallel
    const [user, repos, allEvents] = await Promise.all([
      fetchUser(username),
      fetchUserRepos(username),
      fetchUserEvents(username),
    ]);

    // Filter events by year
    const yearEvents = filterEventsByYear(allEvents, year);

    // If no activity this year, use last year or all time data
    const eventsToAnalyze = yearEvents.length > 0 ? yearEvents : allEvents;

    // Analyze contributions
    const contributions = analyzeContributions(eventsToAnalyze);

    // Rank repositories by activity
    const topRepos = rankRepositories(eventsToAnalyze);

    // Fetch language data for top repos
    const languagePromises = repos
      .slice(0, 20)
      .map(repo => {
        const [owner, repoName] = repo.full_name.split('/');
        return fetchRepoLanguages(owner, repoName)
          .then(langs => ({ repo: repo.name, languages: langs }))
          .catch(() => ({ repo: repo.name, languages: {} }));
      });

    const languageResults = await Promise.all(languagePromises);
    const languageData = Object.fromEntries(
      languageResults.map(r => [r.repo, r.languages])
    );

    // Analyze languages
    const languages = analyzeLanguages(repos, languageData);

    // Analyze rhythm
    const rhythm = analyzeRhythm(eventsToAnalyze);

    // Calculate impact
    const impact = analyzeImpact(repos);

    // Analyze collaboration
    const collaboration = analyzeCollaboration(eventsToAnalyze, username);

    // Build archetype input
    const eventsByHour: Record<number, number> = {};
    const eventsByDay: Record<string, number> = {};
    const uniqueDays = new Set<string>();

    for (const event of eventsToAnalyze) {
      const date = new Date(event.created_at);
      const hour = date.getHours();
      const dateStr = date.toISOString().split('T')[0];

      eventsByHour[hour] = (eventsByHour[hour] || 0) + 1;
      eventsByDay[dateStr] = (eventsByDay[dateStr] || 0) + 1;
      uniqueDays.add(dateStr);
    }

    const archetype = calculateArchetype({
      totalEvents: eventsToAnalyze.length,
      uniqueDays: uniqueDays.size,
      repoCount: topRepos.length,
      eventsByHour,
      eventsByDay,
      weekendRatio: rhythm.weekendRatio,
      languageDiversity: languages.length,
    });

    // Build response
    const wrappedData: WrappedData = {
      username: user.login,
      year,
      profile: {
        name: user.name || user.login,
        avatarUrl: user.avatar_url,
        bio: user.bio || '',
        followers: user.followers,
      },
      contributions,
      archetype,
      repositories: topRepos.slice(0, 10),
      languages,
      rhythm,
      impact,
      collaboration,
    };

    return NextResponse.json(wrappedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      return NextResponse.json(
        {
          error: error.message,
          rateLimit: error.rateLimit,
        },
        { status: error.status || 500 }
      );
    }

    console.error('Error fetching GitHub wrapped data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
