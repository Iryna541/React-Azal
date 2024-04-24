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
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { useGetUsers } from "~/modules/bk/bk-manager-ranking-table/api/useGetManagerManagersPic";
import { useGetManagers } from "~/modules/bk/bk-store-ranking/api/useGetManagers";
import SendInsightModal from "~/modules/bk/bk-store-ranking/SendInsightsModal";
import { modals } from "@mantine/modals";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

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
  const { user, configurations } = useUser();
  const [isMystores, setIsMystores] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const { data: managersRankingData, isPending } = useStoreRanking();

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
    periodical: "Jan-June",
  });
  const [managerId, setManagerId] = useState("");
  const { data: usersData } = useGetUsers();
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
      .filter((user: any) => user.role_title === "Manager")
      .map((user: any) => ({ label: user.name, value: user.id.toString() })) ??
    [];

  const DtlStores =
    usersData?.users?.flatMap((item) => {
      if (user?.user_id === item.id) {
        return item.regions.map((store) => store.region_title);
      }
      return [];
    }) || [];

  // eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    console.log("value:", value);
    value === "My Stores" ? setIsMystores(true) : setIsMystores(false);
    setManagerId(value === "All Stores" ? "" : value);
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

  const topFiveManager = sortedManagersData.slice(0, 5);
  const bottomFiveManager = sortedManagersData.reverse().slice(0, 5);

  const topMathedDtlstores = topFiveManager.filter((manager) =>
    DtlStores.includes(manager.storeId.toString())
  );

  const bottomMathedDtlstores = bottomFiveManager.filter((manager) =>
    DtlStores.includes(manager.storeId.toString())
  );

  // Function to export chart as PDF
  const exportPDF = async () => {
    setIsExportLoading(true);
    const input = document.getElementById("chartContainer");
    if (input) {
      const canvas = await html2canvas(input);
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
    const tempFilter = { ...filter };
    tempFilter[key] = value;
    setFilter(tempFilter);
  };

  const handleFilterCheckbox = (
    value: "weekly" | "monthly" | "periodically"
  ) => {
    if (selectedFilter === value) return;
    else {
      if (value === "weekly") {
        setStartDate(filter?.startDate.format("YYYY-MM-DD"));
        setEndDate(filter?.endDate.format("YYYY-MM-DD"));
      } else if (value === "monthly") {
        setStartDate(filter?.monthlyStartDate.format("YYYY-MM-DD"));
        setEndDate(filter?.monthlyEndDate.format("YYYY-MM-DD"));
      } else if (value === "periodically") {
        setStartDate(filter?.periodicalStartDate.format("YYYY-MM-DD"));
        setEndDate(filter?.periodicalEndDate.format("YYYY-MM-DD"));
      }
      setSelectedFilter(value);
    }
  };

  // useEffect(() => {
  //   if(selectedFilter === "weekly"){
  //     setStartDate(filter?.startDate.format("YYYY-MM-DD"));
  //     setEndDate(filter?.endDate.format("YYYY-MM-DD"));
  //   } else if(selectedFilter === "monthly"){
  //     setStartDate(filter?.monthlyStartDate.format("YYYY-MM-DD"));
  //     setEndDate(filter?.monthlyEndDate.format("YYYY-MM-DD"));
  //   } else if(selectedFilter === "periodically"){
  //     setStartDate(filter?.periodicalStartDate.format("YYYY-MM-DD"));
  //     setEndDate(filter?.periodicalEndDate.format("YYYY-MM-DD"));
  //   }
  // }, [selectedFilter, filter])

  return (
    <Layout>
      <Flex justify="space-between">
        <Title order={3}>Welcome, {user?.name.split(" ")[0]}</Title>
      </Flex>
      <Flex
        style={{ minWidth: 1150 }}
        justify={"space-between"}
        align={"end"}
        mt={20}
      >
        <Flex justify={"end"} columnGap={10}>
          <Flex direction={"column"}>
            <Checkbox
              size="sm"
              radius={4}
              label={
                <Text fz={14} fw={500} mb={5}>
                  By Weeks
                </Text>
              }
              checked={selectedFilter === "weekly"}
              onChange={() => handleFilterCheckbox("weekly")}
            />
            <Flex columnGap={5} justify={"space-between"}>
              <Flex>
                <DatePickerInput
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
                  minDate={moment().startOf("year").toDate()}
                  maxDate={moment().endOf("year").toDate()}
                  value={filter?.endDate}
                  disabled={true}
                  w={"150px"}
                  placeholder="Start Date"
                  onChange={(value) => handleFilterChange(value, "endDate")}
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
                  Monthly
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
                    handleFilterChange(value, "monthlyMonth")
                  }
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
                  Periodically
                </Text>
              }
              checked={selectedFilter === "periodically"}
              onChange={() => handleFilterCheckbox("periodically")}
            />
            <Flex columnGap={5}>
              <Flex justify={"space-between"}>
                <Select
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

        <Flex gap={4} mt={28}>
          <Select
            placeholder="Pick value"
            allowDeselect={false}
            w={"140px"}
            data={
              configurations?.is_partner === 1 ||
              configurations?.role.role_id === 2
                ? [
                    { label: "All Stores", value: "All Stores" },
                    { label: "My Stores", value: "My Stores" },
                    ...managerList,
                  ]
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
                    ? parseInt(item.score).toFixed(1)
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

        {configurations?.is_partner === 1 &&
        configurations?.role.role_id === 2 ? (
          <>
            <BkManagerRankingTable
              title="Top 5 Store Managers"
              data={topFiveManager}
              managersPic={usersData}
              isPending={isPending}
            />
            <BkManagerRankingTable
              title="Bottom 5 Store Managers"
              data={bottomFiveManager}
              isRed
              managersPic={usersData}
              isPending={isPending}
            />
          </>
        ) : (
          <>
            <BkManagerRankingTable
              title="Top 5 Store Managers"
              data={topMathedDtlstores}
              managersPic={usersData}
              emoji="&#128532;"
              isPending={isPending}
            />
            <BkManagerRankingTable
              title="Bottom 5 Store Managers"
              data={bottomMathedDtlstores}
              isRed
              managersPic={usersData}
              emoji="&#128522;"
              isPending={isPending}
            />
          </>
        )}
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
