import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useGetCustomer from "../../hooks/useGetCustomer";
import { toast } from "react-toastify";
import { useState } from "react";

const Customer = () => {
    const { users, loading, refresh } = useGetCustomer();  // Assume refresh function to reload the data
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const deleteUser = async () => {
        setDeleting(true);
        try {
            const res = await fetch('/api/users/deleteByAdmin', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    uid: selectedUser
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                onClose();
                toast.success(data.message);
                refresh();  // Refresh the user list after deletion
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the user.");
        } finally {
            setDeleting(false);
        }
    };

    const onClickDeleteBtn = (uid) => {
        setSelectedUser(uid);
        onOpen();
    };

    const filteredUsers = users.filter(user =>
        `${user.fname} ${user.lname}`.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <>
            <Box position={'absolute'} top={'80px'} left={'300px'} p={4} width={'80%'} maxW={'1200px'} mx={'auto'}>
                {loading ? (
                    <Flex justifyContent={'center'}>
                        <Spinner />
                    </Flex>
                ) : (
                    <>
                        <Box mb={4}>
                            <Input
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                width="300px"
                            />
                        </Box>
                        <TableContainer>
                            <Table variant="striped">
                                <TableCaption>Customer Data</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>#</Th>
                                        <Th>Full Name</Th>
                                        <Th>Email</Th>
                                        <Th>Phone</Th>
                                        <Th>Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentUsers.map((user, i) => (
                                        <Tr  key={user._id}>
                                            
                                            <Td>{indexOfFirstUser + i + 1}</Td>
                                            <Td>{user.fname + " " + user.lname}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.phone}</Td>
                                            <Td>
                                                <Button
                                                    bg={'red.500'}
                                                    onClick={() => onClickDeleteBtn(user._id)}
                                                    isLoading={deleting && selectedUser === user._id}
                                                    loadingText="Deleting"
                                                >
                                                    <MdDelete className="text-white" size={22} />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Flex justifyContent="space-between" alignItems="center" mt={4}>
                            <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Text>
                                Page {currentPage} of {totalPages}
                            </Text>
                            <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
                                Next
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Confirmation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to <span style={{ color: 'red', fontWeight: 'bold' }}>delete</span> this account and all its pending orders? This action cannot be undone.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={deleteUser} colorScheme="red" color={'white'} isLoading={deleting}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Customer;
