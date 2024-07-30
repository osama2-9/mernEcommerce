import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useGetFavoriteProducts = () => {
  const { uid } = useParams();

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  console.log(favoriteProducts);

  useEffect(() => {
    const getFavoriteProducts = async () => {
      if (!uid) return;
      try {
        const res = await fetch(`/api/favorite/get/${uid}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          setFavoriteProducts(data);
        }
      } catch (error) {
        toast.error("Error while getting favorite products");
        console.log(error);
      }
    };
    getFavoriteProducts();
  }, [uid]);
  return { favoriteProducts };
};

export default useGetFavoriteProducts;
