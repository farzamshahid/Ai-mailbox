"use client";
import { Flex, Box, Heading, Divider, Button, Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import { Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
export default function Home() {
  const [email, setEmail] = useState("");
  const [chat, setChat] = useState("");
  const [iframe, setIframe] = useState("");
  const [eframe, setEframe] = useState("");
  const [emails, setEmails] = useState("");
  const [chats, setChats] = useState([]);
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email2</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="email-container">
        <header>
            <img src="/ollie.png" class="logo">
        </header>
        <main>
            <h1>Welcome to Ollie AI</h1>
            <p class="inside-Welcome">Use Texagon's special code to unlock <br />your free mental health credits</p>
            <div class="redeem-code">
                <input type="text" value="Rs092EROO2J" readonly>
            </div>
            <button>Redeem free credits</button>
            <h2>Here's how to redeem:</h2>
            <p>To redeem your credits, simply enter the <br />above code into the pop-up once you log in.</p>
            <p class="ensure">Ensure you sign in with the email was sent to.</p>
            <div class="email-help">
                <img src="/email_code_help.jpeg" alt="email">
            </div>
        </main>
        <footer>
            <img src="/ollie.png">
            <p>&copy; Ollie Health Inc.</p>
            <div class="flex">
                <p>2055 Limestone Rd STE 200-C,Washington,DE,New Castle,US,19808
                <div class="last-copyright">
                    <p>&copy;2024</p>
                </div>
            </div>
            </p>
        </footer>
    </div>
</body>

</html>`);
  const [css, setCss] = useState(`body {
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    background-color: #f4f4f4;

}


.email-container {
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

header {
    text-align: center;
    margin-bottom: 20px;
}

.logo {
    width: 60px;
}

main {
    text-align: center;
}


input {
    width: 50%;
    font-size: 16px;
    padding: 10px 15px;
    border: none;
    text-align: center;
    color: #666;
    border-radius: 20px;
    margin-bottom: 15px;
    cursor: pointer;

}

button {
    width: 55%;
    border: none;
    color: rgb(255, 255, 255);
    background-color: rgb(92, 42, 197);
    font-size: 16px;
    border-radius: 15px;
    padding: 10px 5px;
    cursor: pointer;
}

.inside-Welcome {
    width: 430px;
    margin-left: 110px;
}

.ensure {
    font-size: 12px;
    color: #ccc;
    margin-left: 125px;

}



.email-help img {
    max-width: 350px;
    margin-bottom: 30px;
}

main p {
    width: 420px;
    margin-left: 110px;

}

h2 {
    font-size: 20px;
    color: #333;
    margin-bottom: 10px;
}


h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
}

footer img {
    width: 40px;
}

footer p {
    color: #333;
    font-weight: bold;
    font-size: 10px;

}


footer div {
    display: flex;
    direction: row;
    gap: 245px;
}`);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (chat != "") {
      const updatedchat = [...chats, chat];
      setChats(updatedchat);
      localStorage.setItem("chat", JSON.stringify(updatedchat));
      setIframe(chat);
      setChat("");
    }
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("please Fill field");
      setEmail("");
    }
    else if (email.includes("@gmail.com") || email.includes("@yahoo.com")) {
      localStorage.setItem("email", email);
      setEmails(email);
      setEframe(email);
      setEmail("");
    }
    else {
      alert('email format or email provider name is incorrect')
      setEmail("");

    }
  };

  useEffect(() => {
    let chatValue = localStorage.getItem("chat");
    if (chatValue) {
      try {
        setChats(JSON.parse(chatValue));
      } catch {
        setChats([]);
      }
    } else {
      setChats([]);
    }
  }, []);
  useEffect(() => {
    let chatValue = localStorage.getItem("email");
    if (chatValue) {
      try {
        setEmails(chatValue);
      } catch {
        setEmails('');
      }
    } else {
      setEmails('');
    }
  }, []);
  const Code = ({ html, css }) => {
    return (
      <Box bg="gray.500" p={4} m={2} borderRadius="md" overflowX="auto" overflowY="auto">
        <Heading size="md" mb={2}>
          HTML
        </Heading>
        <pre>
          <code contentEditable="true">{html || "No HTML yet."}</code>
        </pre>
        <Heading size="md" mt={4} mb={2}>
          CSS
        </Heading>
        <pre>
          <code contentEditable="true">{css || "No CSS yet."}</code>
        </pre>
      </Box>
    );
  }
  const Preview = ({ html, css }) => {
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

      <iframe
        srcDoc={iframeContent}
        style={{ width: "670px", height: "70vh", border: "none", overflowY: "hidden" }}
        title="Preview"
        sandbox="allow-scripts"
      />
    );
  };

  return (
    <Box fontFamily="sans-serif">
      <Flex flexDir="row" borderColor="brand.400" borderWidth="2px">
        <Sidebar />
        <Divider
          orientation="vertical"
          h="99vh"
          borderWidth="2px"
          borderColor="brand.400"
        />
        <Flex
          flexDir="column"
          w={{ md: '45%', lg: '50%' }}
          h="100vh"
          bgColor="brand.100"
          border="brand.500"
        >
          <Flex>
            <Text
              mr="10px"
              ml="4px"
              fontSize="20px"
              mt="16px"
              fontWeight="bold"
              color="brand.400"
            >
              Email
            </Text>
            <Input
              mt="10px"
              mr="8px"
              borderColor="brand.400"
              value={email}
              w={{
                md: "600px", lg: "685px"
              }}
              placeholder="Enter your email"
              color="brand.400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              bgColor="brand.200"
              color="brand.500"
              mb="20px"
              mt="10px"
              _hover={{ backgroundColor: "brand.200" }}
              mr="2px"
              w="110px"
              onClick={handleEmail}
            >
              Send
            </Button>
          </Flex>
          <Divider borderWidth="2px" borderColor="brand.400" />
          <Flex flexDir="column">
            <Text fontWeight="bold" alignSelf="flex-start" fontSize={{ md: "18px", lg: "25px" }} mt="4px" mb={{ md: "5px", lg: "4px" }} ml="4px" backgroundColor="brand.300" borderRadius="20px" padding="16px">
              Hello, how may I assist you?
            </Text>
            {chats.map((chatMessage, index) => (
              <Text key={index} color="brand.500" alignSelf="flex-end" fontWeight="bold" mb="4px" ml="4px" mr="4px" mt={{ md: "8px", lg: "5px" }} fontSize="25px" backgroundColor="brand.200" borderRadius="20px" padding="16px">
                {chatMessage}
              </Text>
            ))}
          </Flex>
          <Flex mt="auto">
            <Flex flexDir="row" justifyContent="flex-end" alignItems="flex-end">
              <Input
                ml={{ md: "5px", lg: "7px" }}
                mr={{ md: "5px", lg: "15px" }}
                borderColor="brand.400"
                value={chat}
                w={{
                  md: '35vw',//768px
                  lg: "41vw",// ~992px
                  xl: "42.5vw",  // ~1280px

                }}
                placeholder="Type something to chat"
                color="brand.400"
                onChange={(e) => setChat(e.target.value)}
              />
              <Button
                color="brand.500"
                bgColor="brand.200"
                _hover={{ backgroundColor: "brand.200" }}
                mr="2px"
                w={{
                  md: "62px", // ~768px
                  lg: "63px",// ~992px
                  xl: "65px"//1280px
                }}
                onClick={handleSubmit}
              >
                Chat
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <Divider
          orientation="vertical"
          h="99vh"
          borderWidth="2px"
          borderColor="brand.400"
        />
        <Flex
          flexDir="column"
          w="50%"
          h="99.5vh"
          borderWidth="2px"
          bgColor="brand.100"
        >          <Flex flexDir="column">
            <Box as="div" fontSize={{ md: "20px", lg: "30px" }}>{emails}</Box>
            {eframe && (
              <>
                <Flex flexDir="row">
                  <Tabs>
                    <TabList>
                      <Tab color="brand.400" fontSize="30px" fontWeight="bold">Code</Tab>
                      <Tab color="brand.400" fontSize="30px" fontWeight="bold">Preview</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Flex w="40vw" h="81.5vh">
                          <Code html={html} css={css} />
                        </Flex>
                      </TabPanel>
                      <TabPanel>
                        <Preview html={html} css={css} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Flex>
              </>
            )}
          </Flex>
          {iframe && (
            <Flex flexDir="column">
              <Heading color="brand.400">Output</Heading>
              <Box>
                <iframe srcDoc={iframe} width="50%" height="200px"></iframe>
              </Box>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box >
  );
}
