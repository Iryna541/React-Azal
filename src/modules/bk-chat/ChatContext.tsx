import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface Message {
  isRagResponse: boolean;
  text: string;
  createdAt: number;
}

export const ChatContext = createContext<
  { messages: Message[]; addMessage: (message: Message) => void } | undefined
>(undefined);

export function ChatProvider({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);

  function addMessage(message: Message) {
    setMessages((prev) => {
      return [...prev, message];
    });
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
