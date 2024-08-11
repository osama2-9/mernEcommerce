import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();



  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password Not Match !")
      } else {

        const res = await fetch(`/api/users/reset-password/${token}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password: password
          })

        })
        const data = await res.json()
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success("Password Updated Successfully")
        }
      }


    } catch (error) {
      console.log(error);
      toast.error("An error occurd While Update Please try Again Later")

    }
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} w={'500px'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Reset Your Password</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="password">
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  name='password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  border="2px"
                  borderColor="blue.500"
                  _hover={{
                    borderColor: 'blue.500',
                  }}
                  _focus={{
                    borderColor: 'blue.600',
                    boxShadow: '0 0 0 1px blue.600',
                  }}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  name='confirmPassword'
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  border="2px"
                  borderColor="blue.500"
                  _hover={{
                    borderColor: 'blue.500',
                  }}
                  _focus={{
                    borderColor: 'blue.600',
                    boxShadow: '0 0 0 1px blue.600',
                  }}
                />
              </InputGroup>
            </FormControl>
            <Flex mt={4} justifyContent={'space-between'}>
              <Button
                onClick={handleChangePassword}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Update Password
              </Button>
              <Checkbox
                onChange={(e) => setShowPassword(e.target.checked)}
              >
                Show Password
              </Checkbox>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ResetPassword;
