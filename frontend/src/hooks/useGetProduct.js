/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";
const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [error, setError] = useState(null);

  const getProducts = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_API}/product/get` ,{
        credentials:"include"
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      setProducts(data);
      setNumberOfProduct(data.length);
      setError(null);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { products, numberOfProduct, refresh: getProducts };
};

export default useGetProduct;
