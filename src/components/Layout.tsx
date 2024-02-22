import {
  AppShell,
  Box,
  Flex,
  Menu,
  NavLink,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconAnalytics,
  IconAutomation,
  IconCommunication,
  IconDashboard,
} from "~/assets";
import { useUser } from "~/modules/auth/hooks/useUser";
import { Avatar } from "./Avatar";
import { UserData } from "~/modules/auth/contexts/AuthContext";
import { IconLogout, IconSettings } from "@tabler/icons-react";

const ICON_SIZE = 26;

export const NAVBAR_LINKS = [
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

export function Sidebar() {
  const location = useLocation();
  const { user } = useUser();

  return (
    <AppShell.Navbar p={28}>
      <AppShell.Section grow>
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
      </AppShell.Section>
      <AppShell.Section mx={-12}>
        {user && <UserMenu user={user} />}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function UserMenu({ user }: { user: UserData }) {
  return (
    <Menu
      styles={{
        dropdown: {
          background: "#353a3c",
          left: 12,
        },
        item: {
          color: "white",
          height: 40,
          fontWeight: 600,
        },
      }}
      shadow="md"
      width={230}
    >
      <Menu.Target>
        <Flex align="center" gap="sm" style={{ cursor: "pointer" }}>
          <Avatar size="md" fullName={user.name} />
          <Box>
            <Title order={6}>{user.name}</Title>
            <Text w={150} c="white" size="xs" truncate="end">
              {user.email}
            </Text>
          </Box>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconSettings style={{ width: 16, height: 16 }} />}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout style={{ width: 16, height: 16 }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
