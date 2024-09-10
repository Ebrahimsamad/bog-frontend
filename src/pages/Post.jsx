import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineSend,
} from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";

const Post = ({
  post,
  onLike,
  onDelete,
  onEdit,
  onComment,
  commentTexts,
  onCommentInputChange,
  handleCommentIconClick,
  commentRefs,
  loadingLike,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 relative">
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
              onClick={() => onEdit(post._id)}
              className="w-full text-gray-100 hover:bg-gray-600 px-4 py-2 text-left flex items-center space-x-2"
            >
              <AiOutlineEdit size={20} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="w-full text-gray-100 hover:bg-gray-600 px-4 py-2 text-left flex items-center space-x-2"
            >
              <AiOutlineDelete size={20} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

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
          onClick={() => onLike(post._id)}
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
          onChange={(e) => onCommentInputChange(post._id, e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onComment(post._id);
            }
          }}
        />
        <button
          onClick={() => onComment(post._id)}
          className="text-blue-500 hover:text-blue-400 ml-3"
        >
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default Post;
