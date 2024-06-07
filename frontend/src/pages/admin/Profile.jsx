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
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
    const { uid } = useParams();
    const [userData, setUserData] = useState();

    const getUserById = useCallback(async () => {
        try {
            const res = await fetch(`/api/users/user/${uid}`);
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setUserData(data);
                console.log(data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [uid]);

    useEffect(() => {
        getUserById();
    }, [getUserById]);

    return (
        <>
            <Box position={'absolute'} top={'80px'} left={'600px'}>
                <Flex
                    w={'600px'}
                    align={'center'}
                    justify={'center'}
                >
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        my={12}>
                        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            User Profile Edit
                        </Heading>
                        <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="First Name"
                                value={userData?.fname}
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                        </FormControl>
                        <FormControl id="lastName" isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                value={userData?.lname}
                                placeholder="Last Name"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                value={userData?.email}
                                placeholder="your-email@example.com"
                                _placeholder={{ color: 'gray.500' }}
                                type="email"
                            />
                        </FormControl>
                        <FormControl id="phone" isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                                value={userData?.phone}
                                placeholder="Phone Number"
                                _placeholder={{ color: 'gray.500' }}
                                type="tel"
                            />
                        </FormControl>
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
                                bg={'blue.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
        </>
    );
};

export default Profile;
