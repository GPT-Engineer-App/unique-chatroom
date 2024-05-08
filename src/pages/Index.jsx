import React, { useState } from "react";
import { Container, VStack, Input, Button, Box, Text, HStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <HStack spacing={4} w="full">
          <Box w="200px" h="500px" p={4} borderWidth="1px" borderRadius="lg" bg="gray.200">
            <Text>Animated Avatar Placeholder</Text>
          </Box>
          <Box w="calc(100% - 220px)" h="500px" p={4} borderWidth="1px" borderRadius="lg" overflowY="scroll">
            {messages.map((message, index) => (
              <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} bg={message.sender === "user" ? "blue.500" : "gray.200"} color={message.sender === "user" ? "white" : "black"} p={3} m={1} borderRadius="lg">
                <Text>{message.text}</Text>
              </Box>
            ))}
          </Box>
        </HStack>
        <HStack w="full">
          <Input placeholder="Type a message..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} />
          <Button colorScheme="blue" onClick={handleSendMessage} leftIcon={<FaPaperPlane />}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
