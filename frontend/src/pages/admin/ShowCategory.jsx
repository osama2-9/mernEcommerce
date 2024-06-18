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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import { MdDelete, MdEditNote } from "react-icons/md";
import useGetCategories from '../../hooks/useGetCategories';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ShowCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');

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

  const updateCategory = async () => {
    try {
      const res = await fetch('/api/category/update', {
        method: "PUT",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify({
          cid: selectedCategory,
          categoryName,
          categoryDesc
        })
      })
      const data = await res.json();
      if (data.error) {
        toast.error(data.error)
      } else {
        setSelectedCategory(null)
        toast.success(data.message)
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onClickUpdate = (category) => {
    setSelectedCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDesc(category.categoryDesc);
    onOpen();
  }

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
                <Td fontWeight={'bold'}>{category.categoryName}</Td>
                <Td>{category.categoryDesc}</Td>
                <Td>
                  <Flex gap={3}>
                    <IconButton
                      aria-label="Edit category"
                      icon={<MdEditNote className="text-blue-600" size={30} />}
                      variant="ghost"
                      onClick={() => onClickUpdate(category)}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Category Name</FormLabel>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category Description</FormLabel>
              <Input
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updateCategory}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShowCategory;
