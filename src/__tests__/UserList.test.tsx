import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UserList } from "../components/UserList";
import type { GitHubUser } from "../api/types";

const testUsers: GitHubUser[] = [
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

describe("UserList", () => {
  it("renders nothing when users is empty", () => {
    render(<UserList users={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders nothing when users is undefined", () => {
    render(<UserList users={undefined as any} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders a list of users with avatars and links", () => {
    render(<UserList users={testUsers} />);

    // Check the list is rendered
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass(
      "divide-y divide-gray-200 mt-4 grid grid-cols-4 gap-x-4"
    );

    // Check that user items are rendered
    const userItems = screen.getAllByRole("listitem");
    expect(userItems).toHaveLength(2);

    // Check first user
    const firstUserLink = screen.getByText("testuser1");
    expect(firstUserLink).toHaveAttribute("href", "https://github.com/testuser1");
    expect(firstUserLink).toHaveAttribute("target", "_blank");
    expect(firstUserLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(firstUserLink).toHaveClass("text-blue-600 hover:underline");

    const firstAvatar = screen.getByAltText("testuser1 avatar");
    expect(firstAvatar).toHaveAttribute(
      "src",
      "https://github.com/testuser1.png"
    );
    expect(firstAvatar).toHaveClass("h-10 w-10 rounded-full");

    // Check second user
    const secondUserLink = screen.getByText("testuser2");
    expect(secondUserLink).toHaveAttribute(
      "href",
      "https://github.com/testuser2"
    );
  });
});
