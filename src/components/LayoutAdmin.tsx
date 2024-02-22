import { AppShell, ScrollArea } from "@mantine/core";
import { PropsWithChildren } from "react";

export function LayoutAdmin({ children }: PropsWithChildren) {
  return (
    <AppShell padding="sm">
      <AppShell.Main p={0}>
        <ScrollArea scrollbars="y" h="100vh" w="100%">
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
