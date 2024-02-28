import { Container } from "@mantine/core";
import { BkLogo } from "~/modules/bk/bk-chat/BkLogo";
import { BkChatInterface } from "~/modules/bk/bk-chat/ChatInterface";

export function BkChatPage() {
  return (
    <Container size="100%">
      <BkChatInterface
        type="bk"
        logo={<BkLogo height={38} width={38} />}
        title="BK University Chatbot"
      />
    </Container>
  );
}
