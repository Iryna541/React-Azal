import {
  Box,
  Center,
  Divider,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { ChatProvider, useChatContext } from "./ChatContext";
import { IconMessageCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

export interface ChatInterfaceProps {
  logo: ReactNode;
  title: string;
  type: "dunkin" | "bk";
}

export function BkChatInterface({ logo, title, type }: ChatInterfaceProps) {
  return (
    <ChatProvider>
      <Box style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
        <Group px="lg" py="md">
          {logo}
          <Title order={5} fw={700} fz={16}>
            {title}
          </Title>
        </Group>
        <Divider />
        <Box p="lg">
          <ScrollArea
            h="calc(100vh - 300px)"
            scrollbars="y"
            offsetScrollbars={false}
          >
            <ChatHistory logo={logo} />
          </ScrollArea>
          <ChatInput type={type} />
        </Box>
      </Box>
    </ChatProvider>
  );
}

export function ChatHistory({ logo }: { logo: ReactNode }) {
  const queryClient = useQueryClient();
  const { messages } = useChatContext();
  const isPending = !!queryClient.isMutating({ mutationKey: ["bk-chat"] });

  return (
    <>
      {messages.length === 0 && (
        <Center h="calc(100vh - 300px)" maw={400} mx="auto">
          <Stack align="center">
            <IconMessageCircle size={64} />
            <Text ta="center" fw={500}>
              No chat messages have been received yet. Feel free to initiate a
              conversation by asking a question to get started.
            </Text>
          </Stack>
        </Center>
      )}
      <Box pt="sm">
        {messages.map((message, index) => {
          const messageCreatedAt = new Date(message.createdAt);
          const currentTime = new Date();
          const shouldAnimate =
            index === messages.length - 1 &&
            message.isRagResponse &&
            currentTime.getTime() - messageCreatedAt.getTime() < 2000;
          return (
            <Message
              logo={logo}
              key={index}
              shouldAnimate={shouldAnimate}
              message={message}
            />
          );
        })}
      </Box>
      {isPending && (
        <Group
          w={"100%"}
          mt="sm"
          mb="sm"
          justify="flex-start"
          align="center"
          gap="md"
        >
          {logo}
          <Loader size="md" type="dots" />
        </Group>
      )}
    </>
  );
}
