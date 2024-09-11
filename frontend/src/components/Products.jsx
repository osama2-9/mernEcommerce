/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Flex,
    Image,
    Text,
    Center,
    Badge,
    IconButton,
    Tooltip,
    Skeleton,
    HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useGetFavoriteProducts from "../hooks/useGetFavoriteProducts";
import { toast } from "react-toastify";

const Products = ({ product, isLoading }) => {
    const [saved, setSaved] = useState(false);
    const { favoriteProducts } = useGetFavoriteProducts();
    const user = useRecoilValue(userAtom);

    useEffect(() => {
        if (favoriteProducts) {
            setSaved(favoriteProducts.some((p) => p._id === product._id));
        }
    }, [favoriteProducts, product._id]);

    const Discount = useCallback((price) => price - (price * (product?.sale / 100)), [product.sale]);
    const hasSale = product?.sale > 0;
    const finalPrice = hasSale ? Discount(product?.productPrice).toFixed(2) : product?.productPrice?.toFixed(2);
    const originalPrice = product?.productPrice?.toFixed(2);

    const handleFavorite = async () => {
        try {
            const endpoint = saved ? '/api/favorite/remove' : '/api/favorite/add';
            const method = saved ? "DELETE" : "POST";
            const body = JSON.stringify({ uid: user?.uid, pid: product?._id });
            const res = await fetch(endpoint, { method, headers: { 'Content-Type': "application/json" }, body });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setSaved(!saved);
            }
        } catch (error) {
            console.log(error);
            toast.error(saved ? "Error while removing product from favorites" : "Error while adding product to favorites");
        }
    };

    const truncateProductName = (name, maxLength) => name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;

    return (
        <Skeleton isLoaded={!isLoading}>
            <Box
                ml={3}
                flex={{ base: "0 1 100%", sm: "0 1 100%", md: "0 1 48%", lg: "0 1 22%" }}
                mb="10px"
                w="250px"
                bg="white"
                shadow="md"
                p={4}
                rounded="lg"
                position="relative"
                _hover={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
                transition="box-shadow 0.2s"
                opacity={product?.productQuntity === 0 ? 0.5 : 1}
            >
                <Flex position="absolute" top="2" right="2" alignItems="center">
                    {hasSale && (
                        <Badge colorScheme="red" mt={2} fontSize="12px" mr={1}>
                            Sale
                        </Badge>
                    )}
                    <IconButton
                        me={3}
                        mt={3}
                        p={2}
                        icon={saved ? <FaHeart color="red" /> : <FaRegHeart />}
                        onClick={handleFavorite}
                        variant="ghost"
                        aria-label={saved ? "Remove from favorites" : "Add to favorites"}
                        _hover={{ color: saved ? "red" : "gray.600", bg: "gray.300" }}
                        size="sm"
                    />
                </Flex>
                <Link to={`/product/${product._id}`}>
                    <Box>
                        <Image src={product?.productImg} width="100%" height={250} alt={product.productName} objectFit="cover" borderRadius="md" />
                    </Box>
                    <Box>
                        <Text textAlign="center" mt={2} fontSize="xl" fontWeight="500" lineHeight="short" noOfLines={2}>
                            {truncateProductName(product.productName, 13)}
                        </Text>
                    </Box>
                    <Flex mb={2} justifyContent="space-around" flexDir="column" textAlign="center">
                        <Flex mt={1} gap={4} flexDir="row" justifyContent="center" alignItems="center">
                            {hasSale ? (
                                <>
                                    <Text fontSize="lg" fontWeight="bold" color="black">
                                        ${finalPrice}
                                    </Text>
                                    <Text fontSize="md" fontWeight="normal" textDecoration="line-through" color="gray.500">
                                        ${originalPrice}
                                    </Text>
                                </>
                            ) : (
                                <Text fontSize="lg" fontWeight="bold">
                                    ${originalPrice}
                                </Text>
                            )}
                        </Flex>
                        <Center mt={3}>
                            <Button
                                w="200px"
                                size="md"
                                colorScheme="black"
                                variant="outline"
                                _hover={{ bg: "black", color: "white" }}
                                disabled={product.productQuntity === 0}
                            >
                                Add to Cart
                            </Button>
                        </Center>
                        <Flex justify="space-between" align="center" mt={2}>
                            <Tooltip label={`${product.ratingCount} ratings`} aria-label="Rating count tooltip">
                                <HStack spacing={1}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        index < product.rating
                                            ? <AiFillStar key={index} color="gold" />
                                            : <AiOutlineStar key={index} color="gold" />
                                    ))}
                                    <Text ml={1}>{`(${product.ratingCount})`}</Text>
                                </HStack>
                            </Tooltip>
                        </Flex>
                    </Flex>
                </Link>
            </Box>
        </Skeleton>
    );
};

export default Products;
