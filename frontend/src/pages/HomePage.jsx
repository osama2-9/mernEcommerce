import { useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { BiBoltCircle } from "react-icons/bi";
import { AiOutlineFileProtect } from "react-icons/ai";
import { toast } from 'react-toastify';
import FeatureBox from "../components/FeatureBox";
import Products from "../components/Products";
import ProductContainer from "../components/ProductContainer";
import useGetTopSells from "../hooks/useGetTopSells";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import TopRate from "../components/TopRate";
import RecommendedProducts from "../components/RecommendedProducts";
import ShowTimedSaleProducts from "../components/ShowTimedSaleProducts";
import { BACKEND_API } from '../config/config.js';
import useGetBrands from "../hooks/useGetBrands.js";

const HomePage = () => {
    const { topSell } = useGetTopSells();
    const [product, setProduct] = useState([]);
    const [onSale, setOnSale] = useState([]);
    const { homePageBrands } = useGetBrands();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/product/get`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to fetch products");
                }
                setProduct(data);
            } catch (error) {
                toast(error.message || "Something went wrong", {
                    type: "error",
                    autoClose: true,
                });
                console.error(error);
            }
        };
        getProducts();
    }, []);

    useEffect(() => {
        const getOnSale = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/product/on-sale`);
                const data = await res.json();
                setOnSale(data);
            } catch (error) {
                console.error(error);
            }
        };
        getOnSale();
    }, []);

    return (
        <div className="home">
            <Slider />

            <div className="flex flex-col lg:flex-row justify-center items-center  mt-10">
                <FeatureBox
                    icon={<BsCart2 size={40} />}
                    title="Free Delivery"
                    description="We Provide a Free Delivery Service For Our Customers"
                />
                <FeatureBox
                    icon={<BiBoltCircle size={40} />}
                    title="Quality"
                    description="We offer the best quality for the price"
                />
                <FeatureBox
                    icon={<AiOutlineFileProtect size={40} />}
                    title="100% Secure Payment"
                    description="Payment is secure and you can also pay upon receipt"
                />
            </div>

            <div className="mt-10">
                <RecommendedProducts />

                <ProductContainer title="Products" className="mt-10">
                    {product.slice(0, 12).map((product) => (
                        <Products key={product._id} product={product} />
                    ))}
                </ProductContainer>

                <Categories />

                <div className="relative mt-36 max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
                    <div className="md:flex">
                        <div className="md:shrink-0">
                            <img className="h-64 w-full object-cover md:h-full md:w-64" src="/shopping.jpeg" alt="Modern building architecture" />
                        </div>
                        <div className="p-8">
                            <p className="text-lg md:text-xl text-gray-500">
                                Discover an incredible shopping experience with unbeatable deals! Explore our exclusive collection of top-quality products designed to meet all your needs. From the latest trends to everyday essentials.
                            </p>
                        </div>
                    </div>
                </div>


                <ProductContainer title="New Arrivals" className="mt-10">
                    {product.slice(-4).map((p) => (
                        <Products key={p._id} product={p} />
                    ))}
                </ProductContainer>

                <div className="relative mt-36 max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl mb-20">
                    <div className="flex flex-col lg:flex-row">
                        <div className="md:shrink-0">
                            <img className=" w-full object-cover md:h-full md:w-64" src="/main.png" alt="Modern building architecture" />
                        </div>
                        <div className="p-8">
                            <p className="text-lg md:text-xl text-gray-500">
                                Discover an incredible shopping experience with unbeatable deals! Explore our exclusive collection of top-quality products designed to meet all your needs. From the latest trends to everyday essentials.
                            </p>
                        </div>
                    </div>
                </div>

                <ProductContainer title="Top Sells" className="mt-10">
                    {topSell.map((p) => (
                        <Products key={p._id} product={p} />
                    ))}
                </ProductContainer>

                <ProductContainer title="On Sales" className="mt-10">
                    {onSale.slice(0, 4).map((p) => (
                        <Products key={p._id} product={p} />
                    ))}
                </ProductContainer>

                <ShowTimedSaleProducts />

                <div className="font-bold w-full max-w-5xl mx-auto p-6 rounded-md shadow-md bg-white">
                    <h2 className="text-2xl text-center mb-4">Our Brands</h2>
                    <div className="flex flex-wrap justify-center">
                        {homePageBrands.length > 0 ? (
                            homePageBrands.map((brand) => (
                                <div
                                    key={brand._id}
                                    className="m-4 p-4 text-center shadow-lg rounded-md w-64 md:w-72 lg:w-80 transition-transform transform hover:scale-105"
                                >
                                    <img
                                        src={brand.brandImg}
                                        alt={brand.brandName}
                                        className="object-contain mx-auto h-24 md:h-28 transition-opacity duration-300 hover:opacity-80"
                                    />
                                    <p className="mt-2 text-lg font-semibold text-gray-700">{brand.brandName}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No brands available</p>
                        )}
                    </div>
                </div>
                <TopRate />

                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
