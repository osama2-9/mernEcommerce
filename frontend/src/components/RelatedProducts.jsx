/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Produts from './Products'
import { BACKEND_API } from "../config/config";

const RelatedProducts = ({ categoryId, pid }) => {
    const [rProducts, setRProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/product/related/${categoryId}/${pid}` ,{
                    credentials:"include"
                });
                const data = await res.json();
                setRProducts(data);
            } catch (error) {
                console.log(error);
            }
        };

        if (categoryId && pid) {
            fetchRelatedProducts();
        }
    }, [categoryId, pid]);

    return (
        <>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-600">Related Products</h2>
            </div>
            <div className="flex flex-col items-center lg:flex-row gap-5 mt-5">
                {rProducts.map((product, i) => (
                    <div className="flex-shrink-0 w-full lg:w-80 mx-auto" key={product._id+i}>
                        <Produts product={product} />
                    </div>
                ))}
            </div>

        </>
    );
};

export default RelatedProducts;
