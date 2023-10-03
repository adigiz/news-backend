const express = require("express");
const router = express.Router();
const newsController = require("../controller/news.controller");
const { imageUpload } = require("../middlewares/imageUploadMiddleware");

router.get("/api/news", newsController.getNews);
router.get("/api/news/search/:search", newsController.searchNews);
router.get("/api/news/:id", newsController.getNewsById);
router.post(
  "/api/news",
  imageUpload.single("image"),
  newsController.createNews
);
router.put("/api/news", newsController.updateNews);
router.delete("/api/news/:id", newsController.deleteNews);

module.exports = router;
