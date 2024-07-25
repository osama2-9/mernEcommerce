import Brand from "../model/Brands.js";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import { v2 as cloudinary } from "cloudinary";

const createBrand = async (req, res) => {
  try {
    const { brandName, brandFor, brandDesc } = req.body;
    let { brandImg } = req.body;

    if (!brandName || !brandFor || !brandImg) {
      return res.status(400).json({
        error: "Please fill all required fields",
      });
    }

    const isBrandExsist = await Brand.findOne({ brandName: brandName });
    if (isBrandExsist) {
      return res.status(400).json({
        error: "This brand already exists",
      });
    }
    if (brandImg) {
      const upload = await cloudinary.uploader.upload(brandImg);
      brandImg = upload.secure_url;
    }

    const createNewBrand = new Brand({
      brandName: brandName,
      brandFor: brandFor,
      brandDesc: brandDesc,
      brandImg: brandImg,
    });

    if (!createNewBrand) {
      return res.status(400).json({
        error: "Error While Creating",
      });
    }

    await createNewBrand.save();
    return res.status(201).json({
      message: `${brandName} Brand created successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { bid, brandName, brandFor, brandDesc } = req.body;

    if (!bid) {
      return res.status(400).json({
        error: "Brand Id is required",
      });
    }
    const findBrand = await Brand.findById(bid);

    if (!findBrand) {
      return res.status(404).json({
        error: "Brand not found",
      });
    }
    findBrand.brandName = brandName || findBrand.brandName;
    findBrand.brandFor = brandFor || findBrand.brandFor;
    findBrand.brandDesc = brandDesc || findBrand.brandDesc;
    await findBrand.save();
    return res.status(200).json({
      message: `Brand Name Updated to ${brandName}!`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { bid } = req.body;
    if (!bid) {
      return res.status(404).json({
        error: "Brand Id is required",
      });
    }
    const findBrandAndDelete = await Brand.findByIdAndDelete(bid);
    if (!findBrandAndDelete) {
      return res.status(400).json({
        error: "Error While deleteing this brand",
      });
    }
    return res.status(200).json({
      message: `Brand Deleted`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    if (brands.length === 0) {
      return res.status(200).json({ brands: [], products: [] });
    }

    const products = await Product.find({
      brandID: { $in: brands.map((brand) => brand._id) },
    });

    return res.status(200).json({ brands, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getBrandsWithProducts = async (req, res) => {
  try {
    const { bid } = req.params;
    if (!bid) {
      return res.status(400).json({
        error: "Brand Id is required",
      });
    }

    const brand = await Brand.findById(bid);
    if (!brand) {
      return res.status(404).json({
        error: "This Brand not found",
      });
    }

    const products = await Product.find({ brandID: brand._id });

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

    return res
      .status(200)
      .json({ products, brand, sizes, colors, onSale, prices, quantity });
  } catch (error) {
    console.log(error);
  }
};

export {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
  getBrandsWithProducts,
};
