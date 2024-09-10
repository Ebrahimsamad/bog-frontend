import React, { useState } from "react";
import { FaImage, FaUserCircle } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

const PostForm = ({ onCreatePost, loading }) => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      return alert("Content is required.");
    }
    onCreatePost(newPost, image);
    setNewPost("");
    setImage(null);
    setImagePreview(null);
  };

  return (
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
  );
};

export default PostForm;
