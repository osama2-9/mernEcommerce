import { Box, Button, Flex, Image, Select, Stack, Text, Radio, RadioGroup } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Cart = () => {
    const logged = useRecoilValue(userAtom)
    const [cartItems, setCartItems] = useState([])
    const [paymentMethod, setPaymentMethod] = useState('');
    const { uid } = useParams()

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await fetch(`/api/cart/cart/${uid}`);
                const data = await res.json()
                if (data.error) {
                    toast.error(data.error)
                }
                setCartItems(data);
            } catch (error) {
                console.log(error);
            }
        }

        getCartItems()
    }, [uid])

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = 5;
    const totalPrice = subtotal + shipping;

    const handleCheckout = async () => {
        try {
            const res = await fetch('/api/order/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uid: logged.uid, paymentMethod: paymentMethod })
            });

            const data = await res.json();
            if (data.error) {
                toast(data.error, {
                    type: 'error',
                    autoClose: true,
                });
            } else {
                toast('Order placed successfully!', {
                    type: 'success',
                    autoClose: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast('An error occurred while placing the order.', {
                type: 'error',
                autoClose: true,
            });
        }
    };

    return (
        <Box p={5}>
            <Text fontSize="2xl" mb={5}>Shopping Cart ({cartItems.length}) ({logged.email})</Text>
            <Stack spacing={5}>
                {cartItems.map(item => (
                    <Flex key={item._id} align="center" justify="space-between">
                        <Flex align="center">
                            <Image boxSize="100px" src={item.prodcutImg} alt={item.name} />
                            <Box w={'250px'} ml={3}>
                                <Text fontSize="lg">{item.productName}</Text>
                                <Text color="gray.500">{item.color},{item.size}</Text>
                            </Box>
                        </Flex>
                        <Select width="70px" defaultValue={item.quantity}>
                            {[...Array(10).keys()].map(num => (
                                <option key={num} value={num + 1}>{num + 1}</option>
                            ))}
                        </Select>
                        <Text fontSize="lg">${item.price * item.quantity}</Text>
                        <Button variant="link" colorScheme="purple">Delete</Button>
                    </Flex>
                ))}
            </Stack>
            <Box mt={5}>
                <Text fontSize="xl" mb={2}>Order Summary</Text>
                <Flex justify="space-between">
                    <Text>Subtotal</Text>
                    <Text>${subtotal}</Text>
                </Flex>
                <Flex justify="space-between">
                    <Text>Shipping + Tax</Text>
                    <Text>${cartItems.length === 0 ? 0 : 5}</Text>
                </Flex>
                <Flex justify="space-between" fontSize="xl" fontWeight="bold" mt={2}>
                    <Text>Total</Text>
                    <Text>${cartItems.length === 0 ? 0 : totalPrice}</Text>
                </Flex>
                <Box className="shadow-md rounded-md p-4" mt={5}>
                    <Text fontSize="lg" mb={3}>Select Payment Method</Text>
                    <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                        <Stack direction="row" spacing={5}>
                            <Radio value="Visa">Visa</Radio>
                            <Radio value="Cash">Cash</Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
                <Button onClick={handleCheckout} colorScheme="purple" size="lg" mt={5} width="100%">Checkout</Button>
            </Box>
        </Box>
    )
}

export default Cart
