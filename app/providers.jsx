'use client'
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from '@chakra-ui/react'
const theme = extendTheme({
    fonts: {
        heading: `sans-serif`,
        body: `sans-serif`,
    },
    colors: {
        brand: {
            100: "#fffdd0",//cream
            200: "#008080",//Teal
            300: "#708090",//SlateGray    
            400: "#000000",//Black 
            500: "#FFFFFF"//White
        },
    },
})
export function Providers({ children }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}