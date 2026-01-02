/**
 * GitHub API Client
 * Fetches public data without authentication
 */

const GITHUB_API_BASE = 'https://api.github.com';

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload: any;
}

export class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public rateLimit?: boolean
  ) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const url = `${GITHUB_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Wrapped',
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  // Check for rate limiting
  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
    if (rateLimitRemaining === '0') {
      throw new GitHubAPIError(
        'GitHub API rate limit exceeded. Please try again later.',
        403,
        true
      );
    }
  }

  if (response.status === 404) {
    throw new GitHubAPIError('User not found', 404);
  }

  if (!response.ok) {
    throw new GitHubAPIError(
      `GitHub API error: ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}

export async function fetchUser(username: string): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${username}`);
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  // Fetch up to 300 repos (3 pages)
  while (page <= 3) {
    const pageRepos = await fetchGitHub<GitHubRepo[]>(
      `/users/${username}/repos?sort=pushed&per_page=${perPage}&page=${page}`
    );

    if (pageRepos.length === 0) break;

    repos.push(...pageRepos);

    if (pageRepos.length < perPage) break;
    page++;
  }

  return repos;
}

export async function fetchUserEvents(username: string): Promise<GitHubEvent[]> {
  const events: GitHubEvent[] = [];
  let page = 1;
  const perPage = 100;

  // Fetch up to 300 events (3 pages) - this is GitHub's limit for public events
  while (page <= 3) {
    const pageEvents = await fetchGitHub<GitHubEvent[]>(
      `/users/${username}/events/public?per_page=${perPage}&page=${page}`
    );

    if (pageEvents.length === 0) break;

    events.push(...pageEvents);

    if (pageEvents.length < perPage) break;
    page++;
  }

  return events;
}

export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<Record<string, number>> {
  try {
    return await fetchGitHub<Record<string, number>>(
      `/repos/${owner}/${repo}/languages`
    );
  } catch (error) {
    // Return empty if we can't fetch languages for this repo
    return {};
  }
}

/**
 * Fetch commit activity for a specific year
 * This is approximate since we're using public events
 */
export function filterEventsByYear(events: GitHubEvent[], year: number): GitHubEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.created_at);
    return eventDate.getFullYear() === year;
  });
}
