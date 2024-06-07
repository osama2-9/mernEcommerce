import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
} from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import useGetCategories from '../../hooks/useGetCategories';


const ShowCategory = () => {

  const { categories } = useGetCategories()

  return (
    <Box position={'absolute'} top={'80px'} left={'300px'}>

      <TableContainer w={'1100px'}>
        <Table variant="striped" >
          <TableCaption>Store Categories</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category, i) => (
              <Tr key={category._id}>
                <Td>{i}</Td>
                <Td>{category.categoryName}</Td>
                <Td>{category.categoryDesc}</Td>
                <Td> <Flex gap={3}>
                  <Box>
                    <MdEditNote className="text-blue-600" size={30} />
                  </Box>
                  <Box>
                    <MdDelete className="text-red-500" size={30} />
                  </Box>

                </Flex></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ShowCategory;
