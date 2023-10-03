const categoryRepository = require("../repository/category.repository");
const categoryService = require("../services/category.service");
const ERROR_CONSTANT = require("../constants/error");

// add feature to get all news
const getCategory = async (req, res) => {
  try {
    let category = await categoryRepository.getCategory();
    res.json({ data: category });
  } catch (err) {
    res.status(500).json({ error: "Error reading data from database" });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    const category = await categoryService.getCategoryById(categoryId);
    res.json({ data: category });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.CATEGORY_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Error reading from category by Id" });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ data: category });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error creating category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.body);
    res.status(201).json({ message: "data category completed been updated" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error updating category" });
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    const category = await categoryService.deleteCategoryById(categoryId);
    res.status(201).json({ message: "data category completed been updated" });
  } catch (err) {
    if (err.message === ERROR_CONSTANT.CATEGORY_NOT_FOUND) {
      res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: "Error deleting category data by Id" });
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
