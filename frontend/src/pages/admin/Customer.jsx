import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import useGetCustomer from "../../hooks/useGetCustomer"
import { toast } from "react-toastify"
import { useState } from "react"


const Customer = () => {
    const { users, loading } = useGetCustomer()
    const { isOpen, onOpen, onClose } = useDisclosure()
   
    const [slectedUser, setSelectedUser] = useState([])



    const deleteUser = async () => {
        try {
            const res = await fetch('/api/users/deleteByAdmin', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    uid: slectedUser
                })
            })
            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
            } else {
                onClose()
                toast.success(data.message)
            }

        } catch (error) {
            console.log(error);

        }

    }

    const onClickDeleteBtn = (uid) => {
        setSelectedUser(uid)
        onOpen()



    }



    return (

        <>

            <Box position={'absolute'} top={'80px'} left={'300px'}>

                {loading && (
                    <Flex justifyContent={'center'}>
                        <Spinner />

                    </Flex>
                )}

                <TableContainer w={'1100px'}>
                    <Table variant="striped" >
                        <TableCaption>Customer Data</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Full Name</Th>
                                <Th>Email</Th>
                                <Th>phone</Th>
                                <Th>order number</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {users.map((user, i) => (

                                <Tr key={i}>
                                    <Td>{i}</Td>
                                    <Td>{user.fname + " " + user.lname}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.phone}</Td>
                                    <Td>2</Td>
                                    <Td>
                                        <Button bg={'red.500'} onClick={() => onClickDeleteBtn(user._id)}>
                                            <MdDelete className="text-white" size={22} />

                                        </Button>
                                    </Td>



                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Text >You will <span className="text-red-500 text-lg">delete</span> this account and all its pending orders . Are you sure?</Text>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={deleteUser} colorScheme="red" color={'white'}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Customer
