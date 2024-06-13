/* eslint-disable react/prop-types */
import { Flex, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Produts from './Products'

const RelatedProducts = ({ categoryId, pid }) => {
    const [rProducts, setRProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch(`/api/product/related/${categoryId}/${pid}`);
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
            <Box textAlign={'center'}>
                <Text fontSize={'30'} fontWeight={'bold'} color={'gray.400'} >Related Products</Text>
            </Box>
            <Flex mt={5} flexDir={{ sm: "column", base: 'column', lg: 'row' }} gap={5} >
                {rProducts.map((product, i) => (
                    <Box ml={{
                        sm: "100px"
                    }} key={i} w={{ base: '100%', lg: '400px' }}>
                        <Produts key={product._id} product={product} />
                    </Box>
                ))}
            </Flex>
        </>
    );
};

export default RelatedProducts;
