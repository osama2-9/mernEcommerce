import Category from "../model/Category.js";
import Product from "../model/Product.js";
import Prodcut from "../model/Product.js";
import { v2 as cloudinary } from "cloudinary";
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productQuntity,
      productDesc,
      categoryID,
      prodcutSize,
      productColors,
    } = req.body;
    let { productImg } = req.body;

    const sizesArray = prodcutSize
      ? prodcutSize.split(",").map((size) => size.trim())
      : [];
    const colorsArray = productColors
      ? productColors.split(",").map((color) => color.trim())
      : [];

    if (
      !productName ||
      !productPrice ||
      !productDesc ||
      !productQuntity ||
      !categoryID
    ) {
      return res.status(400).json({
        error: "Please fill all form fields",
      });
    }

    if (productImg) {
      const upload = await cloudinary.uploader.upload(productImg);
      productImg = upload.secure_url;
    }

    const productData = {
      productName,
      productPrice,
      productDesc,
      productImg,
      productQuntity,
      categoryID,
    };

    if (sizesArray.length > 1) {
      productData.prodcutSize = sizesArray;
    }

    if (colorsArray.length > 1) {
      productData.productColors = colorsArray;
    }

    const createProduct = new Prodcut(productData);

    await createProduct.save();
    return res.status(201).json({
      message: "New Product Created",
      product: createProduct,
    });
  } catch (error) {
    console.log("CREATE ERROR =====>  ", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getProducts = await Prodcut.find({});

    if (getProducts.length === 0) {
      return res.status(404).json({
        error: "No Products Found",
      });
    }

    res.status(200).json(getProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterProducts = async (req, res) => {
  try {
    const { type } = req.params;

    const category = await Category.findOne({ categoryName: type });

    if (!category) {
      return res.status(404).json({ error: "This Type Not Found" });
    }

    const product = await Prodcut.find({ categoryID: category._id });
    if (product.length === 0) {
      return res.status(404).json({
        error: "No product found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const search = async (req, res) => {
  try {
    const { query } = req.params;
    const products = await Product.find({
      productName: { $regex: query, $options: "i" },
    }).limit(5);
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!pid) {
      return res.status(404).json({
        error: "Theres no selected product",
      });
    }
    const data = [];
    const selectedProduct = await Prodcut.findById(pid);
    const categoryID = selectedProduct.categoryID;
    const getCategoryNameByProductId = await Category.findById(categoryID);
    const fullData = data.concat(selectedProduct, getCategoryNameByProductId);

    if (!selectedProduct) {
      return res.status(404).json({
        error: "Product not Found",
      });
    }

    return res.status(200).json({ data: fullData });
  } catch (error) {
    console.log(error);
  }
};

const getRelatedProducts = async(req, res) => {
  const { categoryID, productID } = req.params;
  try {
    const relatedProducts = await Prodcut.getRelatedProducts(categoryID, productID);
    return res.status(200).json(relatedProducts);
  } catch (error) {
    console.log(error);
  }
};

export {
  createProduct,
  getAllProducts,
  filterProducts,
  getProductById,
  search,
  getRelatedProducts,
};
