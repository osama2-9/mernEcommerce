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
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../../atoms/userAtom';
import { BACKEND_API } from '../../config/config';

const Profile = () => {
    const logged = useRecoilValue(userAtom)
    const { uid } = useParams();
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        fname: logged.fname,
        lname: logged.lname,
        email: logged.email,
        phone: logged.phone
    })
    const handleInputsChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const updateUserData = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/users/updateUserData`, {
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

                }),
                credentials:"include"
            })

            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {
                localStorage.setItem('user', JSON.stringify(data))
                setUser(data)
                toast.success("Profile Data Updated ")
            }

        } catch (error) {
            console.log(error);

        }
    }







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
