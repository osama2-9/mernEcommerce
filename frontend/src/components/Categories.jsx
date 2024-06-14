import { Box, Img, SkeletonCircle, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetCategories = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/category/getCategories');
            const data = await res.json();

            if (res.status !== 200) {
                toast.error(data.error || "Failed to fetch categories");
            } else {
                setCategories(data);
            }
        } catch (error) {
            toast.error("An error occurred while fetching categories");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetCategories();
    }, []);

    return (
        <Box mb={4} display="flex" justifyContent="space-around">
            {loading ? (
                [0, 1, 2, 3, 4, 5, 6, 7].map((ele, i) => (
                    <SkeletonCircle mt={1} size="80px" key={i} />
                ))
            ) : (
                categories.map((category, i) => (
                    <Link key={i} to={`/products/${category.categoryName}/${category?.cid}`}>
                        <Box textAlign="center">
                            <Img src={category.productImg} bg={'gray.50'} p={2} rounded={'full'} h={'80px'} width="80px" />
                            <Text mt={2}>{category.categoryName}</Text>
                        </Box>
                    </Link>
                ))
            )}
        </Box>
    );
};

export default Categories;
