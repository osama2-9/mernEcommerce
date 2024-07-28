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
        <>
            <Text
                ml={28}
                mt={10}
                mb={{
                    lg: "0px",
                    sm: "20px",
                }}
                fontSize="40px"
                fontWeight="bold"
                position="relative"
                _before={{
                    content: '""',
                    position: "absolute",
                    left: "-30px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    bg: "black",
                    width: "12px",
                    height: "40px",
                    borderRadius: "5px"
                }}
            >
                Categories
            </Text>
        <Box position={'relative'} top={
            35
        } mb={10} h={'150px'} display="flex" justifyContent="space-around">
            {loading ? (
                [0, 1, 2, 3, 4, 5, 6, 7].map((ele, i) => (
                    <SkeletonCircle mt={1} size="80px" key={i} />
                ))
            ) : (
                categories.map((category, i) => (
                    <Link key={i} to={`/products/${category.categoryName}/${category?.cid}`}>
                        <Box textAlign="center">
                            <Img src={category.productImg} bg={'gray.50'} p={2} rounded={'full'} h={'150px'} width="150px" />
                            <Text mt={2}>{category.categoryName}</Text>
                        </Box>
                    </Link>
                ))
            )}
        </Box>
            </>
    );
};

export default Categories;
