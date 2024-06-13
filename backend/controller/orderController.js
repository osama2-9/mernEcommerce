import Cart from "../model/Cart.js";
import Order from "../model/Order.js";
import Product from "../model/Product.js";
import User from "../model/User.js";
import { newMessaeg } from "./messageController.js";

const OrderStatus = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};
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
        error: "You missed required fields payment method!",
      });
    }

    const userOrdered = await User.findById(uid);

    if (!userOrdered || userOrdered.address === "") {
      return res.status(404).json({
        error: "Please add address from your dashboard to continue",
      });
    }

    const cartItems = await Cart.find({ uid: uid });
    if (cartItems.length === 0) {
      return res.status(404).json({
        error: "No items in the cart",
      });
    }

    const newOrderPromises = cartItems.map(async (item) => {
      const product = await Product.findById(item.pid);
      if (!product) {
        return res.status(404).json({
          error: `${item.productName} not found`,
        });
      }
      if (item.quantity > product.productQuntity) {
        return res.status(404).json({
          error: `Insufficient quantity for product ${item.productName}`,
        });
      }

      product.productQuntity -= item.quantity;
      product.sells += item.quantity;

      const newOrder = new Order({
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

      await newOrder.save();
      await product.save();
      await newMessaeg(
        "New Order Created",
        `A new order has been created for ${userOrdered.email}
        <br/>
        <ul>
        <li>product Name : ${newOrder.productName}</li>
 <li>Quantity :  ${newOrder.quantity}</li>

        <li>Total Price :$${newOrder.price}</li>

 <p><strong>Ordered At:</strong> ${newOrder.createdAt}</p>

        
        </ul>
        `
      );
    });

    await Promise.all(newOrderPromises);

    await Cart.deleteMany({ uid: uid });

    return res.status(201).json({
      message: "Ordered Successfully",
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
    const userOrders = await Order.find({ uid: uid })
      .limit(5)
      .sort({ createdAt: -1 });

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
    const topProducts = sortedProducts.slice(0, 4);

    return res.status(200).json(topProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error:
        "An error occurred while retrieving the top-selling products. Please try again later.",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({
        error: "Order ID is required",
      });
    }

    const findOrderToDelete = await Order.findByIdAndDelete(orderId);

    if (!findOrderToDelete) {
      return res.status(404).json({
        error: "Order not found",
      });
    }
    const productId = findOrderToDelete.pid;
    const findProduct = await Product.findOne({ _id: productId });
    if (!findProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    findProduct.productQuntity += findOrderToDelete.quantity;
    await findProduct.save();

    return res.status(200).json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOrderByUser = async (req, res) => {
  try {
    const { uid, oid } = req.body;

    if (!uid || !oid) {
      return res.status(404).json({
        error: "User or Order ID is missing",
      });
    }

    const order = await Order.findOne({ _id: oid, uid: uid });
    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (
      order.orderStatus === OrderStatus.SHIPPED ||
      order.orderStatus === OrderStatus.DELIVERED
    ) {
      return res.status(400).json({
        error: `You cannot delete an order when it is ${order.orderStatus}`,
      });
    }

    const product = await Product.findById(order.pid);
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    await Order.findByIdAndDelete(oid);

    product.productQuntity += order.quantity;
    await product.save();

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred. Please try again later.",
    });
  }
};

export {
  getOrders,
  makeAnOrder,
  getUserOrders,
  updateOrderStatus,
  getTopSellProducts,
  deleteOrder,
  deleteOrderByUser,
};
