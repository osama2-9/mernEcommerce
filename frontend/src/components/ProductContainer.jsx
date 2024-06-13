/* eslint-disable react/prop-types */
import { Grid } from "@chakra-ui/react";

const ProductContainer = ({ children, mt = 0, position, left, top }) => {
    return (
        <Grid
            top={top}
            ml={20}
            mt={mt}
            position={position}
            left={left}
            mb={'50px'}
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}
        >
            {children}
        </Grid>
    );
};

export default ProductContainer;
