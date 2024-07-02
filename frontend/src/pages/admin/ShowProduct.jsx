import {
    Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalHeader,
    ModalOverlay, Select, Table, TableCaption, TableContainer, Tbody, Td,
    Textarea, Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import useGetProduct from "../../hooks/useGetProduct";
import { useState, useEffect } from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { toast } from "react-toastify";
import useGetCategories from '../../hooks/useGetCategories';
import useImgPreview from "../../hooks/useImgPreview";

const ShowProduct = () => {
    const { img, handleImgChange } = useImgPreview()
    const { products, refresh } = useGetProduct();
    const { categories } = useGetCategories();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [inputs, setInputs] = useState({
        productName: '',
        productQuntity: '',
        productPrice: '',
        prodcutSize: '',
        productColors: '',
        productDesc: '',
        categoryID: '',
        productImg: ''
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedImg, setSelectedImg] = useState(null);
    const { isOpen: isImgModalOpen, onOpen: onImgModalOpen, onClose: onImgModalClose } = useDisclosure();

    useEffect(() => {
        setInputs({
            pid: selectedProduct._id,
            productName: selectedProduct.productName,
            productQuntity: selectedProduct.productQuntity,
            productPrice: selectedProduct.productPrice,
            prodcutSize: selectedProduct.prodcutSize ? selectedProduct.prodcutSize.join(',') : '',
            productColors: selectedProduct.productColors ? selectedProduct.productColors.join(',') : '',
            productDesc: selectedProduct.productDesc,
            categoryID: selectedProduct.categoryID,
            productImg: selectedProduct.productImg
        });
    }, [selectedProduct]);

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

    const updateProductData = async () => {
        try {
            const res = await fetch('/api/product/update', {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    pid: selectedProduct._id,
                    productName: inputs.productName,
                    productQuntity: inputs.productQuntity,
                    productPrice: inputs.productPrice,
                    prodcutSize: inputs.prodcutSize.split(',').map(size => size.trim()),
                    productColors: inputs.productColors.split(',').map(color => color.trim()),
                    productDesc: inputs.productDesc,
                    categoryID: inputs.categoryID,
                    productImg: img
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                refresh();
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
        onOpen();
    }

    const handleImgClick = (imgSrc) => {
        setSelectedImg(imgSrc);
        onImgModalOpen();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProductData();
    }

    const getStartIndex = () => (currentPage - 1) * productsPerPage;
    const getEndIndex = () => Math.min(currentPage * productsPerPage, products.length);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (currentPage === 0) setCurrentPage(1);

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedProducts = filteredProducts.slice(getStartIndex(), getEndIndex());

    return (
        <>
            <Box position="absolute" top="80px" left="300px">
                <Flex mb={4}>
                    <Input
                        type="text"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        border={'2px solid teal'}
                        mr={3}
                    />
                    {filteredProducts.length > productsPerPage && (
                        <>
                            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button bg="gray.400" ml={3} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>
                                Next
                            </Button>
                        </>
                    )}
                </Flex>
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
                                    <Td>
                                        <Image className="transition-all" _hover={{
                                            border: "1px solid gray",
                                            borderRadius: "5px"

                                        }} src={product.productImg} alt={product.productName} width="50" height="50" cursor="pointer" onClick={() => handleImgClick(product.productImg)} />
                                    </Td>
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

            {/* Edit Product Modal */}
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
                                <Input name="productImg" type="file" onChange={handleImgChange} />
                                <Flex flexDirection={'column'}>
                                    <Image src={inputs.productImg} w={'50px'} />
                                </Flex>
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

            {/* Image Modal */}
            <Modal isOpen={isImgModalOpen} onClose={onImgModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Image src={selectedImg} alt="Product Image" width="100%" />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ShowProduct;
