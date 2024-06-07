import { Badge, Box, Flex, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useGetOrders from "../hooks/useGetOrders";
import useGetTopSells from "../hooks/useGetTopSells";

const PeroductsReport = () => {
  const { lastThreeOrders } = useGetOrders();
  const { topSell } = useGetTopSells()


  return (
    <div>
      <Flex position={'absolute'} top={'500px'} left={'320px'}>
        <Box mb={2} position={'relative'} right={'25px'}>
          <Badge bg={'purple.400'} color={'white'} fontSize={'18'} p={1} ml={2} mb={2} >Last Orders</Badge>

          <TableContainer className="shadow-md" w={'800px'}>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Img</Th>
                  <Th>User Email</Th>
                  <Th>Product Name</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                  <Th>Ordered At</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lastThreeOrders.map((product, i) => (
                  <Tr key={i}>
                    <Td><Image src={product.prodcutImg} w={7} /></Td>
                    <Td>{product.email}</Td>
                    <Td>{product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}</Td>
                    <Td>{product.quantity}</Td>
                    <Td>{product.price}$</Td>
                    <Td>{new Date(product.createdAt).toLocaleDateString()}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box mb={2} className="shadow-md">
          <Badge bg={'teal.500'} color={'white'} fontSize={'18'} p={1} ml={2} mb={2} >Top Sell</Badge>
          <TableContainer>
            <Table w={'380px'}>
              <Thead>
                <Tr>
                  <Th>Img</Th>
                  <Th>Product Name</Th>
                  <Th>Sells</Th>
                </Tr>
              </Thead>
              <Tbody>
                {topSell.slice(0, 3).map((product, i) => (
                  <Tr key={i}>
                    <Td><Image w={30} src={product.productImg} /></Td>
                    <Td>{product.productName.length >= 18 ? product.productName.slice(0, 18).concat('...') : product.productName}</Td>

                    <Td>{product.sells}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </div>
  );
};

export default PeroductsReport;
