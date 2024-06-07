import { Box, Flex, Spinner, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { MdDelete } from "react-icons/md"
import useGetCustomer from "../../hooks/useGetCustomer"


const Customer = () => {
    const { users, loading } = useGetCustomer()


    return (


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
                                <Td><MdDelete className="text-red-500" size={22} /></Td>



                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Customer
