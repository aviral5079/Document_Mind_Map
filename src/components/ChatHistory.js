import React from "react";
import { Stack, Avatar } from "@chakra-ui/react";

import { chatMessages } from "../data/chatMessages";

const ChatHistory = () => {
  return (
    <ul className="history">
      {chatMessages.map((message, index) => (
        <li key={index} className={`${message.role}-message`}>
          {message.role === "user" ? (
            <Stack direction="row" spacing={2}>
              <Avatar size="sm" bg="grey" />
              <span>{message.message}</span>
            </Stack>
          ) : (
            <span>{message.message}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChatHistory;
