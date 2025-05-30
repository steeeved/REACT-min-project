import { useState, useEffect, useCallback } from "react";
// import { searchGitHubUsers } from "../api/githubApi";
import type { GitHubUser } from "../api/types";
import { debounce } from "../utils/debounce";

export function useGitHubSearch() {
  const [pastResults, setPastUsers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wait = 500;

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      // const results = await searchGitHubUsers(searchQuery);
      setPastUsers((prev) => [searchQuery, ...prev].slice(0, 5));
      console.log(`attempting call with ${searchQuery}`);

      const results = [
        {
          id: 1,
          login: "testuser1",
          avatar_url: "https://github.com/testuser1.png",
          html_url: "https://github.com/testuser1",
        },
        {
          id: 2,
          login: "testuser2",
          avatar_url: "https://github.com/testuser2.png",
          html_url: "https://github.com/testuser2",
        },
      ];
      setUsers(results);
    } catch (err) {
      console.error(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(searchUsers, wait), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return { query, setQuery, users, loading, error, pastResults };
}