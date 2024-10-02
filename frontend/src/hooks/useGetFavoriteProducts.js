import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const useGetFavoriteProducts = () => {
  const { uid } = useParams();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getFavoriteProducts = async () => {
      if (!uid) return;
      try {
        const res = await fetch(`${BACKEND_API}/favorite/get/${uid}`, {
          credentials: "include",
        });
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
      isMounted = false; 
    };
  }, [uid]);

  return { favoriteProducts };
};

export default useGetFavoriteProducts;
