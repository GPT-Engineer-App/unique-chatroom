import React, { useState } from "react";
import { Container, VStack, Input, Button, Box, Text, HStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { FaPaperPlane, FaUser, FaMicrophone, FaInfoCircle, FaCommentDots, FaHistory, FaPrint } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Message is empty.",
        description: "You cannot send an empty message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { text: inputValue, sender: "user" }]);
    setInputValue("");

    // Simulate a bot response
    setTimeout(() => {
      setMessages((messages) => [...messages, { text: "Thanks for your message! We're not here right now, but we'll get back to you soon.", sender: "bot" }]);
    }, 1000);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const AvatarPicker = ({ isOpen, onClose, setAvatar }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select an Avatar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <InputLeftElement>
              <Button size="sm">Upload</Button>
            </InputLeftElement>
            <Input placeholder="Paste image or video URL" />
            <InputRightElement>
              <Button
                size="sm"
                onClick={() => {
                  setAvatar("example-avatar-url");
                  onClose();
                }}
              >
                Set Avatar
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <HStack spacing={4} w="full">
          <Box w="48%" h="80vh" p={4} borderWidth="1px" borderRadius="lg" bg="gray.200" position="relative" onClick={() => setIsAvatarPickerOpen(true)}>
            <HStack spacing={4} position="absolute" bottom="1%" left="50%" transform="translateX(-50%)" w="full" justify="center">
              <Box as="button" onClick={() => setIsAvatarPickerOpen(true)}>
                <FaUser />
              </Box>
              <FaMicrophone />
              <FaInfoCircle />
            </HStack>
            <AvatarPicker isOpen={isAvatarPickerOpen} onClose={() => setIsAvatarPickerOpen(false)} setAvatar={setAvatar} />
          </Box>
          <Box w="48%" h="80vh" p={4} borderWidth="1px" borderRadius="lg" overflowY="scroll" position="relative">
            {messages.map((message, index) => (
              <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.500" : "gray.200"} color={message.sender === "user" ? "white" : "black"} p={3} m={1} borderRadius="lg">
                <Text>{message.text}</Text>
              </Box>
            ))}
            <HStack spacing={4} position="absolute" bottom="1%" left="50%" transform="translateX(-50%)" w="full" justify="center">
              <FaCommentDots />
              <FaHistory />
              <FaPrint />
            </HStack>
          </Box>
        </HStack>
        <HStack w="full">
          <Input placeholder="Type a message..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} flex="1" />
          <Button colorScheme="blue" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
