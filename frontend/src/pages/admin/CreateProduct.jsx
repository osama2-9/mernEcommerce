import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Textarea, Spinner, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import ImgUploder from "../../hooks/ImgUploder";
import useGetCategories from "../../hooks/useGetCategories";

const CreateProduct = () => {

    const { img, handleImageChange } = ImgUploder()
    const { categories, loading } = useGetCategories()

    const [Inputs, setInputs] = useState({
        productName: "",
        productQuntity: "",
        productPrice: "",
        prodcutSize: "",
        productColors: "",
        categoryID: "",
        productImg: "",
        productDesc: ""
    });



    const handleChange = (e) => {

        setInputs({ ...Inputs, [e.target.name]: e.target.value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/product/create/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productName: Inputs.productName,
                    productPrice: Inputs.productPrice,
                    productQuntity: Inputs.productQuntity,
                    productColors: Inputs.productColors,
                    prodcutSize: Inputs.prodcutSize,
                    categoryID: Inputs.categoryID,
                    productDesc: Inputs.productDesc,
                    productImg: img || null



                })
            });
            const data = await res.json();
            if (data.error) {
                toast(data.error, {
                    type: "error",
                    autoClose: true
                })
            } else {
                toast("New Product Added!")
                setInputs("")
            }
            console.log(Inputs);
        } catch (error) {
            console.log(error);
            toast(error.message)
        }
    };

    return (
        <>

            <Box p={5} className="shadow-md rounded-md" width="1200px" position="absolute" top="80px" left="280px">

                <Text mb={4} className="text-2xl font-bold">Create Product</Text>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <Flex flexDirection="row" justifyContent="space-evenly">
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input
                                    name="productName"
                                    w="350px"
                                    type="text"
                                    placeholder="Product name"
                                    value={Inputs.productName}
                                    onChange={handleChange}
                                />

                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Product Quantity</FormLabel>
                                <Input
                                    name="productQuntity"
                                    w="350px"
                                    type="number"
                                    placeholder="Quantity"
                                    value={Inputs.productQuntity}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Product Price</FormLabel>
                                <Input
                                    name="productPrice"
                                    w="350px"
                                    type="number"
                                    placeholder="Price"
                                    value={Inputs.productPrice}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Box>
                    </Flex>

                    <Flex flexDirection="row" justifyContent="space-evenly" mt="20px">
                        <Box>
                            <FormControl>
                                <FormLabel>Product Size</FormLabel>
                                <Input
                                    name="prodcutSize"
                                    w="350px"
                                    type="text"
                                    placeholder="Put ( , ) between sizes"
                                    value={Inputs.prodcutSize}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl>
                                <FormLabel>Product Colors</FormLabel>
                                <Input
                                    name="productColors"
                                    w="350px"
                                    type="text"
                                    placeholder="Put ( , ) between colors"
                                    value={Inputs.productColors}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl>
                                <FormLabel>Product Image</FormLabel>
                                <Input
                                    name="productImg"
                                    type="file"
                                    onChange={handleImageChange}

                                />
                            </FormControl>
                        </Box>
                    </Flex>

                    <Box mt={5}>
                        <FormLabel ml={9}>Category</FormLabel>
                        {loading ? (
                            <Spinner ml={9} />
                        ) : (
                            <Select
                                name="categoryID"
                                w="1000px"
                                ml={9}
                                value={Inputs.categoryID}
                                onChange={handleChange}
                            >


                                {categories.map((category, i) => (
                                    <option key={i} value={category._id}>{category.categoryName}</option>
                                ))}
                            </Select>
                        )}
                    </Box>

                    <Box mt={5}>
                        <FormLabel>Product Description</FormLabel>
                        <Textarea
                            rows={10}
                            name="productDesc"
                            value={Inputs.productDesc}
                            onChange={handleChange}
                        />
                    </Box>

                    <Flex mt={5} justifyContent="flex-end">
                        <Button onClick={handleSubmit} type="submit" bg="purple.400" color="white">Add</Button>
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default CreateProduct;
