const knex = require("../db/knex");
const Comment = require("../models/comment");

const getComment = async () => {
  try {
    const comment = await knex("comment")
    .select('*')
    .orderBy('comment_id');;
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getCommentById = async (commentId) => {
  try {
    const comment = await knex("comment").where({ id: commentId }).first();
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const createComment = async (newComment) => {
  try {
    const id = await knex("comment").insert(newComment);

    return new Comment({ ...newComment, id });
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error("Failed to create comment");
  }
};

const updateComment = async (newComment) => {
  const {
    comment_id,
    detail_comment,
    created_at,
    modified_at,
    news_id,
    is_delete,
    user_id,
  } = newComment;
  try {
    const comment = await knex("comment").where("id", comment_id).update({
      detail_comment: detail_comment,
      created_at: created_at,
      modified_at: modified_at,
      news_id: news_id,
      is_delete: is_delete,
      user_id: user_id,
    });

    return comment;
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error("Failed to update comment");
  }
};

const deleteCommentById = async (commentId) => {
  try {
    const comment = await knex("comment").where("id", commentId).del();
    return comment;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  getComment,
  getCommentById,
  createComment,
  updateComment,
  deleteCommentById,
};
