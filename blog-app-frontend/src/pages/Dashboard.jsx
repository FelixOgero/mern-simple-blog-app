import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import PostCard from "../components/PostCard";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const { data } = await API.get("/posts");
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", { title, content, image });
      setTitle("");
      setContent("");
      setImage("");
      fetchPosts();
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to create post");
    }
  };

  // const handleDeletePost = async (postId) => {
  //   try {
  //     await API.delete(`/posts/${postId}`);
  //     fetchPosts();
  //   } catch (err) {
  //     console.error(err.response?.data?.message || 'Failed to delete post');
  //   }
  // };

  const handleDeletePost = async (postId) => {
    try {
      await API.delete(`/posts/${postId}`);
      fetchPosts();
      setError(""); // Clear any previous error on successful delete
    } catch (err) {
      // If error is due to unauthorized access, show an error message
      setError(err.response?.data?.message || "Failed to delete post");
      console.error(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleEditPost = (post) => {
    navigate(`/edit/${post._id}`, { state: post });
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>

      {/* Error Notification */}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleCreatePost} className="mb-4">
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Create Post
        </button>
      </form>

      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={handleDeletePost}
          onEdit={handleEditPost}
        />
      ))}
    </div>
  );
};

export default Dashboard;
