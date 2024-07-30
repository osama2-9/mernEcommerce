import { Box, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsHouseDoor, BsSpeedometer, BsPerson, BsHeart, BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = () => {
    const user = useRecoilValue(userAtom);

    return (
        <Box bg="gray.50" color="black" top={0} position="fixed" width="100%" zIndex="sticky" shadow="md">
            <Flex align="center" justify="space-between" p={4} maxW="1200px">
                <Link to="/">
                    <Tooltip label="Home" aria-label="Home">
                        <IconButton
                            icon={<BsHouseDoor size={22} />}
                            size="md"
                            variant="ghost"
                            aria-label="Home"
                        />
                    </Tooltip>
                </Link>
                <Flex align="center" gap={6}>
                    <Link to={`/my-orders/${user?.uid}`}>
                        <Tooltip label="My Orders" aria-label="My Orders">
                            <IconButton
                                icon={< BsFillCartCheckFill   size={22}/> }
                                size="md"
                                variant="ghost"
                                aria-label="My Orders"
                            />
                        </Tooltip>
                    </Link>
                    <Link to="/user-profile">
                        <Tooltip label="Profile" aria-label="Profile">
                            <IconButton
                                icon={<BsPerson   size={22}/>}
                                size="md"
                                variant="ghost"
                                aria-label="Profile"
                            />
                        </Tooltip>
                    </Link>
                    <Link to={`/dashboard/${user?.uid}`}>
                        <Tooltip label="Dashboard" aria-label="Dashboard">
                            <IconButton
                                icon={<BsSpeedometer   size={22}/>}
                                size="md"
                                variant="ghost"
                                aria-label="Dashboard"
                            />
                        </Tooltip>
                    </Link>
                    <Link to={`/favorite/${user?.uid}`}>
                        <Tooltip label="Favorite" aria-label="Favorite">
                            <IconButton
                                icon={<BsHeart   size={22}/>}
                                size="md"
                                variant="ghost"
                                aria-label="Favorite"
                            />
                        </Tooltip>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
