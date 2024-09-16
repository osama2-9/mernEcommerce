/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [error, setError] = useState(null);

  const loadProductsFromLocalStorage = () => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setNumberOfProduct(parsedProducts.length);
    }
  };

  const getProducts = useCallback(async () => {
    try {
      const storedProducts = localStorage.getItem("products");

      if (storedProducts) {
        loadProductsFromLocalStorage();
        return;
      }

      const res = await fetch(`${BACKEND_API}/product/get`, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        toast.error(data.error);
        return;
      }

      setProducts(data);
      setNumberOfProduct(data.length);
      localStorage.setItem("products", JSON.stringify(data));
      setError(null);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  }, []);

  useEffect(() => {
    loadProductsFromLocalStorage();
    if (!localStorage.getItem("products")) {
      getProducts();
    }
  }, [getProducts]);

  const refresh = useCallback(() => {
    localStorage.removeItem("products");
    getProducts();
  }, [getProducts]);

  return { products, numberOfProduct, refresh };
};

export default useGetProduct;
