import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetProduct = () => {
  const [products, setProducts] = useState([]);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const getProducts = async () => {
    try {
      const res = await fetch("/api/product/get");
      const data = await res.json();
      const productCount = data.length;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setProducts(data);
      setNumberOfProduct(productCount);
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  });

  return { products, numberOfProduct };
};

export default useGetProduct;
