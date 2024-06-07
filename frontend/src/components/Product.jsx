/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    Badge,
    Box,
    Button,
    Center,
    Checkbox,
    CheckboxGroup,
    Flex,
    HStack,
    Heading,
    Image,
    Link,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BsFolder } from 'react-icons/bs';


import userAtom from '../atoms/userAtom';

const Product = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const logged = useRecoilValue(userAtom);

    const { pid } = useParams();
    useEffect(() => {
        const getProductById = async () => {
            try {
                const res = await fetch(`/api/product/target/${pid}`);
                const data = await res.json();
                const productData = data.data[0]
                const categoryName = data.data[1]

                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true,
                    });
                }
                setSelectedProduct(productData);
                setCategory(categoryName)
            } catch (error) {
                console.log(error);
            }
        };
        getProductById();
    }, [pid]);

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    const handleColorChange = (value) => {
        setColor(value);
    };

    const handleSizeChange = (value) => {
        setSize(value);
    };

    const handleAddToCart = async () => {
        try {
            const res = await fetch(`/api/cart/cart/${selectedProduct?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    quantity: quantity,
                    color: color,
                    size: size
                })
            });
            const data = await res.json();
            if (data.error) {
                toast(data.error, {
                    type: "error",
                    autoClose: true,
                });
            } else {
                toast("Order placed successfully!", {
                    type: "success",
                    autoClose: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast("An error occurred while placing the order.", {
                type: "error",
                autoClose: true,
            });
        }
    };

    return (
        <>
            {selectedProduct && (
                <Center py={6}>
                    <Stack
                        borderWidth="1px"
                        borderRadius="lg"
                        w={{ sm: '100%', md: '840px', lg: "1000px" }}
                        height={{ sm: '950px', md: '50rem', lg: "600px" }}
                        direction={{ md: 'row', lg: "row", sm: "column" }}
                        boxShadow={'2xl'}
                        padding={4}
                    >
                        <Flex flex={1}>

                            <Image
                                width={400}
                                height={{ sm: "400" }}
                                src={selectedProduct.productImg}
                            />
                        </Flex>
                        <Stack
                            flex={1}
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            p={1}
                            pt={2}
                        >
                            <Flex flexDirection={'row'} gap={2} color={'gray.500'} justifyContent={'center'}>
                                <BsFolder className='mt-1' size={22}/>
                                <Text fontWeight={'bold'} fontSize={'20'}> {category.categoryName}</Text>
                            </Flex>
                            <Heading fontSize={'2xl'} fontFamily={'body'}>
                                {selectedProduct.productName}
                            </Heading>
                            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                {selectedProduct.productDesc}
                            </Text>
                            <Text fontSize={'xl'} fontWeight={700} color={'gray.800'}>
                                ${selectedProduct.productPrice}
                            </Text>
                            <Badge textAlign={'center'}></Badge>
                            <Flex flexDir={'column'}>
                                {selectedProduct.prodcutSize?.length > 0 && (
                                    <Flex key={1} gap={3} justifyContent={'start'}>
                                        <Text textAlign={'center'} fontWeight={'bold'} color={'gray.500'} px={3}>Sizes</Text>
                                        <RadioGroup onChange={handleSizeChange}>
                                            {selectedProduct.prodcutSize?.map((product, i) => (
                                                <Radio ml={2} key={i} value={product}>{product}</Radio>
                                            ))}
                                        </RadioGroup>
                                    </Flex>
                                )}
                                {selectedProduct.productColors?.length > 0 && (
                                    <Flex mt={5} gap={3}>
                                        <Text textAlign={'center'} fontWeight={'bold'} color={'gray.500'} px={3}>Colors</Text>
                                        <RadioGroup onChange={handleColorChange} mt={'5.2px'}>
                                            {selectedProduct.productColors?.map((c, i) => (
                                                <Radio key={i} bg={c} ml={8} value={c}></Radio>
                                            ))}
                                        </RadioGroup>
                                    </Flex>
                                )}
                                <Flex mt={5} gap={3}>
                                    <Text textAlign={'center'} fontWeight={'bold'} color={'gray.500'} px={3}>Quantity</Text>
                                    <Select
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        width="70px"
                                    >
                                        {[...Array(10).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </Select>
                                </Flex>
                            </Flex>
                            <Stack
                                width={'100%'}
                                mt={'2rem'}
                                direction={'row'}
                                padding={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Button
                                    onClick={handleAddToCart}
                                    flex={1}
                                    w={'200px'}
                                    fontSize={'sm'}
                                    rounded={'full'}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    _focus={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Center>
            )}
        </>
    );
};

export default Product;
