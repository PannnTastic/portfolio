"use client";

import { useState, useEffect } from "react";
import { ProcessedRepo } from "@/lib/github-types";

const GITHUB_USERNAME = "PannnTastic";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
}

interface UseGitHubReposReturn {
  repos: ProcessedRepo[];
  loading: boolean;
  error: string | null;
}

interface UseGitHubStatsReturn {
  stats: GitHubStats | null;
  loading: boolean;
  error: string | null;
}

// Simple cache
const cache: {
  repos?: { data: ProcessedRepo[]; timestamp: number };
  stats?: { data: GitHubStats; timestamp: number };
} = {};

async function fetchReposDirectly(
  sort: "updated" | "stars" | "forks" = "updated",
  limit: number = 10
): Promise<ProcessedRepo[]> {
  const cached = cache.repos;
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=${sort}&per_page=${limit}&type=public`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch repositories");
  }

  const data = await response.json();
  
  const processed: ProcessedRepo[] = data
    .filter((repo: { fork: boolean }) => !repo.fork)
    .map((repo: {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      topics: string[];
      updated_at: string;
      created_at: string;
    }) => ({
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

  cache.repos = { data: processed, timestamp: Date.now() };
  return processed;
}

async function fetchStatsDirectly(): Promise<GitHubStats> {
  const cached = cache.stats;
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  // Fetch user data
  const userResponse = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
    }
  );

  if (!userResponse.ok) {
    throw new Error("Failed to fetch user stats");
  }

  const userData = await userResponse.json();

  // Fetch all repos to calculate total stars
  const reposResponse = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
    }
  );

  let totalStars = 0;
  if (reposResponse.ok) {
    const repos = await reposResponse.json();
    totalStars = repos.reduce(
      (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
      0
    );
  }

  const stats = {
    publicRepos: userData.public_repos,
    followers: userData.followers,
    following: userData.following,
    totalStars,
  };

  cache.stats = { data: stats, timestamp: Date.now() };
  return stats;
}

export function useGitHubRepos(
  sort: "updated" | "stars" | "forks" = "updated",
  limit: number = 10
): UseGitHubReposReturn {
  const [repos, setRepos] = useState<ProcessedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        setLoading(true);
        const data = await fetchReposDirectly(sort, limit);
        
        if (!cancelled) {
          setRepos(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          console.error("Error fetching repos:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, [sort, limit]);

  return { repos, loading, error };
}

export function useGitHubStats(): UseGitHubStatsReturn {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        setLoading(true);
        const data = await fetchStatsDirectly();
        
        if (!cancelled) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
          console.error("Error fetching stats:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
