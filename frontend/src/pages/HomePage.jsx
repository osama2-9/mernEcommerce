import { Box, Flex, Image, Text, } from "@chakra-ui/react"
import { BsCart2 } from "react-icons/bs"
import { BiBoltCircle } from "react-icons/bi";
import { AiOutlineFileProtect } from "react-icons/ai";
import FeatureBox from "../components/FeatureBox";
import Products from "../components/Products";
import ProductContainer from "../components/ProductContainer";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import useGetTopSells from "../hooks/useGetTopSells";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import Brands from "../components/Brands";

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

                <Categories />



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

            <Text ml={20} mt={10} mb={{
                lg: "0px",
                sm: "20px"
            }} fontSize={'40px'} fontWeight={'bold'}>
                Prodcuts
            </Text>
            <Box>


                <ProductContainer >
                    {
                        product.slice(0, 12).map((product) => (
                            <Products key={product._id} product={product} />
                        ))
                    }
                </ProductContainer>





                <Flex pos={'relative'} left={{
                    base: 5,
                    sm: 5,
                    md: 5,
                    lg: "30%"
                }} maxW={'700'} justifyContent={'center'}  >


                    <Box
                        mb={5}
                        me={{
                            lg: "0",
                            sm: "250"
                        }}
                        w={{ base: "90%", md: "800px", sm: "300px" }}
                        h={{ lg: "400px", base: "auto", md: "300px" }}
                        bgColor="gray.100"
                        className="shadow-md"
                        rounded="lg"
                        p={5}
                    >
                        <Flex direction={{ base: "column", md: "row" }} alignItems="center">
                            <Image
                                rounded={'md'}
                                src="/shopping.jpeg"
                                height={{ lg: "350px", base: "auto", md: "300px" }}
                                width={{ lg: "350px", base: "100%", md: "300px", sm: "300px" }}
                                objectFit="cover"
                            />
                            <Box
                                maxW={{ base: "100%", md: "300px" }}
                                ml={{ base: 0, md: 10 }}
                                mt={{ base: 5, md: 0 }}
                                textAlign={{ base: "center", md: "left" }}
                            >
                                <Flex direction="column">
                                    <Text mb={5} fontSize={{ base: "24px", md: "30px" }} fontWeight="bold">
                                        Explore Yourself
                                    </Text>
                                    <Text color="gray.400">
                                        Shop with ease and enjoy the convenience of free shipping on all orders. No need to worry about additional costs at checkout. Simply add your favorite items to your cart and experience the satisfaction of free delivery straight to your doorstep. It’s our way of thanking you for choosing our store.
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>

                </Flex>
                <Flex id="" justifyContent={'center'} me={{
                    lg: "30px",
                    sm: "250"
                }} mb={'10px'}

                >
                    <Text mb={'10px'} fontSize={'40px'} fontWeight={'bold'} color={'black'}>New Arrivals</Text>
                </Flex>

                <ProductContainer>

                    {
                        product.slice(-4).map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }
                </ProductContainer>


                <Flex justifyContent={'center'} flexDir={'row'}>
                    <Box shadow={'md'} me={2}>
                        <Image me={{
                            lg: "0",
                            sm: "250px"
                        }} className="rounded-lg" h={520} w={{
                            sm: 400
                        }} src="main.png" />
                    </Box>
                    <Flex display={{
                        lg: "block",
                        sm: "none"
                    }} flexDir={'column'}>
                        <Box>
                            <Image className="rounded-lg" h={300} w={300} src="w1.png" />
                        </Box>
                        <Box mb={2}>
                            <Image className="rounded-lg" h={212} w={300} src="w2.jpg" />
                        </Box>
                    </Flex>
                </Flex>
                <Flex id="" justifyContent={'center'} me={{
                    lg: "30px",
                    sm: "250"
                }} mt={'20px'}>
                    <Text mb={'10px'} fontSize={'40px'} fontWeight={'bold'} color={'black'}>Best Sells</Text>
                </Flex>

                <ProductContainer>
                    {
                        topSell.map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }

                </ProductContainer>



                <Flex id="" mb={5} justifyContent={'center'} me={{
                    lg: "30px",
                    sm: "250"
                }} mt={'20px'}>
                    <Text mb={'10px'} fontSize={'40px'} fontWeight={'bold'} color={'black'}>On Sale</Text>
                </Flex>


                <ProductContainer>
                    {
                        onSale.slice(0, 4).map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }

                </ProductContainer>
                <ProductContainer>

                    <Brands />
                </ProductContainer>



                <Box w={{ base: "750px", lg: "1519px", sm: "500px" }}
                    h={'300'}
                    bg={'gray.200'} borderTopRadius={'5'}

                >
                    <Box mt={'10'}>
                        <Image w={200} src="logo.png" />
                    </Box>
                    <Box >
                        <Box position={'relative'} maxW={400} top={'-140px'} left={{
                            base: "30%",
                            sm: "30%",
                            md: "30%",
                            lg: "20%"
                        }}>
                            <Text mb={'5'} fontSize={'30'}>Were Always Here To Help</Text>
                            <Flex justifyContent={'space-between'}>

                                <Flex fontSize={'20'} color={'gray.500'} flexDir={'column'} >
                                    <Box mb={'5'}>
                                        <Text>osamasarraj67@gmail.com</Text>
                                    </Box>
                                    <Box >
                                        <Text>01001234567</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                    <Box w={'1520'} h={'28'} bg={'gray.800'} pos={'relative'} top={-20}>
                        <Flex justifyContent={'center'} >
                            <Flex color={'white'} mt={10}>
                                <Link to={'https://github.com/osama2-9?tab=repositories'}>
                                    <Box mr={'20'}>
                                        <FaGithub className="hover:scale-110 transition-all" size={30} />
                                    </Box>
                                </Link>
                                <Link>
                                    <Box mr={'20'}>
                                        <FaInstagram size={30} />
                                    </Box>
                                </Link>
                                <Link className="hover:scale-110 transition-all" to={'https://www.linkedin.com/in/osama-alsrraj-65b782264/'}>
                                    <Box>
                                        <CiLinkedin size={32} />
                                    </Box>
                                </Link>

                            </Flex>



                        </Flex>
                    </Box>
                </Box>




            </Box>


        </div>
    )
}

export default HomePage
