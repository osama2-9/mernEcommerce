import { Box, Flex, Text, Icon, useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';
import useGetOrders from '../hooks/useGetOrders';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const UserTabs = () => {
    const logged = useRecoilValue(userAtom);
    const { orders } = useGetOrders();
    const filter = orders.filter((o) => o?.uid === logged?.uid);

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex
            direction={isMobile ? "column" : "row"}
            p={4}
            m={4}
            justify={isMobile ? "center" : "flex-start"}
            align="center"
            position="relative"
            maxW="1200px"
            mx="auto"
            mt={20}
        >
            <Box
                w={isMobile ? 'full' : '400px'}
                bg={useColorModeValue('white', 'gray.800')}
                shadow="lg"
                borderRadius="lg"
                p={6}
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="transform 0.2s, box-shadow 0.2s"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            >
                <Icon as={FaBoxOpen} boxSize={12} mr={4} color="teal.500" />
                <Flex direction="column" textAlign="center">
                    <Text fontSize="xl" fontWeight="bold" mb={2}>
                        My Orders
                    </Text>
                    <Text fontSize="3xl" fontWeight="bold" color={useColorModeValue('gray.700', 'gray.300')}>
                        {filter.length}
                    </Text>
                </Flex>
            </Box>
        </Flex>
    );
};

export default UserTabs;
