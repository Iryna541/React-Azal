import { Container } from "@mantine/core";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";

export function ChatPage() {
  return (
    <Container size="sm">
      <ChatInterface />
    </Container>
  );
}
