import {
  AppShell,
  Box,
  Flex,
  Image,
  Menu,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconAnalytics,
  IconAutomation,
  IconBubble,
  IconCommunication,
  IconDashboard,
} from "~/assets";
import { useUser } from "~/modules/auth/hooks/useUser";
import { Avatar } from "./Avatar";
import { UserData } from "~/modules/auth/contexts/AuthContext";
import {
  IconBuildingArch,
  IconLock,
  IconLogout,
  // IconSettings,
  // IconUsers,
} from "@tabler/icons-react";
import { storage } from "~/lib/storage";
import { BkLogo } from "~/modules/bk/bk-chat/BkLogo";

const ICON_SIZE = 26;

const NAVBAR_LINKS = [
  {
    label: "Dashboard",
    href: "/askq",
    Icon: <IconDashboard height={ICON_SIZE} width={ICON_SIZE} />,
    isLocked: true,
  },
  {
    label: "Insights",
    href: "/askq/insights",
    Icon: <IconAutomation />,
    isLocked: false,
  },
  {
    label: "Analytics",
    href: "/askq/analytics",
    Icon: <IconAnalytics height={ICON_SIZE} width={ICON_SIZE} />,
    isLocked: false,
  },
  {
    label: "Communication",
    href: "/communication",
    Icon: <IconCommunication height={ICON_SIZE} width={ICON_SIZE} />,
    isLocked: false,
  },
  {
    label: "OscarGPT",
    href: "/oscar-gpt",
    Icon: <IconBubble height={ICON_SIZE} width={ICON_SIZE} />,
    isLocked: false,
  },
];

const NAVBAR_ADMIN_LINKS = [
  {
    label: "Companies",
    href: "/admin",
    Icon: <IconBuildingArch height={ICON_SIZE} width={ICON_SIZE} />,
    isLocked: false,
  },
];

export function Layout({
  children,
  isAdmin = false,
}: PropsWithChildren<{ isAdmin?: boolean }>) {
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
      <Sidebar isAdmin={isAdmin} />
      <AppShell.Main style={{ background: "hsl(var(--accent))" }}>
        <ScrollArea
          scrollbars="y"
          h="calc(100vh - 24px)"
          w="100%"
          style={{
            background: "hsl(var(--background))",
            borderRadius: "var(--mantine-radius-lg)",
          }}
          p={32}
        >
          {children}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const location = useLocation();
  const { user, configurations } = useUser();

  let links = isAdmin ? NAVBAR_ADMIN_LINKS : NAVBAR_LINKS;

  links = links.map((link) => {
    if (
      link.label === "OscarGPT" &&
      (user?.company_id === 214 || user?.company_id === 216)
    ) {
      return { ...link, isLocked: true };
    }

    if (
      link.label === "Dashboard" &&
      (user?.company_id === 211 || user?.company_id === 212)
    ) {
      return { ...link, isLocked: false };
    }

    return link;
  });

  return (
    <AppShell.Navbar p={28}>
      <AppShell.Section grow>
        {user?.company_id === 211 ? (
          <Stack>
            <Flex gap="md">
              <BkLogo width={48} height={48} />
              <Image
                src="/russ.jpg"
                h={44}
                p={2}
                bg="white"
                style={{ borderRadius: 4 }}
              />
            </Flex>
            <Title order={3} fw={800} mb="xl">
              Oscar AI
            </Title>
          </Stack>
        ) : (
          <Title order={3} fw={800} mb="xl">
            Oscar AI
          </Title>
        )}
        {links.map((link, index) => {
          const isActive = link.href === location.pathname;
          const isLocked = link.isLocked;

          // not showing the communication tab to other customers
          if (user?.company_id !== 210 && link.label === "Communication")
            return null;

          if (isLocked) {
            return (
              <Flex key={index} align="center">
                <NavLink
                  key={index}
                  to={link.href}
                  component={Link}
                  active={isActive}
                  leftSection={link.Icon}
                  label={link.label}
                  disabled
                />
                <IconLock style={{ opacity: 0.5 }} width={24} height={24} />
              </Flex>
            );
          }
          if (
            user?.company_id === 211 &&
            (link.label === "OscarGPT" || link.label === "Analytics") &&
            configurations?.is_partner !== 1 &&
            configurations?.role.role_id !== 2
          )
            return;

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
  const { refetch } = useUser();
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
        {/* <Menu.Item
          leftSection={<IconSettings style={{ width: 16, height: 16 }} />}
        >
          Settings
        </Menu.Item> */}
        <Menu.Item
          onClick={() => {
            storage.clearToken();
            storage.clearCompanyId();
            refetch();
          }}
          leftSection={<IconLogout style={{ width: 16, height: 16 }} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
