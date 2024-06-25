import { Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaBoxOpen } from 'react-icons/fa';
import useGetOrders from '../hooks/useGetOrders'
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const UserTabs = () => {
    const logged = useRecoilValue(userAtom)
    const { orders } = useGetOrders()
    const filter = orders.filter((o) => o?.uid === logged?.uid)

    console.log('filterd :\n', filter);
    return (
        <Flex position={'absolute'} left={'600px'} direction="row" p={4} m={4}>

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
                    <Text fontSize="lg" fontWeight="bold" textAlign={'center'}>{filter.length}</Text>

                </Flex>
            </Box>
        </Flex>
    );
};

export default UserTabs;
