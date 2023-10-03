class Comment {
  constructor(comment) {
    this.comment_id = comment.comment_id;
    this.detail_comment = comment.detail_comment;
    this.created_at = comment.created_at;
    this.modified_at = comment.modified_at;
    this.news_id = comment.news_id;
    this.user_id = comment.user_id;
    this.is_delete = comment.is_delete;
  }
}

module.exports = Comment;
