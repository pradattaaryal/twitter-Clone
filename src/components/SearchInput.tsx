  "use client";

  import { useState, useCallback } from "react";
  import Image from "next/image";
  import { getbyname } from "@/actions/profile.action";
  import Link from "next/link";

  interface User {
    id: string;
    name: string | null;
    username: string;
    image: string | null;
  }

  export default function SearchInput() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [error, setError] = useState("");

    const handleSearch = useCallback(async () => {
      const trimmedInput = searchInput.trim();
      if (!trimmedInput) {
        setUsers([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const result = await getbyname(trimmedInput);
        if (result.length > 0) {
          setUsers(result);
          setError("");
        } else {
          setUsers([]);
          setError(`No users found with username containing "${trimmedInput}"`);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setLoading(false);
      }
    }, [searchInput]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    return (
      <div className="relative w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter username"
            className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            aria-label="Search by username"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchInput.trim()}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            aria-label="Search"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="mt-2">
          {loading ? (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              <p>Searching for users...</p>
            </div>
          ) : users.length > 0 ? (
            users.map((user) => (
    <Link href={`/profile/${user.username}`}>
              <div
                key={user.id}
                className="mb-2 bg-red-600 flex items-center rounded-lg  p-3"
              >
                <div className="relative h-10 w-10">
                  
                </div>
                <div className="ml-3">
                  <p className="text-white">{user.name || user.username}</p>
                  <p className="text-sm text-gray-400">@{user.username}</p>
                </div>
              </div>
              </Link>
            ))
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : null}
        </div>
      </div>
    );
  }
