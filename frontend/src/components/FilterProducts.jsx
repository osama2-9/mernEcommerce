/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, IconButton, List, ListItem, Switch, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BACKEND_API } from '../config/config.js'

const FilterProducts = ({ categoryId, products, setFilterdProducts }) => {
    const [showMoreColors, setShowMoreColors] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [onSale, setOnSale] = useState([]);
    const [onClickSale, setOnClickSale] = useState(false);
    const [onClickNLQ, setOnClickNLQ] = useState(false);
    const [noLessQuantity, setNoLessQuantity] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    const handleToggleColors = () => {
        setShowMoreColors(!showMoreColors);
    };

    useEffect(() => {
        const filter = async () => {
            try {
                const res = await fetch(`${BACKEND_API}/product/filter/products/${categoryId}` ,{
                    credentials:"include"
                });
                const data = await res.json();
                setSizes(data.sizes);
                setColors(data.colors);
                setOnSale(data.onSale);
                setNoLessQuantity(data.quantity);
            } catch (error) {
                console.log(error);
            }
        };
        filter();
    }, [categoryId, products]);

    const handleSizeClick = (size) => {
        setSelectedSizes((prevSelectedSizes) => {
            if (prevSelectedSizes.includes(size)) {
                return prevSelectedSizes.filter((s) => s !== size);
            } else {
                return [...prevSelectedSizes, size];
            }
        });

        const filteredProductsBySize = products.filter((p) =>
            selectedSizes.includes(size) ? !p.prodcutSize.includes(size) : p.prodcutSize.includes(size)
        );
        setFilterdProducts(filteredProductsBySize);
    };

    const handleColorClick = (color) => {
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(color)) {
                return prevSelectedColors.filter((c) => c !== color);
            } else {
                return [...prevSelectedColors, color];
            }
        });

        const filteredProductsByColor = products.filter((p) =>
            selectedColors.includes(color) ? !p.productColors.includes(color) : p.productColors.includes(color)
        );
        setFilterdProducts(filteredProductsByColor);
    };

    const handleClickOnSale = () => {
        setOnClickSale(!onClickSale);
        setFilterdProducts(onClickSale ? products : onSale);
    };

    const handleToggleNoLessQuantity = () => {
        setOnClickNLQ(!onClickNLQ);
        setFilterdProducts(onClickNLQ ? products : noLessQuantity);
    };

    return (
        <Box
            w={'300px'}
            p={4}
            mt={10}
            ml={5}
            shadow={'lg'}
            rounded={'md'}
            h={'auto'}
            position={{ base: 'relative', md: 'sticky' }}
            top={10}
            zIndex={10}
        >
            <Text ml={2} fontSize={'25px'} fontWeight={'600'} mt={2}>Filter Products</Text>
            <Stack spacing={6} mt={4}>
                <Box p={4} rounded={'md'} bg={'gray.100'} position={'relative'}>
                    {colors.length > 4 && (
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
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>Colors</Text>
                    <List display={'flex'} justifyContent={'space-evenly'} flexWrap={'nowrap'} mb={2}>
                        {colors.slice(0, 4).map((color, index) => (
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
                        transition={'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out'}
                    >
                        {colors.slice(4).map((color, index) => (
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
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>Sizes</Text>
                    <List display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {sizes.map((size) => (
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
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>On Sale</Text>
                    <Switch disabled={onSale.length === 0} isChecked={onClickSale} onChange={handleClickOnSale} size="md" />
                    {onSale.length === 0 && (
                        <Text mt={2} color={'red.500'} fontSize={'14px'}>Theres No Sales</Text>
                    )}
                </Box>

                <Box p={4} rounded={'md'} bg={'gray.100'}>
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>No Less Quantity</Text>
                    <Switch
                        disabled={noLessQuantity.length < 10}
                        isChecked={onClickNLQ}
                        colorScheme="teal"
                        size="md"
                        onChange={handleToggleNoLessQuantity}
                    />
                    {noLessQuantity.length === 0 && (
                        <Text mt={2} color={'red.500'} fontSize={'14px'}>Theres No Sales</Text>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};


export default FilterProducts;
