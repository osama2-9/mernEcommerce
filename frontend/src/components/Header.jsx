import { BsPerson, BsCart, BsSpeedometer } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { IoIosLogOut } from 'react-icons/io';
import { toast } from 'react-toastify';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { Box, Flex, Image, List, ListItem, useColorModeValue, IconButton, Tooltip, Spacer } from '@chakra-ui/react';

const Header = () => {
    const Nav = useNavigate();
    const logged = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            if (data.error) {
                toast(data.error, {
                    type: 'error',
                    autoClose: true,
                });
            }
            setUser(null);
            localStorage.removeItem('user');
            Nav('/');
        } catch (error) {
            toast(error.message, {
                type: 'error',
                autoClose: true,
            });
        }
    };

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} w="100%" h="16" shadow="md">
            <Flex justify="space-between" align="center" h="100%" px={10}>
                <Link to="/">
                    <Image src="/logo.png" width={45} alt="Logo" />
                </Link>
                <List display="flex" alignItems="center" gap={10}>
                    <ListItem>
                        <Link to="/">Home</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/men">Men</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/women">Women</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/baby">Baby</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/Phones">Phones</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/Laptops">Laptops</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/Perfumes">Perfumes</Link>
                    </ListItem>
                </List>
                <Flex align="center">
                    {!logged ? (
                        <Link to="/login">
                            <Tooltip label="Login" aria-label="Login">
                                <IconButton
                                    icon={<BsPerson />}
                                    size="md"
                                    variant="ghost"
                                    aria-label="Login"
                                />
                            </Tooltip>
                        </Link>
                    ) : (
                        <>
                            <Link to={`/cart/${logged?.uid}`}>
                                <Tooltip label="Cart" aria-label="Cart">
                                    <IconButton
                                        icon={<BsCart />}
                                        size="md"
                                        variant="ghost"
                                        aria-label="Cart"
                                    />
                                </Tooltip>
                            </Link>
                            <Spacer />
                            {logged.isAdmin && (
                                <Link to={`admin/${logged.uid}`}>
                                    <Tooltip label="Admin Panel" aria-label="Admin Panel">
                                        <IconButton
                                            icon={<MdOutlineAdminPanelSettings />}
                                            size="md"
                                            variant="ghost"
                                            aria-label="Admin Panel"
                                        />
                                    </Tooltip>
                                </Link>
                            )}
                            <Link to={`/dashbored/${logged?.uid}`}>
                                <Tooltip label="Dashboard" aria-label="Dashboard">
                                    <IconButton
                                        icon={<BsSpeedometer />}
                                        size="md"
                                        variant="ghost"
                                        aria-label="Dashboard"
                                    />
                                </Tooltip>
                            </Link>
                            <Tooltip label="Logout" aria-label="Logout">
                                <IconButton
                                    icon={<IoIosLogOut />}
                                    size="md"
                                    variant="ghost"
                                    aria-label="Logout"
                                    onClick={handleLogout}
                                />
                            </Tooltip>
                        </>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
