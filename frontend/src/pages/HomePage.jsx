import { Box, Button, Flex, Image, Input, Text, } from "@chakra-ui/react"
import { BsCart2, BsSearch } from "react-icons/bs"
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

const HomePage = () => {
    const {topSell} = useGetTopSells()
    const [product, setProduct] = useState([])
   
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`/api/product/get`);
                const data = await res.json();
                if (data.error) {
                    toast(data.error, {
                        type: "error",
                        autoClose: true
                    })
                }
                setProduct(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts()
    }, [])
    return (
        <div className="home">
            <Box>
                <Box className="shadow-md">
                    <Text position={'absolute'} fontWeight={'800'} width={'250px'} top={'40'} left={{
                        base: "20",
                        lg: "40"
                    }} fontSize={'40'} fontFamily={"sans-serif"}  > Summer Collection</Text>
                    <Text position={'absolute'} top={290} left={{
                        base: "20",
                        lg: "40"
                    }} >Start explore our collections</Text>

                    <Image src="/hero.avif" height={500} width={1535} />
                </Box>

            </Box>
            <Box alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDir={{
                base: "column",
                lg: "row",
                sm: "column"
            }}>

                <FeatureBox icon={<BsCart2 size={30} />} title={"Free Deleviry"} description={"We Provide a Free Deleivry Service For Our Customer"} />
                <FeatureBox icon={<BiBoltCircle size={30} />} title={"Quality"} description={"We offer the best quality for the price"} />
                <FeatureBox icon={<AiOutlineFileProtect size={30} />} title={"100% Secure Payment"} description={"Payment is secure and you can also pay upon receipt"} />
            </Box>

            <Text ml={20} mt={10} fontSize={'40px'} fontWeight={'bold'}>
                Prodcuts
            </Text>
            <Box>

                <Flex gap={3} alignItems={'center'} justify={'center'} mb={10}>
                    <Box>
                        <Input placeholder="Search for porducts" type="text" />
                    </Box>
                    <Box>
                        <Button>
                            <BsSearch className="text-purple-500 " />
                        </Button>
                    </Box>
                </Flex>


                <ProductContainer >
                    {


                        product.slice(0, 8).map((product) => (

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


                    <Box mb={'5'} w={'800px'} h={'300px'} bgColor={'gray.100'} className="shadow-md" rounded={'lg'}>
                        <Box>

                            <Image src="/shopping.jpeg" height={'300'} width={300} />
                            <Box maxW={'300'} position={'relative'} top={'-270px'} left={'350px'}>
                                <Flex flexDir={'column'}>
                                    <Text mb={'5px'} fontSize={'30px'} fontWeight={'bold'}>Explore Your Self</Text>
                                    <Text color={'gray.400'}>Shop with ease and enjoy the convenience of free shipping on all orders  No need to worry about additional costs at checkout. Simply add your favorite items to your cart and experience the satisfaction of free delivery straight to your doorstep. Its our way of thanking you for choosing our Store</Text>
                                </Flex>
                            </Box>
                        </Box>

                    </Box>
                </Flex>
                <Flex id="" justifyContent={'center'} me={'100px'} mb={'10px'}>
                    <Text mb={'10px'} fontSize={'30px'} fontWeight={'bold'} color={'gray.400'}>New Arrivals</Text>
                </Flex>

                <ProductContainer>

                    {
                        product.slice(-3).map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }




                </ProductContainer>


                <Flex justifyContent={'center'} flexDir={'row'}>
                    <Box shadow={'md'} me={2}>
                        <Image className="rounded-lg" h={520} w={600} src="main.png" />
                    </Box>
                    <Flex flexDir={'column'}>
                        <Box>
                            <Image className="rounded-lg" h={300} w={300} src="w1.png" />
                        </Box>
                        <Box mb={2}>
                            <Image className="rounded-lg" h={212} w={300} src="w2.jpg" />
                        </Box>
                    </Flex>



                </Flex>


                <Flex id="" justifyContent={'center'} me={'100px'} mt={'20px'}>
                    <Text mb={'10px'} fontSize={'30px'} fontWeight={'bold'} color={'gray.400'}>Best Sells</Text>
                </Flex>

                <ProductContainer>

                    {
                        topSell.map((p) => (
                            <Products key={p._id} product={p} />
                        ))
                    }




                </ProductContainer>








                {/* FOTTER */}
                <Box w={{ base: "750px", lg: "1519px" }}
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
