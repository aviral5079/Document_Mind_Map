// File: ChatInput.js
import React from "react";
import { InputRightElement, InputGroup, Input, Button } from "@chakra-ui/react";

import { ArrowUpIcon } from "@chakra-ui/icons";

const ChatInput = () => {
  return (
    <InputGroup size="md">
      <Input pr="4.5rem" type="text" placeholder="Enter question" />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm">
          <ArrowUpIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
