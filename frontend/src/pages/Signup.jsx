/* eslint-disable no-unused-vars */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,


} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom';
const Signup = () => {
  const Nav = useNavigate()
  const setUser = useSetRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: ""

  })

  const handleSignup = async () => {
    try {
      const res = await fetch('/api/users/signup', {
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
          autoClose: true,

        })
        return;
      }
      setUser(data)
      localStorage.setItem("user", JSON.stringify(data))
      Nav('/')
    } catch (error) {
      toast(error.message, {
        type: "error",
        autoClose: true
      })

    }

  }


  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Flex

      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>

        </Stack>
        <Box
          rounded={'lg'}

          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text"
                    value={inputs.fname}
                    onChange={handleInputsChange}
                    name='fname'
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
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    value={inputs.lname}
                    onChange={handleInputsChange}
                    name='lname'
                    type="text"
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
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"
                name='email'
                value={inputs.email}
                onChange={handleInputsChange}
                borderColor="blue.500"
                _hover={{
                  borderColor: 'blue.500',
                }}
                _focus={{
                  borderColor: 'blue.600',
                  boxShadow: '0 0 0 1px blue.600',
                }} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>phone number</FormLabel>
              <Input type="email"
                name='phone'
                value={inputs.phone}
                onChange={handleInputsChange}
                borderColor="blue.500"
                _hover={{
                  borderColor: 'blue.500',
                }}
                _focus={{
                  borderColor: 'blue.600',
                  boxShadow: '0 0 0 1px blue.600',
                }} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name='password'
                  value={inputs.password}
                  onChange={handleInputsChange}
                  borderColor="blue.500"
                  _hover={{
                    borderColor: 'blue.500',
                  }}
                  _focus={{
                    borderColor: 'blue.600',
                    boxShadow: '0 0 0 1px blue.600',
                  }}
                  type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <BsEyeSlash size={30} color='black' /> : <BsEye color='black' />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',

                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to={'/login'} className='text-blue-400'>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}


export default Signup
