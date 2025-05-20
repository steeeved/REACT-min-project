import { useState, useEffect, useCallback } from "react";
import { searchGitHubUsers } from "../api/githubApi";
import type { GitHubUser } from "../api/types";
import { debounce } from "../utils/debounce";

export function useGitHubSearch() {
  const [pastResults, setPastUsers] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery) {
        setUsers([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchGitHubUsers(searchQuery);
        setPastUsers((prev) => [searchQuery, ...prev].slice(0, 5));
        // setRuntimes((prevRunTimes) => prevRunTimes + 1);
        console.log(`attempting call with ${searchQuery}`);

        // const results = [
        //   {
        //     id: 1,
        //     login: "testuser1",
        //     avatar_url: "https://github.com/testuser1.png",
        //     html_url: "https://github.com/testuser1",
        //   },
        //   {
        //     id: 2,
        //     login: "testuser2",
        //     avatar_url: "https://github.com/testuser2.png",
        //     html_url: "https://github.com/testuser2",
        //   },
        // ];
        setUsers(results);
      } catch (err) {
        console.log(err);
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return { query, setQuery, users, loading, error, pastResults };
}
