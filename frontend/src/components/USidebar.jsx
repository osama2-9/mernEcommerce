import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const USidebar = () => {
    return (
        <Box
            as="nav"
            width="250px"
            height="100vh"
            bg="gray.800"
            color="white"
            p={4}
            position="fixed"
        >
            <VStack align="stretch" spacing={4}>
                <Text fontSize="2xl" mb={4}>Menu</Text>
                <Link as={RouterLink} to="/address" _hover={{ textDecor: 'none', bg: 'gray.700' }} p={2} borderRadius="md">
                    Address
                </Link>
                <Link as={RouterLink} to="/my-orders" _hover={{ textDecor: 'none', bg: 'gray.700' }} p={2} borderRadius="md">
                    My Orders
                </Link>
                <Link as={RouterLink} to="/profile" _hover={{ textDecor: 'none', bg: 'gray.700' }} p={2} borderRadius="md">
                    Profile
                </Link>
            </VStack>
        </Box>
    );
};

export default USidebar;
