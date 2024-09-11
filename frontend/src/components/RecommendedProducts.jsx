import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import ProductContainer from "../components/ProductContainer";
import Products from "../components/Products";

const RecommendedProducts = () => {
  const [products, setProducts] = useState([]);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getRecommendedProducts = async () => {
      if (!user) return;

      try {
        const res = await fetch(`/api/product/recommended/${user.uid}`);
        const data = await res.json();
        const uniqueProducts = Array.from(new Set(data.map((product) => product._id)))
          .map((id) => data.find((product) => product._id === id));
        setProducts(uniqueProducts);
      } catch (error) {
        console.log(error);
      }
    };

    getRecommendedProducts();
  }, [user]);


  return (
    <>
      <ProductContainer mt={10} title="Recommended Products">
        {products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </ProductContainer>

    </>
  );
};

export default RecommendedProducts;
