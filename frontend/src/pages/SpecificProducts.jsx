import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Products from '../components/Products';
import ProductContainer from '../components/ProductContainer';
import FilterProducts from '../components/FilterProducts';
import { BACKEND_API } from '../config/config';

const SpecificProducts = () => {
    const { categoryName, categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilterdProducts] = useState([])

    useEffect(() => {
        const getProductsInCategory = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/category/products/${categoryName}/${categoryId}`, {
                    credentials:"include"
                });
                const data = await res.json();
                if (res.status !== 200) {
                    toast.error(data.error || "Failed to fetch products");
                } else {
                    setProducts(data);
                    setFilterdProducts(data)
                }


            } catch (error) {
                console.error(error);
            }
        };
        getProductsInCategory();
    }, [categoryName, categoryId]);

    const updateData = (filtered) => {
        setFilterdProducts(filtered)
    }

    return (
        <>
            <FilterProducts categoryId={categoryId} products={products} setFilterdProducts={updateData} />
            <ProductContainer top={'140'} position={'absolute'} left={280}>
                {filteredProducts.map((p) => (
                    <Products key={p._id} product={p} />
                ))}
            </ProductContainer>
        </>
    );
};

export default SpecificProducts;
