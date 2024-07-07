import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading ,setLoading] = useState(false)

  useEffect(() => {
    const getBrands = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/brand");
        const data = await res.json();
       
        if (data.error) {
          toast.error(data.error);
        } else {
          setBrands(data);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching brands.");
      }finally{
        setLoading(false)
      }
    };
    getBrands();
  }, []);
  const homePageBrands = brands.map((brand)=>brand).slice(0,4)

  return { brands ,loading ,homePageBrands};
};

export default useGetBrands;
