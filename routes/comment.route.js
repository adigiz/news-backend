const express = require("express");
const router = express.Router();
const commentController = require("../controller/comment.controller");

router.get("/api/comment", commentController.getComment);
router.get("/api/comment/:id", commentController.getCommentById);
router.post("/api/comment", commentController.createComment);
router.put("/api/comment", commentController.updateComment);
router.delete("/api/comment/:id", commentController.deleteComment);

module.exports = router;