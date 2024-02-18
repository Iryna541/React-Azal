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
import { BkLogo } from "./BkLogo";
import { IconMessageCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

export function ChatInterface() {
  return (
    <ChatProvider>
      <Group py="sm">
        <BkLogo width={40} height={40} />
        <Title order={5} c="#502314">
          BK University Chatbot
        </Title>
      </Group>
      <Divider color="hsl(var(--bk-background) / 0.1)" />
      <ScrollArea
        h="calc(100vh - 135px)"
        scrollbars="y"
        // pr="lg"
        offsetScrollbars={false}
      >
        <ChatHistory />
      </ScrollArea>
      <ChatInput />
    </ChatProvider>
  );
}

export function ChatHistory() {
  const queryClient = useQueryClient();
  const { messages } = useChatContext();
  const isPending = !!queryClient.isMutating({ mutationKey: ["bk-chat"] });

  return (
    <>
      {messages.length === 0 && (
        <Center h="calc(100vh - 250px)" maw={400} mx="auto">
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
          <BkLogo height={38} width={38} />
          <Loader
            size="md"
            type="dots"
            styles={{
              root: {
                "--loader-color": "hsl(var(--bk-background))",
              },
            }}
          />
        </Group>
      )}
    </>
  );
}
