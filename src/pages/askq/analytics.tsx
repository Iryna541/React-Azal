import {
  Box,
  Center,
  Divider,
  Flex,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { BarChart, ChartTooltipProps, DonutChart } from "@mantine/charts";
import { Layout } from "~/components/Layout";
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { BkStoreRankingTable } from "~/modules/bk/bk-store-ranking/BkStoreRankingTable";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import {
  BkManagerRankingData,
  BkManagerRankingTable,
} from "~/modules/bk/bk-manager-ranking-table/BkManagerRankingTable";
import IframeResizer from "iframe-resizer-react";
import { useUser } from "~/modules/auth/hooks/useUser";
import {
  DunkinStoreRankingData,
  DunkinTopStoreRanking,
} from "~/modules/dunkin/dunkin-top-store-ranking/DunkinTopStoreRanking";
import useDunkinStoreRanking from "~/modules/dunkin/dunkin-store-ranking/api/useDunkinStoreRanking";
import { DunkinStoreRankingTable } from "~/modules/dunkin/dunkin-store-ranking/DunkinStoreRankingTable";
import { R365StoreRankingTable } from "~/modules/restaurant365/store-ranking/R365StoreRankingTable";
import { useR365StoreRanking } from "~/modules/restaurant365/store-ranking/api/useR365StoreRanking";
import {
  StoreInsights,
  useZenoStoreRanking,
} from "~/modules/restaurant365/zeno-ranking/api/useZenoStoreRanking";
import { ZenoStoreRankingTable } from "~/modules/restaurant365/zeno-ranking/ZenoStoreRankingTable";
import { ZenoTopRankingTable } from "~/modules/restaurant365/zeno-ranking/zeno-top-ranking-table/ZenoTopRankingTable";
import { BkManagerPlanTable } from "~/modules/bk/bk-manager-plan-2/BkManagerPlanTable";
import { useBkManagerPlan } from "~/modules/bk/bk-manager-plan-2/api/useBkManagerPlan";
import { useDunkinManagerPlan } from "~/modules/dunkin/dunkin-manager-plan/api/useDunkinManagerPlan";
import { DunkinManagerPlanTable } from "~/modules/dunkin/dunkin-manager-plan/DunkinManagerPlanTable";
import { IconStarFilled } from "@tabler/icons-react";
// import { DonutChart } from "~/modules/bk/bk-charts/DonutChart";
// import { ColumnChart } from "~/modules/bk/bk-charts/ColumnChart";

export default function AnalyticsPage() {
  const { user } = useUser();

  let height = 700;
  if (user?.company_id === 212 || user?.company_id === 214) height = 1100;

  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3}>Analytics</Title>
        {/* <BusterIframe h={height} /> */}
        {user?.company_id !== 211 && <BusterIframe h={height} />}
        {user?.company_id === 211 && <BkSetup />}
        {user?.company_id === 212 && <DunkinSetup />}
        {user?.company_id === 213 && <R365Setup />}
        {user?.company_id === 214 && <ZenoSetup />}
      </Layout>
    </ProtectedRoute>
  );
}

function BusterIframe({ h }: { h: number }) {
  const { data: busterIframeData, isLoading } = useBusterIFrame();

  return (
    <Box m={-20} py={20}>
      {busterIframeData && (
        <IframeResizer
          width="100%"
          height={h}
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
  );
}

function R365Setup() {
  const { data } = useR365StoreRanking();
  return (
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
        <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
          Which locations are doing better?
        </Title>
      </Box>
      <Divider />
      {data && <R365StoreRankingTable data={data} />}
    </Box>
  );
}

function BkSetup() {
  const { data } = useStoreRanking();
  const { data: managerData } = useBkManagerPlan();
  const sortedManagersData: BkManagerRankingData = (data ?? [])
    .sort((a, b) => {
      return parseInt(a.overall_ranking) - parseInt(b.overall_ranking);
    })
    .map((item, index) => {
      return {
        position: index + 1,
        manager: item.general_managers,
        fss: item.fss_ranking,
        financials: item.mgr_profit_ranking,
        insights: item.bullet_points,
      };
    });

  return (
    <>
      <BKCharts />
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="store">
          <Stack gap="xl">
            <SimpleGrid cols={2}>
              <BkManagerRankingTable
                title="Top 5 Best Store Managers"
                data={sortedManagersData.slice(0, 5)}
              />
              <BkManagerRankingTable
                title="Top 5 Worst Store Managers"
                data={sortedManagersData.reverse().slice(0, 5)}
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
              {data && <BkStoreRankingTable data={data} />}
            </Box>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="manager">
          {managerData && <BkManagerPlanTable data={managerData} />}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

function DunkinSetup() {
  const { data } = useDunkinStoreRanking();
  const { data: managerData } = useDunkinManagerPlan();

  const topStores: DunkinStoreRankingData = [...(data ?? [])]
    .sort((a, b) => {
      return parseInt(a.store_rank) - parseInt(b.store_rank);
    })
    .map((item) => {
      return {
        store_rank: item.store_rank,
        store_id: item.store_id,
        rank_net_sales: item.rank_net_sales,
        rank_average_weekly_ticket_count: item.rank_average_weekly_ticket_count,
        rank_average_ticket_size: item.rank_average_ticket_size,
        bullet_points: item.bullet_points,
      };
    });

  return (
    <Box>
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          {/* <Tabs.Tab value="manager">Manager</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="store">
          <Stack gap={40}>
            <SimpleGrid cols={2} spacing="xl">
              <DunkinTopStoreRanking
                title="Top 5 Best Stores"
                data={topStores.slice(0, 5)}
              />
              <DunkinTopStoreRanking
                title="Top 5 Worst Stores"
                data={topStores.reverse().slice(0, 5)}
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
              {data && <DunkinStoreRankingTable data={data} />}
            </Box>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="manager">
          {managerData && <DunkinManagerPlanTable data={managerData} />}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

function ZenoSetup() {
  const { data } = useZenoStoreRanking();

  const sortedManagersData: StoreInsights[] = (data ?? []).sort((a, b) => {
    return parseInt(a.total_net_sales_rank) - parseInt(b.total_net_sales_rank);
  });

  return (
    <Stack gap="xl">
      <SimpleGrid cols={2} spacing="xl">
        <ZenoTopRankingTable
          title="Top 5 Best Stores by Net Sales"
          data={sortedManagersData.slice(0, 5)}
        />
        <ZenoTopRankingTable
          title="Top 5 Worst Stores by Net Sales"
          data={[...sortedManagersData].reverse().slice(0, 5)}
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
          <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
            Which locations are doing better?
          </Title>
        </Box>
        <Divider />

        {data && <ZenoStoreRankingTable data={data} />}
      </Box>
    </Stack>
  );
}

function BKCharts() {
  const data = [
    {
      month: "Guest Satisfaction (ACR)",
      Avg: 3.5,
      stores: [
        "4",
        "42",
        "43",
        "68",
        "77",
        "78",
        "984",
        "2755",
        "2847",
        "3197",
      ],
    },
    {
      month: "Window Time (SOS)",
      Avg: 3.3,
      stores: ["4451", "4490", "4870", "5329", "5777", "5891"],
    },
    {
      month: "Avg. Training Rate",
      Avg: 4.6,
      stores: ["8296", "13518", "16754"],
    },
    { month: "Turnover Rate", Avg: 4.4, stores: ["22872"] },
    { month: "Brand Standards", Avg: 3.8, stores: ["23205"] },
  ];

  const data2 = [
    {
      name: "Above 4.0",
      value: 10,
      color: "green.5",
      stores: [
        "4",
        "42",
        "43",
        "68",
        "77",
        "78",
        "984",
        "2755",
        "2847",
        "3197",
      ],
    },
    {
      name: "3.8 - 3.9",
      value: 6,
      color: "lime.4",
      stores: ["78", "984", "2755", "2847", "3197"],
    },
    {
      name: "3.0 - 3.7",
      value: 3,
      color: "yellow.4",
      stores: ["78", "984", "2755", "2847", "3197"],
    },
    { name: "2.0 - 2.9", value: 1, color: "orange.5", stores: ["78", "984"] },
    { name: "Below 2.0", value: 1, color: "red.5", stores: ["2755"] },
  ];

  return (
    <SimpleGrid cols={3} my="lg">
      <Paper>
        <Box px="lg" py="md">
          <Title order={5} fw={500} fz={16}>
            FSS Score Overview
          </Title>
          <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
            Detailed Store Performance Breakdown{" "}
          </Title>
        </Box>
        <Divider />
        <Flex h="80%" align="center" justify="center">
          <DonutChart
            size={200}
            thickness={32}
            paddingAngle={2}
            withLabels
            withLabelsLine
            chartLabel={"3.9 Avg. Rating"}
            pieProps={{
              dataKey: "value",
              fontSize: 12,
              fontWeight: 600,
              label: {
                fontWeight: 600,
                fill: "hsl(var(--foreground))",
              },
              legendType: "square",
            }}
            data={data2}
            tooltipDataSource="all"
            tooltipAnimationDuration={500}
            tooltipProps={{
              content: ({ payload }) => {
                return <ChartTooltip2 payload={payload} />;
              },
            }}
          />
          <Stack gap="xs">
            {data2.map((item) => {
              return (
                <Flex align="center" gap="xs">
                  <Box h={8} w={8} bg={item.color}></Box>
                  <Text c="hsl(var(--foreground))" fw={600} size="xs">
                    {item.name}
                  </Text>
                </Flex>
              );
            })}
          </Stack>
        </Flex>
      </Paper>
      <Paper>
        <Box px="lg" py="md">
          <Title order={5} fw={500} fz={16}>
            FSS Breakdown by Category
          </Title>
          <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
            Identify Top Performers by Category
          </Title>
        </Box>
        <Divider />
        <BarChart
          p="md"
          pt="xl"
          yAxisProps={{ domain: [0, 5], tickCount: 10, interval: 1 }}
          h={300}
          data={data}
          tooltipAnimationDuration={200}
          dataKey="month"
          tooltipProps={{
            content: ({ label, payload }) => (
              <ChartTooltip label={label} payload={payload} />
            ),
          }}
          barProps={{
            barSize: 36,
          }}
          series={[{ name: "Avg", color: "blue", label: "Average Rating" }]}
        />
      </Paper>
    </SimpleGrid>
  );
}

function ChartTooltip2({ payload }: ChartTooltipProps) {
  console.log(payload);
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      {payload?.map((item) => {
        const stores = item.payload.stores.join(", ");
        return (
          <Box>
            <Title fz={14} order={6} fw={600} mb={2}>
              {payload![0].name}
            </Title>
            <Text size="sm" fw={500}>
              {stores}
            </Text>
          </Box>
        );
      })}
    </Paper>
  );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      <Title fz={14} order={6} fw={600} mb={2}>
        {label}
      </Title>
      {payload.map((item, index) => {
        const storeBreakdown = item.payload.stores.map((store: string) => {
          return (
            <Flex justify="space-between">
              <Text size="sm" fw={500}>
                {store}
              </Text>
              <Text size="sm">
                <span style={{ marginRight: 2 }}>{getRandomFloatString()}</span>
                <IconStarFilled
                  height={14}
                  width={14}
                  style={{ color: "#FAC84E" }}
                />
              </Text>
            </Flex>
          );
        });
        return (
          <Box key={index}>
            <Text key={item.name} fz="sm">
              Average Rating: {item.value}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
            <Divider my="xs" />
            <Title fw={500} order={6} fz={14}>
              Breakdown by Stores
            </Title>
            <Stack gap={3}>{storeBreakdown}</Stack>
          </Box>
        );
      })}
    </Paper>
  );
}

function getRandomFloatString(): string {
  const randomFloat = Math.random() * (5.0 - 3.0) + 3.0;
  const formattedString = randomFloat.toFixed(1);
  return formattedString;
}
