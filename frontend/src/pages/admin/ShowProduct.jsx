/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useGetProduct from "../../hooks/useGetProduct";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const ShowProduct = () => {
    const { products } = useGetProduct();

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(6);
    
    const getstartIndex = () => {
        return (currentPage - 1) * productsPerPage;
    };
    
    const getendIndex = () => {
        return Math.min(currentPage * productsPerPage, products.length);
    };
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    if(currentPage === 0){
        setCurrentPage(1)
    }
    const displayedProducts = products.slice(getstartIndex(), getendIndex());

    return (
        <Box position="absolute" top="80px" left="300px">
            {
                products.length > productsPerPage && (
                    <Box  mb={'30px'}>
                        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button bg={'gray.400'} ml={3} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(products.length / productsPerPage)}>
                            Next
                        </Button>
                    </Box>
                )
            }
            
            <TableContainer>
                <Table variant="striped" w={'1200px'}>
                    <TableCaption>Product Inventory (Page {currentPage})</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Product Name</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            <Th>Size</Th>
                            <Th>Colors</Th>
                            <Th>Image</Th>
                            <Th>Sells</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedProducts.map((product, index) => (
                            <Tr key={index}>
                                <Td>{product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}</Td>
                                <Td>{product.productQuntity}</Td>
                                <Td>{product.productPrice}</Td>
                                <Td>{product.prodcutSize.length === 0 ? <>-</> : (<>{product.prodcutSize.join(',')}</>)}</Td>
                                <Td>{product.productColors.length === 0 ? <>-</> : (<>{product.productColors.join(", ")}</>)}</Td>
                                <Td>
                                    <img src={product.productImg} alt={product.productName} width="50" height="50" />
                                </Td>
                                <Td>{product.sells}</Td>
                                <Td>
                                    <Flex className="" gap={3}>
                                        <Box>
                                            <MdEditNote className="text-blue-600" size={30}/>
                                        </Box>
                                        <Box>
                                            <MdDelete className="text-red-500" size={30}/>
                                        </Box>

                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

           
        </Box>
    );
};

export default ShowProduct;
