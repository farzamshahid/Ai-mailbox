"use client"
import { Sidebar } from '@/components/sidebar';
import { Tabs, TabList, TabPanels, Text, Tab, TabPanel, Input, Divider, Heading, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { Select } from '@chakra-ui/react'
export default function Settings() {
    const [server, setServer] = useState('')
    const [port, setPort] = useState()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    return (
        <Flex flexDir="row" borderColor="brand.400" borderWidth="2px">
            <Sidebar />
            <Divider orientation='vertical' borderWidth="2px" h="99vh" borderColor="brand.400" />
            <Flex w="100%" h="97vh" backgroundColor="brand.100">
                <Tabs>
                    <TabList>
                        <Tab color="brand.400" fontWeight="bold">SMTP</Tab>
                        <Tab color="brand.400" fontWeight="bold">Mailbox</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Text color="brand.400" fontWeight="bold">
                                Server
                                <Input w="300px" ml="42px" value={server} borderColor="brand.400" onChange={(e) => setServer(e.target.value)} />
                            </Text >
                            <Text fontWeight="bold" color="brand.400" ml="1px" mt="15px">
                                Port
                                <Input ml="58px" borderColor="brand.400" w="300px" value={port} onChange={(e) => setPort(e.target.value)} />
                            </Text >
                            <Text fontWeight="bold" color="brand.400" mt="15px">
                                UserName
                                <Input ml="14px" borderColor="brand.400" w="300px" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </Text>
                            <Text mt="15px" fontWeight="bold" color="brand.400">
                                Password
                                <Input w="300px" borderColor="brand.400" type='password' ml="22px" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Text>
                            <Flex>
                                <Button color="brand.500" _hover={{ backgroundColor: "brand.200" }} backgroundColor="brand.200" mt="30px" mr="30px" onClick={() => { console.log(password, server, port, userName, password, email) }}>test</Button>
                                <Button color="brand.500" _hover={{ backgroundColor: "brand.200" }} backgroundColor="brand.200" mt="30px" onClick={() => { console.log(password, server, port, userName, password, email) }}>Save</Button>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDir="row">
                                <Text color="brand.400" fontWeight="bold" mr="50px" mt="13px">
                                    Email
                                </Text>
                                <Select borderColor="brand.400" w="300px" color="brand.400" fontWeight="bold" placeholder='Select option' value={email} onChange={handleEmail}>
                                    <option name='gmail'  >Gmail</option>
                                    <option name='yahoo'>Yahoo</option>
                                    <option name="hotmail" value='hotmail'>Hotmail</option>
                                </Select>
                            </Flex>

                            <Text mt="15px" color="brand.400" fontWeight="bold">
                                UserName
                                <Input w="300px" ml="14px" borderColor="brand.400" color="brand.400" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </Text>
                            <Text mt="15px" color="brand.400" fontWeight="bold">
                                Password
                                <Input w="300px" ml="20px" borderColor="brand.400" color="brand.400" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Text>
                            <Flex>
                                <Button mt="30px" _hover={{ backgroundColor: "brand.200" }} backgroundColor="brand.200" mr="30px" color="brand.500" onClick={() => { console.log(email, userName, password) }}>test</Button>
                                <Button mt="30px" backgroundColor="brand.200" _hover={{ backgroundColor: "brand.200" }} color="brand.500" onClick={() => { console.log(email, userName, password) }}>Save</Button>
                            </Flex>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex >
    )
}