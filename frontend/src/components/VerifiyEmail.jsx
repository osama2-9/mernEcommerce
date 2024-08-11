import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await fetch('/api/users/verifiy-email', {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    code: code
                })
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.message)
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

        } catch (error) {
            console.log(error);



        } finally {
            setLoading(false)
        }

    };

    return (
        <Box
            mt={'150px'}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={6}
            maxW="md"
            mx="auto"
            borderWidth={1}
            borderRadius="md"
            boxShadow="lg"
            bg="gray.50"
            borderColor="gray.200"
        >
            <Text fontSize="2xl" mb={6} fontWeight="bold" color="blue.600">
                Verify Your Email
            </Text>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <VStack spacing={5} width="full">
                    <FormControl id="verification-code" isRequired>
                        <FormLabel fontSize="lg" color="gray.700">
                            Enter the 6-digit code sent to your email:
                        </FormLabel>
                        <Input
                            type="text"
                            value={code}
                            onChange={handleInputChange}
                            maxLength="6"
                            placeholder="123456"
                            borderColor="gray.300"
                            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                            fontSize="lg"
                            p={4}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="blue"
                        type="submit"
                        isLoading={loading}
                        loadingText="Verifying"
                        size="lg"
                        width="full"
                        borderRadius="md"
                    >
                        Verify
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default VerifyEmail;
