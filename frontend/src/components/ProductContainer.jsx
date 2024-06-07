/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react"

const ProductContainer = ({ children }) => {
    return (
        <Flex  flexWrap={'wrap'} mb={'20px'} flexDir={{
            base: "row", sm: "column", lg: "row"
        }}
            alignItems={{
                base: "center",
                sm: "center",
                md: "center"
            }}
            justifyContent={{ base: "space-between", lg: "space-evenly", sm: "space-between" }}>
            {children}


        </Flex>
    )
}

export default ProductContainer
