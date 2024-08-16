import { Box, Button, Flex, Image, Text, } from "@chakra-ui/react"
import { BsCart2 } from "react-icons/bs"
import { BiBoltCircle } from "react-icons/bi";
import { AiOutlineFileProtect } from "react-icons/ai";
import FeatureBox from "../components/FeatureBox";
import Products from "../components/Products";
import ProductContainer from "../components/ProductContainer";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import useGetTopSells from "../hooks/useGetTopSells";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import TopRate from "../components/TopRate";
import RecommendedProducts from "../components/RecommendedProducts";
import ShowTimedSaleProducts from "../components/ShowTimedSaleProducts";

const HomePage = () => {
    const { topSell } = useGetTopSells()
    const [product, setProduct] = useState([])
    const [onSale, setOnSale] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`api/product/get`);
                const data = await res.json();
                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true
                    })
                }
                setProduct(data)
            } catch (error) {
                console.log(error);
            }
        }
        getProducts()
    }, [])





    useEffect(() => {
        const getOnSale = async () => {
            try {
                const res = await fetch('/api/product/on-sale');
                const data = await res.json();
                setOnSale(data);
            } catch (error) {
                console.error(error);
            }
        };

        getOnSale();
    }, []);




    return (
        <div className="home">
            <Box>




                <Slider />

            </Box>
            <Box alignItems={'center'} me={{
                lg: "0px",
                sm: "250px"
            }} display={'flex'} justifyContent={{
                lg: "space-evenly",
                sm: "center"
            }} flexDir={{
                base: "column",
                lg: "row",
                sm: "column"
            }}>

                <FeatureBox icon={<BsCart2 size={30} />} title={"Free Deleviry"} description={"We Provide a Free Deleivry Service For Our Customer"} />
                <FeatureBox icon={<BiBoltCircle size={30} />} title={"Quality"} description={"We offer the best quality for the price"} />
                <FeatureBox icon={<AiOutlineFileProtect size={30} />} title={"100% Secure Payment"} description={"Payment is secure and you can also pay upon receipt"} />
            </Box>



            <Box>


                <RecommendedProducts />

                <ProductContainer mt={10} title="Products" >
                    {
                        product.slice(0, 12).map((product) => (
                            <Products key={product._id} product={product} />
                        ))
                    }
                </ProductContainer>



                <Categories />



                <Flex
                    pos="relative"
                    left={{ base: 5, sm: 5, md: 5, lg: "0%" }}
                    top={'100px'}
                    maxW="100%"
                    justifyContent="center"
                    p={{ base: 5, md: 10 }}
                >
                    <Box
                        mb={5}
                        w={{ base: "90%", md: "80%", lg: "70%" }}
                        bgColor="gray.100"
                        boxShadow="xl"
                        rounded="lg"
                        p={{ base: 5, md: 8 }}
                    >
                        <Flex direction={{ base: "column", md: "row" }} alignItems="center">
                            <Image
                                rounded="md"
                                src="/shopping.jpeg"
                                height={{ lg: "350px", base: "auto", md: "300px" }}
                                width={{ lg: "350px", base: "100%", md: "300px" }}
                                objectFit="cover"
                                mb={{ base: 5, md: 0 }}
                                transition="transform 0.3s"
                                _hover={{ transform: "scale(1.05)" }}
                            />
                            <Box
                                maxW={{ base: "100%", md: "300px", lg: "800px" }}
                                ml={{ base: 0, md: 8 }}
                                mt={{ base: 5, md: 0 }}
                                textAlign={{ base: "center", md: "left" }}
                            >
                                <Flex direction="column">
                                    <Text mb={4} fontSize={{ base: "24px", md: "28px" }} fontWeight="bold" color="black">
                                        Discover New Horizons
                                    </Text>
                                    <Text color="gray.500" fontSize={{ base: "16px", md: "18px" }} mb={5}>
                                        Experience the best shopping with free shipping on all orders. Explore a wide range of products and enjoy seamless shopping right from your home. Shop now and take advantage of our special offers.
                                    </Text>
                                    <Button
                                        bg={'black'}
                                        size="lg"
                                        color={'white'}
                                        mt={{ base: 4, md: 6 }}
                                        w={'300px'}
                                        _hover={{ bg: "gray.800", color: "white" }}
                                    >
                                        Shop Now
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>

                <ProductContainer title="New Arrivels" >

                    {
                        product.slice(-4).map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }
                </ProductContainer>


                <Flex justifyContent={'center'} flexDir={'row'}>
                    <Box width="100%" maxWidth="1000px" shadow={'md'} me={2}>
                        <Image
                            width={'full'}
                            className="rounded-lg"
                            h={450}
                            src="main.png"
                        />
                    </Box>
                </Flex>


                <ProductContainer title="Top Sells" mt={10}>
                    {
                        topSell.map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }

                </ProductContainer>
                <ProductContainer title="On Sales" mt={10}>
                    {
                        onSale.slice(0, 4).map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }

                </ProductContainer>

                <ShowTimedSaleProducts />

                <ProductContainer title="Some Brands" mt={10}>

                    <Brands />
                </ProductContainer>

                <TopRate />


                <Footer />




            </Box>


        </div>
    )
}

export default HomePage
