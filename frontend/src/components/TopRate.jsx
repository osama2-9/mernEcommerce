import { Box, Flex, Text } from '@chakra-ui/react';
import ProductContainer from './ProductContainer';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Products from './Products';

const TopRate = () => {
    const [topRated, setTopRated] = useState([]);

    const getTopRated = async () => {
        try {
            const res = await fetch('/api/product/getProducts/topRated');
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setTopRated(data.reverse()); // Reverse the array
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch top-rated products');
        }
    };

    useEffect(() => {
        getTopRated();
    }, []);

    return (
        <Box>
            <Flex justifyContent="center" mb={10}>
                <Text fontSize="33" me={2} fontWeight="bold">
                    Top Rated
                </Text>
            </Flex>
            <ProductContainer>
                {topRated.map((product) => (
                    <Products key={product._id} product={product} />
                ))}
            </ProductContainer>
        </Box>
    );
};

export default TopRate;
