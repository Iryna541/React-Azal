import { useState } from "react";
import { useChat } from "./api/useChat";
import { ActionIcon, Group, TextInput } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { useChatContext } from "./ChatContext";

export function ChatInput() {
  const [value, setValue] = useState("");

  const { addMessage } = useChatContext();

  const { mutate: getChatResponse, isPending } = useChat({
    config: {
      onSuccess: (res) => {
        addMessage({
          text: res.answer,
          isRagResponse: true,
          createdAt: new Date().getTime(),
        });
      },
    },
  });

  const sendMessage = () => {
    addMessage({
      text: value,
      isRagResponse: false,
      createdAt: new Date().getTime(),
    });
    getChatResponse({ query: value });
  };

  return (
    <>
      <Group justify="center">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && value.length > 0 && !isPending) {
              sendMessage();
              setValue("");
            }
          }}
          w="100%"
          placeholder="Type your message here..."
          rightSection={
            <ActionIcon
              loading={isPending}
              size="lg"
              radius={6}
              variant="azalio-ui-primary"
              mr={3}
              disabled={value.length === 0 || isPending}
              onClick={sendMessage}
            >
              <IconSend size={16} />
            </ActionIcon>
          }
          rightSectionWidth={40}
        />
      </Group>
    </>
  );
}
