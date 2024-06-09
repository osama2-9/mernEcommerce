import { useState } from "react";
import { toast } from "react-toastify";
const useGetTopSells = () => {
  const [topSell, setTopSell] = useState([]);

  const getTopSellProducts = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch("/api/order/topSell");
=======
      const res = await fetch(
        "/api/product/topSell"
      );
>>>>>>> bca60c26b866647726220ede969a0e6a28b11822
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setTopSell(data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  getTopSellProducts();

  return { topSell };
};

export default useGetTopSells;
