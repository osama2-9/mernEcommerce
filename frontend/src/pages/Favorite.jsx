/* eslint-disable no-unused-vars */
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import USidebar from '../components/USidebar';
import ProductContainer from "../components/ProductContainer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Products from "../components/Products";
import useGetFavoriteProducts from "../hooks/useGetFavoriteProducts";

const Favorite = () => {
    const { favoriteProducts } = useGetFavoriteProducts()


    return (
        <>
            <USidebar />
            <Box mt={10}>
                <ProductContainer title="Favorite Products">
                    {favoriteProducts.map((product) => (
                        <Products key={product._id} product={product} />
                    ))}
                </ProductContainer>
            </Box>
        </>
    );
};

export default Favorite;
