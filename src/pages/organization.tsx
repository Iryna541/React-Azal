import { Layout } from "~/components/Layout";
import { useAllUsers } from "~/modules/organization/api/useAllUsers";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { UsersTable } from "~/modules/organization/users-table/UsersTable";
import { Box, Title, Divider, Button, Flex } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

export default function OrganizationPage() {
  const { data } = useAllUsers();
  return (
    <ProtectedRoute>
      <Layout>
        <Flex justify="space-between">
          <Title order={3} mb="lg">
            Organization
          </Title>
          <Button leftSection={<IconUserPlus size={16} />}>Add User</Button>
        </Flex>
        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={500} fz={16}>
              Users
            </Title>
          </Box>
          <Divider />
          {data && <UsersTable data={data.users} />}
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}
