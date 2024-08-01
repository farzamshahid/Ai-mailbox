'use client'
import React from 'react'
import { IoIosMail } from "react-icons/io";
import { Flex } from '@chakra-ui/react'
import { CiSettings } from "react-icons/ci";
import { Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Divider } from '@chakra-ui/react'
export const Sidebar = () => {
    const router = useRouter()
    return (
        <Box as='div'>
            <Flex border="brand.500" w="135px" h='100vh' backgroundColor="brand.100" >
                <Flex flexDir="column">
                    <Flex>
                        <Box as='div'>
                            <IoIosMail fontSize="35px" color="brand.400" />
                        </Box>
                        <Text ml="7px" mt="10px" mr="10px" fontSize="15px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard')} >AI Mailbox</Text>
                    </Flex>
                    <Divider borderWidth="2px" w="105%" borderColor="brand.400" />
                    <Flex alignItems="flex-end" mt="auto">
                        <CiSettings color="brand.400" fontSize="35px" />
                        <Text fontSize="15px" ml="7px" mr="10px" mb="5px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/settings')}>
                            Settings
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box >
    )
}
