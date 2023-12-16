import React from "react";
import { Stack, Avatar, AvatarBadge } from "@chakra-ui/react";

const chatMessages = [
  { role: "user", message: "Hi, I need some information about the document." },
  {
    role: "chatbot",
    message: "Hello! I'm here to help. What specific information do you need?",
  },
  { role: "user", message: "I want to know the document's title and author." },
  { role: "chatbot", message: "Sure! Let me fetch that information for you." },
  {
    role: "chatbot",
    message: 'The document is titled "Understanding React" by John Doe.',
  },
  { role: "user", message: "Great! Thank you for the information." },
  {
    role: "chatbot",
    message:
      "You're welcome! If you have any more questions, feel free to ask.",
  },
  { role: "user", message: "How long is the document?" },
  { role: "chatbot", message: "The document has 200 pages in total." },
  { role: "user", message: "Perfect! That's exactly what I needed to know." },
];

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
