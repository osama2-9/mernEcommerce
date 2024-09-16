import { useState } from "react";
import useGetProduct from "../../hooks/useGetProduct";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    Select,
    Input,
    Text,
    Stack
} from "@chakra-ui/react";
import { TbPencilDollar } from "react-icons/tb";
import { toast } from "react-toastify";
import { TbHomeDollar } from "react-icons/tb";
import { BACKEND_API } from "../../config/config";
import Sidebar from "../../components/Sidebar";

const Sales = () => {
    const { products } = useGetProduct();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedDiscount, setSelectedDiscount] = useState(0);
    const [customDiscount, setCustomDiscount] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const [searchTerm, setSearchTerm] = useState("");

    const handleDiscountChange = (e) => {
        setSelectedDiscount(parseFloat(e.target.value));
        setCustomDiscount('');
    };

    const handleCustomDiscountChange = (e) => {
        setCustomDiscount(parseFloat(e.target.value));
        setSelectedDiscount(0);
    };

    const calculateFinalPrice = (price) => {
        const discount = customDiscount ? customDiscount : selectedDiscount;
        if (!discount) return price;
        return price - (price * (discount / 100));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const getStartIndex = () => {
        return (currentPage - 1) * productsPerPage;
    };

    const getEndIndex = () => {
        return Math.min(currentPage * productsPerPage, products.length);
    };


    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedProducts = filteredProducts.slice(getStartIndex(), getEndIndex());

    const createSale = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/createSale`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    pid: selectedProduct._id,
                    discount: customDiscount !== 0 ? customDiscount : selectedDiscount
                }),
                credentials: "include"
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
    };
    const removeSale = async (pid) => {
        try {
            const res = await fetch(`${BACKEND_API}/product/removeSale`, {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    pid: pid
                }),
                credentials: "include"
            })

            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.message);

            }

        } catch (error) {
            console.log(error);

        }

    }
    return (
        <>
    <Sidebar />
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
                            <Button bg={'gray.400'} ml={3} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>
                                Next
                            </Button>
                        </>
                    )}
                </Flex>

                <TableContainer>
                    <Table variant="striped" w={'1200px'}>
                        <TableCaption>Product Inventory (Page {currentPage})</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Image</Th>
                                <Th>Product Name</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Size</Th>
                                <Th>Colors</Th>
                                <Th>Sells</Th>
                                <Th>Discount %</Th>
                                <Th>Add Sale</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {displayedProducts.map((product, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <img src={product.productImg} alt={product.productName} width="50" height="50" />
                                    </Td>
                                    <Td>{product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}</Td>
                                    <Td>{product.productQuntity}</Td>
                                    <Td>${product.productPrice.toFixed(2)}</Td>
                                    <Td>{product.prodcutSize.length === 0 ? <>-</> : (<>{product.prodcutSize.join(',')}</>)}</Td>
                                    <Td>{product.productColors.length === 0 ? <>-</> : (<>{product.productColors.join(", ")}</>)}</Td>
                                    <Td>{product.sells}</Td>
                                    <Td>{product.sale > 0 ? product.sale : 0}%</Td>
                                    <Td>
                                        <Flex gap={3}>
                                            <Box>
                                                <Button onClick={() => handleOpenModal(product)} bg={'blue.500'} color={'white'}>
                                                    <TbPencilDollar size={20} />
                                                </Button>
                                                <Button ml={2} onClick={() => removeSale(product._id)} bg={'red.500'} color={'white'}>
                                                    <TbHomeDollar size={20} />
                                                </Button>
                                            </Box>
                                        </Flex>
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
                    <ModalHeader>Create Discount</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>
                            <Box>
                                {selectedProduct && (
                                    <>
                                        <Text fontWeight="bold">Original Price: ${selectedProduct.productPrice.toFixed(2)}</Text>
                                    </>
                                )}
                            </Box>
                            <Box>
                                <Text>Select Discount:</Text>
                                <Select placeholder="Select discount" value={selectedDiscount} onChange={handleDiscountChange}>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="15">15%</option>
                                    <option value="20">20%</option>
                                    <option value="25">25%</option>
                                    <option value="30">30%</option>
                                    <option value="35">35%</option>
                                    <option value="40">40%</option>
                                    <option value="45">45%</option>
                                    <option value="50">50%</option>
                                </Select>
                            </Box>
                            <Box>
                                <Text>Or enter custom discount:</Text>
                                <Input
                                    type="number"
                                    placeholder="Custom discount"
                                    value={customDiscount}
                                    onChange={handleCustomDiscountChange}
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                            </Box>
                            <Box>
                                {selectedProduct && (
                                    <>
                                        <Text fontWeight="bold">Price After Discount: ${calculateFinalPrice(selectedProduct.productPrice).toFixed(2)}</Text>
                                    </>
                                )}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={createSale} bg={'green.500'} color={'white'} mr={3}>
                            Save
                        </Button>
                        <Button bg={'red.500'} color={'white'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Sales;
