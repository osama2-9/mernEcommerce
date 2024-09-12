import {
    Box,
    Flex,
    Image,
    Text,
    Badge,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Spinner,
    Input,
    useBreakpointValue,
    IconButton,
    Textarea
} from "@chakra-ui/react";
import USidebar from "../components/USidebar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { BACKEND_API } from "../config/config";

const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { uid } = useParams();
    const [rating, setRating] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [comment, setComment] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const logged = useRecoilValue(userAtom);
    const isMobile = useBreakpointValue({ base: true, md: false });

    useEffect(() => {
        const getUserOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BACKEND_API}/order/userOrder/${uid}`);
                const data = await res.json();
                if (data.error) {
                    toast.error(data.error);
                }
                setUserOrders(data);
                setFilteredOrders(data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        getUserOrders();
    }, [uid]);

    useEffect(() => {
        const results = userOrders?.filter(order =>
            order.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrders(results);
    }, [searchQuery, userOrders]);

    const handleRateNow = (order) => {
        setSelectedOrder(order);
        setRating(0);
        setComment('');
        onOpen();
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmitRating = async () => {
        if (rating > 0) {
            try {
                const res = await fetch(`${BACKEND_API}/product/rate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid: logged?.uid,
                        pid: selectedOrder?.pid,
                        rating: rating,
                        userComment: comment
                    })
                });
                const data = await res.json();
                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true,
                    });
                } else {
                    toast.success(data.message);
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
            <Box
                position='relative'
                top='80px'
                left={isMobile ? '0' : '0px'}
                p={4}
                maxW='1200px'
                mx='auto'
            >
                <Flex mb={4} align="center">
                    <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="md"
                        mr={2}
                    />
                    <IconButton
                        aria-label="Search Orders"
                        icon={<SearchIcon />}
                        onClick={() => setSearchQuery(searchQuery)}
                        colorScheme="blue"
                    />
                </Flex>

                {loading ? (
                    <Flex justifyContent="center" alignItems="center" height="80vh">
                        <Spinner size="lg" />
                    </Flex>
                ) : filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <Box
                            key={order._id}
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            mb={6}
                            p={4}
                            boxShadow="lg"
                            _hover={{ boxShadow: 'xl', transform: 'scale(1.01)', transition: '0.3s' }}
                            transition="0.3s"
                        >
                            <Flex direction={{ base: 'column', md: 'row' }} align="center">
                                <Image
                                    src={order.prodcutImg}
                                    alt={order.productName}
                                    boxSize={{ base: 'full', md: '150px' }}
                                    mb={{ base: 4, md: 0 }}
                                    mr={{ md: 4 }}
                                    borderRadius="md"
                                />
                                <Box flex="1">
                                    <Flex direction="column" mb={2}>
                                        <Text fontWeight="bold" fontSize="xl" mb={1}>{order.productName}</Text>
                                        <Text color="gray.500">{new Date(order.createdAt).toLocaleDateString()}</Text>
                                    </Flex>
                                    <Text fontWeight="bold" mb={1}>Order ID: {order._id}</Text>
                                    <Text mb={1}>Size: {order.size}</Text>
                                    <Text mb={1}>Color: {order.color}</Text>
                                    <Text mb={1}>Address: {order.address.street}, {order.address.city}, {order.address.country}</Text>
                                    <Text mb={2}>Building: {order.address.buildingName}, Floor: {order.address.floor}, Apt: {order.address.apartmentNumber}</Text>
                                    <Text fontWeight="bold" mb={2}>Price: ${order.price}</Text>
                                    <Badge colorScheme={getOrderStatusColor(order.orderStatus)}>
                                        {order.orderStatus}
                                    </Badge>
                                </Box>
                                {
                                    order.orderStatus === "Delivered" && (
                                        <Button
                                            mt={{ base: 4, md: 0 }}
                                            bg='black'
                                            color='white'
                                            _hover={{ bg: "gray.700" }}
                                            onClick={() => handleRateNow(order)}
                                        >
                                            Rate Now
                                        </Button>
                                    )
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
                                <Image
                                    src={selectedOrder.prodcutImg}
                                    alt={selectedOrder.productName}
                                    boxSize="150px"
                                    mx="auto"
                                    mb={4}
                                    borderRadius="md"
                                />
                                <Text fontWeight="bold" textAlign="center">{selectedOrder.productName}</Text>
                                <Flex justifyContent="center" mt={4}>
                                    {[0, 1, 2, 3, 4].map((index) => (
                                        <StarIcon
                                            key={index}
                                            color={index < rating ? "yellow.400" : "gray.300"}
                                            cursor="pointer"
                                            boxSize={8}
                                            onClick={() => handleStarClick(index)}
                                        />
                                    ))}
                                </Flex>
                                <Textarea
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    mt={4}
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmitRating}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
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

export default MyOrders;
