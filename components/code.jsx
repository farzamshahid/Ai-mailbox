import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
const Code = ({ html, css, js }) => {
    return (
        <Box bg="gray.300" p={4} m={2} borderRadius="md" overflow="hidden">
            <Tabs>
                <TabList>
                    <Tab color="brand.400" fontSize="20px" fontWeight="bold">HTML</Tab>
                    <Tab color="brand.400" fontSize="20px" fontWeight="bold">CSS</Tab>
                    <Tab color="brand.400" fontSize="20px" fontWeight="bold">Javascript</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <pre>
                            <code >{html || "No HTML yet."}</code></pre>
                    </TabPanel>
                    <TabPanel>
                        <pre>
                            <code >{css || "No HTML yet."}</code></pre>
                    </TabPanel>
                    <TabPanel>
                        <pre>
                            <code >{js || "No HTML yet."}</code></pre>
                    </TabPanel>

                </TabPanels>
            </Tabs>
        </Box>
    );
}
export default Code;