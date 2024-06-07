import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { toast } from "react-toastify";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Text,
    TableContainer,
    useColorModeValue,
    Badge,

} from "@chakra-ui/react";

const UserlastOrders = () => {
    const [orders, setOrders] = useState([]);
    const logged = useRecoilValue(userAtom);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await fetch(`/api/order/userOrder/${logged.uid}`);
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                } else {
                    setOrders(data);
                }
            } catch (error) {
                console.log(error);
                toast.error('An error occurred while fetching the orders.');
            }
        };

        getUserOrders();
    }, [logged.uid]);

    const bg = useColorModeValue("white", "gray.800");

    return (
        <Box position={'absolute'} left={'400'} top={'200'} mt="30px" ml="30px">
            <Text >
                <Badge fontSize="2xl" bg={'teal.500'} color={'white'} mb="10px">Your Last Orders</Badge>
            </Text>
            {orders.length > 0 ? (
                <TableContainer w={'1000px'} borderRadius="md" bg={bg} shadow="md" p={4}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Product Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Order Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orders.map((order) => (
                                <Tr key={order._id}>

                                    <Td>{order.productName}</Td>
                                    <Td>{order.quantity}</Td>
                                    <Td>${order.price.toFixed(2)}</Td>
                                    <Td>{order.orderStatus}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            ) : (
                <Text>No orders found.</Text>
            )}
        </Box>
    );
};

export default UserlastOrders;
