/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import useGetFavoriteProducts from "../hooks/useGetFavoriteProducts";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { BACKEND_API } from "../config/config";

const Products = ({ product, isLoading }) => {
    const [saved, setSaved] = useState(false);
    const { favoriteProducts } = useGetFavoriteProducts();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        if (favoriteProducts) {
            setSaved(favoriteProducts.some((p) => p._id === product._id));
        }
    }, [favoriteProducts, product._id]);

    const Discount = useCallback((price) => price - (price * (product?.sale / 100)), [product.sale]);
    const hasSale = product?.sale > 0;
    const finalPrice = hasSale ? Discount(product?.productPrice).toFixed(2) : product?.productPrice?.toFixed(2);
    const originalPrice = product?.productPrice?.toFixed(2);

    const handleFavorite = async () => {
        try {
            const endpoint = saved ? `${BACKEND_API}/favorite/remove` : `${BACKEND_API}/favorite/add`;
            const method = saved ? "DELETE" : "POST";
            const body = JSON.stringify({ uid: user?.uid, pid: product?._id });
            const res = await fetch(endpoint, { method, headers: { 'Content-Type': "application/json" }, body, credentials: "include" });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setSaved(!saved);
            }
        } catch (error) {
            console.log(error);
            toast.error(saved ? "Error removing product from favorites" : "Error adding product to favorites");
        }
    };

    const truncateProductName = (name, maxLength) => name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;

    return (
        <div className={`bg-white shadow-lg rounded-lg p-6 ${product?.productQuntity === 0 ? 'opacity-50' : ''}`} style={{ width: '320px' }}>
            {isLoading ? (
                <div className="animate-pulse">
                    <div className="h-60 bg-gray-200 rounded-md"></div>
                    <div className="mt-4 h-6 bg-gray-200 rounded-md"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded-md"></div>
                </div>
            ) : (
                <>
                    <div className="relative">
                        {hasSale && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Sale
                            </span>
                        )}
                        <button
                            onClick={handleFavorite}
                            className="absolute top-2 left-2 text-xl p-2 focus:outline-none"
                        >
                            {saved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                        </button>
                        <Link to={`/product/${product._id}`}>
                            <img src={product?.productImg} alt={product.productName} className="w-full h-60 rounded-md " />
                        </Link>
                    </div>
                    <div className="mt-6 text-center">
                        <Link to={`/product/${product._id}`}>
                            <h3 className="text-xl font-semibold text-gray-700">
                                {truncateProductName(product.productName, 16)}
                            </h3>
                        </Link>
                    </div>
                    <div className="mt-3 text-center">
                        <div className="flex justify-center space-x-2">
                            {hasSale ? (
                                <>
                                    <p className="text-lg font-bold text-black">${finalPrice}</p>
                                    <p className="text-sm text-gray-500 line-through">${originalPrice}</p>
                                </>
                            ) : (
                                <p className="text-lg font-bold text-black">${originalPrice}</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <button
                            className="px-6 py-3 w-full bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
                            disabled={product.productQuntity === 0}
                        >
                            Add to Cart
                        </button>
                    </div>
                    <div className="mt-4 flex justify-center items-center space-x-1 text-yellow-400">
                        {Array.from({ length: 5 }).map((_, index) => (
                            index < product.rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                        ))}
                        <p className="text-sm text-gray-600 ml-1">({product.ratingCount})</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Products;
