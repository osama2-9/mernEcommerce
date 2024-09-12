import { Box } from '@chakra-ui/react';
import ProductContainer from './ProductContainer';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import Products from './Products';
import { BACKEND_API } from '../config/config';

const TopRate = () => {
    const [topRated, setTopRated] = useState([]);

    const getTopRated = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/getProducts/topRated`);
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setTopRated(data.reverse()); 
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
           
            <ProductContainer title='Top Rate'>
                {topRated.map((product) => (
                    <Products key={product._id} product={product} />
                ))}
            </ProductContainer>
        </Box>
    );
};

export default TopRate;
