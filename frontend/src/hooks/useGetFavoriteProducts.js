import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useGetFavoriteProducts = () => {
  const { uid } = useParams();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    const getFavoriteProducts = async () => {
      if (!uid) return;
      try {
        const res = await fetch(`/api/favorite/get/${uid}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else {
          if (isMounted) {
            setFavoriteProducts(data);
          }
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Error while getting favorite products");
        }
        console.log(error);
      }
    };

    getFavoriteProducts();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when unmounting
    };
  }, [uid]);

  return { favoriteProducts };
};

export default useGetFavoriteProducts;
