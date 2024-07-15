"use client"
import { Flex, Box, Heading, Divider, Button } from "@chakra-ui/react";
import { Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";

import { Sidebar } from "@/components/sidebar";
export default function Home() {
  const [email, setEmail] = useState('')
  const [chat, setChat] = useState('')
  const [iframe, setIframe] = useState('')
  const [eframe, setEframe] = useState('')
  const [emails, setEmails] = useState('')
  const [chats, setChats] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
    let chat1 = chat.trim()
    if (chat1 != '') {
      const updatedchat = [...chats, chat1]
      setChats(updatedchat)
      localStorage.setItem('chat', updatedchat);
      setIframe(chat)
      setChat('')
    }
  }
  const handleEmail = (e) => {
    e.preventDefault()
    if (email === "") {
      alert("please Fill field")
      setEmail('')
    }
    else if (email.endsWith("ABC")) {
      alert("please write email of correct format")
      setEmail('')

    }
    else if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
      setEmails(email)
      localStorage.setItem('email', emails)
      setEframe(email)
      setEmail('')
    }
  }

  useEffect(() => {
    const emailValue = localStorage.getItem('email')
    if (emailValue) {
      setEmails(emailValue)
    }
  }, [email])

  useEffect(() => {

    let chatValue = localStorage.getItem('chat') || [];
    setChats(chatValue)
  }, [])

  return (
    <Box fontFamily="sans-serif">
      <Flex flexDir="row" borderColor="brand.400" borderWidth="2px">
        <Sidebar />
        <Divider orientation='vertical' h="99vh" borderWidth="2px" borderColor="brand.400" />
        <Flex flexDir="column" w="50%" h="99vh" bgColor="brand.100" border="brand.500" >
          <Flex>
            <Text mr="10px" ml="4px" fontSize='20px' mt="16px" fontWeight="bold" color="brand.400">
              Email
            </Text>
            <Input mt="10px" mr="8px" borderColor="brand.400" value={email} w="300px" placeholder="Enter your email" color="brand.400" onChange={(e) => setEmail(e.target.value)} />
            <Button bgColor="brand.200" color="brand.500" mb="20px" mt="10px" _hover={{ backgroundColor: "brand.200" }} mr="2px" w='90px' onClick={handleEmail} >Send</Button>
          </Flex>
          <Divider borderWidth="2px" borderColor="brand.400" />
          <Flex flexDir="column">
            <Text fontWeight="bold" ml="4px" fontSize="25px">
              {chats}
            </Text>
          </Flex>
          <Flex pos="static" mt="513px">
            <Flex flexDir="row" justifyContent="flex-end" alignItems="flex-end">
              <Text mr="16px" ml="5px" fontSize='20px' fontWeight="bold" color="brand.400">
                Chat
              </Text>
              <Input mr="9px" borderColor="brand.400" value={chat} w="300px" placeholder="Type something to chat" color="brand.400" onChange={(e) => setChat(e.target.value)} />
              <Button color="brand.500" bgColor="brand.200" _hover={{ backgroundColor: "brand.200" }} mr="2px" onClick={handleSubmit} >Submit</Button>
            </Flex>
          </Flex>
        </Flex>
        <Divider orientation='vertical' h="99vh" borderColor="brand.400" />
        <Flex flexDir="column" w="50%" h="99vh" borderWidth="2px" bgColor="brand.100">
          <Flex flexDir="column">
            <Box>
              {emails}
            </Box>
            {
              eframe &&
              <>
                <Flex flexDir="column">
                  <Heading color="brand.400">
                    Output
                  </Heading>
                  <iframe srcDoc={eframe} width="100%" height="300px" ></iframe>
                </Flex>
              </>
            }
          </Flex>
          {
            iframe &&
            <Flex flexDir="column">
              <Heading color="brand.400" >
                Output
              </Heading>
              <Box>
                <iframe srcDoc={iframe} width="50%" height="200px" ></iframe>
              </Box>
            </Flex>
          }
        </Flex>
      </Flex >
    </Box >
  );
}
