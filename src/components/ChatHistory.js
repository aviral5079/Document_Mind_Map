import React from "react";
import { Stack, Avatar, Icon } from "@chakra-ui/react";
import { GoDependabot } from "react-icons/go";
import { chatMessages } from "../data/chatMessages";

const ChatHistory = () => {
  return (
    <ul className="history">
      {chatMessages.map((message, index) => (
        <li key={index} className={`${message.role}-message`}>
          {message.role === "user" ? (
            <Stack direction="row" spacing={2}>
              <Avatar size="xs" bg="#3F72AF" />
              <span>{message.message}</span>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Avatar
                size="sm"
                bg="#f9f7f7"
                icon={<Icon as={GoDependabot} color="#23272a" />}
              />
              <span>{message.message}</span>
            </Stack>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChatHistory;
