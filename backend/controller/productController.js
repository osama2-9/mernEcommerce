import { response } from "express";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import Prodcut from "../model/Product.js";
import Rating from "../model/Rating.js";
import { v2 as cloudinary } from "cloudinary";
const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productQuantity,
      productDesc,
      categoryID,
      brandID,
      productSize,
      productColors,
    } = req.body;
    let { productImg } = req.body;

    const sizesArray = productSize
      ? productSize.split(",").map((size) => size.trim())
      : [];
    const colorsArray = productColors
      ? productColors.split(",").map((color) => color.trim())
      : [];

    if (
      !productName ||
      !productPrice ||
      !productDesc ||
      !productQuantity ||
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
      productQuantity,
      categoryID,
      brandID,
    };

    if (sizesArray.length > 0) {
      productData.productSize = sizesArray;
    }

    if (colorsArray.length > 0) {
      productData.productColors = colorsArray;
    }

    const createProduct = new Product(productData);

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
    const products = await Prodcut.find();

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
    const getProductRate = await Rating.findOne({ pid: selectedProduct?._id });
    const fullData = data.concat(
      selectedProduct,
      getCategoryNameByProductId,
      getProductRate
    );

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
  try {
    const { pid } = req.body;
    if (!pid) {
      return res.status(400).json({
        error: "Product Id is required",
      });
    }
    const findProduct = await Product.findById(pid);
    if (!findProduct) {
      return res.status(404).json({
        error: "No product found",
      });
    }

    if (findProduct.productImg) {
      const imgId = findProduct.productImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Product.findByIdAndDelete(pid);

    return res.status(200).json({
      message: "Product deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while deleting the product",
    });
  }
};

const updateProductData = async (req, res) => {
  try {
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

    const findProduct = await Product.findById(pid);

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
    findProduct.prodcutSize =
      prodcutSize && prodcutSize.length > 0
        ? prodcutSize
        : findProduct.prodcutSize;
    findProduct.categoryID = categoryID || findProduct.categoryID;
    findProduct.productColors =
      productColors && productColors.length > 0
        ? productColors
        : findProduct.productColors;

    await findProduct.save();

    return res.status(200).json({
      message: "Product data updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while updating the product data",
    });
  }
};

const getFilterdProducts = async (req, res) => {
  const { cid } = req.params;

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
    prices.push(product.productPrice);
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

const removeSale = async (req, res) => {
  try {
    const { pid } = req.body;
    if (!pid) {
      return res.status(400).json({
        error: "Product Id is required",
      });
    }
    const product = await Prodcut.findById(pid);
    if (!product) {
      return res.status(404).json({
        error: "No prodcut found",
      });
    }
    if (product.sale === 0) {
      return res.status(400).json({
        error: "Product not have any sales to remove",
      });
    }

    if (product.sale > 0) {
      product.sale = 0;
    }
    product.save();
    return res.status(200).json({
      message: "Product data updated",
    });
  } catch (error) {
    console.log(error);
  }
};

const ProductRating = async (req, res) => {
  try {
    const { uid, pid, rating } = req.body;
    if (!uid || !pid) {
      return res.status(400).json({
        error: "Missing dependencies to rate",
      });
    }

    const rate = parseInt(rating);
    if (isNaN(rate) || rate <= 0) {
      return res.status(400).json({
        error: "Invalid rating value",
      });
    }

    const productToRate = await Product.findById(pid);
    if (!productToRate) {
      return res.status(400).json({
        error: "No product found",
      });
    }

    let existingRating = await Rating.findOne({ uid, pid });

    if (existingRating) {
      existingRating.rating = rate;
      existingRating.ratingCounter += 1;
      await existingRating.save();
    } else {
      const newRate = new Rating({
        pid: productToRate._id,
        uid: req.user._id,
        rating: rate,
        ratingCounter: 1,
      });
      await newRate.save();
    }

    const allRatings = await Rating.find({ pid });
    const totalRatings = allRatings.reduce((sum, rate) => sum + rate.rating, 0);
    const ratingCount = allRatings.length;
    const averageRating = totalRatings / ratingCount;

    productToRate.rating = averageRating;
    productToRate.ratingCount = ratingCount;
    await productToRate.save();

    return res.status(200).json({
      message: "Thanks for rating",
      rating: averageRating,
      ratingCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while submitting the rating",
    });
  }
};
const getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const ratings = await Rating.find();

    const ratedProducts = products
      .map((product) => {
        const rating = ratings.find(
          (rated) => rated.pid.toString() === product._id.toString()
        );
        if (rating) {
          return {
            ...product.toObject(),
            rating: rating.value,
          };
        }
        return null;
      })
      .filter((product) => product !== null);

    ratedProducts.sort((a, b) => b.rating - a.rating);

    return res.status(200).json(ratedProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export {
  ProductRating,
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
  removeSale,
  getTopRatedProducts,
};
