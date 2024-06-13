/* eslint-disable react/prop-types */
import {
    Badge,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    Image,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BsFolder } from 'react-icons/bs';

import userAtom from '../atoms/userAtom';
import RelatedProducts from './RelatedProducts';

const Product = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [category, setCategory] = useState("");
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
                const productData = data.data[0];
                const categoryName = data.data[1];

                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true,
                    });
                }
                setSelectedProduct(productData);
                setCategory(categoryName);

            } catch (error) {
                console.log(error);
            }
        };
        getProductById();
    }, [pid, category._id]);

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
                    size: size,
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

    const hasSale  = selectedProduct.sale  > 0 ? true :false 

    const Discount = (price, discount) => {
        return price - (price * (discount / 100));
    };

    return (
        <>
            {selectedProduct && (
                <Center py={6}>
                    <Stack
                        direction={{ md: 'row', lg: 'row', sm: 'column' }}
                        spacing={6}
                    >
                        <Flex flex={1}>
                            <Image

                                p={1}
                                width={{ sm: "100%", md: "600px" }}
                                height={{ sm: "auto", md: "500px" }}
                                src={selectedProduct.productImg}
                            />
                        </Flex>
                        <Stack
                            flex={2}
                            justifyContent="center"
                            alignItems="flex-start"
                            p={4}
                            pt={2}
                            spacing={4}
                        >
                            <Flex justifyContent="space-between" alignItems="center" width="100%">
                                <Heading letterSpacing={1} fontSize={'3xl'} fontFamily={'body'}>
                                    {selectedProduct.productName}
                                </Heading>
                                {selectedProduct.productQuntity <= 3 && (
                                    <Text>
                                        <Badge p={1} bg={'black'} color={'white'} h={'30px'} textAlign={'center'} >
                                            In Stock {selectedProduct.productQuntity}
                                        </Badge>
                                    </Text>
                                )}
                                {selectedProduct.sale > 0 ? (
                                    <>
                                        <Text fontWeight={700} color={'red.500'}>
                                            ${Discount(selectedProduct.productPrice, selectedProduct.sale).toFixed(2)}
                                        </Text>
                                        <Text as="s" fontWeight={700} color={'gray.800'}>
                                            ${selectedProduct.productPrice}
                                        </Text>
                                    </>
                                ) : (
                                    <Text fontWeight={700} fontSize={'20px'} color={'gray.800'}>
                                        ${selectedProduct.productPrice}
                                    </Text>
                                )}
                            </Flex>
                            <Flex flexDirection={'row'} gap={2} color={'gray.500'} alignItems="center">
                                <BsFolder className='mt-1' size={22} />
                                <Text fontWeight={'bold'} fontSize={'lg'}> {category.categoryName}</Text>
                            </Flex>
                            <Divider orientation="horizontal" borderColor="black" />
                            <Text fontWeight={600} color={'gray.500'} size="sm">
                                {selectedProduct.productDesc}
                            </Text>
                            <Divider orientation="horizontal" borderColor="black" />
                            <Box>
                                {
                                    hasSale && (
                                        <Badge bg={'red.500'} color={'white'} p={2}>
                                            On Sale

                                </Badge>
                                    )
                                }


                            </Box>
                            <Stack spacing={4} width="100%">
                                {selectedProduct.prodcutSize?.length > 0 && (
                                    <Stack spacing={1}>
                                        <Text fontWeight={'bold'} color={'gray.500'}>Sizes</Text>
                                        <RadioGroup value={size} onChange={handleSizeChange}>
                                            <Stack direction="row" spacing={4}>
                                                {selectedProduct.prodcutSize.map((product, i) => (
                                                    <Radio
                                                        key={i}
                                                        value={product}
                                                        bg={size === product ? 'black' : 'gray.200'}
                                                        color={size === product ? 'white' : 'black'}
                                                        borderRadius="full"
                                                        border="1px"
                                                        borderColor="gray.300"
                                                        _checked={{
                                                            bg: 'black',
                                                            color: 'white',
                                                            borderColor: 'black',
                                                        }}
                                                        _hover={{
                                                            bg: size === product ? 'black' : 'gray.300',
                                                        }}
                                                        _focus={{
                                                            boxShadow: 'outline',
                                                        }}
                                                        p={2}
                                                    >
                                                        {product.toUpperCase()}
                                                    </Radio>
                                                ))}
                                            </Stack>
                                        </RadioGroup>
                                    </Stack>
                                )}
                                {selectedProduct.productColors?.length > 0 && (
                                    <Stack spacing={1}>
                                        <Text fontWeight={'bold'} color={'gray.500'}>Colors</Text>
                                        <RadioGroup value={color} onChange={handleColorChange}>
                                            <Stack direction="row" spacing={4}>
                                                {selectedProduct.productColors.map((c, i) => (
                                                    <Radio
                                                        key={i}
                                                        value={c}
                                                        bg={c}
                                                        border="1px"
                                                        borderColor="gray.300"
                                                        borderRadius="full"
                                                        _checked={{
                                                            boxShadow: '0 0 0 2px white, 0 0 0 4px black',
                                                        }}
                                                        _hover={{
                                                            boxShadow: '0 0 0 2px white, 0 0 0 4px gray',
                                                        }}
                                                        _focus={{
                                                            boxShadow: 'outline',
                                                        }}
                                                        size="lg"
                                                    />
                                                ))}
                                            </Stack>
                                        </RadioGroup>
                                    </Stack>
                                )}
                                <Flex alignItems="center">
                                    <Text fontWeight={'bold'} color={'gray.500'}>Quantity</Text>
                                    <Select
                                        ml={4}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        width="70px"
                                    >
                                        {[...Array(10).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </Select>
                                </Flex>
                            </Stack>
                            <Button
                                onClick={handleAddToCart}
                                w={'200px'}
                                fontSize={'sm'}
                                rounded={'full'}
                                bg={'black'}
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
                </Center>
            )}
            <RelatedProducts pid={pid} categoryId={category._id} />
        </>
    );
};

export default Product;
