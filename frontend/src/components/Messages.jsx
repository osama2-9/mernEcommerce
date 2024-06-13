import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Link
} from '@chakra-ui/react';
import { MdMessage } from 'react-icons/md'; // Icon for message

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook for modal control
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure(); // Hook for drawer control
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        getAllMessages();
    }, []);

    const getAllMessages = async () => {
        try {
            const res = await fetch('/api/users/messages');
            const data = await res.json();
            if (data.error) {
                console.error('Error fetching messages:', data.error);
            } else {
                setMessages(data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleOpenMessage = (message) => {
        setSelectedMessage(message);
        onOpen();
    };

    return (
        <div>
            <Link onClick={onDrawerOpen}>
                <Flex gap={2} alignItems="center">
                    <MdMessage cursor="pointer" size={24} onClick={onDrawerOpen} />
                    <Text fontWeight={'bold'} onClick={onDrawerOpen}>Messages</Text>
                </Flex>
            </Link>

            <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Messages</DrawerHeader>

                    <DrawerBody>
                        {messages.map((message, index) => (
                            <Box className='transition-all hover:bg-gray-100 cursor-pointer' key={index} mb={4} p={4} borderWidth="1px" borderRadius="md" onClick={() => handleOpenMessage(message)}>
                                <Text>{message.messageTitle}</Text>
                            </Box>
                        ))}
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onDrawerClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedMessage?.messageTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box bg={'gray.100'} rounded={'md'} p={4} mb={4} dangerouslySetInnerHTML={{ __html: selectedMessage?.messageDescription }} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Messages;
