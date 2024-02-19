import { Container } from "@mantine/core";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";

export function BkChatPage() {
  return (
    <Container size="100%">
      <ChatInterface />
    </Container>
  );
}
