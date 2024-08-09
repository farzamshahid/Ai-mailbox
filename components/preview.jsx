"use client"
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react'
const Preview = ({ html, css }) => {

  const iframeWidth = useBreakpointValue({ sm: "460px", lg: "560px" });
  const iframeHeight = useBreakpointValue({ sm: "75vh", lg: "75vh" });
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
    <Box borderRadius="md" width={{ sm: "397px", lg: "399px", xl: "540px", "2xl": "540px" }} height={{ sm: "72vh", lg: "65vh", xl: "70vh", '2xl': "45vh" }} overflow={{ sm: "hidden", lg: "hidden" }}>
      <iframe
        srcDoc={iframeContent}
        overflow={{ sm: "hidden", lg: "hidden" }}
        style={{ width: iframeWidth, height: iframeHeight }}
        title="Preview"
        sandbox="allow-scripts"
      /></Box>
  );
};

export default Preview;