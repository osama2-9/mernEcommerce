/* eslint-disable react/prop-types */
import { Box, Button, Flex, Image, Text, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
    return (
        <>
            {product && (
                <Box 
                ml={2}
                    flex={{ base: "0 1 100%", sm: "0 1 100%", md: "0 1 48%", lg: "0 1 22%" }}
                    mb={{ sm: "10px", md: "10px" }}
                    w={{ base: "250px" }}
                    className={`bg-white shadow-md p-1 rounded-md ${product?.productQuntity === 0 ? 'opacity-50' : ''}`}
                >
                    <Box>
                        <Link to={`/product/${product._id}`}>
                            <Box>
                                <Image className="rounded-sm" src={product?.productImg} width={'500px'} height={250} alt="" />
                            </Box>
                            <Box>
                                <Text textAlign="center" mt={1} fontSize="xl" fontWeight="500" lineHeight="short">
                                    {product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}
                                </Text>
                            </Box>
                        </Link>
                        <Flex mb={2} justifyContent="space-around" flexDir="column" textAlign="center">
                            <Text fontSize="lg" fontWeight="bold" mt={3}>{product?.productPrice}$</Text>
                            <Center mt={3}>
                                <Button
                                    w={'200px'}
                                    size="md"
                                    colorScheme="black"
                                    variant="outline"
                                    _hover={{ bg: "black", color: "white" }}
                                    disabled={product.quantity === 0}
                                >
                                    Add to Cart
                                </Button>
                            </Center>
                        </Flex>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Products;
