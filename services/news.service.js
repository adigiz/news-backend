const News = require("../models/news");
const newsRepository = require("../repository/news.repository");

const getNews = async () => {
  try {
    return await newsRepository.getNews();
  } catch (error) {
    throw error;
  }
};

const getNewsById = async (newsId) => {
  try {
    const news = await newsRepository.getNewsById(newsId);
    if (!news) {
      throw new Error("News not found");
    }
    return news;
  } catch (error) {
    throw error;
  }
};

const createNews = async (req) => {
  try {
    if (req.title.length > 255 || req.description.length > 255) {
      throw new Error("Character is more than 255");
    }
    const newNews = new News(req);
    return await newsRepository.createNews(newNews);
  } catch (error) {
    throw error;
  }
};

const updateNews = async (req) => {
  try {
    const newNews = new News(req);
    return await newsRepository.updateNews(newNews);
  } catch (error) {
    throw error;
  }
};

const deleteNewsById = async (newsId) => {
  try {
    const news = await newsRepository.deleteNewsById(newsId);
    if (!news) {
      throw new Error("News not found");
    }
    return news;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNewsById,
};
