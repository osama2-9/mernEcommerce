import Favorite from "../model/Favorite.js";
import Product from "../model/Product.js";
const addProductToFavorite = async (req, res) => {
  try {
    const { uid, pid } = req.body;
    if (!uid) {
      return res.status(404).json({
        error: "You must be login",
      });
    }
    if (!uid || !pid) {
      return res.status(400).json({
        error: "User Id and Product Id is Required",
      });
    }

    const findProduct = await Product.findById(pid);
    if (!findProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    const getUserFavoriteList = await Favorite.findOne({ pid: pid });
    if (getUserFavoriteList) {
      return res.status(400).json({
        error: "This Product already added to your list",
      });
    }

    const newProductToAdd = new Favorite({
      uid: uid,
      pid: pid,
    });

    if (!newProductToAdd) {
      return res.status(400).json({
        error: "Can't save this product",
      });
    }
    await newProductToAdd.save();
    return res.status(201).json({
      message: `Product addedd to your favorite list 
      `,
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserFavoriteList = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(404).json({
        error: "No user found",
      });
    }

    const getFavoriteProductsId = await Favorite.find({ uid });

    if (!getFavoriteProductsId || getFavoriteProductsId.length === 0) {
      return res.status(400).json({
        error: "Can't get products",
      });
    }

    const getFavoriteProductIds = getFavoriteProductsId.map((p) => p.pid);
    const getFavoriteProducts = await Product.find({
      _id: { $in: getFavoriteProductIds },
    });

    return res.status(200).json(getFavoriteProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { addProductToFavorite, getUserFavoriteList };
