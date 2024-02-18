import { AppShell, NavLink, ScrollArea, Title } from "@mantine/core";
import {
  IconChartArcs,
  IconHome2,
  IconMessages,
  IconRobot,
} from "@tabler/icons-react";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";

const NAVBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/askq",
    Icon: <IconHome2 />,
  },
  {
    label: "Analytics",
    href: "/askq/analytics",
    Icon: <IconChartArcs />,
  },
  {
    label: "Automations",
    href: "/askq/automations",
    Icon: <IconRobot />,
  },
  {
    label: "Communication",
    href: "/askq/communication",
    Icon: <IconMessages />,
  },
];

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  return (
    <AppShell
      navbar={{
        width: 240,
        breakpoint: "sm",
      }}
      padding="sm"
    >
      <AppShell.Navbar p={28}>
        <Title order={3} mb="lg" fw={800}>
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
      <AppShell.Main style={{ background: "hsl(var(--secondary))" }}>
        <ScrollArea
          h="calc(100vh - 24px)"
          w="100%"
          style={{
            background: "hsl(var(--background))",
            borderRadius: "var(--mantine-radius-md)",
          }}
          p="lg"
        >
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
