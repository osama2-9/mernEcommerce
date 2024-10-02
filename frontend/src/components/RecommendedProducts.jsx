import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import ProductContainer from "../components/ProductContainer";
import Products from "../components/Products";
import { BACKEND_API } from '../config/config.js';

const RecommendedProducts = () => {
  const user = useRecoilValue(userAtom);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const getRecommendedProducts = async () => {
    try {
      const res = await fetch(`${BACKEND_API}/product/recommended/${user.uid}`);
      const data = await res.json();
      setRecommendedProducts(data.data);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getRecommendedProducts();
    }
  }, [user]);

  
  if (!user) {
    return null;
  }

  return (
    <ProductContainer title={'Recommended Products'}>
      {recommendedProducts.map((product) => (
        <Products key={product._id} product={product} />
      ))}
    </ProductContainer>
  );
};

export default RecommendedProducts;
