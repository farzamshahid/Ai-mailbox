"use client"
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react'

const Preview = ({ html, css, js }) => {
  const iframeWidth = useBreakpointValue({ sm: "460px", lg: "560px" });
  const iframeHeight = useBreakpointValue({ sm: "75vh", lg: "75vh" });
  const [iframeContent, setIframeContent] = useState("");

  useEffect(() => {
    const content = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>${html}<script>${js}</script></body>
      </html>
    `;
    setIframeContent(content);
    console.log("Preview content set:", content);
  }, [html, css, js]);

  return (
    <Box borderRadius="md" width={{ sm: "397px", lg: "399px", xl: "540px", "2xl": "540px" }} height={{ sm: "72vh", lg: "65vh", xl: "76vh", '2xl': "45vh" }} overflow={{ sm: "auto", lg: "auto", xl: "hidden", "2xl": "hidden" }} >
      {iframeContent ? (
        <iframe
          srcDoc={iframeContent}
          style={{ width: iframeWidth, height: iframeHeight, overflow: "hidden" }}
          title="Preview"
          sandbox="allow-scripts"
        />
      ) : (
        <Text>Loading preview...</Text>
      )}
    </Box>
  );
};

export default Preview;