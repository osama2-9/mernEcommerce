/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import ProductContainer from '../components/ProductContainer';
import Products from '../components/Products';

const BrandWithProducts = () => {
    const { bid } = useParams();
    const [products, setProducts] = useState([]);
    const [brand, setBrand] = useState({});
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const getSpecificBrandProducts = async () => {
            try {
                const res = await fetch(`/api/brand/brand/${bid}`);
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setProducts(data.products || []);
                    setBrand(data.brand || {});
                    setCategory(data.category || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getSpecificBrandProducts();
    }, [bid]);

    return (

        <Box p={4}>

            <Flex direction="column" align="center">
                <Box p={4} shadow="md" rounded="md" w="full" maxW="800px">
                    <Image shadow={'sm'} src={brand.brandImg} w="full" h="300px" rounded="md" />
                    <Text mt={2} textAlign={'center'} fontWeight={'bold'} fontSize={'22'}>{brand.brandName}</Text>
                    <Text mt={2}>{brand.brandDesc}</Text>
                </Box>
                <Text mt={6} fontSize="5xl" fontWeight="bold">Products</Text>
                <ProductContainer mt={5}>
                    {products.map((product) => (
                        <Products product={product} key={product._id} />
                    ))}
                </ProductContainer>
            </Flex>
        </Box>
    );
};

export default BrandWithProducts;