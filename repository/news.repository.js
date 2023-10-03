const knex = require("../db/knex");
const { uploadToCloud } = require("../middlewares/imageUploadMiddleware");
const News = require("../models/news");

const getNews = async () => {
  try {
    const news = await knex("news").select("*").orderBy("news_id");
    return news;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getNewsById = async (newsId) => {
  try {
    const news = await knex("news").where({ news_id: newsId }).first();
    return news;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const createNews = async (newNews) => {
  const {
    title,
    description,
    detail,
    recommendation,
    category_id,
    user_id,
    image,
    view_number,
    title_desc,
  } = newNews;
  try {
    const url = await uploadToCloud(image);
    if (url) {
      return knex("news")
        .insert({
          title,
          description,
          detail,
          image: url,
          recommendation,
          category_id,
          user_id,
          view_number,
          title_desc,
        })
        .returning("*");
    }
    throw new Error("failed to upload image");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create news");
  }
};

const updateNews = async (newNews) => {
  const {
    news_id,
    title,
    description,
    detail,
    image,
    created_at,
    modified_at,
    recommendation,
    view_number,
    title_desc,
    is_delete,
    category_id,
    user_id,
  } = newNews;
  try {
    const news = await knex("news").where("id", news_id).update({
      title: title,
      description: description,
      detail: detail,
      image: image,
      created_at: created_at,
      modified_at: modified_at,
      recommendation: recommendation,
      view_number: view_number,
      title_desc: title_desc,
      is_delete: is_delete,
      category_id: category_id,
      user_id: user_id,
    });

    return news;
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error("Failed to update a news");
  }
};

const deleteNewsById = async (newsId) => {
  try {
    const news = await knex("news").where("id", newsId).del();
    return news;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const searchNews = async (search) => {
  try {
    const results = await knex("news")
      .select("*")
      .where("title", "Ilike", `%${search}%`)
      .orWhere("detail", "Ilike", `%${search}%`)
      .orWhere("description", "Ilike", `%${search}%`)
      .orWhere("title_desc", "Ilike", `%${search}%`)
      .orWhereRaw("CAST(recommendation AS TEXT) ILIKE ?", [`%${search}%`])
      .orWhereRaw("CAST(is_delete AS TEXT) ILIKE ?", [`%${search}%`])
      .orWhereRaw("CAST(view_number AS TEXT) ILIKE ?", [`%${search}%`]);
    return results;
  } catch (err) {
    throw new Error(err);
  }
};

// const searchNews = async (search) => {
//   try {
//     const details = await knex.raw(
//       `
//       SELECT * FROM news AS n
//       WHERE n.title LIKE $1 OR n.detail LIKE $1 or n.title_desc LIKE $1
//       `,
//       ["%" + search + "%"]
//     );
//     return details.rows;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const searchNews = async (searchTerm) => {
//   try {
//     const results = await knex('news')
//       .select('*')
//       .where('title', 'like', `%${searchTerm}%`)
//       .orWhere('detail', 'like', `%${searchTerm}%`)
//       .orWhere('description', 'like', `%${searchTerm}%`)
//       .orWhere('title_desc', 'like', `%${searchTerm}%`);
//     return results;
//   } catch (error) {
//     throw error;
//   } finally {
//     knex.destroy(); // Tutup koneksi setelah selesai
//   }
// };

// const searchTerm = 'OLAH'; // Gantilah dengan kata kunci pencarian yang sesuai
// searchNews(searchTerm)
//   .then((results) => {
//     // Lakukan sesuatu dengan hasil pencarian
//     console.log(results);
//   })
//   .catch((error) => {
//     // Tangani kesalahan jika terjadi
//     console.error(error);
//   });

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNewsById,
  searchNews,
};
