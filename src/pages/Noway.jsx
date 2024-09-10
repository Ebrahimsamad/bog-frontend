import { useState, useEffect, useRef } from "react";
import {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost,
  updatePost,
} from "../services/postService";

import { FaImage, FaUserCircle } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineSend,
  AiOutlineEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { BiMenu } from "react-icons/bi";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [commentTexts, setCommentTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const commentRefs = useRef({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        alert("Error fetching posts. Please try again.");
      }
    };
    fetchPosts();
  }, [posts]);

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      return alert("Content is required.");
    }

    setLoading(true);

    try {
      const postData = {
        content: newPost,
        image: image,
      };

      const { data } = await createPost(postData);
      console.log("Created post:", data);
      setPosts((prevPosts) => [data, ...prevPosts]);
      setNewPost("");
      setImage(null);
      setImagePreview(null);

      const updatedPosts = await getPosts();
      setPosts(updatedPosts.data);
    } catch (err) {
      console.error("Error creating post:", err);
      alert(err.response?.data || "Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert(
        err.response?.data.message || "Error deleting post. Please try again."
      );
    }
  };

  const [loadingLike, setLoadingLike] = useState({});

  const handleLike = async (postId) => {
    if (loadingLike[postId]) return;

    const post = posts.find((post) => post._id === postId);
    if (!post) return;

    const isLiked = post.likedByUser;

    setLoadingLike((prev) => ({ ...prev, [postId]: true }));

    try {
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1,
                likedByUser: !isLiked,
              }
            : p
        )
      );

      const { data } = await likePost(postId);

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likesCount: data.likesCount,
                likedByUser: data.likedByUser,
              }
            : p
        )
      );
    } catch (err) {
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === postId
            ? {
                ...p,
                likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
                likedByUser: isLiked,
              }
            : p
        )
      );
      console.error("Error liking/unliking post:", err);
      alert("Error liking post");
    } finally {
      setLoadingLike((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleComment = async (postId) => {
    const commentText = commentTexts[postId];
    if (!commentText || !commentText.trim()) {
      return alert("Comment cannot be empty.");
    }

    try {
      const { data: newComment } = await commentPost(postId, {
        text: commentText,
      });
      setPosts(
        posts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setCommentTexts({ ...commentTexts, [postId]: "" });
    } catch (err) {
      console.error("Error commenting on post:", err);
      alert(err.response?.data || "Error commenting on post");
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentTexts({ ...commentTexts, [postId]: value });
  };

  const handleCommentIconClick = (postId) => {
    const commentRef = commentRefs.current[postId];
    if (commentRef) {
      commentRef.focus();
    }
  };

  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      handleComment(postId);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (!postToEdit) return;

    setEditPostId(postId);
    setEditContent(postToEdit.content);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const { data: updatedPost } = await updatePost(editPostId, {
        content: editContent,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editPostId
            ? { ...post, content: updatedPost.content }
            : post
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating post:", err);
      alert(
        err.response?.data.message || "Error updating post. Please try again."
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-center py-6 mt-10">
        <main className="w-full max-w-2xl mt-5 px-4">
          {/* Post Creation */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <FaUserCircle size={50} className="text-gray-500" />
              <div className="flex-grow">
                <input
                  type="text"
                  className="w-full bg-gray-700 text-gray-100 border-none mb-3 p-3 rounded-lg placeholder-gray-500"
                  placeholder="What's on your mind?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto object-cover rounded-lg"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center space-x-2 text-gray-400 hover:text-gray-300"
                  >
                    <FaImage size={20} />
                    <span className="text-sm">Upload Image</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <button
                    onClick={handleCreatePost}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
                  >
                    {loading ? (
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-4 border-blue-300 border-t-transparent border-solid rounded-full animate-spin"></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <AiOutlineSend size={20} className="mr-2" />
                        Post
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Post feed */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 relative"
              >
                <div className="absolute top-7 right-7">
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        document
                          .getElementById(`dropdown-${post._id}`)
                          .classList.toggle("hidden");
                      }}
                    >
                      <BiMenu size={20} />
                    </button>
                    <div
                      id={`dropdown-${post._id}`}
                      className="dropdown-menu hidden absolute top-8 right-0 bg-gray-700 rounded-lg shadow-lg w-40"
                    >
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="w-full text-gray-100 hover:bg-gray-600 px-4 py-2 text-left flex items-center space-x-2"
                      >
                        <AiOutlineEdit size={20} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="w-full text-gray-100 hover:bg-gray-600 px-4 py-2 text-left flex items-center space-x-2"
                      >
                        <AiOutlineDelete size={20} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* ! Important */}

                <div className="flex items-center mb-4">
                  <FaUserCircle size={40} className="text-gray-500" />
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-100">
                      {post.author.username}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-gray-400 mb-4">{post.content}</p>

                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="rounded-lg mb-4 w-full h-auto object-cover"
                    style={{ maxHeight: "400px" }}
                  />
                )}

                <div className="flex items-center space-x-4 mb-4">
                  <button
                    onClick={() => handleLike(post._id)}
                    disabled={loadingLike[post._id]}
                    className={`flex items-center space-x-2 ${
                      post.likedByUser
                        ? "text-blue-400"
                        : "text-gray-400 hover:text-blue-400"
                    } transition`}
                  >
                    {loadingLike[post._id] ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        <AiOutlineLike
                          className={`mr-1 ${
                            post.likedByUser ? "text-blue-400" : "text-gray-400"
                          }`}
                          size={20}
                        />
                        <span>{post.likesCount || post.likes.length}</span>
                        <span className="ml-1">
                          {post.likedByUser ? "Unlike" : "Like"}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCommentIconClick(post._id)}
                    className="flex items-center text-blue-500 hover:text-blue-400 transition"
                  >
                    <AiOutlineComment className="mr-1" size={20} />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="border-t border-gray-700 pt-4 mt-4">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="flex items-start mb-4">
                        <FaUserCircle size={30} className="text-gray-500" />
                        <div className="ml-3">
                          <h5 className="font-semibold text-gray-100">
                            {comment.userId.username}
                          </h5>
                          <p className="text-gray-400 text-sm">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                          <p className="text-gray-300">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center">
                  <FaUserCircle size={30} className="text-gray-500" />
                  <input
                    ref={(ref) => (commentRefs.current[post._id] = ref)}
                    className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500 ml-3"
                    placeholder="Add a comment..."
                    value={commentTexts[post._id] || ""}
                    onChange={(e) =>
                      handleCommentInputChange(post._id, e.target.value)
                    }
                    onKeyPress={(e) => handleKeyPress(e, post._id)}
                  />
                  <button
                    onClick={() => handleComment(post._id)}
                    className="text-blue-500 hover:text-blue-400 transition ml-2"
                  >
                    <AiOutlineSend size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No posts to display</p>
          )}
        </main>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <textarea
              className="w-full bg-gray-800 text-gray-100 border-none p-3 rounded-lg mb-4"
              rows="5"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button
              onClick={handleEditSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
