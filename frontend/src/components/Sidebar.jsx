/* eslint-disable no-unused-vars */
import {
    Box,
    VStack,
    Text,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,

    Spacer,
    Flex,
} from '@chakra-ui/react';
import { BiSolidHome } from 'react-icons/bi';
import { TbCategory } from "react-icons/tb";
import { PiStackSimple } from "react-icons/pi";
import { MdManageAccounts } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineStock } from "react-icons/ai";
import { CiBadgeDollar } from "react-icons/ci";
import { MdGroups2 } from "react-icons/md";


import { Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import Messages from './Messages';
import { useRef } from 'react';
const Sidebar = () => {
    const admin = useRecoilValue(userAtom)
    const message = useRef()
    return (
        <Box color={'white'} w="250px" h={770} bg={'teal.500'} p="5"  >
            <VStack align="start" spacing="10">
                <Link to={`admin/${admin.uid}`} as={RouterLink} >
                    <Flex alignItems={'center'} gap={2} flexDirection={'row'}>
                        <BiSolidHome size={22} />
                        <Text fontSize="xl" fontWeight="bold">Home</Text>

                    </Flex>

                </Link>
                <Menu>
                    <MenuButton variant="ghost">
                        <Flex alignItems={'center'} flexDirection={'row'} gap={2}>
                            <PiStackSimple size={22} />

                            <Text fontSize="xl" fontWeight="bold">Products</Text>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem color={'black'} as={RouterLink} to="/admin/product/create">Create Product</MenuItem>
                        <MenuItem color={'black'} as={RouterLink} to="/admin/product/show">Show Products</MenuItem>
                    </MenuList>

                </Menu>
                <Menu>
                    <MenuButton variant="ghost">
                        <Flex alignItems={'center'} gap={2}>
                            <TbCategory size={22} />
                            <Text fontSize="xl" fontWeight="bold">Categorys</Text>

                        </Flex>
                    </MenuButton>
                    <MenuList >
                        <MenuItem color={'black'} as={RouterLink} to="admin/category/create">Create Categorys</MenuItem>
                        <MenuItem color={'black'} as={RouterLink} to="/admin/category/show">Show Categorys</MenuItem>
                    </MenuList>

                </Menu>
                <Menu>
                    <MenuButton variant="ghost">
                        <Flex alignItems={'center'} gap={2}>
                            <TbCategory size={22} />
                            <Text fontSize="xl" fontWeight="bold">Brands</Text>

                        </Flex>
                    </MenuButton>
                    <MenuList >
                        <MenuItem color={'black'} as={RouterLink} to="admin/brand/create">Create Brand</MenuItem>
                        <MenuItem color={'black'} as={RouterLink} to="/admin/brand/show">Show Brand</MenuItem>
                    </MenuList>

                </Menu>
                <Link as={RouterLink} to='/admin/sales'>
                    <Flex gap={2} alignItems={'center'}>
                        <AiOutlineStock size={22} />
                        <Text fontSize="xl" fontWeight="bold">Sales</Text>

                    </Flex>
                </Link>
                <Link as={RouterLink} to="admin/customer">
                    <Flex gap={2} alignItems={'center'}>
                        <MdGroups2 size={22} />

                        <Text fontSize="xl" fontWeight="bold">Customers</Text>

                    </Flex>
                </Link>
                <Link as={RouterLink} to="admin/order">
                    <Flex gap={2} alignItems={'center'}>
                        <CiBadgeDollar size={22} />
                        <Text fontSize="xl" fontWeight="bold">Orders</Text>

                    </Flex>
                </Link>
                <Link as={RouterLink} to={`admin/profile/${admin.uid}`}>
                    <Flex gap={2} alignItems={'center'}>
                        <MdManageAccounts size={22} />
                        <Text fontSize="xl" fontWeight="bold">Profile</Text>

                    </Flex>
                </Link>
                <Link >
                    <Flex gap={2}>
                        <Messages />


                    </Flex>

                </Link>
                <Spacer />
                <Link as={RouterLink} to="admin/logout" mt="auto">
                    <Flex alignItems={'center'} gap={2}>
                        <IoIosLogOut size={22} />
                        <Text fontSize="xl" fontWeight="bold">Logout</Text>
                    </Flex>
                </Link>
            </VStack>
        </Box>
    )
}

export default Sidebar
