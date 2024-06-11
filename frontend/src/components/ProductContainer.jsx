/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react"

const ProductContainer = ({ children , mt=0}) => {
    return (
        <Flex
            mt={mt}
            flexWrap={'wrap'}
            mb={'20px'}
            flexDir={{ base: "row", lg: "row" }}
            alignItems="center"
            justifyContent="center"
        >
            {children}
        </Flex>
    )
}

export default ProductContainer
