const knex = require("../db/knex");
const Category = require("../models/category");

const getCategory = async () => {
  try {
    const category = await knex("category")
    .select('*')
    .orderBy('category_id');;
    return category;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const category = await knex("category").where({ id: categoryId }).first();
    return category;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const createCategory = async (newCategory) => {
  try {
    const id = await knex("category").insert(newCategory);

    return new Category({ ...newCategory, id });
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error("Failed to create a new category");
  }
};

const updateCategory = async (newCategory) => {
  const { category_id, category_name, is_delete } = newCategory;
  try {
    const category = await knex("category").where("id", category_id).update({
      category_name: category_name,
      is_delete: is_delete,
    });

    return category;
  } catch (error) {
    console.log(error);
    console.error(error);
    throw new Error("Failed to update a category");
  }
};

const deleteCategoryById = async (categoryId) => {
  try {
    const category = await knex("category").where("id", categoryId).del();
    return category;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
};
