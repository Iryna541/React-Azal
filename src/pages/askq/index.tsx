import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Loader,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { IconFileExport, IconSend } from "@tabler/icons-react";
import { LayoutWithSidebar } from "~/components/LayoutWithSidebar";
import { Calendar, DatePickerInput, MonthPickerInput } from "@mantine/dates";
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
import {
  GetStoreRankingResponse,
  useStoreRanking,
} from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { useGetUsers } from "~/modules/bk/bk-manager-ranking-table/api/useGetManagerManagersPic";
import {
  GetManagersResponse,
  useGetManagers,
} from "~/modules/bk/bk-store-ranking/api/useGetManagers";
import SendInsightModal from "~/modules/bk/bk-store-ranking/SendInsightsModal";
import { modals } from "@mantine/modals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { useGetUsersPic } from "~/modules/bk/bk-manager-ranking-table/api/useGetUsersPic";
import { useZenoStoreRanking } from "~/modules/restaurant365/zeno-ranking/api/useZenoStoreRanking";
import { InsightsList } from "~/revamp/components/InsightsList";
import { marked } from "marked";
import { LukeLobsterTopStoreRanking } from "~/modules/luke-lobster/luke-lobster-top-store-ranking/LukeLobsterTopStoreRanking";
import {
  LukeLobsterStoreRankingData,
  useLukeLobsterStoreRanking,
} from "~/modules/luke-lobster/luke-lobster-store-ranking/api/useLukeLobsterStoreRanking";
// import { ZenoStoreRankingTable } from "~/modules/restaurant365/zeno-ranking/ZenoStoreRankingTable";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <ProtectedRoute>
      {user?.company_id === 211 ||
      user?.company_id === 210 ||
      user?.company_id === 218 ? (
        <InsightsProvider>
          <RussSetup />
        </InsightsProvider>
      ) : user?.company_id === 212 ? (
        <InsightsProvider>
          <ShawnSalemaSetup />
        </InsightsProvider>
      ) : user?.company_id === 214 ? (
        <InsightsProvider>
          <ZinoSetup />
        </InsightsProvider>
      ) : user?.company_id === 216 ? (
        <LukeSetup />
      ) : (
        <Navigate to="/askq/insights" />
      )}
    </ProtectedRoute>
  );
}

function RussSetup() {
  const { user, configurations } = useUser();
  const [isMystores, setIsMystores] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data: managersRankingData, isPending } = useStoreRanking({
    companyId: user?.company_id.toString(),
  });

  const [selectedFilter, setSelectedFilter] = useState<
    "weekly" | "monthly" | "periodically"
  >("monthly");
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );
  const [filter, setFilter] = useState<{ [key: string]: any }>({
    startDate: moment().startOf("isoWeek"),
    endDate: moment().endOf("isoWeek"),
    monthlyStartDate: moment().startOf("month"),
    monthlyEndDate: moment().endOf("month"),
    periodicalStartDate: moment("01/01/2024"),
    periodicalEndDate: moment("06/30/2024"),
    // eslint-disable-next-line
    // @ts-ignore
    periodical: "Jan-June",
  });

  const [managerId, setManagerId] = useState("");
  const { data: usersData } = useGetUsers();
  const { data: usersPic } = useGetUsersPic();

  const { data } = useBkAnalyticsCharts({
    isMystores,
    managerId: isMystores ? user?.user_id.toString() : managerId,
    startDate: startDate,
    endDate: endDate,
  });

  const { boxref1 } = useInsightsContext();

  const { data: managers } = useGetManagers();

  const managerList =
    managers?.users
      .filter(
        (user: GetManagersResponse["users"][0]) => user.role_title === "Manager"
      )
      .map((user: GetManagersResponse["users"][0]) => ({
        label: user.name,
        value: user.id.toString(),
      })) ?? [];

  const DtlStores =
    usersData?.users?.flatMap((item) => {
      if (user?.user_id === item.id) {
        return item.regions.map((store) => store.region_title);
      }
      return [];
    }) || [];

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

  const topFiveManager = sortedManagersData.slice(0, 5);
  const bottomFiveManager = sortedManagersData.reverse().slice(0, 5);

  const topMathedDtlstores = topFiveManager.filter((manager) =>
    DtlStores.includes(manager.storeId.toString())
  );

  const bottomMathedDtlstores = bottomFiveManager.filter((manager) =>
    DtlStores.includes(manager.storeId.toString())
  );

  // eslint-disable-next-line
  const handleSelectChange = (value: any, label: any) => {
    setSelectedOption(label.label);
    value === "My Stores" ? setIsMystores(true) : setIsMystores(false);
    setManagerId(value === "All Stores" ? "" : value);
  };

  const [filteredData, setFilteredData] = useState<GetStoreRankingResponse>(
    managersRankingData || []
  );
  useEffect(() => {
    if (managersRankingData) {
      setFilteredData(managersRankingData);
    }
  }, [managersRankingData]);

  useEffect(() => {
    if (selectedOption === "All Stores" || !selectedOption) {
      if (managersRankingData) setFilteredData(managersRankingData);
      return;
    }
    const selectedManagerStores = managers?.users
      .find((user) => user.name === selectedOption)
      ?.regions.map((region) => region.region_title);

    const filteredStoreRanking = managersRankingData?.filter((item) =>
      selectedManagerStores?.includes(item.store_id.toString())
    );

    if (filteredStoreRanking) setFilteredData(filteredStoreRanking);
    // eslint-disable-next-line
  }, [selectedOption]);

  let filteredTopFiveManagers, filteredBottomFiveManagers;
  if (configurations?.is_partner === 1 || configurations?.role?.role_id === 2) {
    filteredTopFiveManagers =
      filteredData.flatMap((item) =>
        topFiveManager.filter((el) => el.storeId === item.store_id)
      ) || [];
    filteredBottomFiveManagers =
      filteredData.flatMap((item) =>
        bottomFiveManager.filter((el) => el.storeId === item.store_id)
      ) || [];
  } else {
    if (selectedOption === "All Stores") {
      filteredTopFiveManagers = topFiveManager;
      filteredBottomFiveManagers = bottomFiveManager;
    } else if (selectedOption === "My Stores") {
      filteredTopFiveManagers = topMathedDtlstores;
      filteredBottomFiveManagers = bottomMathedDtlstores;
    } else {
      filteredTopFiveManagers = topFiveManager;
      filteredBottomFiveManagers = bottomFiveManager;
    }
  }

  // Function to export chart as PDF
  const exportPDF = async () => {
    setIsExportLoading(true);
    const input = document.getElementById("chartContainer");
    if (input) {
      const canvas = await html2canvas(input, {
        logging: true,
        useCORS: true, // Helps with handling cross-origin images
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape", // Set orientation to landscape if the chart is wide
      });

      // Define horizontal and vertical padding (in mm)
      const horizontalPadding = 10; // 10 mm padding on each side
      const verticalPadding = 20; // 20 mm padding on the top and bottom

      // Dimensions of a PDF page in landscape mode usually are 297mm x 210mm
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Adjust width and height available for the image by subtracting padding
      const availableWidth = pageWidth - 2 * horizontalPadding;
      const availableHeight = pageHeight - 2 * verticalPadding;

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;

      // Scale the image to fit within the available dimensions while maintaining aspect ratio
      const scaleX = availableWidth / imgWidth;
      const scaleY = availableHeight / imgHeight;
      const scale = Math.min(scaleX, scaleY); // Choose the smaller scale to ensure the image fits within both dimensions
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      // Center the image within the available space
      const x = horizontalPadding + (availableWidth - scaledWidth) / 2;
      const y = verticalPadding + (availableHeight - scaledHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
      pdf.save("chart.pdf");
      setIsExportLoading(false);
    } else {
      console.error("Element not found!");
      setIsExportLoading(false);
    }
  };
  const handleFilterChange = (value: any, key: string) => {
    if (key === "startDate") {
      setFilter({
        ...filter,
        [key]: moment(value).startOf("isoWeek"),
        endDate: moment(value).endOf("isoWeek"),
      });
    }
    if (key === "monthlyStartDate") {
      setFilter({
        ...filter,
        [key]: moment(value).startOf("month"),
        monthlyEndDate: moment(value).endOf("month"),
      });
    }
  };

  const handleFilterCheckbox = (
    value: "weekly" | "monthly" | "periodically"
  ) => {
    if (selectedFilter === value) return;
    else {
      // if(value === "weekly"){
      //   setStartDate(filter?.startDate.format("YYYY-MM-DD"));
      //   setEndDate(filter?.endDate.format("YYYY-MM-DD"));
      // } else if(value === "monthly"){
      //   setStartDate(filter?.monthlyStartDate.format("YYYY-MM-DD"));
      //   setEndDate(filter?.monthlyEndDate.format("YYYY-MM-DD"));
      // } else if(value === "periodically"){
      //   setStartDate(filter?.periodicalStartDate.format("YYYY-MM-DD"));
      //   setEndDate(filter?.periodicalEndDate.format("YYYY-MM-DD"));
      // }
      setSelectedFilter(value);
    }
  };

  useEffect(() => {
    if (selectedFilter === "weekly") {
      setStartDate(filter?.startDate.format("YYYY-MM-DD"));
      setEndDate(filter?.endDate.format("YYYY-MM-DD"));
    } else if (selectedFilter === "monthly") {
      setStartDate(filter?.monthlyStartDate.format("YYYY-MM-DD"));
      setEndDate(filter?.monthlyEndDate.format("YYYY-MM-DD"));
    } else if (selectedFilter === "periodically") {
      setStartDate(filter?.periodicalStartDate.format("YYYY-MM-DD"));
      setEndDate(filter?.periodicalEndDate.format("YYYY-MM-DD"));
    }
  }, [selectedFilter, filter]);

  return (
    <Layout>
      <Flex justify="space-between" align="center">
        <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>
        <Flex gap={12} mt={28}>
          <Select
            placeholder="Pick value"
            allowDeselect={false}
            w={"140px"}
            data={
              configurations?.is_partner === 1 ||
              configurations?.role.role_id === 2
                ? [{ label: "All Stores", value: "All Stores" }, ...managerList]
                : [
                    { label: "All Stores", value: "All Stores" },
                    { label: "My Stores", value: "My Stores" },
                  ]
            }
            defaultValue="All Stores"
            onChange={handleSelectChange}
          />
          <Button onClick={exportPDF} loading={isExportLoading}>
            Export as PDF
          </Button>
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
      </Flex>
      <Flex
        // style={{ minWidth: 1150 }}
        justify={"space-between"}
        align={"end"}
        mt={20}
        bg="hsl(var(--primary) / 0.0250)"
        p="lg"
        style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}
        columnGap={24}
      >
        <Flex justify={"end"} columnGap={20}>
          <Flex direction={"column"}>
            <Checkbox
              size="sm"
              radius={4}
              label={
                <Text fz={14} fw={500} mb={5}>
                  By Week
                </Text>
              }
              checked={selectedFilter === "weekly"}
              onChange={() => handleFilterCheckbox("weekly")}
            />
            <Flex columnGap={20} justify={"space-between"}>
              <Flex>
                <DatePickerInput
                  bg="white"
                  minDate={moment().startOf("year").toDate()}
                  maxDate={moment().endOf("year").toDate()}
                  value={filter?.startDate}
                  w={"140px"}
                  placeholder="Start Date"
                  onChange={(value) => handleFilterChange(value, "startDate")}
                />
              </Flex>
              <Flex>
                <DatePickerInput
                  bg="white"
                  minDate={moment().startOf("year").toDate()}
                  maxDate={moment().endOf("year").toDate()}
                  value={filter?.endDate}
                  disabled={true}
                  w={"150px"}
                  placeholder="End Date"
                  // onChange={(value) => handleFilterChange(value, "endDate")}
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"column"}>
            <Checkbox
              size="sm"
              radius={4}
              label={
                <Text fz={14} fw={500} mb={5}>
                  By Month
                </Text>
              }
              checked={selectedFilter === "monthly"}
              onChange={() => handleFilterCheckbox("monthly")}
            />
            <Flex columnGap={5}>
              <Flex justify={"space-between"}>
                <MonthPickerInput
                  minDate={moment().startOf("year").toDate()}
                  maxDate={moment().endOf("year").toDate()}
                  value={filter?.monthlyStartDate}
                  w={"150px"}
                  placeholder="Select Month"
                  onChange={(value) =>
                    handleFilterChange(value, "monthlyStartDate")
                  }
                  bg="white"
                />
              </Flex>
            </Flex>
          </Flex>
          <Flex direction={"column"}>
            <Checkbox
              size="sm"
              radius={4}
              label={
                <Text fz={14} fw={500} mb={5}>
                  By Period
                </Text>
              }
              checked={selectedFilter === "periodically"}
              onChange={() => handleFilterCheckbox("periodically")}
            />
            <Flex columnGap={5}>
              <Flex justify={"space-between"}>
                <Select
                  bg="white"
                  value={"Jan-June"}
                  placeholder="Select Quarter"
                  w={"150px"}
                  disabled={true}
                  data={[{ label: "Jan-June", value: "Jan-June" }]}
                  onChange={(value) =>
                    handleFilterChange(value, "quarterlyQuarter")
                  }
                  allowDeselect={false}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <SimpleGrid ref={boxref1} cols={2} my="lg" id="chartContainer">
        {data?.chart1 ? (
          <TitleBox
            title="FSS Score Overview"
            subtitle="Detailed Store Performance Breakdown"
          >
            <FSSScoreOverviewChart
              data={data.chart1.map((item) => ({
                ...item,
                value: item.values,
              }))}
              fssScore={data?.fss_score}
            />
          </TitleBox>
        ) : (
          <Center h={200}>
            <Loader />
          </Center>
        )}

        {data?.chart2 ? (
          <TitleBox
            title="FSS Breakdown by Category"
            subtitle="Detailed breakdown by category"
          >
            <FSSBreakdownChart
              data={data.chart2.map((item) => ({
                ...item,
                Avg: item.AVG,
                score: item.score
                  ? typeof item.score === "string"
                    ? item.score
                    : item.score.toFixed(1)
                  : 0,
              }))}
            />
          </TitleBox>
        ) : (
          <Center h={200}>
            <Loader />
          </Center>
        )}

        <BkManagerRankingTable
          title="Top 5 Store Managers"
          data={filteredTopFiveManagers || []}
          managersPic={usersPic}
          isPending={isPending}
          emoji="&#128532;"
        />
        <BkManagerRankingTable
          title="Bottom 5 Store Managers"
          data={filteredBottomFiveManagers || []}
          isRed
          managersPic={usersPic}
          isPending={isPending}
          emoji="&#128522;"
        />
      </SimpleGrid>
    </Layout>
  );
}

function ZinoSetup() {
  const { data, isLoading } = useZenoStoreRanking();
  const { user } = useUser();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Layout>
      <Flex justify="space-between" align="center" mb={28}>
        <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>
      </Flex>
      {isLoading && (
        <Center h={500}>
          <Loader size="lg" />
        </Center>
      )}
      {/* <Box
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
      {data && (
        <Box>
          <InsightsList
            data={data}
            control={({ row }) => {
              return (
                <Grid>
                  <Grid.Col span={3}>
                    <Title order={6} fw={500}>
                      Position
                    </Title>
                    <Text>#{row.store_rank}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Title order={6} fw={500}>
                      Store
                    </Title>
                    <Text>{row.store_name}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Title order={6} fw={500}>
                      Total Sales
                    </Title>
                    <Text>{formatter.format(row.net_sales_current)}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <Title order={6} fw={500}>
                      Sales growth (VS LW)
                    </Title>
                    <Text>{row.sales_growth}%</Text>
                  </Grid.Col>
                </Grid>
              );
            }}
            panel={({ row }) => {
              // const html = marked(row.insight) as string;
              // const summaryHtml = marked(row.summary) as string;
              // const headingHtml = marked(row.heading) as string;
              const content = marked.parse(row.insights);
              return (
                <Stack
                  style={{ borderTop: "1px solid hsl(var(--border))" }}
                  py="md"
                >
                  <Box>
                    <TypographyStylesProvider>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: content as string,
                        }}
                      ></div>
                    </TypographyStylesProvider>
                  </Box>
                </Stack>
              );
            }}
          />
        </Box>
      )}
    </Layout>
  );
}

export function LukeSetup({ isDemo = false }: { isDemo?: boolean }) {
  const { user } = useUser();
  const { data } = useLukeLobsterStoreRanking();
  const topStores: LukeLobsterStoreRankingData[] = [...(data ?? [])].sort(
    (a, b) => {
      return parseInt(b.sales_growth) - parseInt(a.sales_growth);
    }
  );
  return (
    <Layout>
      {!isDemo && <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>}
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
    </Layout>
  );
}

export function ShawnSalemaSetup({ isDemo = false }: { isDemo?: boolean }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { user } = useUser();

  const { data } = useGetDunkinInsights({ type: selectedOption });

  const dates = data?.week_end_dates.map((item) => item.week_end_date) || [];

  useEffect(() => {
    if (dates.length > 0 && selectedOption === null) {
      setSelectedOption(dates[0]);
    }
    // eslint-disable-next-line
  }, [dates]);

  const handleSelectChange = (value: string | null) => {
    if (value) setSelectedOption(value);
  };

  return (
    <Layout>
      {!isDemo && <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>}

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
