import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPencil, IconSearch } from "@tabler/icons-react";
import { Layout } from "~/components/Layout";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { useAllSurveyQuestions } from "~/modules/communication/api/useAllSurveyQuestions";

export default function CommunicationPage() {
  const { data } = useAllSurveyQuestions();
  return (
    <ProtectedRoute>
      <Layout>
        {data && (
          <>
            <Container size={720} ta="center">
              <Stack>
                <Title order={3}>Communication</Title>
                <Text>
                  Discover numerous popular recipes that you can send with just
                  a few clicks.
                </Text>
                <Group justify="center">
                  {data.categories.map(({ category }) => {
                    return (
                      <Badge
                        tt="capitalize"
                        variant="azalio-ui-secondary"
                        size="lg"
                      >
                        {category}
                      </Badge>
                    );
                  })}
                </Group>
              </Stack>
            </Container>
            <Stack>
              <Group gap="sm">
                <Title order={3}>All</Title>
                <Badge size="lg">{data.data.length}</Badge>
              </Group>
              <Group justify="space-between">
                <Box>
                  <TextInput
                    styles={{ input: { maxHeight: 36 } }}
                    miw={260}
                    leftSection={<IconSearch size={20} />}
                    placeholder="Search"
                  />
                </Box>
                <Box>
                  <Button mr="md" variant="azalio-ui-outline">
                    Schedules
                  </Button>
                  <Button>View Responses</Button>
                </Box>
              </Group>
              <SimpleGrid cols={4}>
                {data.data.map((item) => {
                  return (
                    <Paper p="md">
                      <Group justify="space-between" mb="md">
                        <Paper
                          h={40}
                          w={40}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <i className={item.iconClass} />
                        </Paper>
                        <Group align="center">
                          <Switch size="md" />
                          <ActionIcon variant="azalio-ui-secondary">
                            <IconPencil size={14} />
                          </ActionIcon>
                        </Group>
                      </Group>
                      <Title order={6} fz={14} fw={600} lh={1.4}>
                        {item.title}
                      </Title>
                    </Paper>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </>
        )}
      </Layout>
    </ProtectedRoute>
  );
}
