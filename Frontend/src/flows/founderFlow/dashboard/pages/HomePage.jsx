import React, { useState, useEffect } from "react";
import PostCard from "../../components/PostCard";
import QuickPostInput from "../../components/QuickPostInput";
import apiCall from "../../../../utils/api.js";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch ideas from backend
  const fetchIdeas = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await apiCall(`/api/ideas?page=${pageNum}&limit=10`);

      if (pageNum === 1) {
        setPosts(data.ideas);
      } else {
        setPosts((prev) => [...prev, ...data.ideas]);
      }

      setHasMore(data.pagination.hasNextPage);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const handlePost = async () => {
    fetchIdeas(1); // Refetch first page from backend after posting

    // Also refresh profile data to update idea count in sidebar
    try {
      const data = await apiCall("/api/founder/profile");
      // Update localStorage with the latest profile
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("profileUpdated"));
      window.dispatchEvent(new Event("refreshProfileSummary"));
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  const handleDeleteIdea = async (deletedIdeaId) => {
    // Remove the deleted idea from the posts state
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedIdeaId)
    );

    // Also refresh profile data to update idea count in sidebar
    try {
      const data = await apiCall("/api/founder/profile");
      // Update localStorage with the latest profile
      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("profileUpdated"));
      window.dispatchEvent(new Event("refreshProfileSummary"));
    } catch (err) {
      console.error("Failed to refresh profile:", err);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchIdeas(page + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <QuickPostInput onPost={handlePost} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading && posts.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading ideas...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No ideas yet. Be the first to share!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={handleDeleteIdea} />
          ))}

          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-medium hover:bg-purple-200 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
