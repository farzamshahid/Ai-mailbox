"use client";
import { Flex, Box, Heading, Divider, Button } from "@chakra-ui/react";
import { Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  const [email, setEmail] = useState("");
  const [chat, setChat] = useState("");
  const [iframe, setIframe] = useState("");
  const [eframe, setEframe] = useState("");
  const [emails, setEmails] = useState("");
  const [chats, setChats] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chat != "") {
      const updatedchat = [...chats, chat];
      setChats(updatedchat);
      localStorage.setItem("chat", JSON.stringify(updatedchat));
      setIframe(chat);
      setChat("");
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("please Fill field");
      setEmail("");
    }
    else if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
      localStorage.setItem("email", email);
      setEmails(email);
      setEframe(email);
      setEmail("");
    }
    else {
      alert('email format is incorrect')
      setEmail("");

    }
  };

  useEffect(() => {
    let chatValue = localStorage.getItem("chat");
    if (chatValue) {
      try {
        setChats(JSON.parse(chatValue));
      } catch {
        setChats([]);
      }
    } else {
      setChats([]);
    }
  }, []);

  return (
    <Box fontFamily="sans-serif">
      <Flex flexDir="row" borderColor="brand.400" borderWidth="2px">
        <Sidebar />
        <Divider
          orientation="vertical"
          h="99vh"
          borderWidth="2px"
          borderColor="brand.400"
        />
        <Flex
          flexDir="column"
          w={{ md: '45%', lg: '50%' }}
          h="99vh"
          bgColor="brand.100"
          border="brand.500"
        >
          <Flex>
            <Text
              mr="10px"
              ml="4px"
              fontSize="20px"
              mt="16px"
              fontWeight="bold"
              color="brand.400"
            >
              Email
            </Text>
            <Input
              mt="10px"
              mr="8px"
              borderColor="brand.400"
              value={email}
              w={{
                md: "600px", lg: "800px"
              }}
              placeholder="Enter your email"
              color="brand.400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              bgColor="brand.200"
              color="brand.500"
              mb="20px"
              mt="10px"
              _hover={{ backgroundColor: "brand.200" }}
              mr="2px"
              w="110px"
              onClick={handleEmail}
            >
              Send
            </Button>
          </Flex>
          <Divider borderWidth="2px" borderColor="brand.400" />
          <Flex flexDir="column">
            <Text fontWeight="bold" alignSelf="flex-start" fontSize={{ md: "18px", lg: "25px" }} mt="4px" mb={{ md: "5px", lg: "4px" }} ml="4px" backgroundColor="brand.500" borderRadius="20px" padding="16px">
              Hello, how may I assist you?
            </Text>
            {chats.map((chatMessage, index) => (
              <Text key={index} color="brand.500" alignSelf="flex-end" fontWeight="bold" mb="4px" ml="4px" mr="4px" mt={{ md: "8px", lg: "5px" }} fontSize="25px" backgroundColor="brand.200" borderRadius="20px" padding="16px">
                {chatMessage}
              </Text>
            ))}
          </Flex>
          <Flex mt="auto">
            <Flex flexDir="row" justifyContent="flex-end" alignItems="flex-end">
              <Input
                ml={{ md: "5px", lg: "7px" }}
                mr={{ md: "5px", lg: "15px" }}
                borderColor="brand.400"
                value={chat}
                w={{
                  md: '260px', lg: '756px'
                }}
                placeholder="Type something to chat"
                color="brand.400"
                onChange={(e) => setChat(e.target.value)}
              />
              <Button
                color="brand.500"
                bgColor="brand.200"
                _hover={{ backgroundColor: "brand.200" }}
                mr="2px"
                w={{ md: "70px", lg: "15%" }}
                onClick={handleSubmit}
              >
                Chat
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Divider
          orientation="vertical"
          h="99vh"
          borderWidth="2px"
          borderColor="brand.400"
        />
        <Flex
          flexDir="column"
          w="50%"
          h="99vh"
          borderWidth="2px"
          bgColor="brand.100"
        >
          <Flex flexDir="column">
            <Box>{emails}</Box>
            {eframe && (
              <>
                <Flex flexDir="column">
                  <Heading color="brand.400">Output</Heading>
                  <iframe srcDoc={eframe} width="100%" height="300px"></iframe>
                </Flex>
              </>
            )}
          </Flex>
          {iframe && (
            <Flex flexDir="column">
              <Heading color="brand.400">Output</Heading>
              <Box>
                <iframe srcDoc={iframe} width="50%" height="200px"></iframe>
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box >
  );
}
