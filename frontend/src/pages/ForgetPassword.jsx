import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../config/config";

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleSendEmail = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/forget-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} w={'500px'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Reset Your Password</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                type="email"
                                border="2px"
                                borderColor="blue.500"
                                _hover={{
                                    borderColor: 'blue.500',
                                }}
                                _focus={{
                                    borderColor: 'blue.600',
                                    boxShadow: '0 0 0 1px blue.600',
                                }}

                            />
                        </FormControl>

                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Link className='text-blue-400' to={'/register'}>Signup?</Link>
                            </Stack>
                            <Button
                                onClick={handleSendEmail}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                            >
                                Send Code

                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default ForgetPassword;
