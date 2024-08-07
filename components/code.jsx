import { Box, Heading } from "@chakra-ui/react";

const Code = ({ html, css }) => {
    return (
        <Box bg="gray.500" p={4} m={2} borderRadius="md" overflow="hidden">
            <Heading size="md" mb={2}>
                HTML
            </Heading>
            <pre>
                <code >{html || "No HTML yet."}</code>
            </pre>
            <Heading size="md" mt={4} mb={2}>
                CSS
            </Heading>
            <pre>
                <code >{css || "No CSS yet."}</code>
            </pre>
        </Box>
    );
}
export default Code;