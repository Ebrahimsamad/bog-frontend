import API from "./api";

// Fetch all posts
export const getPosts = () => API.get("/posts");

// Add a post
export const createPost = (postData) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);

  if (postData.image) {
    formData.append("image", postData.image);
  }

  return API.post("/posts", formData);
};

// Like a post
export const likePost = (postId) => API.put(`/posts/${postId}/like`);

// Comment on a post
export const commentPost = (postId, commentData) =>
  API.post(`/posts/${postId}/comment`, commentData);

// Delete a post
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

// Update a post
export const updatePost = (postId, postData) => {
  const formData = new FormData();
  formData.append("content", postData.content);

  if (postData.image) {
    formData.append("image", postData.image);
  }

  return API.put(`/posts/${postId}`, formData);
};
