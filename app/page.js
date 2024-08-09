"use client"
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import React from 'react'
const page = () => {
    return (
        <Box as='div'>
            <Flex alignItems="center" flexDir="column">
                <Heading fontSize={{ sm: "40px", lg: "45px" }} fontWeight="bold" color="brand.200">Welcome to AI Mailbox</Heading>
                <Text color="brand.400" fontWeight="bold" fontSize={{ sm: "30px", lg: "35px" }}>The future of Mailing</Text>
            </Flex>
            <Box>
                <Flex h="70vh" alignItems="center" flexDir="column" justifyContent="center">
                    <Text color="brand.200" fontSize={{ sm: "18px", lg: "20px" }}>If you have account <Link href="/login" textDecoration="underline" textColor="black">Login</Link> and enjoy the best mailing in world</Text>
                    <Text color="brand.200" fontSize={{ sm: "18px", lg: "20px" }}>If you don't have account <Link href="/signup" textDecoration="underline" textColor="black">Signup</Link>  and get free acesss of  Ai mailbox for 1 month</Text>

                </Flex>
            </Box>

        </Box>
    )
}

export default page