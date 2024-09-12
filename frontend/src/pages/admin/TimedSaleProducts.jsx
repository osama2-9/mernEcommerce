import { useState, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    useDisclosure,
    FormControl,
    FormLabel,
    Text,
    Flex,
    Tooltip,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { FaRegClock, FaCheckCircle, FaRegCircle, FaTrash } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BACKEND_API } from '../../config/config';

const TimedSaleProducts = () => {
    const [onSale, setOnSale] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const { isOpen, onOpen, onClose } = useDisclosure();

    // console.log(onSale);
    
    useEffect(() => {
        getOnSaleProducts();

        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleTimedSaleClick = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const getOnSaleProducts = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/on-sale`);
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                setOnSale(data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch products");
        }
    };

    const handleAddTimedSale = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/sale/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: selectedProduct?._id,
                    startTime: startDate,
                    endTime: endDate,
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                onClose();
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add timed sale");
        }
    };

    const handleActivationStatus = async (productId) => {
        try {
            const res = await fetch(`${BACKEND_API}/sale/activationStatus`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    productId
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                getOnSaleProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProductFromTimedSale = async (productId) => {
        try {
            const res = await fetch(`${BACKEND_API}/sale/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                getOnSaleProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box position={'absolute'} top={'100'} left={'250'} p={4}>
            <TableContainer>
                <Table variant="simple">
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
                        {onSale?.length > 0 &&
                            onSale?.map((product) => (
                                <Tr key={product._id}>
                                    <Td>
                                        {product.productName.length >= 18
                                            ? product.productName.slice(0, 18).concat('...')
                                            : product.productName}
                                    </Td>
                                    <Td>{product.productQuntity}</Td>
                                    <Td>${product.productPrice}</Td>
                                    <Td>
                                        {product.prodcutSize.length === 0
                                            ? '-'
                                            : product.prodcutSize.join(',')}
                                    </Td>
                                    <Td>
                                        {product.productColors.length === 0
                                            ? '-'
                                            : product.productColors.join(', ')}
                                    </Td>
                                    <Td>
                                        <img src={product.productImg} alt={product.productName} width={50} />
                                    </Td>
                                    <Td>{product.sells}</Td>
                                    <Td>
                                        <Tooltip
                                            label="Set Timed Sale"
                                            aria-label="Timed Sale Tooltip"
                                            placement="top"
                                        >
                                            <Button
                                                onClick={() => handleTimedSaleClick(product)}
                                                textAlign={'center'}
                                                colorScheme="teal"
                                                variant="outline"
                                            >
                                                <FaRegClock />
                                            </Button>
                                        </Tooltip>

                                        <Tooltip
                                            label={product?.saleDetails?.isActive ? "Hide in home page" : "Show in home page"}
                                            aria-label="Activation Status Tooltip"
                                            placement="top"
                                        >
                                            <Button
                                                ml={2}
                                                onClick={() => handleActivationStatus(product._id)}
                                                textAlign={'center'}
                                                colorScheme={product?.saleDetails?.isActive ? "green" : "pink"}
                                                variant="outline"
                                            >
                                                {product?.saleDetails?.isActive ? <FaCheckCircle /> : <FaRegCircle />}
                                            </Button>
                                        </Tooltip>

                                        <Tooltip
                                            label="Delete from flash sale"
                                            aria-label="Delete Tooltip"
                                            placement="top"
                                        >
                                            <Button
                                                ml={2}
                                                onClick={() => handleDeleteProductFromTimedSale(product._id)}
                                                textAlign={'center'}
                                                bg={'red.500'}
                                                color={'white'}
                                                variant="outline"
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Tooltip>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Timed Sale Setup</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Product Name</FormLabel>
                            <Input value={selectedProduct?.productName || ''} isReadOnly />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Product Image</FormLabel>
                            <img src={selectedProduct?.productImg} alt={selectedProduct?.productName} width={100} />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Start Date</FormLabel>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="chakra-input"
                                wrapperClassName="chakra-date-picker-wrapper"
                                calendarClassName="chakra-calendar"
                                popperPlacement="bottom"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>End Date</FormLabel>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                className="chakra-input"
                                wrapperClassName="chakra-date-picker-wrapper"
                                calendarClassName="chakra-calendar"
                                popperPlacement="bottom"
                            />
                        </FormControl>
                        <Flex justifyContent="space-between" alignItems="center" mb={4}>
                            <Text fontWeight="bold">Current Date and Time:</Text>
                            <Text>{currentDateTime}</Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddTimedSale}>
                            Add
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default TimedSaleProducts;
