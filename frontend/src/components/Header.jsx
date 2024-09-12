import {
    Box,
    Flex,
    Image,
    useColorModeValue,
    IconButton,
    Tooltip,
    Spacer,
    Input,
    Button,
    Text,
    Divider,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsPerson, BsCart, BsSpeedometer, BsSearch } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { BiSolidHome } from 'react-icons/bi';
import { FaBars } from 'react-icons/fa';
import userAtom from '../atoms/userAtom';
import { toast } from 'react-toastify';
import useGetCategories from '../hooks/useGetCategories';
import CategoreisWithBrands from './CategoreisWithBrands';
import { BACKEND_API } from '../config/config.js'

const Header = () => {
    const Nav = useNavigate();
    const logged = useRecoilValue(userAtom);
    const setUser = useSetRecoilState(userAtom);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const { categories } = useGetCategories()


    const handleLogout = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/logout`, {
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

    const searchData = async (query) => {
        try {
            setLoading(true);
            const res = await fetch(`${BACKEND_API}/product/search/${query}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setSearchResult(data);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.log(error);
            setSearchResult([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        if (query.trim()) {
            searchData(query);
        } else {
            setSearchResult([]);
        }
    };

    return (
        <Box w="100%" shadow="sm">
            <Flex justify="space-between" align="center" h="16" px={10}>
                <Link to="/">
                    <Image src="/logo.png" alt="Logo" w={70} />
                </Link>
                <Flex justifyContent={'center'}>
                    
                    <Input
                        value={search}
                        onChange={handleChange}
                        h="35px"
                        width={{ base: '200px', md: '400px' }}
                        border="2px solid"
                        borderColor="gray.300"
                        placeholder="Search for products"
                        _hover={{
                            borderColor: 'gray.300',
                        }}
                        _focus={{
                            borderColor: 'gray.300',
                            boxShadow: 'none',
                            outline: 'none',
                        }}
                        bg={useColorModeValue('white', 'gray.800')}
                    />
                    <Button bg="gray.300" h="35px" ml={2} type="submit">
                        <BsSearch />
                    </Button>
                    {searchResult.length > 0 && search != "" && (
                        <Flex position={'absolute'} mt={'35px'} zIndex={10}>
                            <Box p={1} w={'400px'} me={10} color={'black'} bg={'gray.50'} rounded={'sm'}>
                                {loading ? (
                                    <Flex flexDir={'column'} gap={2}>
                                        <Skeleton h={'30px'} mb={2} />
                                        <Skeleton h={'30px'} mb={2} />
                                        <Skeleton h={'30px'} mb={2} />
                                    </Flex>
                                ) : (
                                    searchResult.map((product, i) => (
                                        <Box onClick={() => setSearch("")} key={i} p={2}>
                                            <Link to={`/product/${product._id}`}>
                                                <Text>{product.productName}</Text>
                                            </Link>
                                            <Divider mt={2} />
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </Flex>
                    )}
                </Flex>
                <Flex align="center" display={{ base: 'none', md: 'flex' }}>
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
                                <Link to={`/dashboard/${logged?.uid}`}>
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
                <IconButton
                    icon={<FaBars />}
                    size="md"
                    variant="ghost"
                    aria-label="Menu"
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onOpen}
                />
            </Flex>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column" align="center">
                            {!logged ? (
                                <Link to="/login" onClick={onClose}>
                                    <Tooltip label="Login" aria-label="Login">
                                        <IconButton
                                            icon={<BsPerson />}
                                            size="md"
                                            variant="ghost"
                                            aria-label="Login"
                                            mb={2}
                                        />
                                    </Tooltip>
                                </Link>
                            ) : (
                                <>
                                    <Link to={`/`} onClick={onClose}>
                                        Home
                                        <Tooltip label="Home" aria-label="Home">
                                            <IconButton
                                                icon={<BiSolidHome />}
                                                size="md"
                                                variant="ghost"
                                                aria-label="Home"
                                                mb={2}
                                            />
                                        </Tooltip>
                                    </Link>
                                
                                    <Link to={`/cart/${logged?.uid}`} onClick={onClose}>
                                        Cart
                                        <Tooltip label="Cart" aria-label="Cart">
                                            <IconButton
                                                icon={<BsCart />}
                                                size="md"
                                                variant="ghost"
                                                aria-label="Cart"
                                                mb={2}
                                            />
                                        </Tooltip>
                                    </Link>
                                    {logged?.isAdmin && (
                                        <Link to={`admin/${logged.uid}`} onClick={onClose}>
                                            Admin
                                            <Tooltip label="Admin Panel" aria-label="Admin Panel">
                                                <IconButton
                                                    icon={<MdOutlineAdminPanelSettings />}
                                                    size="md"
                                                    variant="ghost"
                                                    aria-label="Admin Panel"
                                                    mb={2}
                                                />
                                            </Tooltip>
                                        </Link>
                                    )}
                                        <Link to={`/dashboard/${logged?.uid}`} onClick={onClose}>
                                        Dashboard
                                        <Tooltip label="Dashboard" aria-label="Dashboard">
                                            <IconButton
                                                icon={<BsSpeedometer />}
                                                size="md"
                                                variant="ghost"
                                                aria-label="Dashboard"
                                                mb={2}
                                            />
                                        </Tooltip>
                                    </Link>
                                    <Link>
                                        Logout
                                        <Tooltip label="Logout" aria-label="Logout">
                                            <IconButton
                                                icon={<IoIosLogOut />}
                                                size="md"
                                                variant="ghost"
                                                aria-label="Logout"
                                                onClick={handleLogout}
                                                mb={2}
                                            />
                                        </Tooltip>
                                    </Link>
                                </>
                            )}
                        </Flex>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <CategoreisWithBrands categories={categories} />

        </Box>
    );
};

export default Header;
