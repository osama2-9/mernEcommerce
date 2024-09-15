import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
    Table, Thead, Tbody, Tr, Th, Td, TableContainer,
    Input, Button, Box, Flex, useDisclosure, Modal,
    ModalOverlay, ModalContent, ModalHeader, ModalFooter,
    ModalBody, ModalCloseButton, FormControl, FormLabel,
    Select
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import useGetCategories from '../../hooks/useGetCategories';
import { BACKEND_API } from '../../config/config';

const ShowBrands = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState({});
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {categories } = useGetCategories()

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/brand`);
                const data = await res.json();
                setBrands(data.brands);
                setFilteredBrands(data.brands);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const filtered = brands.filter(brand =>
            brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBrands(filtered);
        setCurrentPage(1);
    }, [searchTerm, brands]);

    const handleEdit = (brand) => {
        setSelectedBrand(brand);
        onOpen();
    };

    const handleDelete = async (brandId) => {
        try {
            const res = await fetch(`${BACKEND_API}/brand/delete`, {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    bid: brandId
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setBrands(brands.filter(brand => brand._id !== brandId));
                setFilteredBrands(filteredBrands.filter(brand => brand._id !== brandId));
            }
        } catch (error) {
            console.log(error);
            toast.error("Error while deleting this brand");
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`${BACKEND_API}/brand/update`, {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(selectedBrand),
                credentials:"include"
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                setBrands(brands.map(brand => brand._id === selectedBrand._id ? selectedBrand : brand));
                setFilteredBrands(filteredBrands.map(brand => brand._id === selectedBrand._id ? selectedBrand : brand));
                onClose();
            }
        } catch (error) {
            console.log(error);
            toast.error("Error while updating this brand");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedBrand({
            ...selectedBrand,
            [name]: value
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBrands = filteredBrands.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Box p={4} position={'absolute'} top={100} left={'300'} width={'1000px'}>
            <h1>Brands</h1>
            <Input
                type="text"
                placeholder="Search by brand name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
            />
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Logo</Th>
                            <Th>Name</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentBrands.map((brand) => (
                            <Tr key={brand._id}>
                                <Td>
                                    <img src={brand.brandImg} alt={brand.brandName} style={{ width: '70px', height: '70px' }} />
                                </Td>
                                <Td>{brand.brandName}</Td>
                                <Td>
                                    <Flex gap={2}>
                                        <FaEdit color='teal' size={22} onClick={() => handleEdit(brand)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                        <FaTrash color='red' size={22} onClick={() => handleDelete(brand._id)} style={{ cursor: 'pointer' }} />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box mt={4}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button key={index} onClick={() => paginate(index + 1)} disabled={currentPage === index + 1} mx={1}>
                        {index + 1}
                    </Button>
                ))}
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Brand</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Brand Name</FormLabel>
                            <Input name="brandName" value={selectedBrand.brandName || ''} onChange={handleChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Brand Image URL</FormLabel>
                            <Input name="brandImg" value={selectedBrand.brandImg || ''} onChange={handleChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Brand Category</FormLabel>
                            <Select name="brandFor" value={selectedBrand.brandFor || ''} onChange={handleChange}>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.categoryName}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ShowBrands;
