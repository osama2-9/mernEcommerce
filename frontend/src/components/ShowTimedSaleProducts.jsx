import { Box, Image, Text, VStack, Heading, Flex, Grid, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const ShowTimedSaleProducts = () => {
    const [timedSaleProducts, setTimedSaleProducts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const productsPerPage = 4;

    useEffect(() => {
        const getTimedSaleProducts = async () => {
            try {
                const res = await fetch('/api/sale/timedSale');
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setTimedSaleProducts(data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch timed sale products");
            }
        };

        getTimedSaleProducts();
    }, []);

    const truncateProductName = (name, maxLength) => {
        return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
    };

    const handleNextSlide = () => {
        if (currentSlide < Math.ceil(timedSaleProducts.length / productsPerPage) - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const displayedProducts = timedSaleProducts.slice(
        currentSlide * productsPerPage,
        (currentSlide + 1) * productsPerPage
    );

    return (
        <>
            {timedSaleProducts.length > 0 && (
                <Box maxWidth={'100%'} p={4} bg="gray.50" color="black" borderRadius="md" shadow="sm">
                    {timedSaleProducts.length > productsPerPage && (
                        <Flex justifyContent="space-between" mb={6}>
                            <Button onClick={handlePrevSlide} disabled={currentSlide === 0}><FaArrowLeft /></Button>
                            <Button onClick={handleNextSlide} disabled={currentSlide === Math.ceil(timedSaleProducts.length / productsPerPage) - 1}><FaArrowRight /></Button>
                        </Flex>
                    )}
                    <Text fontSize="40" mb={6} fontWeight="bold" color="yellow.500" textAlign="center">
                        Flash Sales
                    </Text>
                    <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                        gap={6}
                    >
                        {displayedProducts.map((product) => {
                            const Discount = (price, salePercent) => price - (price * (salePercent / 100));
                            const hasSale = product?.sale?.salePercent > 0;
                            const finalPrice = hasSale ? Discount(product.productPrice, product.sale.salePercent).toFixed(2) : product.productPrice.toFixed(2);
                            const originalPrice = product.productPrice.toFixed(2);
                            console.log(product);
                            
                            
                            return (
                                product?.sale?.isActive && (
                                    <Box
                                        key={product._id}
                                        p={5}
                                        borderWidth={1}
                                        borderRadius="lg"
                                        shadow="sm"
                                        bg={'whitesmoke'}
                                        minWidth="300px"
                                        flexShrink={0}
                                        transition="transform 0.3s, box-shadow 0.3s"
                                        _hover={{ transform: 'scale(1.01)' }}
                                    >
                                        <Link to={`/product/${product._id}`}>
                                            <VStack textAlign={'center'} spacing={4} align="start">
                                                <Image
                                                    src={product.productImg}
                                                    alt={product.productName}
                                                    w={'300px'} height={'300px'}
                                                    borderRadius="sm"
                                                    transition="transform 0.2s"
                                                />
                                                <Heading textAlign={'center'} size="md" color="gray.800">
                                                    {truncateProductName(product.productName, 22)}
                                                </Heading>
                                                <Text textAlign={'center'} fontSize="lg" fontWeight="bold" color="yellow.500">
                                                    {hasSale ? (
                                                        <Flex>
                                                            <Text fontSize="lg" fontWeight="bold" color="black">
                                                                ${finalPrice}
                                                            </Text>
                                                            <Text ml={4} fontSize="md" fontWeight="normal" textDecoration="line-through" color="gray.500">
                                                                ${originalPrice}
                                                            </Text>
                                                        </Flex>
                                                    ) : (
                                                        <Text fontSize="lg" fontWeight="bold">
                                                            ${originalPrice}
                                                        </Text>
                                                    )}
                                                </Text>
                                                <CountdownTimer endTime={product?.sale?.endTime} />
                                            </VStack>
                                        </Link>
                                    </Box>
                                )
                            );
                        })}
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default ShowTimedSaleProducts;
