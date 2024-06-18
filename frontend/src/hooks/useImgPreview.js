import { useState } from "react";
import { toast } from "react-toastify";

const useImgPreview = () => {
  const [img, setImg] = useState(null);
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("This type not acceptaed its must be jpg , png .. ");
    }
  };

  return {img ,setImg ,handleImgChange};
};

export default useImgPreview;
