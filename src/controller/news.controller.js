const newsRepository = require("../repository/news.repository");
const newsService = require("../services/news.service");
const ERROR_CONSTANT = require("../constants/error");
const { json } = require("express");

// add feature to get all news
const getNews = async (req, res) => {
  try {
    let news = await newsRepository.getNews();
    res.json({ data: news });
  } catch (err) {
    res.status(500).json({ error: "Error reading data from database" });
  }
};

const getNewsById = async (req, res) => {
  console.log("news by id");
  const newsId = parseInt(req.params.id);
  try {
    const news = await newsService.getNewsById(newsId);
    res.json({ data: news });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.NEWS_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Error reading from news by Id" });
  }
};

const createNews = async (req, res) => {
  const { title, description, detail, recommendation, category_id, user_id } =
    req.body;

  if (!req.file) {
    return res.status(400).json({ error: "missing image" });
  }
  const coverPath = req.file.path;
  console.log(coverPath);
  if (
    !title ||
    !description ||
    !detail ||
    !recommendation ||
    !category_id ||
    !user_id ||
    !coverPath
  ) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    const news = await newsService.createNews({
      title,
      description,
      detail,
      recommendation,
      category_id,
      user_id,
      coverPath,
    });
    res.status(201).json(news);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await newsService.updateNews(req.body);
    res.status(201).json({ message: "data news completed been updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error updating news" });
  }
};

const deleteNews = async (req, res) => {
  const newsId = parseInt(req.params.id);

  try {
    const news = await newsService.deleteNewsById(newsId);
    res.status(201).json({ message: "data news completed been updated" });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.NEWS_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Error deleting news data by Id" });
  }
};

// const searchNews = async (req, res) => {
//   const { search } = req.query; // Mengambil nilai 'search' dari query string
//   console.log(search)
//   try {
//     const details = await newsService.searchNews(search);

//     res.status(200).json({
//       status: "Success",
//       data: details.rows,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: "Error on database, check your connection",
//     });
//   }
// };

const searchNews = async (req, res) => {
  const search = req.params.search; // Mengambil nilai 'search' dari query string
  console.log(req.params);

  try {
    const details = await newsService.searchNews(search);

    // res.status(200).json({
    //   status: "Success",
    //   data: details.rows,
    // });
    console.log("SRC " + details);
    res.json({ data: details });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error on database, check your connection",
    });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  searchNews,
};
