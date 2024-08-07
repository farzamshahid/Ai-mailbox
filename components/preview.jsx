"use client"
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react'
const Preview = ({ html, css }) => {

    const iframeWidth = useBreakpointValue({ base: "420px", lg: "560px" });
    const iframeHeight = useBreakpointValue({ base: "75vh", lg: "75vh" });
    const [iframeContent, setIframeContent] = useState("");
    useEffect(() => {
        const content = `
          <html>
            <head>
              <style>${css}</style>
            </head>
            <body>${html}
            </body>
          </html>
        `;
        setIframeContent(content);
    }, [html, css]);

    return (
        <Box borderRadius="md" width={{ base: "390px", lg: "540px" }} height={{ base: "350px", lg: "75vh" }} overflow={{ base: "hidden", lg: "hidden" }}>
            <iframe
                srcDoc={iframeContent}
                overflow={{ base: "hidden", lg: "hidden" }}
                style={{ width: iframeWidth, height: iframeHeight }}
                title="Preview"
                sandbox="allow-scripts"
            /></Box>
    );
};

export default Preview;