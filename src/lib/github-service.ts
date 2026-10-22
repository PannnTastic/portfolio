import { GitHubUser, GitHubRepo, ProcessedRepo } from "./github-types";

const GITHUB_USERNAME = "PannnTastic";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheData<T> {
  data: T;
  timestamp: number;
}

class GitHubCache {
  private cache: Map<string, CacheData<unknown>> = new Map();

  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

const cache = new GitHubCache();

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  const cached = cache.get<GitHubUser>("user");
  if (cached) return cached;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      if (response.status === 403) {
        console.warn("GitHub API rate limit exceeded");
      }
      return null;
    }

    const data = await response.json();
    cache.set("user", data);
    return data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export async function fetchGitHubRepos(
  sort: "updated" | "stars" | "forks" = "updated",
  limit: number = 10
): Promise<ProcessedRepo[]> {
  const cacheKey = `repos-${sort}-${limit}`;
  const cached = cache.get<ProcessedRepo[]>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${limit}&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        console.warn("GitHub API rate limit exceeded");
      }
      return [];
    }

    const data: GitHubRepo[] = await response.json();
    
    const processed: ProcessedRepo[] = data
      .filter((repo) => !repo.fork) // Filter out forked repos
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updated_at: repo.updated_at,
        created_at: repo.created_at,
      }));

    cache.set(cacheKey, processed);
    return processed;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

export async function fetchGitHubStats(): Promise<{
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
} | null> {
  const cached = cache.get<{
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
  }>("stats");
  if (cached) return cached;

  try {
    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }
    );

    if (!userResponse.ok) return null;
    const userData = await userResponse.json();

    // Fetch all repos to calculate total stars
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }
    );

    let totalStars = 0;
    if (reposResponse.ok) {
      const repos = await reposResponse.json();
      totalStars = repos.reduce(
        (acc: number, repo: GitHubRepo) => acc + repo.stargazers_count,
        0
      );
    }

    const stats = {
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      totalStars,
    };

    cache.set("stats", stats);
    return stats;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

// Fallback data when API fails
export const fallbackRepos: ProcessedRepo[] = [
  {
    id: 1,
    name: "portfolio",
    description: "My personal portfolio website built with Next.js",
    html_url: "https://github.com/PannnTastic/portfolio",
    homepage: "https://pannntastic.dev",
    stars: 12,
    forks: 3,
    language: "TypeScript",
    topics: ["nextjs", "react", "portfolio"],
    updated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];
