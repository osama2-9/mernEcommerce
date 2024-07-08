import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Button, Box, Flex } from '@chakra-ui/react';
import { toast } from 'react-toastify';

const ShowBrands = () => {
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch('/api/brand');
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

    const handleEdit = (brandId) => {

        console.log(`Edit brand with ID: ${brandId}`);
    };

    const handleDelete = async (brandId) => {

        try {
            const res = await fetch('/api/brand/delete', {
                method: "DELETE",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify({
                    bid: brandId
                })
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.message)
            }



        } catch (error) {
            console.log(error);
            toast.error("Error While Delete This brand")

        }
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

                                        <FaEdit color='teal' size={22} onClick={() => handleEdit(brand._id)} style={{ cursor: 'pointer', marginRight: '10px' }} />
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
        </Box>
    );
};

export default ShowBrands;
