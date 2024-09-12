import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";
const useGetTopSells = () => {
  const [topSell, setTopSell] = useState([]);

  const getTopSellProducts = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/order/topSell`);
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
  }, []);

  useEffect(() => {
    getTopSellProducts();
  }, [getTopSellProducts]);

  return { topSell };
};

export default useGetTopSells;
