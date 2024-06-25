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
    Button,
    Flex,

} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const UserLastOrders = () => {




    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
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

    const deleteOrder = async (orderId) => {
        try {
            const res = await fetch('/api/order/deleteUserOrder', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    oid: orderId,
                }),
            });

            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while deleting the order.');
        }
    };

    const bg = useColorModeValue("white", "gray.800");

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(orders.length / ordersPerPage)));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <Box p={4} mt="150px" w={'1000px'} ml={380}>
            <Flex justify="space-between" align="center" mb={5}>
                <Text fontSize="2xl" fontWeight="bold">
                    <Badge fontSize="2xl" bg={'teal.500'} color={'white'}>Your  Orders</Badge>
                </Text>
                {orders.length === 0 && <Text>No orders found.</Text>}
            </Flex>
            {orders.length > 0 && (
                <TableContainer borderRadius="md" bg={bg} shadow="md">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Product Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Order Status</Th>
                                <Th>Orderd At</Th>
                                <Th>Action</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentOrders.map((order) => (
                                <Tr key={order._id} _hover={{ bg: "gray.100" }}>
                                    <Td>{order.productName.length > 18 ? order.productName.slice(0, 18) + "..." : order.productName}</Td>
                                    <Td>{order.quantity}</Td>
                                    <Td>${order.price.toFixed(2)}</Td>
                                    <Td>{order.orderStatus}</Td>
                                    <Td>{order.createdAt.split('T')[0]}</Td>
                                    <Td>
                                        <Button onClick={() => deleteOrder(order._id)} bg={'red.500'} _hover={{ bg: "red.600" }} size="sm">
                                            <BsTrash color="white" size={20} />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <Flex justify="space-between" align="center" mt={4}>
                <Button onClick={prevPage} disabled={currentPage === 1} leftIcon={<ChevronLeftIcon />}>
                    Previous
                </Button>
                <Text>Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}</Text>
                <Button onClick={nextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)} rightIcon={<ChevronRightIcon />}>
                    Next
                </Button>
            </Flex>
        </Box>
    );
};

export default UserLastOrders;
