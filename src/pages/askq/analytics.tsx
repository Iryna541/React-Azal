import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Title,
  Tooltip,
  TypographyStylesProvider,
} from "@mantine/core";
import { Layout } from "~/components/Layout";
import IframeResizer from "iframe-resizer-react";
import useStoreRanking from "~/modules/bk-store-ranking/api/useStoreRanking";
import { StoreRankingTable } from "~/modules/bk-store-ranking/StoreRankingTable";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { CalenderTable } from "~/components/CalenderTable";
import { IconBulb } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { marked } from "marked";

export default function AnalyticsPage() {
  const { data } = useStoreRanking();
  const { data: busterIframeData, isLoading } = useBusterIFrame();

  const worstManagersData: ManagerRankingData = (data ?? [])
    .slice(0, 5)
    .map((item, index) => {
      return {
        position: index + 1,
        manager: item.general_managers,
        fss: item.fss_ranking,
        financials: item.mgr_profit_ranking,
        insights: `## Hey`,
      };
    });

  const topManagersData: ManagerRankingData = [...(data ?? [])]
    .reverse()
    .slice(0, 5)
    .map((item, index) => {
      return {
        position: index + 1,
        manager: item.general_managers,
        fss: item.fss_ranking,
        financials: item.mgr_profit_ranking,
        insights: `## Hey`,
      };
    });

  console.log(data);

  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3}>Analytics</Title>
        <Box m={-20} py={20}>
          {busterIframeData && (
            <IframeResizer
              width="100%"
              height={700}
              style={{
                border: 0,
                width: "1px",
                minWidth: "100%",
                overflow: "hidden",
              }}
              src={busterIframeData.iframe}
            ></IframeResizer>
          )}
          {isLoading && (
            <Center h={700}>
              <Loader size="lg" type="dots" />
            </Center>
          )}
        </Box>

        <Tabs variant="pills" radius="xs" defaultValue="store">
          <Tabs.List mb="lg">
            <Tabs.Tab value="store">Store</Tabs.Tab>
            <Tabs.Tab value="manager">Manager</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="store">
            <Stack gap="xl">
              <SimpleGrid cols={2}>
                <ManagerRankingTable
                  title="Top 5 Best Store Managers"
                  data={topManagersData}
                />
                <ManagerRankingTable
                  title="Top 5 Worst Store Managers"
                  data={worstManagersData}
                />
              </SimpleGrid>
              <Box
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              >
                <Box px="lg" py="md">
                  <Title order={5} fw={500} fz={16}>
                    Store Leaderboard
                  </Title>
                  <Title
                    component="p"
                    order={6}
                    fz={14}
                    fw={500}
                    size="sm"
                    lh={1.5}
                  >
                    Which locations are doing better?
                  </Title>
                </Box>
                <Divider />
                {data && <StoreRankingTable data={data} />}
              </Box>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="manager">
            <CalenderTable data={datax} />
          </Tabs.Panel>
        </Tabs>
        <Box mt="xl">
          <ChatInterface />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}

type ManagerRankingData = Array<{
  position: number;
  manager: string;
  fss: string;
  financials: string;
  insights: string;
}>;

function ManagerRankingTable({
  title,
  data,
}: {
  title: string;
  data: ManagerRankingData;
}) {
  return (
    <Box>
      <Title order={5} mb="lg">
        {title}
      </Title>
      <Grid
        bg="hsl(var(--secondary))"
        c="hsl(var(--foreground) / 0.65)"
        fw={700}
        fz={14}
        px="md"
        style={{ borderRadius: 4 }}
        mb="lg"
      >
        <Grid.Col span={2}>Position</Grid.Col>
        <Grid.Col span={4}>Manager</Grid.Col>
        <Grid.Col span={2}>FSS</Grid.Col>
        <Grid.Col span={2}>Financials</Grid.Col>
        <Grid.Col span={2}>Total</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item) => {
          return (
            <Grid
              // bg="hsl(var(--secondary))"
              c="hsl(var(--foreground) / 0.65)"
              fw={700}
              fz={14}
              px="md"
              py="md"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: 4,
              }}
            >
              <Grid.Col span={2}>{item.position}</Grid.Col>
              <Grid.Col span={4} c="hsl(var(--foreground))">
                {item.manager}
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2,0.2)"
                  c="rgb(255, 138, 2)"
                >
                  {item.fss}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {item.financials}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex align="center" justify="end" gap={6}>
                  <Badge
                    size="lg"
                    fw={700}
                    bg="rgba(63, 221, 120, 0.24)"
                    c="rgb(63, 221, 120)"
                  >
                    {parseInt(item.fss) + parseInt(item.financials)}
                  </Badge>
                  <Tooltip label="Overview">
                    <ActionIcon
                      size="xs"
                      variant="light"
                      onClick={() => {
                        const content = marked.parse(item.insights) as string;
                        modals.open({
                          size: "lg",
                          title: `${item.manager} - Overview`,
                          children: (
                            <TypographyStylesProvider>
                              <div
                                dangerouslySetInnerHTML={{ __html: content }}
                              ></div>
                            </TypographyStylesProvider>
                          ),
                        });
                      }}
                    >
                      <IconBulb size={14} />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}

const datax = [
  {
    manager: "Tiffanie",
    monday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    tuesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    Wednesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
    ],
    thursday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
    ],
    friday: [
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    saturday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    sunday: [
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store -3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
  },
  {
    manager: "Carousel",
    monday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    tuesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    Wednesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    thursday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    friday: [
      {
        store: "store -1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    saturday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    sunday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store -3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
  },
  {
    manager: "Jawad",
    monday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    tuesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    Wednesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    thursday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    friday: [
      {
        store: "store -1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    saturday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    sunday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store -3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
  },
  {
    manager: "XXXWXdf",
    monday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    tuesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    Wednesday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    thursday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-2",
        task: "Solve xyz issue",
        time: "Evening",
      },
    ],
    friday: [
      {
        store: "store -1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    saturday: [
      {
        store: "store-3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
    sunday: [
      {
        store: "store-1",
        task: "Solve xyz issue",
        time: "Morning",
      },
      {
        store: "store -2",
        task: "Solve xyz issue",
        time: "Evening",
      },
      {
        store: "store -3",
        task: "Solve xyz issue",
        time: "Afternoon",
      },
    ],
  },
];
