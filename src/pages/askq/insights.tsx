import {
  Badge,
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Stack,
  Tabs,
  Title,
  Tooltip,
  Select,
  Loader,
  Center,
  Button,
  Text,
} from "@mantine/core";
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
  // StoreInsights,
  useZenoStoreRanking,
} from "~/modules/restaurant365/zeno-ranking/api/useZenoStoreRanking";
import { ZenoStoreRankingTable } from "~/modules/restaurant365/zeno-ranking/ZenoStoreRankingTable";
// import { ZenoTopRankingTable } from "~/modules/restaurant365/zeno-ranking/zeno-top-ranking-table/ZenoTopRankingTable";

import { useDunkinManagerPlan } from "~/modules/dunkin/dunkin-manager-plan/api/useDunkinManagerPlan";
import { DunkinManagerPlanTable } from "~/modules/dunkin/dunkin-manager-plan/DunkinManagerPlanTable";
import FSSScoreOverviewChart from "~/modules/bk/bk-charts-2/FSSScoreOverviewChart";
import TitleBox from "~/components/TitleBox";
import { FSSBreakdownChart } from "~/modules/bk/bk-charts-2/FSSBreakdownChart";
import { FinancialOverviewBig } from "~/modules/bk/bk-charts-2/FinancialOverview";
import { useBkAnalyticsCharts } from "~/modules/bk/bk-charts-2/api/useBkAnalyticsCharts";
import { BkManagerPlanTable } from "~/modules/bk/bk-manager-plan-2/BkManagerPlanTable";
import { useBkManagerPlan } from "~/modules/bk/bk-manager-plan-2/api/useBkManagerPlan";
import { useCurrentDateRange } from "~/modules/common/api/useCurrentDateRange";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(LocalizedFormat);
import { useEffect, useRef, useState } from "react";
import {
  InsightsProvider,
  useInsightsContext,
} from "~/modules/askq/insightsContext";
import { ZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/ZenoInsightTable";
import { useZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/api/useZenoInsightTable";
import { openSendScreenshotModal } from "~/modules/bk/bk-charts-2/sendScreenshotModal";
import SendInsightModal from "~/modules/bk/bk-store-ranking/SendInsightsModal";
import { modals } from "@mantine/modals";

export default function InsightsPage() {
  const { user } = useUser();
  const { data: currentDateRange } = useCurrentDateRange();

  const dateInformation = currentDateRange
    ? currentDateRange[0].data_frequency === "Weekly"
      ? `${dayjs(currentDateRange[0].week_start_date).format("LL")} — ${dayjs(currentDateRange[0].week_end_date).format("LL")}`
      : `${dayjs(currentDateRange[0].date).format("LL")}`
    : null;

  return (
    <ProtectedRoute>
      <Layout>
        <InsightsProvider>
          <Flex align="center" gap="sm" mb="lg">
            <Title order={3}>Insights</Title>
            <Tooltip
              position="bottom"
              label={`You're viewing insights for ${dateInformation}`}
            >
              <Badge variant="azalio-ui-secondary" size="lg" fw={600}>
                {dateInformation}
              </Badge>
            </Tooltip>
          </Flex>
          {(user?.company_id === 211 || user?.company_id === 210) && (
            <BkSetup />
          )}
          {(user?.company_id === 212 || user?.company_id === 215) && (
            <DunkinSetup />
          )}
          {user?.company_id === 213 && <R365Setup />}
          {user?.company_id === 214 && <ZenoSetup />}
        </InsightsProvider>
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
  const {
    setSubmit,
    addPhoto,
    setStoreId,
    setEmailText,
    handleSubmit,
    submit,
  } = useInsightsContext();

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

  const boxRef = useRef(null);

  const handleTakeScreenshot = () => {
    openSendScreenshotModal({ addPhoto, setSubmit, setStoreId, setEmailText });
  };

  if (submit) {
    handleSubmit();
  }

  return (
    <>
      <Box pos="relative">
        <Box ref={boxRef}>
          <BKCharts />
          <BKChartsBig />
        </Box>
        <Button
          style={{ position: "absolute", top: 0, right: 12 }}
          mt={20}
          onClick={handleTakeScreenshot}
        >
          Send charts by email
        </Button>
      </Box>

      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Flex align="center" justify="space-between">
          <Tabs.List mb="lg">
            <Tabs.Tab value="store">Store</Tabs.Tab>
            <Tabs.Tab value="manager">DTL</Tabs.Tab>
          </Tabs.List>
          <Button
            onClick={() => {
              modals.open({
                size: "xl",
                title: <Text>Send by email</Text>,
                centered: true,
                children: <SendInsightModal photo={[]} />,
              });
            }}
          >
            Send Rankings by Email
          </Button>
        </Flex>
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
    <Box mt="lg">
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
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
  const { data: managerData } = useZenoInsightTable();
  const selectData = managerData?.stores?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });

  useEffect(() => {
    if (managerData) {
      setStoreId(managerData?.stores[0].id.toString());
    }
  }, [managerData]);

  const [storeId, setStoreId] = useState("");
  const handleChange = (value: string | null) => {
    if (value === null) {
      setStoreId("");
    } else {
      setStoreId(value);
    }
  };

  const { data: insightsData, isLoading } = useZenoInsightTable({
    storeId: storeId,
  });

  // const sortedManagersData: StoreInsights[] = (data ?? []).sort((a, b) => {
  //   return parseInt(a.total_net_sales_rank) - parseInt(b.total_net_sales_rank);
  // });

  return (
    <Stack gap="xl">
      {/* <SimpleGrid cols={2} spacing="xl">
        <ZenoTopRankingTable
          title="Top 5 Best Stores by Net Sales"
          data={sortedManagersData.slice(0, 5)}
        />
        <ZenoTopRankingTable
          title="Top 5 Worst Stores by Net Sales"
          data={[...sortedManagersData].reverse().slice(0, 5)}
        />
      </SimpleGrid> */}
      <Box
        style={{
          border: "1px solid hsl(var(--border))",
          borderRadius: 8,
        }}
      >
        <Flex justify="space-between">
          <Box px="lg" py="md">
            <Title order={5} fw={500} fz={16}>
              Weekly highlights
            </Title>
            <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
              Weekly highlights for all your stores
            </Title>
          </Box>

          <Select
            p="md"
            size="sm"
            placeholder="Pick value"
            data={selectData}
            value={storeId}
            onChange={handleChange}
            defaultValue="React"
          />
        </Flex>
        <Divider />
        {isLoading && (
          <Center h={500}>
            <Loader size="lg" />
          </Center>
        )}
        {insightsData?.insights_data && (
          <ZenoInsightTable data={insightsData.insights_data} />
        )}
      </Box>

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

  const { boxref1 } = useInsightsContext();

  return (
    <SimpleGrid ref={boxref1} cols={2} my="lg">
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

      {data?.chart2 && (
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
      )}

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
      {/* <Box my="lg">
        {data?.chart2 && (
          <FSSBreakdownChartBig
            data={data.chart2.map((item) => ({
              ...item,
              Avg: item.AVG,
            }))}
          />
        )}
      </Box> */}
    </>
  );
}
