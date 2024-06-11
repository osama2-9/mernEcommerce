import Category from "../model/Category.js";
import Product from "../model/Product.js";

const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDesc } = req.body;

    if (!categoryName) {
      return res.status(400).json({
        error: "Please enter category name to create !",
      });
    }
    const categoryExsist = await Category.findOne({ categoryName });
    if (categoryExsist) {
      return res.status(400).json({
        error: "This category already exsist ",
      });
    }

    const createNewCategory = new Category({
      categoryName,
      categoryDesc,
    });
    await createNewCategory.save();
    if (createNewCategory) {
      return res.status(201).json({
        message: "New category created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) {
      return res.status(404).json({
        error: "no category found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
  }
};
const getCategoriesWithProducts = async (req, res) => {
  try {
    const categories = await Category.find();

    const results = [];

    for (const category of categories) {
      const products = await Product.find({ categoryID: category._id });
      if (products.length > 0) {
        const selectedProduct = products[0];

        results.push({
          categoryName: category.categoryName,
          productImg: selectedProduct.productImg,
        });
      }
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getSpecificProduct = async (req, res) => {
  try {
    const { categoryName } = req.params;
    if (!categoryName) {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    const category = await Category.findOne({ categoryName });
    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    const products = await Product.find({ categoryID: category._id });
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export {
  createCategory,
  getAllCategory,
  getCategoriesWithProducts,
  getSpecificProduct,
};
