import {
  Avatar,
  Box,
  Group,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { RevealingText } from "./RevealingText";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { BkLogo } from "./BkLogo";
import { Message as IMessage } from "./ChatContext";

export interface MessageProps {
  message: IMessage;
  shouldAnimate: boolean;
}

export function Message({ message, shouldAnimate }: MessageProps) {
  const messageHtml = DOMPurify.sanitize(marked(message.text) as string);
  return (
    <Group
      mb="sm"
      justify={!message.isRagResponse ? "flex-end" : "flex-start"}
      align="flex-start"
      gap="xs"
      wrap="nowrap"
    >
      <Box>
        {!shouldAnimate ? (
          <Box
            p="sm"
            style={{
              background: message.isRagResponse
                ? "hsl(var(--bk-background) / 0.05)"
                : "hsl(var(--bk-background))",
              color: !message.isRagResponse
                ? "hsl(var(--bk-foreground))"
                : "hsl(var(--bk-background))",
              borderRadius: "8px 0px 8px 8px",
            }}
          >
            {message.isRagResponse ? (
              <TypographyStylesProvider p="0" m="0">
                <div
                  style={{ fontSize: 14 }}
                  dangerouslySetInnerHTML={{ __html: messageHtml }}
                />
              </TypographyStylesProvider>
            ) : (
              <Text
                size="sm"
                style={{
                  color: !message.isRagResponse
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--secondary-foreground))",
                }}
              >
                {message.text}
              </Text>
            )}
          </Box>
        ) : (
          <RevealingText text={messageHtml} />
        )}
      </Box>

      <Box style={{ order: !message.isRagResponse ? 0 : -1 }}>
        {!message.isRagResponse ? (
          <Avatar
            style={{
              cursor: "pointer",
            }}
            size="md"
            alt="Sender's Avatar"
          />
        ) : (
          <BkLogo height={38} width={38} />
        )}
      </Box>
    </Group>
  );
}
