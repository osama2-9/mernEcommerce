import Product from "../model/Product.js";
import Sale from "../model/Sale.js";

const createTimedSaleProduct = async (req, res) => {
  try {
    const { productId, startTime, endTime } = req.body;
    if (!productId) {
      return res.status(400).json({
        error: "Product Id is required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "No product found",
      });
    }
    const newSale = new Sale({
      productId: product._id,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      isActive: true,
    });

    await newSale.save();
    return res.status(201).json({
      message: "New Product added to timed sale",
    });
  } catch (error) {
    console.log(error);
  }
};
const getTimedSaleProduct = async (req, res) => {
  const currentTime = new Date();

  try {
    const productOnTimedSale = await Sale.find({
      isActive: true,
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    });

    const expiredSales = productOnTimedSale.filter(
      (sale) => sale.endTime < currentTime
    );

    if (expiredSales.length > 0) {
      await Promise.all(expiredSales.map((sale) => sale.deleteOne()));
    }

    if (productOnTimedSale.length === 0) {
      return res.status(200).json([]);
    }

    const productsId = productOnTimedSale.map((sale) => sale.productId);

    const products = await Product.find({
      _id: { $in: productsId },
    });

    const productData = products.map((product) => {
      const saleInfo = productOnTimedSale.find(
        (sale) => sale.productId.toString() === product._id.toString()
      );

      return {
        ...product.toObject(),
        sale: saleInfo
          ? {
              startTime: saleInfo.startTime,
              endTime: saleInfo.endTime,
              isActive: saleInfo.isActive,
              salePercent: product.sale || 0,
            }
          : null,
      };
    });

    return res.status(200).json(productData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const activationStatus = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await Sale.findOne({ productId })
      .sort({ createdAt: -1 }) 
      .exec();

    if (!product) {
      return res.status(404).json({ error: "No product found" });
    }

    product.isActive = !product.isActive;
    await product.save();

    return res
      .status(200)
      .json({ message: `Active Status: ${product.isActive}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const deleteTimedSaleProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        error: "Product ID is required",
      });
    }

    const product = await Sale.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({
        error: "No product found",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      message: "Product removed from sale successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export {
  createTimedSaleProduct,
  getTimedSaleProduct,
  activationStatus,
  deleteTimedSaleProduct,
};
