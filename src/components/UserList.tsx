import type { GitHubUser } from "../api/types";

interface UserListProps {
  users: GitHubUser[];
}

export function UserList({ users }: UserListProps) {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <ul className="divide-y divide-gray-200 mt-4 grid grid-cols-4 gap-x-4">
      {users.map((user) => (
        <li key={user.id} className="py-4 flex items-center space-x-4">
          <img
            className="h-10 w-10 rounded-full"
            src={user.avatar_url}
            alt={`${user.login} avatar`}
          />
          <div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.login}
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
