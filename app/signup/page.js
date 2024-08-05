"use client"
import React from 'react'
import { useState } from 'react';
import { Button, Input, Box, Flex, Text } from '@chakra-ui/react';

import { supabase } from '@/lib/config'

import { useRouter } from 'next/navigation';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: fullName,
                    },
                },
            });
            if (data.user != null) {
                router.push('/login')
            }
            if (error) throw error;
        } catch (error) {
            alert(error)
        }
    };



    return (
        <Box as="div" backgroundColor="brand.100">
            <Flex h="100vh" justifyContent="center" alignItems="center">
                <Box as='form' backgroundColor="brand.200" borderRadius="15px" padding="70px" onSubmit={handleSubmit}>
                    <Flex justifyContent="center" alignItems="center" fontSize="20px" fontWeight="bolder" mb="20px" >
                        <Text>
                            Signup Form
                        </Text>
                    </Flex>
                    <Flex flexDir="row" alignItems="center">
                        <Text fontWeight="bold" mr="15px" mb="40px" mt="auto">
                            FullName
                        </Text>
                        <Input type='text' width='40vh' mb="40px" placeholder='Enter your FullName' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </Flex>
                    <Flex flexDir="row" alignItems="center">
                        <Text fontWeight="bold" mr="44px" mb="40px" mt="auto">
                            Email
                        </Text>
                        <Input type='email' width='40vh' mb="40px" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Flex>
                    <Flex flexDir="row" alignItems="center">
                        <Text fontWeight="bold" mr="11px" mt="auto">
                            Password
                        </Text>
                        <Input type='password' width='40vh' placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Flex>
                    <Flex flexDir="row" alignItems="center" justifyContent="center" mt="30px">
                        <Button type="submit">Signup</Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}
export default Signup