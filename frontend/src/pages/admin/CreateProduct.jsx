/* eslint-disable react/prop-types */
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Textarea, Spinner, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import ImgUploader from "../../hooks/ImgUploder";
import useGetCategories from "../../hooks/useGetCategories";
import useGetBrands from "../../hooks/useGetBrands";

const CreateProduct = () => {
    const { brands, loading: brandsLoading } = useGetBrands();
    const { categories, loading: categoriesLoading } = useGetCategories();
    const { img, handleImageChange } = ImgUploader();

    const [inputs, setInputs] = useState({
        productName: "",
        productQuantity: "",
        productPrice: "",
        productSize: "",
        productColors: "",
        categoryID: "",
        brandID: "",
        productImg: "",
        productDesc: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
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
                    ...inputs,
                    productImg: img || null
                })
            });
            const data = await res.json();
            if (data.error) {
                toast(data.error, {
                    type: "error",
                    autoClose: true
                });
            } else {
                toast.success("New Product Added !");
                setInputs({
                    productName: "",
                    productQuantity: "",
                    productPrice: "",
                    productSize: "",
                    productColors: "",
                    categoryID: "",
                    brandID: "",
                    productImg: "",
                    productDesc: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast(error.message);
        }
    };

    return (
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
                                value={inputs.productName}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>

                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Product Quantity</FormLabel>
                            <Input
                                name="productQuantity"
                                w="350px"
                                type="number"
                                placeholder="Quantity"
                                value={inputs.productQuantity}
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
                                value={inputs.productPrice}
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
                                name="productSize"
                                w="350px"
                                type="text"
                                placeholder="Put ( , ) between sizes"
                                value={inputs.productSize}
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
                                value={inputs.productColors}
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
                    {categoriesLoading ? (
                        <Spinner ml={9} />
                    ) : (
                        <Select
                            name="categoryID"
                            w="1000px"
                            ml={9}
                            value={inputs.categoryID}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.categoryName}</option>
                            ))}
                        </Select>
                    )}
                </Box>

                <Box mt={5}>
                    <FormLabel ml={9}>Brand</FormLabel>
                    {brandsLoading ? (
                        <Spinner ml={9} />
                    ) : (
                        <Select
                            name="brandID"
                            w="1000px"
                            ml={9}
                            value={inputs.brandID}
                            onChange={handleChange}
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                            ))}
                        </Select>
                    )}
                </Box>

                <Box mt={5}>
                    <FormLabel>Product Description</FormLabel>
                    <Textarea
                        rows={10}
                        name="productDesc"
                        value={inputs.productDesc}
                        onChange={handleChange}
                    />
                </Box>

                <Flex mt={5} justifyContent="flex-end">
                    <Button onClick={handleSubmit} type="submit" bg="purple.400" color="white">Add</Button>
                </Flex>
            </form>
        </Box>
    );
};

export default CreateProduct;
