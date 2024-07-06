import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Brands = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const getBrands = async () => {
            try {
                const res = await fetch('/api/brand');
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setBrands(data);
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while fetching brands.");
            }
        };
        getBrands();
    }, []);

    return (
        <Box w={{ base: "100%", md: "80%", lg: "110%" }} mx="auto" p={4} rounded="md" shadow="md" bg="white">
            
            <Flex  justify="center">
                {brands.length > 0 ? (
                    brands.map((brand) => (
                        <Box key={brand._id} m={4} p={4} textAlign="center" shadow="md" rounded="md"  w="270px">
                            <Image src={brand.brandImg} alt={brand.brandName}  objectFit="contain" mx="auto" />
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
