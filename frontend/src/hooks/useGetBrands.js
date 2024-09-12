import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const useGetBrands = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_API}/brand`);

        const data = await res.json();
        const brand = data.brands;
        const products = data.products;
        if (data.error) {
          toast.error(data.error);
        } else {
          setBrands(brand);
          setProducts(products);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching brands.");
      } finally {
        setLoading(false);
      }
    };
    getBrands();
  }, []);
  const homePageBrands = brands?.map((brand) => brand).slice(0, 4);
  return { brands, loading, homePageBrands, products };
};

export default useGetBrands;
