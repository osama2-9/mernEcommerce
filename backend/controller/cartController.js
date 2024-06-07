import Cart from "../model/Cart.js";
import Product from "../model/Product.js";
import User from "../model/User.js";

const addToCart = async (req, res) => {
  try {
    const { pid } = req.params;
    const { color, size, quantity, uid } = req.body;

    if (!pid) {
      return res.status(400).json({
        error: "No product found",
      });
    }

    const userOrdered = await User.findById(uid);
    const productOrdered = await Product.findById(pid);

    if (!userOrdered) {
      return res.status(404).json({
        error: "No user found",
      });
    }
    if (!productOrdered) {
      return res.status(404).json({
        error: "No product found",
      });
    }

    if (productOrdered.prodcutSize.length > 1 && !size) {
      return res.status(400).json({
        error: "Missing required field: size",
      });
    }
    if (productOrdered.productColors.length > 1 && !color) {
      return res.status(400).json({
        error: "Missing required field: color",
      });
    }

    if (!quantity) {
      return res.status(400).json({
        error: "Missing required field: quantity",
      });
    }

    if (quantity > productOrdered.productQuntity) {
      return res.status(400).json({
        error: `You can't order more than the available quantity : ${productOrdered.productQuntity}`,
      });
    }

    const newCartItem = new Cart({
      uid: uid,
      pid: pid,
      productName: productOrdered.productName,
      price: productOrdered.productPrice,
      quantity,
      prodcutImg: productOrdered.productImg,
      color: color || null,
      size: size || null,
    });

    await Promise.all([
      productOrdered.save(),
      userOrdered.save(),
      newCartItem.save(),
    ]);

    return res.status(201).json({
      message: "Addedd to your cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while placing the order. Please try again later.",
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(404).json({
        error: "No user found",
      });
    }
    const getUserCart = await Cart.find({ uid: uid });
    if (!getUserCart) {
      return res.status(404).json({
        error: "Error while get items",
      });
    }
    return res.status(200).json(getUserCart);
  } catch (error) {
    console.log(error);
  }
};

export { addToCart, getCartItems };
