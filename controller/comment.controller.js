const commentRepository = require("../repository/comment.repository");
const commentService = require("../services/comment.service");
const ERROR_CONSTANT = require("../constants/error");

// add feature to get all comment
const getComment = async (req, res) => {
  try {
    let comment = await commentRepository.getComment();
    res.json({ data: comment });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.COMMENTS_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR });
  }
};

const getCommentById = async (req, res) => {
  const commentId = parseInt(req.params.id);
  try {
    const comment = await commentService.getCommentById(commentId);
    res.json({ data: comment });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.COMMENTS_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR });
  }
};

const createComment = async (req, res) => {
  const isLoggedIn = true;
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json({ data: comment });
  } catch (e) {
    if (isLoggedIn === false) {
      res
        .status(404)
        .json({ message: "cannot create comment, you must login first!" });
    }
    console.log(e);
    res.status(500).json({ error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await commentService.updateComment(req.body);
    res.status(201).json({ data: comment });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR });
  }
};

const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.id);

  try {
    const comment = await commentService.deleteCommentById(commentId);
    res.status(201).json({ data: comment });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.COMMENTS_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: ERROR_CONSTANT.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getComment,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
