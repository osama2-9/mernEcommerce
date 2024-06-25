import { Box, Flex, Image, Text, Badge } from "@chakra-ui/react"
import USidebar from "../components/USidebar"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const MyOrders = () => {
    const [userOrders, setUserOrders] = useState([])
    const { uid } = useParams()

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

    return (
        <>
            <USidebar />
            <Box position={'absolute'} top={'100px'} left={'280px'} shadow={'md'} h={'auto'} w={'1020px'} p={4}>
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
                            </Flex>
                        </Box>
                    ))
                ) : (
                    <Text>No orders found</Text>
                )}
            </Box>
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
