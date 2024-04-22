import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconFileExport, IconSend } from "@tabler/icons-react";
import { LayoutWithSidebar } from "~/components/LayoutWithSidebar";
import { Calendar } from "@mantine/dates";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { IconBubble, IconSaleTag, IconSparkles } from "~/assets";
import { useUser } from "~/modules/auth/hooks/useUser";
import { Layout } from "~/components/Layout";
import {
  InsightsProvider,
  useInsightsContext,
} from "~/modules/askq/insightsContext";
import TitleBox from "~/components/TitleBox";
import { FSSBreakdownChart } from "~/modules/bk/bk-charts-2/FSSBreakdownChart";
import FSSScoreOverviewChart from "~/modules/bk/bk-charts-2/FSSScoreOverviewChart";
import { useBkAnalyticsCharts } from "~/modules/bk/bk-charts-2/api/useBkAnalyticsCharts";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetDunkinInsights } from "~/modules/dunkin/dunkin-insights-table/api/useGetInsights";
import { DunkinGuestInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinGuestInsightsTable";
import { DunkinCostInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinCostInsightsTable";
import { DunkinSalesBuildingInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinSalesBuildingInsightsTable";
import { DunkinLabourInfoInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinLabourInfoInsights";
import { DunkinDriveThruInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinDriveThruInsights";
import { DunkinSalesDataInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinSalesDataInsights";
import {
  BkManagerRankingData,
  BkManagerRankingTable,
} from "~/modules/bk/bk-manager-ranking-table/BkManagerRankingTable";
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { useGetManagersPic } from "~/modules/bk/bk-manager-ranking-table/api/useGetManagerManagersPic";

const stats = [
  {
    backgroundColor: "#E5FFF9",
    iconBackgroundColor: "#3BE8B0",
    iconColor: "#fff",
    buttonColor: "#3BE8B0",
    title: "Sales",
    description:
      "30 stores increased sales by over 5.2% while 8 stores saw a 4.2% decrease in the last week.",
    value: "$24,034",
    icon: <IconSaleTag />,
  },
  {
    backgroundColor: "#FFFAED",
    iconBackgroundColor: "#FFEDBD",
    iconColor: "#FFB900",
    buttonColor: "#FFB900",
    title: "Inventory",
    description:
      "12 of 75 stores ran out of buns by evening shift before the restock the next day.",
    value: "$24,034",
    icon: <IconBubble />,
  },
  {
    backgroundColor: "#FFF5F5",
    iconBackgroundColor: "#FFE0E1",
    iconColor: "#FD636B",
    buttonColor: "#FD636B",
    title: "Labor",
    description:
      "32 West Blvd, 140 Main St. and 23 King St. were overstaffed between the hours of 9pm and 11pm.",
    value: "$24,034",
    icon: <IconSaleTag />,
  },
];

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <ProtectedRoute>
      {user?.company_id === 211 ? (
        <InsightsProvider>
          <RussSetup />
        </InsightsProvider>
      ) : user?.company_id === 212 ? (
        <InsightsProvider>
          <ShawnSalemaSetup />
        </InsightsProvider>
      ) : (
        <Navigate to="/askq/insights" />
      )}
    </ProtectedRoute>
  );
}

function RussSetup() {
  const { user } = useUser();
  const [isMystores, setIsMystores] = useState(false);
  const { data: managersRankingData } = useStoreRanking();
  const { data: managersPic } = useGetManagersPic();
  const { data } = useBkAnalyticsCharts({ isMystores });
  const { boxref1 } = useInsightsContext();

  // eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    value === "My Stores" ? setIsMystores(true) : setIsMystores(false);
  };

  const sortedManagersData: BkManagerRankingData = (managersRankingData ?? [])
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
        storeId: item.store_id,
      };
    });

  return (
    <Layout>
      <Flex justify="space-between">
        <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>
        <Select
          placeholder="Pick value"
          data={["All Stores", "My Stores"]}
          defaultValue="All Stores"
          onChange={handleSelectChange}
        />
      </Flex>
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

        <BkManagerRankingTable
          title="Weekly Top 5 Store Managers"
          data={sortedManagersData.slice(0, 5)}
          managersPic={managersPic}
        />
        <BkManagerRankingTable
          title="Weekly Bottom 5 Store Managers"
          data={sortedManagersData.reverse().slice(0, 5)}
          isRed
          managersPic={managersPic}
        />
      </SimpleGrid>
    </Layout>
  );
}

function ShawnSalemaSetup() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { user } = useUser();
  const { data } = useGetDunkinInsights({ type: selectedOption });

  const dates = data?.week_end_dates.map((item) => item.week_end_date) || [];

  useEffect(() => {
    if (dates.length > 0 && selectedOption === null) {
      setSelectedOption(dates[0]);
    }
  }, [dates]);

  const handleSelectChange = (value: any) => {
    setSelectedOption(value);
  };

  return (
    <Layout>
      <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>

      <Box px={"sm"} w="calc(100vw - 330px)">
        <Flex
          justify={"end"}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          w={"100%"}
          gap={"lg"}
        >
          <Select
            label="Select week end date"
            placeholder="Pick value"
            data={dates}
            value={selectedOption} // Controlled component
            mb={"lg"}
            w={"18%"}
            onChange={handleSelectChange}
            allowDeselect={false}
          />
          <Anchor href="https://demo-be.azal.io/api/analytics/exportWeeklyUpdate">
            <Button
              variant="azalio-ui-dark"
              my={"sm"}
              size="xl"
              style={{ fontSize: "14px" }}
              leftSection={<IconFileExport />}
            >
              Export
            </Button>
          </Anchor>
        </Flex>

        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Sales Data
            </Title>
          </Box>
          <Divider />
          {data ? (
            <DunkinSalesDataInsightsTable data={data?.sales_data || []} />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>

        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Sales Building Data
            </Title>
          </Box>
          {data ? (
            <DunkinSalesBuildingInsightsTable
              data={data?.sales_building_data || []}
            />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>

        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Drive Thru
            </Title>
          </Box>
          {data ? (
            <DunkinDriveThruInsightsTable data={data?.drive_thru_data || []} />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>

        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Cost Data
            </Title>
          </Box>
          {data ? (
            <DunkinCostInsightsTable data={data?.cost_data || []} />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>
        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Labour Hours Info
            </Title>
          </Box>
          {data ? (
            <DunkinLabourInfoInsightsTable data={data?.labor_info_data || []} />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>
        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
          mb={"lg"}
        >
          <Box px="lg" py="md">
            <Title order={5} fw={600} fz={16}>
              Guest Satisfaction
            </Title>
          </Box>
          {data ? (
            <DunkinGuestInsightsTable
              data={data?.guest_satisfaction_data || []}
            />
          ) : (
            <Center h={200}>
              <Loader />
            </Center>
          )}
        </Box>
      </Box>
    </Layout>
  );
}

export function FallbackUI() {
  return (
    <LayoutWithSidebar
      sidebar={
        <Box p={24}>
          <Calendar weekdayFormat="ddd" />
        </Box>
      }
    >
      <Box>
        <Title order={3}>Good Morning!</Title>
        <Stack align="center" mt="xl">
          <IconSparkles height={50} width={50} />
          <Box>
            <Title order={3}>What would you like to do with your data?</Title>
            <Text mt="xs">
              Ask our database a question about your data and get a response in
              seconds!
            </Text>
          </Box>
          <TextInput
            w="100%"
            placeholder="Let's learn more about your business. Ask a question about your data."
            rightSection={
              <ActionIcon size="lg" radius={6} variant="azalio-ui-light" mr={3}>
                <IconSend size={16} />
              </ActionIcon>
            }
            rightSectionWidth={40}
            styles={{
              input: {
                height: 48,
              },
            }}
          />
        </Stack>
        <Box mt="xl">
          <Text>
            You have the opportunity to save <Badge>$51,062</Badge> across your
            10 locations
          </Text>
          <Stack mt="md">
            {stats.map((item, index) => {
              return (
                <Flex
                  p="lg"
                  gap="lg"
                  key={index}
                  bg={item.backgroundColor}
                  style={{ borderRadius: 8 }}
                >
                  <Flex
                    bg={item.iconBackgroundColor}
                    h={108}
                    w={108}
                    align="center"
                    justify="center"
                    style={{
                      flexBasis: 108,
                      flexGrow: 0,
                      flexShrink: 0,
                      borderRadius: 8,
                    }}
                    c={item.iconColor}
                  >
                    {item.icon}
                  </Flex>
                  <Box>
                    <Flex gap="sm" align="center">
                      <Title order={4}>{item.title}</Title>
                      <Badge
                        bg={item.buttonColor}
                        c="white"
                        size="md"
                        fw={700}
                        styles={{
                          root: {
                            height: 24,
                            borderRadius: 4,
                            paddingLeft: 6,
                            paddingRight: 6,
                          },
                          label: {
                            fontSize: 14,
                          },
                        }}
                      >
                        {item.value}
                      </Badge>
                    </Flex>
                    <Text mt="xs" fw={500}>
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </LayoutWithSidebar>
  );
}
