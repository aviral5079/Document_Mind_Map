import React from "react";
import DocumentList from "./DocumentList";
import FileInput from "./FileInput";
import ChatBar from "./ChatBar";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import { HamburgerIcon, ChatIcon } from "@chakra-ui/icons";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div className="navbar">
      <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Document MindMap</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column">
            <DocumentList />
            <FileInput />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <ChatBar />
    </div>
  );
};

export default SideBar;
