import React, { useState, useEffect } from "react";
import {
  getPosts,
  deletePost,
  likePost,
  commentPost,
} from "../services/postService";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleComment = async (postId, commentText) => {
    try {
      await commentPost(postId, { text: commentText });
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, { text: commentText }],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Error commenting on post:", err);
    }
  };

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title || "Untitled Post"}</h2>
            <p>{post.content || "No content available"}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
            <div>
              <button onClick={() => handleLike(post._id)}>
                Like ({post.likes})
              </button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>

            {/* Comment section */}
            <div>
              <input type="text" placeholder="Add a comment" />
              <button
                onClick={(e) =>
                  handleComment(post._id, e.target.previousSibling.value)
                }
              >
                Comment
              </button>
            </div>

            <div>
              {post.comments.map((comment, index) => (
                <p key={index}>{comment.text}</p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
