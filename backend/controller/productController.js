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
    const products = await Prodcut.find({
      productQuntity: { $gt: 0 },
      categoryID: { $ne: "664f444d1d05fea3bccf975f" },
    });

    if (products.length === 0) {
      return res.status(404).json({
        error: "No Products Found",
      });
    }

    res.status(200).json(products);
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

const getRelatedProducts = async (req, res) => {
  const { categoryID, productID } = req.params;
  try {
    const relatedProducts = await Prodcut.getRelatedProducts(
      categoryID,
      productID
    );
    return res.status(200).json(relatedProducts);
  } catch (error) {
    console.log(error);
  }
};
const createSale = async (req, res) => {
  try {
    const { pid, discount } = req.body;

    if (!pid) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (!discount || discount <= 0) {
      return res.status(400).json({
        error: "Please choose a valid discount value or add your own",
      });
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).json({
        error: "Error while getting product",
      });
    }

    product.sale = discount;
    await product.save();

    return res.status(200).json({
      message: "Sale Created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductsOnSale = async (req, res) => {
  try {
    const product = await Prodcut.find();
    const onSale = product.filter((p) => p.sale > 0);
    if (onSale.length < 0) {
      return;
    }

    return res.status(200).json(onSale);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { pid } = req.body;
  if (!pid) {
    return res.status(400).json({
      error: "Product Id is required",
    });
  }
  const findProduct = await Prodcut.findById(pid);
  if (!findProduct) {
    return res.status(404).json({
      error: "No product found",
    });
  }

  if (findProduct.productImg) {
    const imgId = findProduct.productImg.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);
  }

  await Prodcut.findByIdAndDelete(pid);

  return res.status(200).json({
    message: "Product deleted",
  });
};

const updateProductData = async (req, res) => {
  const {
    pid,
    productName,
    productQuntity,
    productPrice,
    prodcutSize,
    productColors,
    productDesc,
    categoryID,
  } = req.body;
  let { productImg } = req.body;
  if (!pid) {
    return res.status(400).json({
      error: "Product Id is required",
    });
  }

  const findProduct = await Prodcut.findById(pid);

  if (!findProduct) {
    return res.status(404).json({
      error: "No product found",
    });
  }

  if (productImg) {
    if (findProduct.productImg) {
      const imgId = findProduct.productImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    const uploadedResponse = await cloudinary.uploader.upload(productImg);
    productImg = uploadedResponse.secure_url;
  }

  findProduct.productName = productName || findProduct.productName;
  findProduct.productPrice = productPrice || findProduct.productPrice;
  findProduct.productQuntity = productQuntity || findProduct.productQuntity;
  findProduct.productDesc = productDesc || findProduct.productDesc;
  findProduct.prodcutSize = prodcutSize;
  findProduct.categoryID =
    categoryID || findProduct.categoryID
      ? prodcutSize.split(",").map((size) => size.trim())
      : findProduct.prodcutSize;
  findProduct.productColors = productColors
    ? productColors.split(",").map((color) => color.trim())
    : findProduct.productColors;

  await findProduct.save();
  return res.status(200).json({
    message: "Product data updated",
  });
};

const getFilterdProducts = async (req, res) => {
  const { cid } = req.body;

  if (!cid) {
    return res.status(400).json({
      error: "Category Id required",
    });
  }

  const category = await Category.findById(cid);
  if (!category) {
    return res.status(404).json({
      error: "Category not found",
    });
  }

  const products = await Product.find({ categoryID: category?._id });
  if (!products) {
    return res.status(400).json({
      error: "Products not found",
    });
  }

  const sizeSet = new Set();
  const colorSet = new Set();
  const onSale = [];
  const prices = [];
  const quantity = [];

  products.forEach((product) => {
    if (product.prodcutSize) {
      product.prodcutSize.forEach((size) => {
        sizeSet.add(size);
      });
    }
  });
  products.forEach((product) => {
    if (product.productColors) {
      product.productColors.forEach((color) => {
        colorSet.add(color);
      });
    }
  });
  products.forEach((product) => {
    prices.push(product.productPrice, product._id);
  });
  products.forEach((product) => {
    if (product.productQuntity >= 10) {
      quantity.push(product);
    }
  });
  products.forEach((product) => {
    if (product.sale > 0) {
      onSale.push(product);
    }
  });

  const sizes = Array.from(sizeSet);
  const colors = Array.from(colorSet);

  return res.json({ sizes, colors, onSale, prices, quantity });
};

export {
  createProduct,
  getAllProducts,
  filterProducts,
  getProductById,
  search,
  getRelatedProducts,
  createSale,
  getProductsOnSale,
  deleteProduct,
  updateProductData,
  getFilterdProducts,
};
