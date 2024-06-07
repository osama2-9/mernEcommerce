/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react"

const FeatureBox = ({ icon, title, description }) => {
    return (
        <Box
            mt={10}
            p={2}
            w="400px"
            h="150px"
            bg="gray.100"
            rounded={'lg'}
            shadow="md"
            className="feature-box"

        >
            <Flex justifyContent="center" alignItems="center" className="text-green-500">
                {icon}
            </Flex>
            <Text fontSize="24" mt={2} textAlign="center" >
                {title}
            </Text>
            <Text className="text-gray-500" textAlign="center">{description}</Text>
        </Box>
    )
}

export default FeatureBox
