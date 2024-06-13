/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image, Text, Center, Badge } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
    function Discount(price) {
        return price - (price * (product?.sale / 100));
    }

    const hasSale = product?.sale > 0;
    const finalPrice = Discount(product?.productPrice).toFixed(2);
    const originalPrice = product?.productPrice.toFixed(2);

    return (
        <>
            {product && (
                <Box
                    ml={3}
                    flex={{ base: "0 1 100%", sm: "0 1 100%", md: "0 1 48%", lg: "0 1 22%" }}
                    mb={{ sm: "10px", md: "10px" }}
                    w={{ base: "250px" }}
                    className={`bg-white shadow-md p-1 rounded-md ${product?.productQuntity === 0 ? 'opacity-50' : ''}`}
                    position="relative"
                >
                    {hasSale && (
                        <Badge position="absolute" top="2" right="2" colorScheme="red" fontSize="12px">
                            Sale
                        </Badge>
                    )}
                    <Link to={`/product/${product._id}`}>
                        <Box>
                            <Image className="rounded-sm" src={product?.productImg} width={'500px'} height={250} alt={product.productName} />
                        </Box>
                        <Box>
                            <Text textAlign="center" mt={1} fontSize="xl" fontWeight="500" lineHeight="short">
                                {product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}
                            </Text>
                        </Box>
                    </Link>
                    <Flex mb={2} justifyContent="space-around" flexDir="column" textAlign="center">
                        <Flex mt={1} gap={4} flexDir={'row'} justifyContent="center" alignItems="center">
                            {hasSale && (
                                <>
                                    <Text fontSize="lg" fontWeight="bold" color="black">
                                        ${finalPrice}
                                    </Text>
                                    <Text fontSize="md" fontWeight="normal" textDecoration="line-through" color="gray.500">
                                        ${originalPrice}
                                    </Text>
                                </>
                            )}
                            {!hasSale && (
                                <Text fontSize="lg" fontWeight="bold">
                                    ${originalPrice}
                                </Text>
                            )}
                        </Flex>
                        <Center mt={3}>
                            <Button
                                w={'200px'}
                                size="md"
                                colorScheme="black"
                                variant="outline"
                                _hover={{ bg: "black", color: "white" }}
                                disabled={product.productQuntity === 0}
                            >
                                Add to Cart
                            </Button>
                        </Center>
                    </Flex>
                </Box>
            )}
        </>
    );
};

export default Products;
