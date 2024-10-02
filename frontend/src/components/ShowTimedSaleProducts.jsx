import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { BACKEND_API } from '../config/config';

const ShowTimedSaleProducts = () => {
    const [timedSaleProducts, setTimedSaleProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const productsPerPage = 4;

    useEffect(() => {
        const getTimedSaleProducts = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/sale/timedSale`, {
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setTimedSaleProducts(data);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch timed sale products');
            }
        };

        getTimedSaleProducts();
    }, []);

    const truncateProductName = (name, maxLength) => {
        return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    };

    const handleNextSlide = () => {
        if (currentSlide < Math.ceil(timedSaleProducts.length / productsPerPage) - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const displayedProducts = timedSaleProducts.slice(
        currentSlide * productsPerPage,
        (currentSlide + 1) * productsPerPage
    );

    return (
        <div className="max-w-full p-4 bg-gray-50 text-black rounded-md shadow-sm">
            {timedSaleProducts.length > 0 && (
                <>
                    {timedSaleProducts.length > productsPerPage && (
                        <div className="flex justify-between mb-6">
                            <button
                                onClick={handlePrevSlide}
                                disabled={currentSlide === 0}
                                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
                            >
                                <FaArrowLeft />
                            </button>
                            <button
                                onClick={handleNextSlide}
                                disabled={currentSlide === Math.ceil(timedSaleProducts.length / productsPerPage) - 1}
                                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                    )}
                    <h2 className="text-4xl mb-6 font-bold text-yellow-500 text-center">Flash Sales</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {displayedProducts.map((product) => {
                            const Discount = (price, salePercent) => price - (price * (salePercent / 100));
                            const hasSale = product?.sale?.salePercent > 0;
                            const finalPrice = hasSale ? Discount(product.productPrice, product.sale.salePercent).toFixed(2) : product.productPrice.toFixed(2);
                            const originalPrice = product.productPrice.toFixed(2);

                            return (
                                product?.sale?.isActive && (
                                    <div
                                        key={product._id}
                                        className="p-5 border border-gray-300 rounded-lg shadow-sm bg-white min-w-[300px] flex flex-col transition-transform duration-300 hover:shadow-lg hover:scale-105"
                                    >
                                        <Link to={`/product/${product._id}`}>
                                            <div className="text-center space-y-4">
                                                <img
                                                    src={product.productImg}
                                                    alt={product.productName}
                                                    className="w-full h-64  rounded-md"
                                                />
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {truncateProductName(product.productName, 22)}
                                                </h3>
                                                <div className="text-lg font-bold text-yellow-500">
                                                    {hasSale ? (
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-bold text-black">${finalPrice}</span>
                                                            <span className="ml-4 line-through text-gray-500">${originalPrice}</span>
                                                        </div>
                                                    ) : (
                                                        <span>${originalPrice}</span>
                                                    )}
                                                </div>
                                                <CountdownTimer endTime={product?.sale?.endTime} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default ShowTimedSaleProducts;
