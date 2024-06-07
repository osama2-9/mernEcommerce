import Cart from "../model/Cart.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import User from "../model/User.js";

const makeAnOrder = async (req, res) => {
  try {
    const { uid, paymentMethod } = req.body;
    if (!uid) {
      return res.status(400).json({
        error: "No user found",
      });
    }
    if (!paymentMethod) {
      return res.status(400).json({
        error: "You missed required fileds payment method  !",
      });
    }

    const userOrdered = await User.findById(uid);
    if (!userOrdered) {
      return res.status(404).json({ error: "No user found" });
    }
    if (userOrdered.address === null) {
      return res.status(400).json({
        error: "Please add an address from your dashbord befor order !",
      });
    }
    const cartItems = await Cart.find({ uid: uid });
    if (cartItems.length === 0) {
      return res.status(404).json({
        error: "no items in the cart ",
      });
    }
    const newOrder = [];
    const findProducts = cartItems.map(async (item) => {
      const product = await Product.findById(item.pid);
      if (!product) {
        return res.status(404).json({
          error: `${product.productName} not found`,
        });
      }
      if (item.quantity > product.productQuntity) {
        return res.status(404).json({
          error: `Insufficient quantity for product ${item.productName}`,
        });
      }

      product.productQuntity -= item.quantity;
      product.sells += item.quantity;

      const newOrders = new Order({
        uid: uid,
        pid: item.pid,
        email: userOrdered.email,
        productName: item.productName,
        price: item.price * item.quantity + 5,
        address: userOrdered.address,
        quantity: item.quantity,
        prodcutImg: item.prodcutImg,
        paymentMethod: paymentMethod,
        phone: userOrdered.phone,
        color: item.color || null,
        size: item.size || null,
      });
      newOrder.push(newOrders.save());
      return product.save();
    });
    await Promise.all(findProducts.concat(newOrder));
    await Cart.deleteMany({ uid: uid });
    return res.status(201).json({
      message: "Orderd Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "An error occurred while placing the order. Please try again later.",
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { uid } = req.params;
    if (!uid) {
      return res.status(404).json({
        error: "no user found",
      });
    }
    const userOrders = await Order.find({ uid: uid }).limit(5);

    if (userOrders.length === 0) {
      return res.status(404).json({
        error: "you not order anything yet",
      });
    }

    res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({
        error: "no orders found",
      });
    }
    if (orders) {
      return res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;
  if (!orderId) {
    return res.status(400).json({
      error: "This order not found",
    });
  }
  const findTheOrder = await Order.findById(orderId);
  if (!findTheOrder) {
    return res.status(404).json({
      error: "This order no found",
    });
  }

  findTheOrder.orderStatus = orderStatus;
  await findTheOrder.save();
  return res.status(200).json({
    message: `Order Status Updated To ${orderStatus}`,
  });
};

const getTopSellProducts = async (req, res) => {
  try {
    const getProducts = await Product.find();

    const sortedProducts = getProducts.sort((a, b) => b.sells - a.sells);
    const topProducts = sortedProducts.slice(0, 3);

    return res.status(200).json(topProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "An error occurred while retrieving the top-selling products. Please try again later.",
    });
  }
};
export {
  getOrders,
  makeAnOrder,
  getUserOrders,
  updateOrderStatus,
  getTopSellProducts,
};
