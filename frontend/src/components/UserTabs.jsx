import { Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';

const UserTabs = () => {
    return (
        <Flex position={'absolute'} left={'400px'} direction="row"  p={4} m={4}>

            <Box
                w={'400px'}

                flex="1"
                bg={useColorModeValue('white', 'gray.800')}
                shadow="md"
                borderRadius="lg"
                p={6}
                ml={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
            >
                <Icon as={FaBoxOpen} boxSize={10} mr={4} color="teal.500" />
                <Flex gap={1} flexDirection={'column'}>
                    <Text fontSize="lg" fontWeight="bold">My Orders</Text>
                    <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>2</Text>

                </Flex>
            </Box>
        </Flex>
    );
};

export default UserTabs;
