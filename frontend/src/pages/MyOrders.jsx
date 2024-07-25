import { Box, Flex, Image, Text, Badge, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import USidebar from "../components/USidebar"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react"
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([])
    const { uid } = useParams()
    const [rating, setRating] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const logged = useRecoilValue(userAtom)
    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const res = await fetch(`/api/order/userOrder/${uid}`)
                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                }
                setUserOrders(data)
            } catch (error) {
                console.log(error)
                toast.error("Failed to fetch orders")
            }
        }
        getUserOrders()
    }, [uid])

    const handleRateNow = (order) => {
        setSelectedOrder(order);
        setRating(0);
        onOpen();

    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmitRating = async () => {
        if (rating > 0) {
            try {
                const res = await fetch(`/api/product/rate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid: logged?.uid,
                        pid: selectedOrder?.pid,
                        rating: rating
                    })
                });
                const data = await res.json();
                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true,
                    });
                } else {
                    toast.success(data.message)
                    onClose();
                }
            } catch (error) {
                console.log(error);
                toast("An error occurred while submitting the rating.", {
                    type: "error",
                    autoClose: true,
                });
            }
        } else {
            toast.error("Please select a rating");
        }
    };

    return (
        <>
            <USidebar />
            <Box position={'absolute'} top={'145px'} left={'280px'} shadow={'md'} h={'auto'} w={'1020px'} p={4}>
                {userOrders.length > 0 ? (
                    userOrders.map((order) => (
                        <Box key={order._id} borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} p={4}>
                            <Flex>
                                <Image
                                    src={order.prodcutImg}
                                    alt={order.productName}
                                    boxSize="150px"
                                    objectFit="cover"
                                    mr={4}
                                />
                                <Box flex="1">
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Text fontWeight="bold" fontSize="xl">{order.productName}</Text>
                                        <Text color="gray.500">{new Date(order.createdAt).toLocaleDateString()}</Text>
                                    </Flex>
                                    <Text fontWeight="bold" mt={2}>Order ID: {order._id}</Text>
                                    <Text>Size: {order.size}</Text>
                                    <Text>Color: {order.color}</Text>
                                    <Text mt={2}>Address: {order.address.street}, {order.address.city}, {order.address.country}</Text>
                                    <Text>Building: {order.address.buildingName}, Floor: {order.address.floor}, Apt: {order.address.apartmentNumber}</Text>
                                    <Text fontWeight="bold" mt={2}>Price: ${order.price}</Text>
                                    <Badge mt={2} colorScheme={getOrderStatusColor(order.orderStatus)}>
                                        {order.orderStatus}
                                    </Badge>



                                </Box>
                                {
                                    order.orderStatus == "Delivered" && (<>
                                        <Button mt={'48'} key={order._id} bg={'black'} color={'white'} _hover={{
                                            bg: "gray.700"
                                        }} size={'sm'} onClick={() => handleRateNow(order)}>Rate Now</Button>
                                    </>)
                                }
                            </Flex>
                        </Box>
                    ))
                ) : (
                    <Text>No orders found</Text>
                )}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rate Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedOrder && (
                            <>
                                <Image src={selectedOrder.prodcutImg
                                } alt={selectedOrder.productName} boxSize="150px" objectFit="cover" mx="auto" mb={4} />
                                <Text fontWeight="bold" textAlign="center">{selectedOrder.productName}</Text>
                                <Flex justifyContent="center" mt={4}>
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <StarIcon
                                            key={index}
                                            color={index < rating ? "yellow.400" : "gray.300"}
                                            cursor="pointer"
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                </Flex>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmitRating}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

const getOrderStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'yellow'
        case 'Processing':
            return 'blue'
        case 'Shipped':
            return 'purple'
        case 'Delivered':
            return 'green'
        case 'Cancelled':
            return 'red'
        default:
            return 'gray'
    }
}

export default MyOrders
