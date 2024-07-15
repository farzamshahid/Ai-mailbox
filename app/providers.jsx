'use client'
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react'
const theme = extendTheme({
    colors: {
        brand: {
            100: "#fffdd0",//creaam
            200: "#008080",//Teal
            300: "#708090",//SlateGray    
            400: "#000000",//black color
            500: "#FFFFFF"//white
        },
    },
})
export function Providers({ children }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}