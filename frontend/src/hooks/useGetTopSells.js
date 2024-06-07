import { useState } from "react";
import { toast } from "react-toastify";
const useGetTopSells = () => {
  const [topSell, setTopSell] = useState([]);

  const getTopSellProducts = async () => {
    try {
      const res = await fetch(
        "/api/product/topSell"
      );
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
