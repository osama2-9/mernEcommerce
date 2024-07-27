import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { CiLinkedin } from 'react-icons/ci'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
      <Box w={{ base: "750px", lg: "1519px", sm: "500px" }}
          h={'300'}
          bg={'gray.50'} borderTopRadius={'5'}

      >
          <Box mt={'10'}>
              <Image w={200} src="/logo.png" />
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
                              <Text>osamaalsrraj3@gmail.com</Text>
                          </Box>
                          <Box >
                              <Text>01001234567</Text>
                          </Box>
                      </Flex>
                  </Flex>
              </Box>
          </Box>
          <Box w={'1520'} h={'28'} bg={'black'} pos={'relative'} top={-20}>
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
  )
}

export default Footer
