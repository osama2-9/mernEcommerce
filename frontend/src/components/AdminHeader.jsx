import { Box, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BiSolidHome } from "react-icons/bi";

const AdminHeader = () => {
    const user = useRecoilValue(userAtom)

    const currentDate = new Date().toLocaleDateString();
    const navigate = useNavigate();


    return (
        <Box shadow={'md'} color="black" p={4}>
            <Flex align="center">
                <Text fontSize={'18'} fontWeight={'bold'}> Email: {user?.email}</Text>
                <Spacer />
                <Text fontWeight={'bold'} fontSize={'18'}>Date: {currentDate}</Text>
                <Spacer />

                <Spacer />
                <Button colorScheme="gray" onClick={() => navigate('/')}><BiSolidHome /></Button>
               
            </Flex>
        </Box>
    );
}

export default AdminHeader;
