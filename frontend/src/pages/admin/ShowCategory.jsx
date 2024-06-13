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
  IconButton,
} from '@chakra-ui/react';
import { MdDelete, MdEditNote } from "react-icons/md";
import useGetCategories from '../../hooks/useGetCategories';
import { toast } from 'react-toastify';

const ShowCategory = () => {

  const deleteCategory = async (cid) => {
    try {
      const res = await fetch('/api/category/delete', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cid: cid }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { categories } = useGetCategories();

  return (
    <Box position={'absolute'} top={'80px'} left={'300px'}>
      <TableContainer w={'1100px'}>
        <Table variant="striped">
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
            {categories?.map((category, i) => (
              <Tr key={category._id}>
                <Td>{i}</Td>
                <Td>{category.categoryName}</Td>
                <Td>{category.categoryDesc}</Td>
                <Td>
                  <Flex gap={3}>
                    <IconButton
                      aria-label="Edit category"
                      icon={<MdEditNote className="text-blue-600" size={30} />}
                      variant="ghost"
                      onClick={() => {/* Handle edit action */ }}
                    />
                    <IconButton
                      aria-label="Delete category"
                      icon={<MdDelete className="text-red-500" size={30} />}
                      variant="ghost"
                      onClick={() => deleteCategory(category._id)}
                    />
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

export default ShowCategory;
