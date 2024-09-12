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
    IconButton,
    Tooltip
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { BACKEND_API } from "../config/config";

const UserLastOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const logged = useRecoilValue(userAtom);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/order/userOrder/${logged.uid}`);
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
            const res = await fetch(`${BACKEND_API}/order/deleteUserOrder`, {
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
    const borderColor = useColorModeValue("gray.200", "gray.700");

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
        <Box p={4} mt="20px" mx="auto" maxW="1200px">
            <Flex justify="space-between" align="center" mb={5}>
                <Text fontSize="2xl" fontWeight="bold">
                    <Badge fontSize="2xl" bg="teal.500" color="white">Your Orders</Badge>
                </Text>
                {orders.length === 0 && <Text>No orders found.</Text>}
            </Flex>
            {orders.length > 0 && (
                <TableContainer borderRadius="md" bg={bg} shadow="md" border={`1px solid ${borderColor}`}>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Product Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Order Status</Th>
                                <Th>Ordered At</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentOrders.map((order) => (
                                <Tr key={order._id} _hover={{ bg: "gray.100" }}>
                                    <Td>{order.productName.length > 18 ? order.productName.slice(0, 18) + "..." : order.productName}</Td>
                                    <Td>{order.quantity}</Td>
                                    <Td>${order.price.toFixed(2)}</Td>
                                    <Td>
                                        <Badge colorScheme={getOrderStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>
                                    </Td>
                                    <Td>{order.createdAt.split('T')[0]}</Td>
                                    <Td>
                                        <Tooltip label="Delete Order" aria-label="Delete Order">
                                            <IconButton
                                                aria-label="Delete Order"
                                                icon={<BsTrash />}
                                                bg="red.500"
                                                color="white"
                                                _hover={{ bg: "red.600" }}
                                                onClick={() => deleteOrder(order._id)}
                                                size="sm"
                                            />
                                        </Tooltip>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <Flex justify="space-between" align="center" mt={4}>
                <Button onClick={prevPage} disabled={currentPage === 1} leftIcon={<ChevronLeftIcon />} variant="outline">
                    Previous
                </Button>
                <Text>Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}</Text>
                <Button onClick={nextPage} disabled={currentPage === Math.ceil(orders.length / ordersPerPage)} rightIcon={<ChevronRightIcon />} variant="outline">
                    Next
                </Button>
            </Flex>
        </Box>
    );
};

const getOrderStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'yellow';
        case 'Processing':
            return 'blue';
        case 'Shipped':
            return 'purple';
        case 'Delivered':
            return 'green';
        case 'Cancelled':
            return 'red';
        default:
            return 'gray';
    }
};

export default UserLastOrders;
