import { Box, Button, Flex, FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategory = () => {
    const [Inputs, setInputs] = useState({
        categoryName: "",

        categoryDesc: ""
    });

    const handleChange = (e) => {
        setInputs({ ...Inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/category/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    categoryName: Inputs.categoryName,
                    categoryDesc: Inputs.categoryDesc
                })
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
                return;
            }

            toast.success("New category addedd")
            setInputs("")


        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    return (
        <Box p={5} className="shadow-md rounded-md" width="700px" position="absolute" top="120px" left="280px">
            <Flex direction="column">
                <Box mb={4}>
                    <Text className="text-2xl font-bold">Create Category</Text>
                </Box>
                <FormControl isRequired mb={3}>
                    <FormLabel htmlFor="categoryName">Category Name</FormLabel>
                    <Input
                        value={Inputs.categoryName}
                        onChange={handleChange}
                        type="text"
                        id="categoryName"
                        name="categoryName"
                    />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel htmlFor="categoryDescription">Description (Optional)</FormLabel>
                    <Textarea id="categoryDescription" name="categoryDesc" value={Inputs.categoryDesc} onChange={handleChange} />
                </FormControl>
                <Button onClick={handleSubmit} bg="purple.400" color="white" mt={4}>
                    Add Category
                </Button>
            </Flex>
        </Box>
    );
};

export default CreateCategory;
