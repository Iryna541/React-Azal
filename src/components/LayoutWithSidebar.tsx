import { AppShell, Box, Flex, NavLink, ScrollArea, Title } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVBAR_LINKS } from "./Layout";

export function LayoutWithSidebar({
  children,
  sidebar,
}: PropsWithChildren<{ sidebar: ReactNode }>) {
  const location = useLocation();
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
      <AppShell.Navbar p={28}>
        <Title order={3} mb="xl" fw={800}>
          Azalio
        </Title>
        {NAVBAR_LINKS.map((link, index) => {
          const isActive = link.href === location.pathname;
          return (
            <NavLink
              key={index}
              to={link.href}
              component={Link}
              active={isActive}
              leftSection={link.Icon}
              label={link.label}
            />
          );
        })}
      </AppShell.Navbar>
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
              background: "hsl(var(--primary) / 0.075)",
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
