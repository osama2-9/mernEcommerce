/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
    Box,
    IconButton,
    List,
    ListItem,
    Stack,
    Switch,
    Text,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { CiFilter } from 'react-icons/ci';

const BrandFilter = ({ setFilterdProducts, filterData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showMoreColors, setShowMoreColors] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [onSale, setOnSale] = useState([]);
    const [onClickSale, setOnClickSale] = useState(false);
    const [onClickNLQ, setOnClickNLQ] = useState(false);
    const [noLessQuantity, setNoLessQuantity] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (filterData) {
            setSizes(filterData.sizes);
            setColors(filterData.colors);
            setOnSale(filterData.onSale);
            setNoLessQuantity(filterData.quantity);
            setProducts(filterData.products);
        }
    }, [filterData]);

    const handleToggleColors = () => {
        setShowMoreColors(!showMoreColors);
    };

    const handleSizeClick = (size) => {
        setSelectedSizes((prevSelectedSizes) => {
            if (prevSelectedSizes.includes(size)) {
                return prevSelectedSizes.filter((s) => s !== size);
            } else {
                return [...prevSelectedSizes, size];
            }
        });
    };

    const handleColorClick = (color) => {
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(color)) {
                return prevSelectedColors.filter((c) => c !== color);
            } else {
                return [...prevSelectedColors, color];
            }
        });
    };

    const handleClickOnSale = () => {
        setOnClickSale(!onClickSale);
    };

    const handleToggleNoLessQuantity = () => {
        setOnClickNLQ(!onClickNLQ);
    };

    return (
        <>
            <Button
                zIndex={10}
                position={'relative'}
                left={'70rem'}
                top={'80px'}
                onClick={onOpen}
                mt={10}
                ml={5}
                rightIcon={<CiFilter size={22} />}
            >
                Filter Products
            </Button>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Filter Products</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={6} mt={4}>
                            <Box p={4} rounded={'md'} bg={'gray.100'} position={'relative'}>
                                {colors?.length > 2 && (
                                    <IconButton
                                        icon={<FaPlus />}
                                        size={'sm'}
                                        position={'absolute'}
                                        top={2}
                                        right={2}
                                        onClick={handleToggleColors}
                                        aria-label={'Toggle colors'}
                                    />
                                )}
                                <Text fontSize={'18px'} fontWeight={'500'} mb={2}>
                                    Colors
                                </Text>
                                <List
                                    display={'flex'}
                                    justifyContent={'space-evenly'}
                                    flexWrap={'nowrap'}
                                    mb={2}
                                >
                                    {colors?.slice(0, 4)?.map((color, index) => (
                                        <ListItem
                                            key={index}
                                            bg={color}
                                            w={'30px'}
                                            rounded={'full'}
                                            h={'30px'}
                                            transition={'opacity 0.3s ease-in-out'}
                                            onClick={() => handleColorClick(color)}
                                            cursor={'pointer'}
                                        ></ListItem>
                                    ))}
                                </List>
                                <List
                                    display={'flex'}
                                    justifyContent={'space-evenly'}
                                    flexWrap={'nowrap'}
                                    opacity={showMoreColors ? 1 : 0}
                                    maxHeight={showMoreColors ? '100px' : '0px'}
                                    overflow={'hidden'}
                                    transition={
                                        'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out'
                                    }
                                >
                                    {colors?.slice(4)?.map((color, index) => (
                                        <ListItem
                                            key={index}
                                            bg={color}
                                            w={'30px'}
                                            rounded={'full'}
                                            h={'30px'}
                                            onClick={() => handleColorClick(color)}
                                            cursor={'pointer'}
                                        ></ListItem>
                                    ))}
                                </List>
                            </Box>

                            <Box p={4} rounded={'md'} bg={'gray.100'}>
                                <Text fontSize={'18px'} fontWeight={'500'} mb={2}>
                                    Sizes
                                </Text>
                                <List
                                    display={'flex'}
                                    justifyContent={'space-evenly'}
                                    flexWrap={'wrap'}
                                >
                                    {sizes?.map((size) => (
                                        <ListItem
                                            key={size}
                                            bg={selectedSizes.includes(size) ? 'blue.500' : 'gray.200'}
                                            color={selectedSizes.includes(size) ? 'white' : 'black'}
                                            w={'40px'}
                                            h={'40px'}
                                            rounded={'md'}
                                            display={'flex'}
                                            alignItems={'center'}
                                            justifyContent={'center'}
                                            cursor={'pointer'}
                                            onClick={() => handleSizeClick(size)}
                                            transition={'background-color 0.3s ease-in-out'}
                                            m={1}
                                        >
                                            {size.toUpperCase()}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            <Box p={4} rounded={'md'} bg={'gray.100'}>
                                <Text fontSize={'18px'} fontWeight={'500'} mb={2}>
                                    On Sale
                                </Text>
                                <Switch
                                    disabled={onSale?.length === 0}
                                    isChecked={onClickSale}
                                    onChange={handleClickOnSale}
                                    size="md"
                                />
                                {onSale?.length === 0 && (
                                    <Text mt={2} color={'red.500'} fontSize={'14px'}>
                                        There are no sales
                                    </Text>
                                )}
                            </Box>

                            <Box p={4} rounded={'md'} bg={'gray.100'}>
                                <Text fontSize={'18px'} fontWeight={'500'} mb={2}>
                                    No Less Quantity
                                </Text>
                                <Switch
                                    disabled={noLessQuantity?.length < 10}
                                    isChecked={onClickNLQ}
                                    colorScheme="teal"
                                    size="md"
                                    onChange={handleToggleNoLessQuantity}
                                />
                                {noLessQuantity?.length === 0 && (
                                    <Text mt={2} color={'red.500'} fontSize={'14px'}>
                                        There are no sales
                                    </Text>
                                )}
                            </Box>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default BrandFilter;
