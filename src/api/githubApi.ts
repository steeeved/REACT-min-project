import { type GitHubUser } from "./types";

export async function searchGitHubUsers(query: string): Promise<GitHubUser[]> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.items;
}
