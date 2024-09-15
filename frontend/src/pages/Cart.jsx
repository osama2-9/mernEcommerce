import { Box, Button, Flex, Image, Select, Stack, Text, Radio, RadioGroup, Link } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { BACKEND_API } from '../config/config';

const Cart = () => {
    const logged = useRecoilValue(userAtom);
    console.log(logged);
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const { uid } = useParams();

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/cart/cart/${uid}`, {
                    credentials:"include"
                });
                const data = await res.json();

                if (data.error) {
                    toast.error(data.error);
                }

                if (Array.isArray(data)) {
                    setCartItems(data);
                } else {
                    setCartItems([]); 
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch cart items');
            }
        };

        getCartItems();
    }, [uid]);


    const subtotal = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const shipping = 5;
    const totalPrice = subtotal + shipping;

    const handleCheckout = async () => {


        try {
            const res = await fetch(`${BACKEND_API}/order/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uid: logged.uid, paymentMethod: paymentMethod }),
                credentials:"include"
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

    const removeProduct = async (pid, iid) => {
        try {
            if (!iid) {
                toast.error("Product Not Found");
            }
            const res = await fetch('${BACKEND_API}/cart/cart/delete', {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    pid: pid,
                    uid: logged.uid,
                }),
                credentials:"include"
            });
            
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setCartItems(cartItems.filter(item => item._id !== iid));
            }
        } catch (error) {
            console.log(error);
        }
    };
    



    return (
        <Box  p={5}>
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
                        <Button onClick={() => removeProduct(item?.pid, item?._id)} variant="link" colorScheme="purple">Delete</Button>
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
                    <Text fontSize="sm" color="gray.500" mt={2}>You will pay when you receive your order.</Text>
                </Box>
                {!logged.address && (
                    <Box mt={5} color="red.500">
                        <Text mb={2}>Please add a delivery location before proceeding to checkout.</Text>
                        <Link as={RouterLink} to="/address" color="blue.500">Add Delivery Location</Link>
                    </Box>
                )}
                <Button onClick={handleCheckout} bg={'black'} size="lg" mt={5} color={'white'} width="100%">Checkout</Button>
            </Box>
        </Box>
    );
};

export default Cart;
