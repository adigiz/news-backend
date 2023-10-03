const Comment = require("../models/comment");
const commentRepository = require("../repository/comment.repository");

const getComment = async () => {
  try {
    return await commentRepository.getComment();
  } catch (error) {
    throw error;
  }
};

const getCommentById = async (commentId) => {
  try {
    const comment = await commentRepository.getCommentById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

const createComment = async (req) => {
  try {
    const newComment = new Comment(req);
    return await commentRepository.createComment(newComment);
  } catch (error) {
    throw error;
  }
};

const updateComment = async (req) => {
  try {
    const newComment = new Comment(req);
    return await commentRepository.updateComment(newComment);
  } catch (error) {
    throw error;
  }
};

const deleteCommentById = async (commentId) => {
  try {
    const comment = await commentRepository.deleteCommentById(commentId);
    if (!comment) {
      throw new Error("Comments not found");
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getComment,
  getCommentById,
  createComment,
  updateComment,
  deleteCommentById,
};
