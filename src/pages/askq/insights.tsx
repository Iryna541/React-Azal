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
  Grid,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { Layout } from "~/components/Layout";
import {
  GetStoreRankingResponse,
  useStoreRanking,
} from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { BkStoreRankingTable } from "~/modules/bk/bk-store-ranking/BkStoreRankingTable";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";

import { useUser } from "~/modules/auth/hooks/useUser";
import {
  DunkinStoreRankingData,
  DunkinTopStoreRanking,
} from "~/modules/dunkin/dunkin-top-store-ranking/DunkinTopStoreRanking";
import useDunkinStoreRanking from "~/modules/dunkin/dunkin-store-ranking/api/useDunkinStoreRanking";
import { DunkinStoreRankingTable } from "~/modules/dunkin/dunkin-store-ranking/DunkinStoreRankingTable";
import { R365StoreRankingTable } from "~/modules/restaurant365/store-ranking/R365StoreRankingTable";
import { useR365StoreRanking } from "~/modules/restaurant365/store-ranking/api/useR365StoreRanking";
// import {
//   // StoreInsights,
//   useZenoStoreRanking,
// } from "~/modules/restaurant365/zeno-ranking/api/useZenoStoreRanking";
// import { ZenoStoreRankingTable } from "~/modules/restaurant365/zeno-ranking/ZenoStoreRankingTable";
// import { ZenoTopRankingTable } from "~/modules/restaurant365/zeno-ranking/zeno-top-ranking-table/ZenoTopRankingTable";

import { useDunkinManagerPlan } from "~/modules/dunkin/dunkin-manager-plan/api/useDunkinManagerPlan";
import { DunkinManagerPlanTable } from "~/modules/dunkin/dunkin-manager-plan/DunkinManagerPlanTable";

import { useBkManagerPlan } from "~/modules/bk/bk-manager-plan-2/api/useBkManagerPlan";
import { useCurrentDateRange } from "~/modules/common/api/useCurrentDateRange";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import UTC from "dayjs/plugin/utc";
dayjs.extend(LocalizedFormat);
dayjs.extend(UTC);
import { useEffect, useState } from "react";
import { InsightsProvider } from "~/modules/askq/insightsContext";
import { ZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/ZenoInsightTable";
import { useZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/api/useZenoInsightTable";

import {
  LukeLobsterStoreRankingData,
  useLukeLobsterStoreRanking,
} from "~/modules/luke-lobster/luke-lobster-store-ranking/api/useLukeLobsterStoreRanking";
import { LukeLobsterStoreRankingTable } from "~/modules/luke-lobster/luke-lobster-store-ranking/LukeLobsterStoreRankingTable";
import { LukeLobsterTopStoreRanking } from "~/modules/luke-lobster/luke-lobster-top-store-ranking/LukeLobsterTopStoreRanking";
import { useGetManagers } from "~/modules/bk/bk-store-ranking/api/useGetManagers";
import { BkManagerPlanTable } from "~/modules/bk/bk-manager-plan-2/BkManagerPlanTable";
import { RussManagerSchedules } from "~/modules/bk/russ-manager-schedules/RussManagerSchedules";
import { NewRussSetup } from "~/revamp/NewRussSetup";
import { InsightsList } from "~/revamp/components/InsightsList";
import { marked } from "marked";
// import { NewRussSetup } from "~/revamp/NewRussSetup";

export default function InsightsPage() {
  const { user } = useUser();
  const { data: currentDateRange } = useCurrentDateRange();
  const [selectedDemoOption, setSelectedDemoOption] = useState<string | null>(
    "Company 1"
  );
  console.log(setSelectedDemoOption);

  const dateInformation = currentDateRange
    ? currentDateRange[0].data_frequency === "Weekly"
      ? `${dayjs.utc(currentDateRange[0].week_start_date).format("LL")} — ${dayjs.utc(currentDateRange[0].week_end_date).format("LL")}`
      : `${dayjs.utc(currentDateRange[0].date).format("LL")}`
    : null;

  return (
    <ProtectedRoute>
      <Layout>
        <InsightsProvider>
          <Flex align="center" gap="sm" mb="lg" justify={"space-between"}>
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
            {user?.company_id === 210 && (
              <Box>
                <Select
                  value={selectedDemoOption}
                  placeholder="Pick value"
                  data={["Company 1", "Company 2", "Company 3"]}
                  m={"sm"}
                  onChange={(value) => setSelectedDemoOption(value)}
                  allowDeselect={false}
                />
              </Box>
            )}
          </Flex>
          {user?.company_id === 210 ? (
            selectedDemoOption === "Company 2" ? (
              <ShawnSetup withAccordion />
            ) : selectedDemoOption === "Company 1" ? (
              <RussSetup withAccordion />
            ) : (
              <NewRussSetup />
            )
          ) : (
            <>
              {(user?.company_id === 211 || user?.company_id === 218) && (
                <RussSetup />
              )}
              {(user?.company_id === 212 || user?.company_id === 215) && (
                <ShawnSetup />
              )}
              {user?.company_id === 213 && <AdamKlaersSetup />}
              {user?.company_id === 214 && <ZinoSetup />}
              {user?.company_id === 216 && <StevenSetup />}
            </>
          )}
        </InsightsProvider>
      </Layout>
    </ProtectedRoute>
  );
}

function AdamKlaersSetup() {
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

function RussSetup({ withAccordion = false }: { withAccordion?: boolean }) {
  const { configurations, user } = useUser();
  const { data } = useStoreRanking({
    companyId: user?.company_id.toString(),
  });

  const [filteredData, setFilteredData] = useState<GetStoreRankingResponse>(
    data || []
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dtlSelectedOption, setDtlSelectedOption] = useState<string>("All");

  const { data: managerData } = useBkManagerPlan({
    type: dtlSelectedOption,
    isDemo: user?.company_id === 210 ? "true" : "",
  });

  const { data: managers } = useGetManagers();

  const managerNames =
    managers?.users
      .filter((user) => user.role_title === "Manager")
      .map((user) => user.name) ?? [];

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedOption === "All Stores" || !selectedOption) {
      if (data) setFilteredData(data);
      return;
    }
    const selectedManagerStores = managers?.users
      .find((user) => user.name === selectedOption)
      ?.regions.map((region) => region.region_title);

    const filteredStoreRanking = data?.filter((item) =>
      selectedManagerStores?.includes(item.store_id.toString())
    );

    if (filteredStoreRanking) setFilteredData(filteredStoreRanking);
    // eslint-disable-next-line
  }, [selectedOption]);

  // eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    setSelectedOption(value);
  };

  // for filtering data to admin vs dtl
  const isAdmin =
    configurations?.is_partner === 1 || configurations?.role?.role_id === 2;

  const filteredManagerData = isAdmin
    ? managerData
    : managerData?.filter((item) => {
        return item.managers_name === user?.name;
      });

  return (
    <Tabs variant="pills" radius="xs" defaultValue="store">
      <Flex align="center" justify="space-between">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          {(user?.company_id === 210 || user?.company_id === 211) && (
            <Tabs.Tab value="manager">DTL</Tabs.Tab>
          )}
          {user?.company_id === 211 && (
            <Tabs.Tab value="manager-schedules">Manager Schedules</Tabs.Tab>
          )}
        </Tabs.List>
      </Flex>
      <Tabs.Panel value="store">
        <Stack gap="xl">
          {!withAccordion && (
            <Box
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
            >
              <Flex justify={"space-between"}>
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
                <Select
                  label="Filter stores"
                  placeholder="Pick value"
                  data={["All Stores", ...managerNames]}
                  defaultValue="All Stores"
                  m={"sm"}
                  onChange={handleSelectChange}
                  allowDeselect={false}
                />
              </Flex>
              <Divider />
              {data && <BkStoreRankingTable data={filteredData} />}
            </Box>
          )}
          {data && withAccordion && (
            <InsightsList
              data={data}
              control={({ row }) => {
                return (
                  <Grid>
                    <Grid.Col span={3}>
                      <Title order={6} fw={500}>
                        Rank
                      </Title>
                      <Text>#{row.overall_ranking}</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Title order={6} fw={500}>
                        Store Id
                      </Title>
                      <Text>{row.store_id}</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Title order={6} fw={500}>
                        FSS Ranking
                      </Title>
                      <Text>{row.fss_ranking}</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Title order={6} fw={500}>
                        Manager Profit Ranking
                      </Title>
                      <Text>{row.mgr_profit_ranking}</Text>
                    </Grid.Col>
                  </Grid>
                );
              }}
              panel={({ row }) => {
                const html = marked(row.insights) as string;
                return (
                  <Stack
                    style={{ borderTop: "1px solid hsl(var(--border))" }}
                    py="md"
                  >
                    <TypographyStylesProvider p="0" m="0">
                      <div
                        style={{ fontSize: 14 }}
                        dangerouslySetInnerHTML={{ __html: html! }}
                      />
                    </TypographyStylesProvider>
                  </Stack>
                );
              }}
            />
          )}
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="manager">
        {managerData && (
          <BkManagerPlanTable
            data={filteredManagerData ?? []}
            dtlSelectedOption={dtlSelectedOption}
            setDtlSelectedOption={setDtlSelectedOption}
          />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="manager-schedules">
        <RussManagerSchedules />
      </Tabs.Panel>
    </Tabs>
  );
}

function ShawnSetup({ withAccordion = false }: { withAccordion?: boolean }) {
  const { user } = useUser();
  const { data } = useDunkinStoreRanking({
    companyId: user?.company_id.toString(),
  });

  const { data: managerData } = useDunkinManagerPlan();

  const topStores: DunkinStoreRankingData = [...(data ?? [])]
    .sort((a, b) => {
      return b.sales_growth - a.sales_growth;
    })
    .map((item) => {
      return {
        store_rank: item.store_rank,
        store_id: item.store_id,
        net_sales_current: item.net_sales_current,
        net_sales_previous: item.net_sales_previous,
        sales_growth: item.sales_growth,
        insights: item.insights,
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
            {!withAccordion && (
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
            )}

            {data && withAccordion && (
              <InsightsList
                data={data}
                control={({ row }) => {
                  return (
                    <Grid>
                      <Grid.Col span={3}>
                        <Title order={6} fw={500}>
                          Rank
                        </Title>
                        <Text>#{row.store_rank}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Title order={6} fw={500}>
                          Store Id
                        </Title>
                        <Text>{row.store_id}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Title order={6} fw={500}>
                          Net Sales Current
                        </Title>
                        <Text>{row.net_sales_current}</Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Title order={6} fw={500}>
                          Net Sales Previous
                        </Title>
                        <Text>{row.net_sales_previous}</Text>
                      </Grid.Col>
                    </Grid>
                  );
                }}
                panel={({ row }) => {
                  const html = marked(row.insights) as string;
                  return (
                    <Stack
                      style={{ borderTop: "1px solid hsl(var(--border))" }}
                      py="md"
                    >
                      <TypographyStylesProvider p="0" m="0">
                        <div
                          style={{ fontSize: 14 }}
                          dangerouslySetInnerHTML={{ __html: html! }}
                        />
                      </TypographyStylesProvider>
                    </Stack>
                  );
                }}
              />
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="manager">
          {managerData && <DunkinManagerPlanTable data={managerData} />}
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

function ZinoSetup() {
  // const { data } = useZenoStoreRanking();
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
            allowDeselect={false}
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
      {/* 
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
      </Box> */}
    </Stack>
  );
}

function StevenSetup() {
  const { data } = useLukeLobsterStoreRanking();
  const topStores: LukeLobsterStoreRankingData[] = [...(data ?? [])].sort(
    (a, b) => {
      return parseInt(b.sales_growth) - parseInt(a.sales_growth);
    }
  );

  return (
    <Box mt="lg">
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          {/* <Tabs.Tab value="manager">Manager</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="store">
          <Stack gap={40}>
            <SimpleGrid cols={2} spacing="xl">
              <LukeLobsterTopStoreRanking
                title="Top 5 Stores"
                data={topStores.slice(0, 5)}
              />
              <LukeLobsterTopStoreRanking
                title="Bottom 5 Stores"
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
              {data && <LukeLobsterStoreRankingTable data={data} />}
            </Box>
          </Stack>
        </Tabs.Panel>
        {/* <Tabs.Panel value="manager"></Tabs.Panel> */}
      </Tabs>
    </Box>
  );
}
