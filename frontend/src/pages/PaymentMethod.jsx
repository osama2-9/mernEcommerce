import { Box, FormControl, FormLabel, RadioGroup, Radio, Stack, Text, useColorModeValue, Button, Flex } from '@chakra-ui/react';
import USidebar from '../components/USidebar';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PaymentMethod = () => {
    const [payment, setPayment] = useState("")
    const logged = useRecoilValue(userAtom)
    const handlePayment = async () => {
        try {
            const res = await fetch('/api/users/addpayment', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: logged.uid,
                    paymentmethod: payment
                })
            })
            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success("payment updated")
            }


        } catch (error) {
            console.log(error);
        }
    }


    
    return (
        <>
            <USidebar />
            <Box
                mt={'30px'} ml={'30px'}
                bg={useColorModeValue('white', 'gray.800')}
                p={8}
                borderRadius="lg"
                shadow="md"
                maxWidth="600px"
                mx="auto"
            > <FormControl as="fieldset">
                    <FormLabel as="legend">Select Payment Method</FormLabel>
                    <RadioGroup value={payment} onChange={setPayment}>
                        <Stack direction="column">
                            <Radio value="cash">Cash</Radio>
                            <Radio value="creditCard" isDisabled>
                                Visa (coming soon)
                            </Radio>
                        </Stack>
                    </RadioGroup>
                    <Text color="gray.500" fontSize="sm" mt={4}>
                        We will be adding Visa payment option soon.
                    </Text>
                </FormControl>
                <Flex justifyContent={'end'}>
                    <Button onClick={handlePayment} bg={'teal.500'} color={'white'}>Submit</Button>

                </Flex>
            </Box>
        </>
    );
};

export default PaymentMethod;
