import { AppShell, Box, Flex, ScrollArea } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";
import { Sidebar } from "./Layout";

export function LayoutWithSidebar({
  children,
  sidebar,
}: PropsWithChildren<{ sidebar: ReactNode }>) {
  return (
    <AppShell
      navbar={{
        width: 240,
        breakpoint: "sm",
        collapsed: {
          mobile: true,
        },
      }}
      padding="sm"
    >
      <Sidebar />
      <AppShell.Main style={{ background: "hsl(var(--accent))" }}>
        <Flex
          style={{
            background: "hsl(var(--background))",
            borderRadius: "var(--mantine-radius-md)",
          }}
        >
          <ScrollArea scrollbars="y" h="calc(100vh - 24px)" w="100%" p={24}>
            {children}
          </ScrollArea>
          <Box
            style={{
              flexBasis: 310,
              flexShrink: 0,
              flexGrow: 1,
              background: "#F9F8FD",
              borderTopRightRadius: "var(--mantine-radius-md)",
              borderBottomRightRadius: "var(--mantine-radius-md)",
            }}
          >
            {sidebar}
          </Box>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
