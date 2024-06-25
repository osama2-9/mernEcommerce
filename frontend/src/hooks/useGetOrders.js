import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const res = await fetch("/api/order/order");
      const data = await res.json();
      if (data.error) {
        // toast.error(data.error);
      } else {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const lastThreeOrders = sortedOrders.slice(0, 3);

  const ordersTotalPrice = Math.ceil(
    parseInt(orders.reduce((total, product) => total + product.price, 0))
  );

  const totalOrders = orders.length;

  return {
    orders,
    ordersTotalPrice,
    totalOrders,
    sortedOrders,
    lastThreeOrders,
    refreshOrders: getAllOrders,
  };
};

export default useGetOrders;
