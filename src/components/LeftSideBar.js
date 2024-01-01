import React from "react";
import DocumentList from "./DocumentList";
import FileInput from "./FileInput";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";

import { GrDocument } from "react-icons/gr";

import "../styles/leftSideBar.css";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <div className="left-sidebar">
      <Button ref={btnRef} color="#3F72AF" borderRadius="0" onClick={onOpen}>
        <Icon as={GrDocument} />
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
    </div>
  );
};

export default SideBar;
