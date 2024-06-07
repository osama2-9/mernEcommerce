/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
    return (
        <>
            {product && (
                <Box
                    flex={{ base: "0 1 100%", sm: "0 1 100%", md: "0 1 48%", lg: "0 1 22%" }}
                    mb={{ sm: "10px", md: "10px" }}
                    w={{ base: "250px" }}
                    className="bg-gray-100 shadow-md p-1 rounded-md"
                >
                    <Box>
                        <Link to={`/product/${product._id}`}>
                            <Box>
                                <Image className="rounded-sm" src={product?.productImg} width={320} height={250} alt="" />
                            </Box>
                            <Box>
                                <Text textAlign="center" mt={1} fontSize="xl" fontWeight="500" lineHeight="short">
                                    {product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}
                                </Text>
                            </Box>
                        </Link>
                        <Flex justifyContent="space-around" flexDir="column" textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" mt={3}>{product?.productPrice}$</Text>
                            <Button
                                mt={3}
                                size="md"
                                colorScheme="blue"
                                variant="outline"
                                _hover={{ bg: "blue.500", color: "white" }}
                            >
                                Add to Cart
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Products;
