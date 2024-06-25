/* eslint-disable no-unused-vars */
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Box,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
import USidebar from '../components/USidebar.jsx';

const UserProfile = () => {
    const logged = useRecoilValue(userAtom);
    const { uid } = useParams();
    const [user, setUser] = useRecoilState(userAtom);
    const [inputs, setInputs] = useState({
        fname: logged.fname,
        lname: logged.lname,
        email: logged.email,
        phone: logged.phone
    });

    const handleInputsChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const updateUserData = async () => {
        try {
            const res = await fetch('/api/users/updateUserData', {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    fname: inputs.fname,
                    lname: inputs.lname,
                    email: inputs.email,
                    phone: inputs.phone
                })
            });

            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                toast.success("Profile Data Updated ");
            }

        } catch (error) {
            console.log(error);
            toast.error('An error occurred while updating the profile data.');
        }
    };

    return (
        <>
        <USidebar />
            <Box position={'absolute'} top={'100px'} left={'35%'} width={'500px'} >
                <Flex align={'center'} justify={'center'}>
                    <Stack
                        spacing={6}
                        w={'full'}
                        maxW={'lg'}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={8}
                        bg={useColorModeValue('white', 'gray.700')}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl' }}
                            bgClip="text"
                            bgGradient="linear(to-r, teal.500, green.500)"
                        >
                            Edit Your Profile
                        </Heading>
                        <VStack spacing={4} align="stretch">
                            <FormControl id="firstName" isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    name='fname'
                                    placeholder="First Name"
                                    value={inputs?.fname}
                                    _placeholder={{ color: 'gray.500' }}
                                    onChange={handleInputsChange}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl id="lastName" isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    name='lname'
                                    value={inputs?.lname}
                                    placeholder="Last Name"
                                    _placeholder={{ color: 'gray.500' }}
                                    onChange={handleInputsChange}
                                    type="text"
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    name='email'
                                    value={inputs?.email}
                                    placeholder="your-email@example.com"
                                    _placeholder={{ color: 'gray.500' }}
                                    onChange={handleInputsChange}
                                    type="email"
                                />
                            </FormControl>
                            <FormControl id="phone" isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    name='phone'
                                    value={inputs?.phone}
                                    placeholder="Phone Number"
                                    _placeholder={{ color: 'gray.500' }}
                                    onChange={handleInputsChange}
                                    type="tel"
                                />
                            </FormControl>
                        </VStack>
                        <Stack spacing={6} direction={['column', 'row']}>
                            <Button
                                bg={'red.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                    bg: 'red.500',
                                }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={updateUserData}
                                bg={'blue.400'}
                                color={'white'}
                                p={5}
                                w="full"
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Update Profile
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
        </>
    );
};

export default UserProfile;
