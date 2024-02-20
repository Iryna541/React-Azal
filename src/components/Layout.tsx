import { AppShell, NavLink, ScrollArea, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconAnalytics,
  IconAutomation,
  IconCommunication,
  IconDashboard,
} from "~/assets";

const ICON_SIZE = 26;

const NAVBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/askq",
    Icon: <IconDashboard height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    label: "Analytics",
    href: "/askq/analytics",
    Icon: <IconAnalytics height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    label: "Automations",
    href: "/askq/automations",
    Icon: <IconAutomation height={ICON_SIZE} width={ICON_SIZE} />,
  },
  {
    label: "Communication",
    href: "/askq/communication",
    Icon: <IconCommunication height={ICON_SIZE} width={ICON_SIZE} />,
  },
];

export function Layout({ children }: PropsWithChildren) {
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
        <ScrollArea
          scrollbars="y"
          h="calc(100vh - 24px)"
          w="100%"
          style={{
            background: "hsl(var(--background))",
            borderRadius: "var(--mantine-radius-md)",
          }}
          p={24}
        >
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
