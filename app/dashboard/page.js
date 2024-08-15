"use client";
import { Flex, Box, Heading, Divider, Button, Tabs, Tab, TabPanel, TabPanels, TabList, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack, color } from "@chakra-ui/react";
import { Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useDisclosure } from '@chakra-ui/react'
import { IoIosMail } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Spinner } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import OpenAI from "openai";
import { useRouter } from "next/navigation";
import Preview from "@/components/preview";
import Code from "@/components/code";


export default function Home() {
    const [email, setEmail] = useState("");
    const [chat, setChat] = useState("");
    const [iframe, setIframe] = useState("");
    const [eframe, setEframe] = useState("");
    const [emails, setEmails] = useState("");
    const [loading, setLoading] = useState(false)
    const client = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const [chats, setChats] = useState([]);
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [htmlCode, setHTMLCode] = useState('')
    const [cssCode, setCssCode] = useState('')
    const [jsCode, setJsCode] = useState('')
    const [html, setHtml] = useState(`
<body>
    <div class="email-container">
        <header>
            <img src="/ollie.png" class="logo">
        </header>
        <main>
            <h1>Welcome to Ollie AI</h1>
            <p class="inside-Welcome">Use Texagon's special code to unlock 
            <br />your free mental health credits
            </p>
            <div class="redeem-code">
                <input type="text" value="Rs092EROO2J" readonly>
            </div>
            <button>Redeem free credits</button>
            <h2>Here's how to redeem:</h2>
            <p>To redeem your credits, simply enter the 
            <br />
            above code into the pop-up once you log in.</p>
            <p class="ensure">Ensure you sign in with the
             email was sent to.
            </p>
            <div class="email-help">
                <img src="/email_code_help.jpeg" alt="email">
            </div>
        </main>
        <footer>
            <img src="/ollie.png">
            <p class="inc">&copy; Ollie Health Inc.</p>
            <div class="flex">
                <p>2055 Limestone Rd STE 200-C,Washington,DE,New Castle,US,19808
                <div class="last-copyright">
                    <p class="copyright">&copy;2024</p>
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
    margin-top: 8px;
    margin-bottom: 9px;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

header {
    text-align: center;
    margin-bottom: 12px;
}

.logo {
    width: 50px;
}

main {
    text-align: center;
}

input {
    width: 35%;
    font-size: 10px;
    padding: 5px 10px;
    border: none;
    text-align: center;
    color: #666;
    border-radius: 14px;
    margin-bottom: 2px;
    cursor: pointer;
}

button {
    width: 30%;
    border: none;
    color: rgb(255, 255, 255);
    background-color: rgb(92, 42, 197);
    font-size: 12px;
    border-radius: 13px;
    padding: 7px 3px;
    cursor: pointer;
}

.inside-Welcome {
    width: 410px;
    margin-left: 45px;
}

.ensure {
    font-size: 12px;
    color: #ccc;
    margin-left: 105px;
}

.email-help img {
    max-width: 90px;
    margin-bottom: 4px;
}

main p {
    width: 310px;
    margin-left: 80px;
}

h2 {
    font-size: 10px;
    color: #333;
    margin-bottom: 2px;
}

h1 {
    font-size: 14px;
    color: #333;
    margin-bottom: 2px;
}

footer img {
    width: 27px;
    margin-left:41px;
}
    margin-left:41px;
}

footer p {
    color: #333;
    font-weight: bold;
    font-size: 8px;
    margin-left:41px;
}

footer .inc {
    margin-left:43px;
    margin-left:41px;
}

footer .inc {
    margin-left:43px;
}

.copyright {
    margin-right:31px;

.copyright {
    margin-right:31px;
}


footer div {
    display: flex;
    direction: row;
    gap: 118px;
}`);

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
        const emailValue = localStorage.getItem("email");
        if (emailValue) {
            try {
                setEmails(emailValue);
            } catch {
                setEmails('');
            }
        } else {
            setEmails('');
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (chat !== "") {
            setLoading(true)
            try {
                console.log('start of try block')
                const updatedchat = [...chats, { type: "user", message: chat }];
                setChats(updatedchat);
                localStorage.setItem("chat", JSON.stringify(updatedchat));
                const completion = await client.chat.completions.create({
                    messages: [
                        { role: "system", content: "Generate email template in Json format" },
                        { role: "user", content: chat },
                        {
                            role: "user", content: `Please provide  the output in following json format:
                            {
                            "HTML":"Your HTML code",
                            "CSS":"Your CSS code",
                            "Javascript":"Your Javascript code"
                            }
                            `},
                    ],
                    model: "gpt-4o-mini",
                    temperature: 0.2,
                    response_format: { type: "json_object" },
                });
                console.log(updatedchat)
                const response = completion.choices[0].message.content;
                setLoading(false)
                console.log(reply)
                const parseResponse = JSON.parse(response)
                console.log(parseResponse)

                const formattedReply = `HTML:\n${parseResponse.HTML}\n\nCSS:\n${parseResponse.CSS}\n\nJavaScript:\n${parseResponse.Javascript}`;

                const finalChats = [...updatedchat, { type: "assistant", message: formattedReply }];
                setChats(finalChats)
                setHTMLCode(parseResponse.HTML || '')
                setCssCode(parseResponse.CSS || '')
                setJsCode(parseResponse.Javascript || '')
                localStorage.setItem("chat", JSON.stringify(finalChats));
                console.log(finalChats)
                setIframe(chat);
                setChat("");
                console.log(htmlCode)
                console.log(cssCode)
                console.log(jsCode)

                console.log(htmlCode)
                console.log(cssCode)
                console.log(jsCode)

            }
            catch (error) {
                console.log('Error fetching completion', error);
                setLoading(false)
            }
        }
    };

    useEffect(() => {
        const chatValue = localStorage.getItem("chat");
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

    return (
        <Box fontFamily="sans-serif" h="100vh" overflow="hidden">
            <Box backgroundColor="brand.100" display={{ sm: "block", lg: "none" }}>
                <IconButton
                    onClick={onOpen}
                    icon={<HamburgerIcon />}
                    display={{ sm: "block", lg: "none" }}
                    backgroundColor="brand.100"
                    zIndex="overlay"
                />

                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody backgroundColor="brand.100">
                            <VStack alignItems="flex-start" overflow="hidden">
                                <Box as='div'>
                                    <Flex w="135px" h='100vh' backgroundColor="brand.100" >
                                        <Flex flexDir="column">
                                            <Flex>
                                                <Box as='div'>
                                                    <IoIosMail fontSize="35px" color="brand.400" />
                                                </Box>
                                                <Text ml="7px" mt="10px" mr="10px" fontSize="15px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard')} >AI Mailbox</Text>
                                            </Flex>
                                            <Flex alignItems="flex-end" mt="85vh">
                                                <CiSettings color="brand.400" fontSize="35px" />
                                                <Text fontSize="15px" ml="7px" mr="10px" mb="5px" fontWeight="bold" color="brand.400" _hover={{ cursor: 'pointer' }} onClick={() => router.push('/settings')}>
                                                    Settings
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Box >
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
            <Flex flexDir="row" borderColor={{ sm: "brand.400", lg: "brand.400" }} borderWidth="2px">
                <Box display={{ sm: "none", lg: "block" }}>
                    <Sidebar />
                </Box>
                <Divider
                    orientation="vertical"
                    h="100vh"
                    borderWidth="2px"
                    borderColor="brand.400"
                    display={{ sm: "none", lg: "block" }}
                />
                <Flex
                    flexDir="column"
                    height={{ sm: "93vh", lg: "99.5vh" }}
                    w={{ sm: "45%", lg: "45%" }}
                    bgColor="brand.100"
                    border="brand.500"
                    flexGrow={{ sm: 1, lg: 1 }}
                >
                    <Flex>
                        <Text
                            mr={{ sm: "4px", lg: "10px" }}
                            ml={{ sm: "2px", lg: "4px" }}
                            fontSize="20px"
                            mt="16px"
                            fontWeight="bold"
                            color="brand.400"
                        >
                            Email
                        </Text>
                        <Input
                            mt="10px"
                            mr={{ sm: "4px", lg: "8px" }}
                            borderColor="brand.400"
                            value={email}
                            w={{
                                sm: "600px", lg: "685px"
                            }}
                            placeholder="Enter your email"
                            color="brand.400"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            bgColor="brand.200"
                            color="brand.500"
                            mb={{ sm: "7px", lg: "10px" }}
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
                    <Flex flexDir="column" flex={{ sm: "1", lg: "1" }} overflow={{ sm: "auto", lg: "auto" }} maxHeight={{ sm: "calc(100vh - 160px)", lg: "calc(100vh - 170px)" }}>
                        <Text fontWeight="bold" alignSelf="flex-start" fontSize={{ sm: "14px", lg: "20px" }} mt={{ sm: "4px", lg: "6px" }} mb={{ sm: "5px", lg: "4px" }} ml={{ sm: "4px", lg: "6px" }} backgroundColor="brand.300" borderRadius="20px" padding="12px">
                            Hello, how may I assist you?
                        </Text>
                        {chats?.map((chatMessage, index) => (
                            <Flex key={index} sx={{ justifyContent: chatMessage.type === 'user' ? 'flex-end' : 'flex-start' }}>
                                <Flex flexDir="column" sx={{ backgroundColor: chatMessage.type === 'user' ? 'brand.200' : 'brand.300' }} mb="4px" ml="4px" mr="8px" width="fit-content" borderRadius="15px" padding="8px" justifyContent={{ sm: "center", lg: "center" }} alignItems={{ sm: "center", lg: "center" }} pt="7px" >
                                    <Text color="brand.500" sx={{ color: chatMessage.type === 'user' ? 'brand.500' : 'brand.400' }} fontWeight="bold" mt={{ sm: "8px", lg: "5px" }} fontSize="20px">
                                        {chatMessage.type === 'assistant' ? (
                                            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                                                {chatMessage.message}
                                            </pre>
                                        ) : (
                                            chatMessage.message
                                        )}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                    {loading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="brand.200"
                            size="lg"
                            position="center"
                            mr="2px"
                        />
                    )
                        : (
                            <Flex mt={{ sm: "auto", lg: "auto" }} mb={{ sm: "1", lg: "2" }}>
                                <Flex flexDir="row" justifyContent="flex-end" alignItems="flex-end" width="100%">
                                    <Input
                                        ml={{ sm: "5px", lg: "7px" }}
                                        mr={{ sm: "5px", lg: "8px" }}
                                        borderColor="brand.400"
                                        value={chat}
                                        w={{
                                            sm: '36.5vw',
                                            lg: "37vw",
                                            xl: "39vw",
                                        }}
                                        placeholder="Type something to chat"
                                        isDisabled={loading}
                                        color="brand.400"
                                        onChange={(e) => setChat(e.target.value)}
                                    />

                                    <Button
                                        color="brand.500"
                                        bgColor="brand.200"
                                        _hover={{ backgroundColor: "brand.200" }}
                                        mr="2px"
                                        w={{
                                            sm: "61px",
                                            lg: "62px",
                                            xl: "62px"
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Chat
                                    </Button>

                                </Flex>
                            </Flex>
                        )}
                </Flex>
                <Divider
                    orientation="vertical"
                    h="100vh"
                    borderWidth="2px"
                    borderColor="brand.400"
                />
                <Flex
                    flexDir="column"
                    w={{ sm: "55%", lg: "45%", xl: "55%" }}
                    borderWidth="2px"
                    bgColor="brand.100"
                >
                    {iframe &&
                        <>
                            <Flex flexDir="row">
                                <Tabs>
                                    <TabList>
                                        <Tab color="brand.400" fontSize="30px" fontWeight="bold">Code</Tab>
                                        <Tab color="brand.400" fontSize="30px" fontWeight="bold">Preview</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel p={0}>
                                            <Flex w={{ sm: "55vw", lg: "44vw" }} h={{ sm: "83.5vh", lg: "90vh" }}>
                                                <Code html={htmlCode} css={cssCode} js={jsCode} />
                                            </Flex>
                                        </TabPanel>
                                        <TabPanel>
                                            <Preview html={htmlCode} css={cssCode} js={jsCode} />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Flex>
                        </>
                    }
                </Flex>
            </Flex>
        </Box>
    );
}