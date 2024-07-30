/* eslint-disable react/prop-types */
import { Box, Grid, Text } from "@chakra-ui/react";

const ProductContainer = ({ children, mt = 10, position, left, top, title = "" }) => {
    return (
        <>
            <Box >

                {title && (
                    <>
                        <Text
                            ml={28}
                            mt={28}
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
                            {title}
                        </Text>
                    </>)}
                <Grid
                    top={top}
                    ml={20}
                    mt={mt}
                    position={position}
                    left={left}
                    mb={'100px'}
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                    gap={6}
                >

                    {children}
                </Grid>
            </Box>
        </>
    );
};

export default ProductContainer;
