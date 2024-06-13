/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, IconButton, List, ListItem, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const FilterProducts = ({ cateogryId }) => {
    const [showMoreColors, setShowMoreColors] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [price, setPrice] = useState(50);
    const [onSale, setOnSale] = useState(false);
    const [noLessQuantity, setNoLessQuantity] = useState(false);

    const handleToggleColors = () => {
        setShowMoreColors(!showMoreColors);
    };

    // const filter = async () => {
    //     try {
    //         const res = await fetch('/api/product/filter/products')

    //     } catch (error) {

    //     }

    // }

    const handleSizeClick = (size) => {
        setSelectedSizes((prevSizes) =>
            prevSizes.includes(size)
                ? prevSizes.filter((s) => s !== size)
                : [...prevSizes, size]
        );
    };

    let sizes

    const handlePriceChange = (value) => {
        setPrice(value);
    };

    const handleToggleOnSale = () => {
        setOnSale(!onSale);
    };

    const handleToggleNoLessQuantity = () => {
        setNoLessQuantity(!noLessQuantity);
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
                    <IconButton
                        icon={<FaPlus />}
                        size={'sm'}
                        position={'absolute'}
                        top={2}
                        right={2}
                        onClick={handleToggleColors}
                        aria-label={'Toggle colors'}
                    />
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>Colors</Text>
                    <List display={'flex'} justifyContent={'space-evenly'} flexWrap={'nowrap'} mb={2}>
                        <ListItem bg={'purple'} w={'30px'} rounded={'full'} h={'30px'} transition={'opacity 0.3s ease-in-out'}></ListItem>
                        <ListItem bg={'green'} w={'30px'} rounded={'full'} h={'30px'} transition={'opacity 0.3s ease-in-out'}></ListItem>
                        <ListItem bg={'black'} w={'30px'} rounded={'full'} h={'30px'} transition={'opacity 0.3s ease-in-out'}></ListItem>
                        <ListItem bg={'pink'} w={'30px'} rounded={'full'} h={'30px'} transition={'opacity 0.3s ease-in-out'}></ListItem>
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
                        <ListItem bg={'blue'} w={'30px'} rounded={'full'} h={'30px'}></ListItem>
                        <ListItem bg={'yellow'} w={'30px'} rounded={'full'} h={'30px'}></ListItem>
                        <ListItem bg={'red'} w={'30px'} rounded={'full'} h={'30px'}></ListItem>
                        <ListItem bg={'orange'} w={'30px'} rounded={'full'} h={'30px'}></ListItem>
                    </List>
                </Box>

                <Box p={4} rounded={'md'} bg={'gray.100'}>
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>Sizes</Text>
                    <List display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'}>
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
                                {size}
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box p={4} rounded={'md'} bg={'gray.100'}>
                    <Text fontSize={'18px'} fontWeight={'500'}>Price Range</Text>
                    <Slider
                        aria-label='price-slider'
                        defaultValue={50}
                        min={0}
                        max={100}
                        onChange={handlePriceChange}
                        value={price}
                        mt={4}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Text ml={2} mt={2}>${price}</Text>
                </Box>

                <Box p={4} rounded={'md'} bg={'gray.100'}>
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>On Sale</Text>
                    <Switch
                        colorScheme="teal"
                        size="md"
                        isChecked={onSale}
                        onChange={handleToggleOnSale}
                    />
                </Box>

                <Box p={4} rounded={'md'} bg={'gray.100'}>
                    <Text fontSize={'18px'} fontWeight={'500'} mb={2}>No Less Quantity</Text>
                    <Switch
                        colorScheme="teal"
                        size="md"
                        isChecked={noLessQuantity}
                        onChange={handleToggleNoLessQuantity}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default FilterProducts;
