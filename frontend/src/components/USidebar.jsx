import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsHouseDoor, BsSpeedometer, BsPerson } from 'react-icons/bs';

const Navbar = () => {
    const user = useRecoilValue(userAtom);

    return (
        <Box bg="gray.50" color="black" top={0} position="fixed" width="100%" zIndex="sticky" shadow={'md'}>
            <Flex align="center" justify="space-between" p={4} maxW="1200px" >
                <Link to={'/'}><BsHouseDoor size={22} /></Link>
                <Flex align="center" gap={6}>

                    <Link to={`/my-orders/${user?.uid}`} _hover={{ color: 'gray.200' }}>
                        My Orders
                    </Link>
                    <Link to="/user-profile" _hover={{ color: 'gray.200' }}>
                        <BsPerson size={24} />
                    </Link>
                    <Link to={`/dashboard/${user?.uid}`} _hover={{ color: 'gray.200' }}>
                        <BsSpeedometer size={24} />
                    </Link>
                </Flex>


            </Flex>


        </Box>
    );
};

export default Navbar;
