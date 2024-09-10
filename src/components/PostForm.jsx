import { useState } from "react";
import axios from "axios";

const PostForm = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return alert("Title and content are required.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onPostAdded(response.data);
      setTitle("");
      setContent("");
      setImage(null);
      setError(null);
    } catch (err) {
      setError("Error creating post. Please try again.");
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && (
        <div className="alert alert-error mb-4">
          <div>{error}</div>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          className="textarea textarea-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="file-input w-full"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
