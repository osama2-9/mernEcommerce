/* eslint-disable no-unused-vars */
import { Box, Flex, Text } from "@chakra-ui/react";
import { CiBadgeDollar } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GoStack } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import useGetProduct from "../hooks/useGetProduct";
import useGetCategories from "../hooks/useGetCategories";
import useGetCustomer from "../hooks/useGetCustomer";
import useGetOrders from "../hooks/useGetOrders";
import { useEffect, useState } from "react";

const Tabs = () => {
    const { numberOfProduct } = useGetProduct();
    const { numberOfCategories } = useGetCategories();
    const { customerNumber } = useGetCustomer();
    const { totalOrders, ordersTotalPrice } = useGetOrders();
    const [currency, setCurrency] = useState(null);

    const apiLink = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_zeNqhZimNPwMKZyRtK9FtOy9ZRgosUK93SRG3FlE';

    useEffect(() => {
        const getCurrency = async () => {
            try {
                const res = await fetch(apiLink);
                const data = await res.json();
                setCurrency(data.data.ILS);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };
        // getCurrency();
    }, []);

    return (
        <>
            <Text></Text>
            <Flex flexDirection={'row'} gap={50} position={'absolute'} left={'300px'} ml={4} p={1} top={"120px"} justifyContent={'space-around'}>
                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">Total Orders</Text>
                        <AiOutlineRise className="text-purple-600" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {totalOrders}
                    </Text>
                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">Total Income</Text>
                        <CiBadgeDollar className="text-green-600" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {ordersTotalPrice}$
                    </Text>
                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">Customer Number</Text>
                        <HiUserGroup className="text-black" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {customerNumber}
                    </Text>
                </Box>
            </Flex>

            <Flex flexDirection={'row'} gap={50} position={'absolute'} left={'300px'} ml={4} p={1} top={"300px"} justifyContent={'space-around'}>
                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">Total Products</Text>
                        <GoStack className="text-emerald-500" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {numberOfProduct}
                    </Text>
                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">Total Categories</Text>
                        <BiCategory className="text-cyan-700" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {numberOfCategories}
                    </Text>
                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md bg-white">
                    <Flex justifyContent={'space-between'} alignItems={'center'} p={4}>
                        <Text className="text-2xl font-bold text-gray-800">USD to ILS</Text>
                        <AiOutlineRise className="text-red-600" size={35} />
                    </Flex>
                    <Text className="mt-4 text-center text-3xl text-gray-800 font-semibold">
                        {currency ? `1 USD = ${currency.toFixed(3)} ILS` : "Loading..."}
                    </Text>
                </Box>
            </Flex>
        </>
    );
};

export default Tabs;
