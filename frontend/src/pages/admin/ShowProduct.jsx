/* eslint-disable no-unused-vars */
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableCaption, TableContainer, Tbody, Td, Textarea, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import useGetProduct from "../../hooks/useGetProduct";
import { useState, useEffect } from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { toast } from "react-toastify";
import useGetCategories from '../../hooks/useGetCategories';

const ShowProduct = () => {
    const { products, refresh } = useGetProduct();
    const { categories } = useGetCategories();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [inputs, setInputs] = useState({});

    const deleteProducts = async (pid) => {
        try {
            const res = await fetch('/api/product/delete', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ pid })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                refresh();
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateProductData = async (pid) => {
        try {
            const res = await fetch('/api/product/update', {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({ ...inputs, pid: pid })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setInputs(product);
        onOpen();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProductData(selectedProduct._id);
    }

    const getStartIndex = () => (currentPage - 1) * productsPerPage;
    const getEndIndex = () => Math.min(currentPage * productsPerPage, products.length);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (currentPage === 0) setCurrentPage(1);

    const displayedProducts = products.slice(getStartIndex(), getEndIndex());

    return (
        <>
            <Box position="absolute" top="80px" left="300px">
                {products.length > productsPerPage && (
                    <Box mb="30px">
                        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button bg="gray.400" ml={3} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(products.length / productsPerPage)}>
                            Next
                        </Button>
                    </Box>
                )}
                <TableContainer>
                    <Table variant="striped" w="1200px">
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
                                    <Td>{product.prodcutSize.length === 0 ? '-' : product.prodcutSize.join(',')}</Td>
                                    <Td>{product.productColors.length === 0 ? '-' : product.productColors.join(', ')}</Td>
                                    <Td><img src={product.productImg} alt={product.productName} width="50" height="50" /></Td>
                                    <Td>{product.sells}</Td>
                                    <Td>
                                        <Flex gap={3}>
                                            <Box onClick={() => handleEditClick(product)} cursor="pointer">
                                                <MdEditNote className="text-blue-600" size={30} />
                                            </Box>
                                            <Box onClick={() => deleteProducts(product._id)} cursor="pointer">
                                                <MdDelete className="text-red-500" size={30} />
                                            </Box>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input value={inputs.productName || ''} name="productName" placeholder="Product name" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Product Quantity</FormLabel>
                                <Input value={inputs.productQuntity || ''} type="number" name="productQuntity" placeholder="Quantity" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4} isRequired>
                                <FormLabel>Product Price</FormLabel>
                                <Input value={inputs.productPrice || ''} name="productPrice" type="number" placeholder="Price" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Product Size</FormLabel>
                                <Input value={inputs.prodcutSize || ''} name="prodcutSize" placeholder="Put ( , ) between sizes" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Product Colors</FormLabel>
                                <Input value={inputs.productColors || ''} name="productColors" placeholder="Put ( , ) between colors" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Product Image</FormLabel>
                                <Input name="productImg" type="file" onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Category</FormLabel>
                                <Select value={inputs.categoryID || ''} name="categoryID" placeholder="Select category" onChange={handleInputChange}>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c._id}>{c.categoryName}</option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Product Description</FormLabel>
                                <Textarea value={inputs.productDesc || ''} name="productDesc" placeholder="Product description" onChange={handleInputChange} />
                            </FormControl>
                            <Button type="submit" colorScheme="blue" mr={3} mt={4}>
                                Save
                            </Button>
                            <Button onClick={onClose} mt={4}>Cancel</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShowProduct;
