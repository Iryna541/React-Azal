import { Box, Divider, SimpleGrid, Stack, Tabs, Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { BkStoreRankingTable } from "~/modules/bk/bk-store-ranking/BkStoreRankingTable";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import {
  BkManagerRankingData,
  BkManagerRankingTable,
} from "~/modules/bk/bk-manager-ranking-table/BkManagerRankingTable";
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
import FSSScoreOverviewChart from "~/modules/bk/bk-charts-2/FSSScoreOverviewChart";
import TitleBox from "~/components/TitleBox";
import { FSSBreakdownChartBig } from "~/modules/bk/bk-charts-2/FSSBreakdownChart";
import { FinancialOverviewBig } from "~/modules/bk/bk-charts-2/FinancialOverview";
import { useBkAnalyticsCharts } from "~/modules/bk/bk-charts-2/api/useBkAnalyticsCharts";

export default function InsightsPage() {
  const { user } = useUser();
  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3}>Insights</Title>
        {user?.company_id === 211 && <BkSetup />}
        {user?.company_id === 212 && <DunkinSetup />}
        {user?.company_id === 213 && <R365Setup />}
        {user?.company_id === 214 && <ZenoSetup />}
      </Layout>
    </ProtectedRoute>
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
      <BKChartsBig />
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
  const { data } = useBkAnalyticsCharts();
  return (
    <SimpleGrid cols={1} my="lg">
      {data?.chart1 && (
        <TitleBox
          title="FSS Score Overview"
          subtitle="Detailed Store Performance Breakdown"
        >
          <FSSScoreOverviewChart
            data={data.chart1.map((item) => ({
              ...item,
              value: item.values,
            }))}
          />
        </TitleBox>
      )}

      {/* {data?.chart2 && (
        <TitleBox
          title="FSS Breakdown by Category"
          subtitle="Identify Top Performers by Category"
        >
          <FSSBreakdownChart
            data={data.chart2.map((item) => ({
              ...item,
              Avg: item.AVG,
            }))}
          />
        </TitleBox>
      )} */}

      {/* {data?.chart3 && (
        <TitleBox
          title="Financial Overview"
          subtitle="Profit and Labor Analysis by Store"
        >
          <FinancialOverview data={data.chart3} />
        </TitleBox>
      )} */}
    </SimpleGrid>
  );
}

function BKChartsBig() {
  const { data } = useBkAnalyticsCharts();
  return (
    <>
      <Box my="lg">
        {data?.chart3 && <FinancialOverviewBig data={data.chart3} />}
      </Box>
      <Box my="lg">
        {data?.chart2 && (
          <FSSBreakdownChartBig
            data={data.chart2.map((item) => ({
              ...item,
              Avg: item.AVG,
            }))}
          />
        )}
      </Box>
    </>
  );
}