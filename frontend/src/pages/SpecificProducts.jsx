/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductContainer from "../components/ProductContainer";
import Products from "../components/Products"; // Import the Products component

const SpecificProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProductsInCategory = async () => {
            try {
                const res = await fetch(`/api/category/products/${categoryName}`);
                const data = await res.json();
                if (res.status !== 200) {
                    toast.error(data.error || "Failed to fetch products");
                } else {
                    setProducts(data);
                }
            } catch (error) {
                toast.error("An error occurred while fetching products");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getProductsInCategory();
    }, [categoryName]);

    return (
        <ProductContainer mt={18}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                products.map((product, index) => (
                    <Products key={index} product={product} />
                ))
            )}
        </ProductContainer>
    );
};

export default SpecificProducts;
