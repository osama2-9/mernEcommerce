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
} from '@chakra-ui/react';
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
const Login = () => {
    const [password, setShowPassword] = useState(true)

    const showPassword = () => {
        setShowPassword(!password)
    }
    const Nav = useNavigate()
    const setUser = useSetRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""

    })

    const handleInputsChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })

    }

    const handleLogin = async () => {
        try {
            const res = await fetch('/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json();

            if (data.error) {
                toast(data.error, {
                    type: "error",
                    autoClose: true
                })
                return
            }
            setUser(data)
            localStorage.setItem('user', JSON.stringify(data))
            if (data.isAdmin) {
                Nav(`/admin/${data._id}`)
            } else {
                Nav("/")

            }

        } catch (error) {
            toast(error.message, {
                type: "error",
                autoClose: true

            })

        }
    }


    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                value={inputs.email}
                                onChange={handleInputsChange}
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
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={inputs.password}
                                    onChange={handleInputsChange}
                                    name='password'
                                    type={password ? "password" : "text"}
                                    border="2px"
                                    borderColor="blue.500"
                                    _hover={{
                                        borderColor: 'blue.500',
                                    }}
                                    _focus={{
                                        borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600',
                                    }}


                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={showPassword}

                                    >
                                        {password ? <BsEye color='black' /> : <BsEyeSlash color='black' />}
                                    </Button>

                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Link className='text-blue-400' to={'/register'}> Signup ?</Link>
                                <Link className='text-blue-400' to={'/forget-password'}>Forget Password ? </Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
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
