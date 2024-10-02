import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BACKEND_API } from '../config/config.js';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetCategories = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BACKEND_API}/category/getCategories`, {
                credentials: 'include',
            });
            const data = await res.json();

            if (res.status !== 200) {
                toast.error(data.error || 'Failed to fetch categories');
            } else {
                setCategories(data);
            }
        } catch (error) {
            toast.error('An error occurred while fetching categories');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <>
            <h2 className="relative ml-7 mt-10 text-4xl font-bold mb-5 sm:mb-20 text-center">
                Categories
            </h2>

            <div className="relative top-8 mb-10 flex flex-wrap justify-center space-x-4 space-y-4 px-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-300 rounded-full h-20 w-20"></div>
                    ))
                ) : (
                    categories.map((category, i) => (
                        <Link
                            key={i}
                            to={`/products/${category.categoryName}/${category?.cid}`}
                            className="flex flex-col items-center text-center transition-transform transform hover:scale-105"
                        >
                            <div className="bg-gray-50 p-2 rounded-full h-36 w-36 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow">
                                <img
                                    src={category.productImg}
                                    alt={category.categoryName}
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                            <p className="mt-2 text-lg font-medium">{category.categoryName}</p>
                        </Link>
                    ))
                )}
            </div>
        </>
    );
};

export default Categories;
