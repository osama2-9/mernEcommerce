import { Box, Flex, Image, Text, VStack, Link } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useGetCategories from '../hooks/useGetCategories';

const Slider = () => {
    const { categories } = useGetCategories();

    return (
        <Flex
            justify="center"
            align="start"
            direction={{ base: 'column', md: 'row' }}
            w="100%"
            mt={10}
            px={4}
        >
            {/* Categories Section */}
            <VStack
                spacing={4}
                align="start"
                display={{ base: 'none', md: 'flex' }}
                w={{ base: '100%', md: '25%' }}
                mr={5}
            >
                <Text fontWeight="bold" fontSize="xl" mb={4}>
                    Categories
                </Text>
                {categories?.length ? (
                    categories.map((category) => (
                        <Link
                            key={category.cid}
                            href={`/category/${category.slug}`}
                            fontSize="md"
                            color="gray.600"
                            _hover={{ color: 'gray.800', textDecoration: 'underline' }}
                        >
                            {category.categoryName}
                        </Link>
                    ))
                ) : (
                    <Text>No Categories Available</Text>
                )}
            </VStack>

            <Box
                w={{ base: '100%', md: '75%' }}
                position="relative"
                className="shadow-md"
            >
                <Carousel
                    autoPlay
                    interval={3000}
                    infiniteLoop
                    showStatus={false}
                    showThumbs={false}
                    showArrows={true}
                >
                    <div>
                        <Image
                            height={{ base: '250px', md: '500px' }}
                            width={{ base: '100%', md: '900px' }}
                            src="/ads.jpg"
                            alt="Slide 1"
                            objectFit="cover"
                        />
                    </div>
                    <div>
                        <Image
                            height={{ base: '250px', md: '500px' }}
                            width={{ base: '100%', md: '900px' }}
                            src="/ads2.jpeg"
                            alt="Slide 2"
                            objectFit="cover"
                        />
                    </div>
                    <div>
                        <Image
                            height={{ base: '250px', md: '500px' }}
                            width={{ base: '100%', md: '900px' }}
                            src="/ads3.jpg"
                            alt="Slide 3"
                            objectFit="cover"
                        />
                    </div>
                </Carousel>
            </Box>
        </Flex>
    );
};

export default Slider;
