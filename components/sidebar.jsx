'use client'
import React from 'react'
import { IoIosMail } from "react-icons/io";
import { Flex } from '@chakra-ui/react'
import { CiSettings } from "react-icons/ci";
import { Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Tabs, TabList, TabPanels, Tab, Divider, TabPanel } from '@chakra-ui/react'
export const Sidebar = () => {
    const router = useRouter()
    return (
        <div>
            <Flex flexDir="row">
                <Flex border="brand.500" w="135px" h="99vh" backgroundColor="brand.100">
                    <Flex flexDir="column">
                        <Flex alignItems='center'>
                            <Box as='div' mt="10px">
                                <IoIosMail fontSize="35px" color="brand.400" />
                            </Box>
                            <Text ml="7px" mt="12px" mr="10px" fontSize="15px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/')} >AI Mailbox</Text>
                        </Flex>
                        <Divider borderWidth="2px" w="105%" borderColor="brand.400" />
                        <Flex alignItems='center' mt="555px">
                            <CiSettings color="brand.400" mt="2px" fontSize="35px" />
                            <Text mt="1px" fontSize="15px" ml="7px" mr="10px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/settings')}>
                                Settings
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}
