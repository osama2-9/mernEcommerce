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
    Image,
    VStack,
    HStack,
} from "@chakra-ui/react";
import useGetOrders from "../../hooks/useGetOrders";
import { useState } from "react";
import { toast } from "react-toastify";
import { BsTrash } from 'react-icons/bs';

const Orders = () => {
    const { orders, refreshOrders } = useGetOrders();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orderStatus, setOrderStatus] = useState('Pending');
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const handleSelectedOrder = (order) => {
        onOpen();
        setSelectedOrder(order);
    };

    const handleUpdateStatus = async () => {
        try {
            const res = await fetch('/api/order/updateStatus', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: selectedOrder._id,
                    orderStatus: orderStatus
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                refreshOrders();
                setSelectedOrder(null);
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const filteredOrders = orders
        .filter(order =>
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        {currentOrders.map((order, i) => (
                            <Tr key={i} onClick={() => handleSelectedOrder(order)} cursor="pointer">
                                <Td>{order.email}</Td>
                                <Td>{order.productName.length >= 18 ? order.productName.slice(0, 18).concat('...') : order.productName}</Td>
                                <Td>${order.price}</Td>
                                <Td>{order.quantity}</Td>
                                <Td>${order.price * order.quantity}</Td>
                                <Td>{order.paymentMethod}</Td>
                                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                                <Td color={getStatusColor(order.orderStatus)}>{order.orderStatus || "Pending"}</Td>
                                <Td>
                                    <Button onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order._id); }} ml={2} color={'white'} bg={'red.500'}>
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
                    <ModalHeader>Order Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedOrder && (
                            <VStack align="start" spacing={3}>
                                <HStack>
                                    <Text fontWeight="bold">Order ID:</Text>
                                    <Text>{selectedOrder._id}</Text>
                                </HStack>
                                <Image src={selectedOrder.prodcutImg} alt={selectedOrder.productName} boxSize="100px" borderRadius="md" />
                                <HStack>
                                    <Text fontWeight="bold">Email:</Text>
                                    <Text>{selectedOrder.email}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Phone:</Text>
                                    <Text>{selectedOrder.phone}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Product Name:</Text>
                                    <Text>{selectedOrder.productName}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Quantity:</Text>
                                    <Text>{selectedOrder.quantity}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Price:</Text>
                                    <Text>${selectedOrder.price}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Total:</Text>
                                    <Text>${selectedOrder.price * selectedOrder.quantity}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Payment Method:</Text>
                                    <Text>{selectedOrder.paymentMethod}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight="bold">Order Status:</Text>
                                    <Text>{selectedOrder.orderStatus}</Text>
                                </HStack>
                                <Box>
                                    <Text fontWeight="bold">Address:</Text>
                                    <Text>{selectedOrder.address.addressName}</Text>
                                    <Text>{selectedOrder.address.street}, {selectedOrder.address.city}</Text>
                                    <Text>{selectedOrder.address.country}</Text>
                                </Box>
                                <Select
                                    mt={3}
                                    value={orderStatus}
                                    onChange={handleOrderStatusChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Select>
                            </VStack>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleUpdateStatus} colorScheme="blue" mr={3}>
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
                    <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
                    {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, i) => (
                        <Button ml={2} key={i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </Button>
                    ))}
                    <Button ml={2} onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}>Next</Button>
                </Box>
            </Flex>
        </Box>
    );
};

export default Orders;
