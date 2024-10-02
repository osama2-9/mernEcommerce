/* eslint-disable react/prop-types */
import {
    Radio,
    RadioGroup,
    Collapse,
    Avatar,
    IconButton
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import userAtom from '../atoms/userAtom';
import RelatedProducts from './RelatedProducts';
import { BACKEND_API } from '../config/config';

const Product = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [userReview, setUserReview] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const logged = useRecoilValue(userAtom);

    const { pid } = useParams();



    const getProductById = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/target/${pid}`);
            const data = await res.json();
            const productData = data.data[0];
            const categoryName = data.data[1];
            if (data.error) {
                toast.error(data.error);
            } else {
                setSelectedProduct(productData);
                setCategory(categoryName);
            }
        } catch (error) {
            console.log(error);
        }
    }, [pid]);

    const getUsersReview = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/productReviews/${pid}`);
            const data = await res.json();
            if (!data.error) {
                setUserReview(data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [pid]);

    useEffect(() => {
        getProductById();
        getUsersReview();
    }, [getProductById, getUsersReview]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleColorChange = (value) => {
        setColor(value);
    };

    const handleSizeChange = (value) => {
        setSize(value);
    };

    const handleAddToCart = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/cart/cart/${selectedProduct?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    quantity: quantity,
                    color: color,
                    size: size,
                }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Order placed successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while placing the order.");
        }
    };

    const hasSale = useMemo(() => selectedProduct.sale > 0, [selectedProduct.sale]);
    const Discount = useCallback((price, discount) => {
        return price - (price * (discount / 100));
    }, []);




    const renderStars = useCallback((rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill('').map((_, i) => (
                    <BsStarFill
                        key={`full-${i}`}
                        color="gold"
                        size={22}
                    />
                ))}
                {halfStar && (
                    <BsStarHalf
                        key="half"
                        color="gold"
                        size={22}
                    />
                )}
                {Array(emptyStars).fill('').map((_, i) => (
                    <BsStar
                        key={`empty-${i}`}
                        color="gold"
                        size={22}
                    />
                ))}
            </>
        );
    }, []);



    return (
        <>
            {selectedProduct && (
                <div className="flex flex-col md:flex-row py-6 px-4">
                    <div className="flex flex-1 justify-center items-center  rounded-lg ">
                        <img
                            className="w-full h-auto md:h-96 "
                            src={selectedProduct.productImg}
                            alt={selectedProduct.productName}
                        />
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-3xl font-semibold tracking-tight">{selectedProduct.productName}</h2>
                            {selectedProduct.productQuantity <= 3 && (
                                <span className="bg-black text-white px-2 py-1 rounded">
                                    In Stock {selectedProduct.productQuantity}
                                </span>
                            )}
                            {selectedProduct.sale > 0 ? (
                                <div className="flex flex-col items-end">
                                    <span className="text-red-500 font-bold">
                                        ${Discount(selectedProduct.productPrice, selectedProduct.sale).toFixed(2)}
                                    </span>
                                    <span className="line-through text-gray-800 font-bold">
                                        ${selectedProduct.productPrice}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-gray-800 font-bold text-xl">
                                    ${selectedProduct.productPrice}
                                </span>
                            )}
                        </div>

                        <span className="text-gray-500 font-medium mb-2">{category.categoryName}</span>
                        <hr className="border-black mb-4" />
                        <p className="text-gray-600 mb-4">{selectedProduct.productDesc}</p>
                        <hr className="border-black mb-4" />

                        {hasSale && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded mb-4">
                                On Sale
                            </span>
                        )}

                        <div className="flex items-center mb-4">
                            {renderStars(selectedProduct?.rating || 0)}
                            <span className="ml-2 text-gray-500">
                                ({selectedProduct?.ratingCount || 0} reviews)
                            </span>
                        </div>

                        {selectedProduct.prodcutSize?.length > 0 && (
                            <div className="mb-4">
                                <span className="text-gray-500 font-bold">Sizes</span>
                                <div className="flex space-x-4 mt-2">
                                    <RadioGroup value={size} onChange={handleSizeChange}>
                                        <div className="flex space-x-4">
                                            {selectedProduct.prodcutSize.map((product, i) => (
                                                <Radio
                                                    key={i}
                                                    value={product}
                                                    className={`${size === product
                                                        ? "bg-black text-white"
                                                        : "bg-gray-200 text-black"
                                                        } border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-300 transition duration-200`}
                                                >
                                                    {product.toUpperCase()}
                                                </Radio>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}

                        {selectedProduct.productColors?.length > 0 && (
                            <div className="mb-4">
                                <span className="text-gray-500 font-bold">Colors</span>
                                <div className="flex space-x-4 mt-2">
                                    <RadioGroup value={color} onChange={handleColorChange}>
                                        <div className="flex space-x-4">
                                            {selectedProduct.productColors.map((c, i) => (
                                                <Radio
                                                    key={i}
                                                    value={c}
                                                    className="rounded-full border border-gray-300 cursor-pointer"
                                                    style={{ backgroundColor: c }}
                                                >
                                                    <span className="w-8 h-8 block rounded-full" />
                                                </Radio>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center mb-4">
                            <span className="text-gray-500 font-bold">Quantity</span>
                            <select
                                className="ml-4 border border-gray-300 rounded px-2 py-1"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {[...Array(10).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white rounded px-4 py-2 transition duration-200 hover:bg-gray-700 w-1/2"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-8 px-4">
                <h3 className="text-lg font-semibold mb-4">User Reviews</h3>
                {userReview.length > 0 ? (
                    <>
                        {userReview.slice(0, 3).map((review, index) => (
                            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                                {review?.userComment !== "" && (
                                    <>
                                        <div className="flex items-center mb-2">
                                            <Avatar name={review.userFullName} size="md" mr={2} />
                                            <span className="font-bold">{review.userFullName}</span>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {renderStars(review.rating)}
                                            <span className="ml-2 text-gray-500">
                                                {review.date}
                                            </span>
                                        </div>
                                        <p className="mb-2">{review.userComment}</p>
                                        <hr className="border-gray-300" />
                                    </>
                                )}
                            </div>
                        ))}
                        {userReview.length > 3 && (
                            <>
                                <Collapse startingHeight={0} in={showAllReviews}>
                                    {userReview.slice(3).map((review, index) => (
                                        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                                            <div className="flex items-center mb-2">
                                                <Avatar name={review.userFullName} src={review.userAvatar} size="md" mr={2} />
                                                <span className="font-bold">{review.userFullName}</span>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                {renderStars(review.rating)}
                                                <span className="ml-2 text-gray-500">
                                                    {review.date}
                                                </span>
                                            </div>
                                            <p className="mb-2">{review.userComment}</p>
                                            <hr className="border-gray-300" />
                                        </div>
                                    ))}
                                </Collapse>
                                <div className="flex justify-center">
                                    <IconButton
                                        icon={showAllReviews ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                        aria-label={showAllReviews ? "Show fewer reviews" : "Show more reviews"}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>

            {/* Related Products Section */}
            <RelatedProducts pid={pid} categoryId={category._id} />
        </>


    );
};

export default Product;
