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
  Textarea,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
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
                          <ActionIcon
                            variant="azalio-ui-secondary"
                            onClick={() => {
                              modals.open({
                                title: item.title,
                                children: (
                                  <Box>
                                    <Text size="sm" mb="sm">
                                      When an employee is hired, automatically
                                      send out a series of text messages that
                                      make it easy for the manager to get to
                                      know them.
                                    </Text>
                                    <Textarea
                                      rows={14}
                                      value={`Day 1: 
Welcome to Burger King! Over the next
few weeks, you'll receive automated messages
with helpful tips and questions in order to
make sure you have the best onboarding
experience possible. You Rule! In the
meantime, check out our Training Roadmap at
this link and log in with your Okta
credentials provided by your Manager:
https://bkgateway.whopper.com/docs/DOC-24015

Day 2: 
Again, welcome to the Burger King
Family! Help your Manager and Above
Restaurant Leadership get to know you
better. What hobbies :basketball::trumpet:
do you enjoy outside of work? You can reply
to this message directly. 

Day 3: 
Help your
Manager and Above Restaurant Leadership get
to know you better. What are three words
that describe you?
  
Day 4: 
Help your Manager
and Above Restaurant Leadership get to know
you better. What motivates you at work? Day
7: Congrats on finishing your first week at
Burger King! Which employee has helped you
the most at work? Feel free to include
anything specific about your experience so
far.`}
                                    />
                                    <Button
                                      fullWidth
                                      mt="sm"
                                      onClick={() => modals.closeAll()}
                                    >
                                      Save
                                    </Button>
                                  </Box>
                                ),
                              });
                            }}
                          >
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
