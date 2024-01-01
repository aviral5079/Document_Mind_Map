import React from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Heading,
  Flex,
} from "@chakra-ui/react";

import { ChatIcon } from "@chakra-ui/icons";

const ChatBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div>
      <Button ref={btnRef} onClick={onOpen} color="#3F72AF" borderRadius="0">
        <ChatIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Document Chatbot</DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            justify="space-between"
          >
            <ChatHistory />
            <ChatInput />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ChatBar;
