import {
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    Divider,
    Badge,
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

    return (
        <>
            {selectedProduct && (
                <Center py={6}>
                    <Stack
                        direction={{ md: 'row', lg: "row", sm: "column" }}
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
                                <Heading fontSize={'2xl'} fontFamily={'body'}>
                                    {selectedProduct.productName}
                                </Heading>
                                {selectedProduct.productQuntity <= 3 && (

                                    <Text>
                                        <Badge p={1} bg={'black'} color={'white'} h={'30px'} textAlign={'center'} >#In Stock {selectedProduct.productQuntity}</Badge>
                                    </Text>
                                )}

                                <Text fontWeight={700} color={'gray.800'}>
                                    ${selectedProduct.productPrice}
                                </Text>
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
                            <Stack spacing={4} width="100%">
                                {selectedProduct.prodcutSize?.length > 0 && (
                                    <Stack spacing={1}>
                                        <Text fontWeight={'bold'} color={'gray.500'}>Sizes</Text>
                                        <RadioGroup onChange={handleSizeChange}>
                                            {selectedProduct.prodcutSize.map((product, i) => (
                                                <Radio ml={2} key={i} value={product}>{product}</Radio>
                                            ))}
                                        </RadioGroup>
                                    </Stack>
                                )}
                                {selectedProduct.productColors?.length > 0 && (
                                    <Stack spacing={1}>
                                        <Text fontWeight={'bold'} color={'gray.500'}>Colors</Text>
                                        <RadioGroup onChange={handleColorChange}>
                                            {selectedProduct.productColors.map((c, i) => (
                                                <Radio ml={2} key={i} bg={c} value={c}></Radio>
                                            ))}
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
           

        </>
    );
};

export default Product;
