import { useState, useEffect } from "react";
import { searchGitHubUsers } from "../api/githubApi";
import type { GitHubUser } from "../api/types";
import { debounce } from "../utils/debounce";

export function useGitHubSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery) {
      setUsers([]);
      return;
    }
    try {
      setLoading(true);
      const results = await searchGitHubUsers(searchQuery);
      setUsers(results);
    } catch (err) {
      console.log(err);
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  return { query, setQuery, users, loading, error };
}
