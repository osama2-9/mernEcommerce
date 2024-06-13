import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Products from '../components/Products';
import ProductContainer from '../components/ProductContainer';
import FilterProducts from '../components/FilterProducts';

const SpecificProducts = () => {
    const { categoryName, categoryId } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsInCategory = async () => {
            try {
                const res = await fetch(`/api/category/products/${categoryName}/${categoryId}`);
                const data = await res.json();
                if (res.status !== 200) {
                    toast.error(data.error || "Failed to fetch products");
                } else {
                    setProducts(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getProductsInCategory();
    }, [categoryName, categoryId]);

    return (
        <>
            <FilterProducts cateogryId={products?.cateogryID} />

            <ProductContainer top={'100'} position={'absolute'} left={280}>


                {products.map((p) => (
                    <Products key={p._id} product={p} />

                ))}
            </ProductContainer>

        </>
    );
};

export default SpecificProducts;