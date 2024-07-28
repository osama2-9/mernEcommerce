/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import useGetBrands from "../hooks/useGetBrands";
import { Link } from "react-router-dom";

const Brands = () => {
    const { homePageBrands } = useGetBrands()


    return (
        <Box w={{ base: "100%", md: "80%", lg: "110%" }} mx="auto" p={4} rounded="md" shadow="md" bg="white">

            <Flex justify="center">
                {homePageBrands.length > 0 ? (
                    homePageBrands.map((brand) => (
                        <Box key={brand._id} m={4} p={4} textAlign="center" shadow="md" rounded="md" w="270px">
                            <Image src={brand.brandImg} alt={brand.brandName} objectFit="contain" mx="auto" />
                            <Text mt={2} fontWeight="bold">{brand.brandName}</Text>
                        </Box>
                    ))
                ) : (
                    <Text>No brands available</Text>
                )}
            </Flex>
        </Box>
    );
};

export default Brands;
