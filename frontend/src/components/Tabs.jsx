import { Box, Flex, Text } from "@chakra-ui/react"
import { CiBadgeDollar } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { GoStack } from "react-icons/go";
import { BiCategory } from "react-icons/bi";
import useGetProduct from "../hooks/useGetProduct";
import useGetCategories from "../hooks/useGetCategories";
import useGetCustomer from "../hooks/useGetCustomer";
import useGetOrders from "../hooks/useGetOrders";


const Tabs = () => {


    const { numberOfProduct } = useGetProduct()
    const { numberOfCategories } = useGetCategories()
    const { customerNumber } = useGetCustomer()
    const { totalOrders, ordersTotalPrice } = useGetOrders()


    return (
        <>

            <Text></Text>
            <Flex flexDirection={'row'} gap={50} position={'absolute'} left={'300px'} ml={4} p={1} top={"120px"} justifyContent={'space-around'} >
                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md" bg={'gray.50'}>
                    <Flex justifyContent={'space-evenly'} p={2}>
                        <Text className="text-2xl font-bold">Total Orders</Text>
                        <AiOutlineRise className="text-purple-600" size={35} />

                    </Flex>
                    <Text className="mt-8 ml-16 text-3xl">{totalOrders}</Text>

                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md" bg={'gray.50'}>
                    <Flex justifyContent={'space-evenly'} p={2}>
                        <Text className="text-2xl font-bold">Total Income</Text>
                        <CiBadgeDollar color="green" size={35} />

                    </Flex>
                    <Text className="mt-8 ml-16 text-3xl">{ordersTotalPrice}$</Text>

                </Box>

                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md" bg={'gray.50'}>
                    <Flex justifyContent={'space-evenly'} p={2}>
                        <Text className="text-2xl font-bold">Customer number</Text>
                        <HiUserGroup color="black" size={35} />

                    </Flex>
                    <Text className="mt-8 ml-16 text-3xl">{customerNumber}</Text>

                </Box>

            </Flex>
            <Flex flexDirection={'row'} gap={50} position={'absolute'} left={'300px'} ml={4} p={1} top={"300px"} justifyContent={'space-around'} >
                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md" bg={'gray.50'}>
                    <Flex justifyContent={'space-evenly'} p={2}>
                        <Text className="text-2xl font-bold">Total Products</Text>
                        <GoStack className="text-emerald-500" size={35} />

                    </Flex>
                    <Text className="mt-8 ml-16 text-3xl">{numberOfProduct}</Text>

                </Box>
                <Box w={'350px'} h={'150px'} className="rounded-md shadow-md" bg={'gray.50'}>
                    <Flex justifyContent={'space-evenly'} p={2}>
                        <Text className="text-2xl font-bold">Total Category</Text>
                        <BiCategory className="text-cyan-700" size={35} />

                    </Flex>
                    <Text className="mt-8 ml-16 text-3xl">{numberOfCategories}</Text>

                </Box>



            </Flex>



        </>
    )
}

export default Tabs