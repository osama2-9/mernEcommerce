import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    InputRightElement,
    InputGroup,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { BACKEND_API } from '../config/config';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userAtom);

    const handleInputsChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/login`, {
                method: "POST",
                credentials: "include", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error, { autoClose: 3000 });
                return;
            }

            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            navigate(data.isAdmin ? `/admin/${data._id}` : "/");

        } catch (error) {
            toast.error(error.message, { autoClose: 3000 });
        }
    };


    return (
        <Flex align={'center'} justify={'center'} minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Welcome back! Please enter your details.
                    </Text>
                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={inputs.email}
                                onChange={handleInputsChange}
                                name='email'
                                type="email"
                                placeholder="you@example.com"
                                border="2px"
                                borderColor="blue.500"
                                _hover={{ borderColor: 'blue.600' }}
                                _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={inputs.password}
                                    onChange={handleInputsChange}
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    border="2px"
                                    borderColor="blue.500"
                                    _hover={{ borderColor: 'blue.600' }}
                                    _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
                                />
                                <InputRightElement h={'full'}>
                                    <Button variant={'ghost'} onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <BsEyeSlash color='gray.500' /> : <BsEye color='gray.500' />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                <Link to={'/register'} style={{ color: '#3182ce', fontWeight: 'bold' }}>Signup?</Link>
                                <Link to={'/forget-password'} style={{ color: '#3182ce', fontWeight: 'bold' }}>Forget Password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login;
