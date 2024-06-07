import Category from "../model/Category.js";

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

export { createCategory, getAllCategory };
