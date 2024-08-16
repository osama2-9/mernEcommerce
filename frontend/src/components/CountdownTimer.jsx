/* eslint-disable react/prop-types */
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();
        const timeLeft = end - now;

        if (timeLeft <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return (

        <VStack spacing={2} mt={4} ml={4} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
            <Text fontWeight="bold" fontSize="lg">Time Left:</Text>
            <HStack spacing={6}>
                <VStack>
                    <Text bg={'gray.300'} p={1} w={'40px'} textAlign={'center'}  borderRadius='full'fontSize="2xl" fontWeight="bold">{timeLeft.hours}</Text>
                    <Text fontSize="sm">Hours</Text>
                </VStack>
                <VStack>
                    <Text bg={'gray.300'} p={1} w={'40px'} textAlign={'center'} borderRadius='full' fontSize="2xl" fontWeight="bold">{timeLeft.minutes}</Text>
                    <Text fontSize="sm">Minutes</Text>
                </VStack>
                <VStack>
                    <Text bg={'gray.300'} p={1} w={'40px'} textAlign={'center'} borderRadius='full' fontSize="2xl" fontWeight="bold">{timeLeft.seconds}</Text>
                    <Text fontSize="sm">Seconds</Text>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default CountdownTimer;
