/* eslint-disable no-unused-vars */
import {
    Box,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Input,
    Text,
} from "@chakra-ui/react";
import useGetOrders from "../../hooks/useGetOrders";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState, useRecoilValue } from "recoil";
import orderAtom from "../../atoms/orderAtom";
import { BsTrash } from 'react-icons/bs';

const Orders = () => {
    const setOrder = useSetRecoilState(orderAtom);
    const orderId = useRecoilValue(orderAtom);
    const { orders, refreshOrders } = useGetOrders();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orderStatus, setOrderStatus] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState("");

    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const handleSelectedOrder = (order) => {
        onOpen();
        setOrder({ orderId: order._id });
    };

    const handleUpdateStatus = async () => {
        try {
            const res = await fetch('/api/order/updateStatus', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: orderId.orderId,
                    orderStatus: orderStatus
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                refreshOrders();
                setOrder({ orderId: "" });
                onClose();
                toast.success(data.message);
            }
        } catch (error) {
            toast.error("An error occurred while updating status. Please try again later.");
        }
    };

    const handleDeleteOrder = async (id) => {
        try {
            const res = await fetch('/api/order/delete', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    orderId: id
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                refreshOrders();
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while deleting the order.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "yellow.500";
            case "Processing":
                return "blue.500";
            case "Shipping":
                return "orange.500";
            case "Delivery":
                return "teal.500";
            case "Delivered":
                return "green.500";
            case "Canceled":
                return "red.500";
            default:
                return "gray.500";
        }
    };

    const [curruntPage, setCurruntPage] = useState(1);
    const [itemPrePage, setItemPerPage] = useState(7);
    const indexOfLastItem = curruntPage * itemPrePage;
    const indexOFFirstItem = indexOfLastItem - itemPrePage;

    // Filter and sort orders based on the search term and date
    const filteredOrders = orders
        .filter(order =>
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const curruntOrders = filteredOrders.slice(indexOFFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurruntPage(pageNumber);

    return (
        <Box bg={"gray.50"} position={"absolute"} top={100} left={260} p={4} borderRadius="md" shadow="md" width="calc(100% - 300px)">
            <Flex gap={2} mb={4}>
                <Input
                    type="text"
                    border={'2px solid teal'}
                    placeholder="Search by email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Flex>

            <TableContainer overflowX="auto">
                <Table mt={3} minWidth="800px">
                    <Thead>
                        <Tr>
                            <Th>Email</Th>
                            <Th>Product Name</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                            <Th>Total Price</Th>
                            <Th>Payment Method</Th>
                            <Th>Ordered At</Th>
                            <Th>Order Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {curruntOrders.map((order, i) => (
                            <Tr key={i}>
                                <Td>{order.email}</Td>
                                <Td>{order.productName.length >= 18 ? order.productName.slice(0, 18).concat('...') : order.productName}</Td>
                                <Td>${order.price}</Td>
                                <Td>{order.quantity}</Td>
                                <Td>${order.price * order.quantity}</Td>
                                <Td>{order.paymentMethod}</Td>
                                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                                <Td color={getStatusColor(order.orderStatus)}>{order.orderStatus || "Pending"}</Td>
                                <Td>
                                    <Button onClick={() => handleSelectedOrder(order)} bg={"blue.500"} color={"white"} >
                                        Update Status
                                    </Button>
                                    <Button onClick={() => handleDeleteOrder(order._id)} ml={2} color={'white'} bg={'red.500'}>
                                        Delete
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Order Status</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select
                            value={orderStatus}
                            onChange={handleOrderStatusChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleUpdateStatus} colorScheme="blue" mr={3} >
                            Save
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex justifyContent={'center'} mt={4}>
                <Box className="pagination">
                    <Button onClick={() => paginate(curruntPage - 1)} disabled={curruntPage === 1}>Previous</Button>
                    {Array.from({ length: Math.ceil(filteredOrders.length / itemPrePage) }, (_, i) => (
                        <Button ml={2} key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                    <Button onClick={() => paginate(curruntPage + 1)} disabled={curruntPage === Math.ceil(filteredOrders.length / itemPrePage)}>Next</Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Orders;
