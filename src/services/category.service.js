const categoryRepository = require("../repository/category.repository");
const Category = require("../models/category");
const getCategory = async () => {
  try {
    return await categoryRepository.getCategory();
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const category = await categoryRepository.getCategoryById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (req) => {
  try {
    const newCategory = new Category(req);
    return await categoryRepository.createCategory(newCategory);
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (req) => {
  try {
    const newCategory = new Category(req);
    return await categoryRepository.updateCategory(newCategory);
  } catch (error) {
    throw error;
  }
};

const deleteCategoryById = async (userId) => {
  try {
    const category = await categoryRepository.deleteCategoryById(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategoryById,
};
