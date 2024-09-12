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
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { toast } from 'react-toastify';
import { BACKEND_API } from '../config/config';

const Signup = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      const res = await fetch(`${BACKEND_API}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error)
        return;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/');

    } catch (error) {
      console.log(error);

    }
  };

  const handleInputsChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <Flex align={'center'} justify={'center'} minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>Sign up</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Create your account to get started
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={inputs.fname}
                    onChange={handleInputsChange}
                    name='fname'
                    borderColor="blue.500"
                    _hover={{ borderColor: 'blue.600' }}
                    _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
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
                    _hover={{ borderColor: 'blue.600' }}
                    _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name='email'
                value={inputs.email}
                onChange={handleInputsChange}
                borderColor="blue.500"
                _hover={{ borderColor: 'blue.600' }}
                _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                name='phone'
                value={inputs.phone}
                onChange={handleInputsChange}
                borderColor="blue.500"
                _hover={{ borderColor: 'blue.600' }}
                _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name='password'
                  value={inputs.password}
                  onChange={handleInputsChange}
                  borderColor="blue.500"
                  _hover={{ borderColor: 'blue.600' }}
                  _focus={{ borderColor: 'blue.600', boxShadow: '0 0 0 1px blue.600' }}
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlash size={24} color='gray.500' /> : <BsEye size={24} color='gray.500' />}
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
                _hover={{ bg: 'blue.500' }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to={'/login'} style={{ color: '#3182ce' }}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Signup;
