/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";

const ImgUploder = () => {
  const [img, setImg] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(null);
      toast("Cannont upload this type");
    }
  };

  return { img, setImg, handleImageChange };
};

export default ImgUploder;
