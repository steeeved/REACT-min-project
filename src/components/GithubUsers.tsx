import { SearchBar } from "./SearchBar";
import { UserList } from "./UserList";
import { Loader } from "./Loader";
import { useGitHubSearch } from "../hooks/useGitHubSearch";

export function GithubUsers() {
  const {
    query,
    setQuery,
    users,
    loading,
    error,
    pastResults: pastUsers,
  } = useGitHubSearch();

  return (
    <div className="w-[100vw] min-h-[100vh] mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4 w-full text-center">
        GitHub User Search
      </h1>
      <SearchBar value={query} onChange={setQuery} />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <UserList users={users} />
      {pastUsers.length > 0 && pastUsers.map((e) => <h1>{e}</h1>)}
    </div>
  );
}
