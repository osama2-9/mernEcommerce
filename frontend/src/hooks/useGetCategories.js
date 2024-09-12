import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfCategories, setNumberOfCategories] = useState(0);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/category`);
      const data = await res.json();
      const categoriesNumber = data.length;
      if (data.error) {
        toast.error(data.error);
        return;
      } else {
        setCategories(data);
        setNumberOfCategories(categoriesNumber);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return { categories, loading, numberOfCategories };
};

export default useGetCategories;
