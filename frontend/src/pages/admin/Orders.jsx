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
} from "@chakra-ui/react";
import useGetOrders from "../../hooks/useGetOrders";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSetRecoilState, useRecoilValue } from "recoil";
import orderAtom from "../../atoms/orderAtom";

const Orders = () => {
    const setOrder = useSetRecoilState(orderAtom);
    const orderId = useRecoilValue(orderAtom);
    const { orders, refreshOrders } = useGetOrders();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [orderStatus, setOrderStatus] = useState('Pending')
    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    }
    const handleSelectedOrder = (order) => {
        onOpen()
        setOrder({ orderId: order._id })
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
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {
                refreshOrders()

                setOrder({ orderId: "" })
                onClose()
                toast.success(data.message)
            }


        } catch (error) {
            toast.error("error occurd While Updateing Status ,try again later")

        }
    }



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

    return (
        <Box bg={"gray.50"} position={"absolute"} top={100} left={260} p={4} borderRadius="md" shadow="md" width="calc(100% - 300px)">
            <TableContainer overflowX="auto">
                <Table minWidth="800px">
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
                        {orders.map((order, i) => (
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
        </Box>
    );
};

export default Orders;
