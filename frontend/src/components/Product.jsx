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
    Collapse,
    IconButton,
    Avatar
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import userAtom from '../atoms/userAtom';
import RelatedProducts from './RelatedProducts';
import { BACKEND_API } from '../config/config';

const Product = () => {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [userReview, setUserReview] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const logged = useRecoilValue(userAtom);

    const { pid } = useParams();



    const getProductById = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/target/${pid}`);
            const data = await res.json();
            const productData = data.data[0];
            const categoryName = data.data[1];
            if (data.error) {
                toast.error(data.error);
            } else {
                setSelectedProduct(productData);
                setCategory(categoryName);
            }
        } catch (error) {
            console.log(error);
        }
    }, [pid]);

    const getUsersReview = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_API}/product/productReviews/${pid}`);
            const data = await res.json();
            if (!data.error) {
                setUserReview(data);
            }
        } catch (error) {
            console.log(error);
        }
    }, [pid]);

    useEffect(() => {
        getProductById();
        getUsersReview();
    }, [getProductById, getUsersReview]);

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
            const res = await fetch(`${BACKEND_API}/cart/cart/${selectedProduct?._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    quantity: quantity,
                    color: color,
                    size: size,
                }),
                credentials: "include"
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Order placed successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while placing the order.");
        }
    };

    const hasSale = useMemo(() => selectedProduct.sale > 0, [selectedProduct.sale]);
    const Discount = useCallback((price, discount) => {
        return price - (price * (discount / 100));
    }, []);




    const renderStars = useCallback((rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill('').map((_, i) => (
                    <BsStarFill
                        key={`full-${i}`}
                        color="gold"
                        size={22}
                    />
                ))}
                {halfStar && (
                    <BsStarHalf
                        key="half"
                        color="gold"
                        size={22}
                    />
                )}
                {Array(emptyStars).fill('').map((_, i) => (
                    <BsStar
                        key={`empty-${i}`}
                        color="gold"
                        size={22}
                    />
                ))}
            </>
        );
    }, []);


    console.log(selectedProduct);

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
                                width={{ sm: "100%", md: "1000px" }}
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
                                        <Badge p={1} bg={'black'} color={'white'} h={'30px'} textAlign={'center'}>
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
                                <Text fontWeight={'bold'} fontSize={'lg'}>{category.categoryName}</Text>
                            </Flex>
                            <Divider orientation="horizontal" borderColor="black" />
                            <Text fontWeight={600} color={'gray.500'} size="sm">
                                {selectedProduct.productDesc}
                            </Text>
                            <Divider orientation="horizontal" borderColor="black" />
                            <Box>
                                {hasSale && (
                                    <Badge bg={'red.500'} color={'white'} p={2}>
                                        On Sale
                                    </Badge>
                                )}
                            </Box>
                            <Box>
                                <Flex alignItems="center" mt={2}>
                                    {renderStars(selectedProduct?.rating || 0)}
                                    <Text ml={2} color="gray.500">
                                        ({selectedProduct?.ratingCount || 0} reviews)
                                    </Text>
                                </Flex>
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
                                bg={
                                    'black'
                                }
                                color={'white'}
                                _hover={{
                                    bg: "gray.700"
                                }}
                                w={'150px'}
                            >
                                Add to Cart
                            </Button>
                        </Stack>
                    </Stack>
                </Center>
            )}

            <Box mt={8} px={4}>
                <Heading as="h3" size="lg" mb={4}>User Reviews</Heading>
                {userReview.length > 0 ? (
                    <>
                        {userReview.slice(0, 3).map((review, index) => (
                            <Box key={index} mb={4} p={4}>
                                {review?.userComment !== "" && (
                                    <>
                                        <Flex alignItems="center" mb={2}>
                                            <Avatar name={review.userFullName} size="md" mr={2} />
                                            <Text fontWeight="bold">{review.userFullName}</Text>
                                        </Flex>
                                        <Flex alignItems="center" mb={2}>
                                            {renderStars(review.rating)}
                                            <Text ml={2} color="gray.500">
                                                {review.date}
                                            </Text>
                                        </Flex>
                                    </>
                                )}
                                <Text mb={2}>{review.userComment}</Text>
                                <Divider h={.4} bg={'gray.300'} />
                            </Box>
                        ))}
                        {userReview.length > 3 && (
                            <>
                                <Collapse startingHeight={0} in={showAllReviews}>
                                    {userReview.slice(3).map((review, index) => (
                                        <Box key={index} mb={4} p={4}>
                                            <Flex alignItems="center" mb={2}>
                                                <Avatar name={review.userFullName} src={review.userAvatar} size="md" mr={2} />
                                                <Text fontWeight="bold">{review.userFullName}</Text>
                                            </Flex>
                                            <Flex alignItems="center" mb={2}>
                                                {renderStars(review.rating)}
                                                <Text ml={2} color="gray.500">
                                                    {review.date}
                                                </Text>
                                            </Flex>
                                            <Text mb={2}>{review.userComment}</Text>
                                            <Divider h={.4} bg={'gray.300'} />
                                        </Box>
                                    ))}
                                </Collapse>
                                <Flex justifyContent="center">
                                    <IconButton
                                        icon={showAllReviews ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                        onClick={() => setShowAllReviews(!showAllReviews)}
                                        aria-label={showAllReviews ? "Show fewer reviews" : "Show more reviews"}
                                    />
                                </Flex>
                            </>
                        )}
                    </>
                ) : (
                    <Text>No reviews yet.</Text>
                )}
            </Box>


            <RelatedProducts pid={pid} categoryId={category._id} />
        </>
    );
};

export default Product;
