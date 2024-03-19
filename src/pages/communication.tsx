import { Badge, Container, Group, Stack, Text, Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";

export default function CommunicationPage() {
  const badges = [
    "Active",
    "All",
    "Feedback",
    "Motivational",
    "Onboarding",
    "Personal",
  ];
  return (
    <ProtectedRoute>
      <Layout>
        <Container size={720} ta="center">
          <Stack>
            <Title order={3}>Communication</Title>
            <Text>
              Discover numerous popular recipes that you can send with just a
              few clicks.
            </Text>
            <Group justify="center">
              {badges.map((badge) => {
                return (
                  <Badge
                    tt="capitalize"
                    variant="azalio-ui-secondary"
                    size="lg"
                  >
                    {badge}
                  </Badge>
                );
              })}
            </Group>
          </Stack>
        </Container>
      </Layout>
    </ProtectedRoute>
  );
}
