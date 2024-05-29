import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import {
  Anchor,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Layout } from "~/components/Layout";
import { IconFileExport } from "@tabler/icons-react";
import { DunkinCostInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinCostInsightsTable";
import { DunkinDriveThruInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinDriveThruInsights";
import { DunkinGuestInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinGuestInsightsTable";
import { DunkinLabourInfoInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinLabourInfoInsights";
import { DunkinSalesBuildingInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinSalesBuildingInsightsTable";
import { DunkinSalesDataInsightsTable } from "~/modules/dunkin/dunkin-insights-table/DunkinSalesDataInsights";
import { useGetDunkinInsights } from "~/modules/dunkin/dunkin-insights-table/api/useGetInsights";
import { useZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/api/useZenoInsightTable";
import { ZenoInsightTable } from "~/modules/restaurant365/zeno-insights-table/ZenoInsightTable";
import { useUser } from "~/modules/auth/hooks/useUser";
import { useRussLtoTrainingReports } from "~/modules/bk/lto-training-report/api/useRussLtoTrainings";
import RussLtoTrainingReportTable from "~/modules/bk/lto-training-report/RussLtoTrainingReportTable";
import {
  dtlWiseColumns,
  storeWiseColumns,
} from "~/modules/bk/lto-training-report/columns";
import { useRevenueCenterData } from "~/modules/restaurant365/zino-customReport-table/api/useRevenueCenterData";
import { useLabourEfficiencyReportData } from "~/modules/restaurant365/zino-labourEfficiencyReport-table/api/useLabourEfficiencyReportData";
import { ZenoLabourEfficiencyReportTable } from "~/modules/restaurant365/zino-labourEfficiencyReport-table/ZenoLabourEfficiencyReportTable";
import { transformLabourEfficiencyReportData } from "~/modules/restaurant365/zino-labourEfficiencyReport-table/transform";
import { ZenoCustomReportTable } from "~/modules/restaurant365/zino-customReport-table/ZenoCustomReportTable";
import { transformData } from "~/modules/restaurant365/zino-customReport-table/transform";
import { useRussLaborViolationReports } from "~/modules/bk/labor-violation-report/api/useRussLaborViolationReport";
import moment from "moment";
import { DatePickerInput } from "@mantine/dates";
import RussLaborViolationReportTable from "~/modules/bk/labor-violation-report/RussLaborViolationReportTable";
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";

const ReportsPage = () => {
  const [value, setValue] = useState<string>("example1");
  const [zinoSelectedReport, setZenoSelectedReport] = useState<
    "revenue-center" | "labor-efficiency"
  >("revenue-center");
  const [russSelectedReport, setRussSelectedReport] =
    useState<string>("lto-training");
  const { user } = useUser();
  return (
    <ProtectedRoute>
      <Layout>
        <Flex justify="space-between">
          <Title order={3}>Reports</Title>
          {user?.company_id === 210 && (
            <Select
              data={[
                {
                  value: "example1",
                  label: "Example 1",
                },
                {
                  value: "example2",
                  label: "Example 2",
                },
              ]}
              value={value}
              onChange={(val) => {
                if (val) {
                  setValue(val);
                }
              }}
            />
          )}

          {user?.company_id === 214 && (
            <Select
              w={"210px"}
              data={[
                {
                  value: "revenue-center",
                  label: "Revenue Center Report",
                },
                {
                  value: "labor-efficiency",
                  label: "Labor Efficiency Report",
                },
              ]}
              value={zinoSelectedReport}
              onChange={(val) => {
                console.log({ val });
                if (val) {
                  setZenoSelectedReport(
                    val as "revenue-center" | "labor-efficiency"
                  );
                }
              }}
            />
          )}
          {user?.company_id === 211 && (
            <Select
              data={[
                {
                  value: "lto-training",
                  label: "LTO Training",
                },
                {
                  value: "labor-violation",
                  label: "Labor Violation",
                },
              ]}
              value={russSelectedReport}
              onChange={(val) => {
                if (val) {
                  setRussSelectedReport(val);
                }
              }}
            />
          )}
        </Flex>
        {user?.company_id === 210 && (
          <>
            {value === "example1" && <ShawnExample />}
            {value === "example2" && <ZinoExample />}
          </>
        )}
        {user?.company_id === 211 && (
          <RussReport selectedReport={russSelectedReport} />
        )}
        {user?.company_id === 214 && (
          <ZinoReport selectedReport={zinoSelectedReport} />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

function ShawnExample() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
  );
}

function ZinoExample() {
  const { data: managerData } = useZenoInsightTable();

  const selectData = managerData?.stores?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    };
  });
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
    <Box
      mt="xl"
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
  );
}

function RussReport({ selectedReport }: { selectedReport: string }) {
  const [laborViolationSelectedDate, setLaborViolationSelectedDate] =
    useState<Date | null>(
      new Date(new Date().setDate(new Date().getDate() - 1))
    );
  const [laborViolationSelectedStoreId, setLaborViolationSelectedStoreId] =
    useState<string>("");

  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const { data: stores } = useStoreRanking();
  const { data: ltoTrainingReport, isLoading } = useRussLtoTrainingReports({});
  const { data: laborViolationReport, isLoading: isLoadingLaborViolation } =
    useRussLaborViolationReports({
      params: {
        date: moment(laborViolationSelectedDate).format("YYYY-MM-DD"),
        store_id: laborViolationSelectedStoreId,
      },
    });

  const [storeWiseData, setStoreWiseData] = useState<any[]>([]);
  const [dtlWiseData, setDtlWiseData] = useState<any[]>([]);

  useEffect(() => {
    if (ltoTrainingReport?.store_wise_data) {
      const tempData = ltoTrainingReport.store_wise_data;
      const finalRow = {
        store_id: "Grand Total",
        total_enrolled: tempData.reduce(
          (acc, row) => acc + row.total_enrolled,
          0
        ),
        total_completed: tempData.reduce(
          (acc, row) => acc + row.total_completed,
          0
        ),
        total_not_completed: tempData.reduce(
          (acc, row) => acc + row.total_not_completed,
          0
        ),
        completion_percentage: (
          (tempData.reduce((acc, row) => acc + row.total_completed, 0) /
            tempData.reduce((acc, row) => acc + row.total_enrolled, 0)) *
          100
        ).toFixed(2),
      };
      setStoreWiseData([...tempData, finalRow]);
    }
    if (ltoTrainingReport?.dtl_wise_data) {
      const tempData = ltoTrainingReport.dtl_wise_data;
      const finalRow = {
        manager_name: "Grand Total",
        total_enrolled: tempData.reduce(
          (acc, row) => acc + row.total_enrolled,
          0
        ),
        total_completed: tempData.reduce(
          (acc, row) => acc + row.total_completed,
          0
        ),
        total_not_completed: tempData.reduce(
          (acc, row) => acc + row.total_not_completed,
          0
        ),
        completion_percentage: (
          (tempData.reduce((acc, row) => acc + row.total_completed, 0) /
            tempData.reduce((acc, row) => acc + row.total_enrolled, 0)) *
          100
        ).toFixed(2),
      };
      setDtlWiseData([...tempData, finalRow]);
    }
  }, [ltoTrainingReport]);

  const storeOptions = stores?.map((item) => {
    return {
      value: item.store_id.toString(),
      label: item.general_managers,
    };
  });

  const handleRussLaborViolationStoreChange = (value: string | null) => {
    if (value === null) {
      setLaborViolationSelectedStoreId("");
    } else {
      setLaborViolationSelectedStoreId(value);
    }
  };

  return (
    <>
      {selectedReport === "lto-training" ? (
        <>
          <Box
            mt="xl"
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
            }}
          >
            <Flex justify="space-between">
              <Box px="lg" py="md">
                <Title order={5} fw={500} fz={16}>
                  Store LTO Training Data
                </Title>
                <Title
                  component="p"
                  order={6}
                  fz={14}
                  fw={500}
                  size="sm"
                  lh={1.5}
                >
                  {ltoTrainingReport?.course_name}
                </Title>
              </Box>
              <Anchor href="https://demo-be.azal.io/api/analytics/exportLTOReport">
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
            <Divider />
            {isLoading && (
              <Center h={500}>
                <Loader size="lg" />
              </Center>
            )}
            {ltoTrainingReport?.store_wise_data && (
              <RussLtoTrainingReportTable
                data={storeWiseData}
                columns={storeWiseColumns}
                colVisibility={{}}
              />
            )}
          </Box>
          <Box
            mt="xl"
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
            }}
          >
            <Flex justify="space-between">
              <Box px="lg" py="md">
                <Title order={5} fw={500} fz={16}>
                  DTL LTO Training Data
                </Title>
                <Title
                  component="p"
                  order={6}
                  fz={14}
                  fw={500}
                  size="sm"
                  lh={1.5}
                >
                  {ltoTrainingReport?.course_name}
                </Title>
              </Box>
              <Anchor href="https://demo-be.azal.io/api/analytics/exportLTOReport">
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
            <Divider />
            {isLoading && (
              <Center h={500}>
                <Loader size="lg" />
              </Center>
            )}
            {ltoTrainingReport?.dtl_wise_data && (
              <RussLtoTrainingReportTable
                data={dtlWiseData}
                columns={dtlWiseColumns}
                colVisibility={{ manager_id: false }}
              />
            )}
          </Box>
        </>
      ) : (
        <Box
          mt="xl"
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
        >
          <Flex justify="space-between">
            <Box px="lg" py="md">
              <Title order={5} fw={500} fz={16}>
                Labor Violation Data
              </Title>
              <Title
                component="p"
                order={6}
                fz={14}
                fw={500}
                size="sm"
                lh={1.5}
              >
                See store's minor law violation information
              </Title>
            </Box>
            <Flex columnGap={20} justify={"space-between"} align={"center"}>
              <Select
                placeholder="Pick value"
                data={storeOptions}
                defaultValue={storeOptions?.[0].value || ""}
                onChange={handleRussLaborViolationStoreChange}
                allowDeselect={false}
              />
              <DatePickerInput
                bg="white"
                minDate={moment("2024-05-01").toDate()}
                maxDate={yesterday}
                value={laborViolationSelectedDate}
                w={"200px"}
                placeholder="Select Date"
                onChange={(value) => setLaborViolationSelectedDate(value)}
              />
              <Anchor
                href={`https://demo-be.azal.io/api/analytics/exportLaborViolationsReport?date=${laborViolationSelectedDate?.toLocaleDateString("en-CA")}`}
              >
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
          </Flex>
          <Divider />
          {isLoadingLaborViolation && (
            <Center h={500}>
              <Loader size="lg" />
            </Center>
          )}
          {laborViolationReport && (
            <RussLaborViolationReportTable
              data={laborViolationReport}
              colVisibility={{
                color: false,
              }}
            />
          )}
        </Box>
      )}
    </>
  );
}

function ZinoReport({
  selectedReport,
}: {
  selectedReport: "revenue-center" | "labor-efficiency";
}) {
  const [dates, setDates] = useState<{ label: string; value: string }[]>([]);
  const [labourReportSelectedDate, setLabourReportSelectedDate] =
    useState<string>("");
  const [labourReportSelectedStore, setLabourReportSelectedStore] =
    useState<string>("1");
  const labourReportFirstimeUpdated = useRef(false);

  const [customReportStoreOptions] = useState<
    { label: string; value: string }[]
  >([
    {
      label: "All",
      value: "",
    },
    {
      label: "Black Rock",
      value: "1",
    },
    {
      label: "Norwalk",
      value: "2",
    },
    {
      label: "Downtown",
      value: "3",
    },
    {
      label: "Ham Avenue",
      value: "4",
    },
    {
      label: "New Haven",
      value: "5",
    },
    {
      label: "Old Greenwich",
      value: "6",
    },
    {
      label: "Mamaroneck",
      value: "7",
    },
    {
      label: "Port Chester",
      value: "8",
    },
  ]);
  const [customReportPeriodOptions] = useState<string[]>([
    "PERIOD 6",
    "PERIOD 5",
    "PERIOD 4",
    "PERIOD 3",
    "PERIOD 2",
    "PERIOD 1",
  ]);
  const [customReportFilterStoreId, setCustomReportFilterStoreId] =
    useState<string>("1");
  const [customReportFilterPeriod, setCustomReportFilterPeriod] =
    useState<string>("PERIOD 5");

  const handleCustomReportPeriodChange = (value: string | null) => {
    if (value === null) {
      console.log("null");
    } else {
      setCustomReportFilterPeriod(value);
    }
  };

  const handleCustomReportStoreChange = (value: string | null) => {
    if (value === null) {
      console.log("null");
    } else {
      setCustomReportFilterStoreId(value);
    }
  };

  const { data: customTableData, isLoading: isLoadingRevenueCenterData } =
    useRevenueCenterData({
      storeId:
        customReportFilterStoreId == ""
          ? null
          : Number(customReportFilterStoreId),
      period: customReportFilterPeriod,
    });

  const {
    data: labourEfficiencyData,
    isLoading: isLoadingLabourEfficiencyData,
  } = useLabourEfficiencyReportData({
    date: labourReportSelectedDate,
    storeId: Number(labourReportSelectedStore),
  });

  const handleLabourReportStoreChange = (value: string | null) => {
    if (value === null) {
      console.log("null");
    } else {
      setLabourReportSelectedStore(value);
    }
  };

  const handleLabourReportDayChange = (value: string | null) => {
    if (value === null) {
      console.log("null");
    } else {
      setLabourReportSelectedDate(value);
    }
  };

  useEffect(() => {
    if (labourEfficiencyData && !labourReportFirstimeUpdated.current) {
      labourReportFirstimeUpdated.current = true;
      setDates(
        labourEfficiencyData.dates?.map((item) => ({
          label: item.day,
          value: item.date,
        }))
      );
      setLabourReportSelectedDate(labourEfficiencyData.dates?.[0]?.date);
    }
  }, [labourEfficiencyData]);

  return (
    <Stack dir="column" gap="xl" mt="xl">
      {selectedReport === "labor-efficiency" && (
        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
        >
          <Flex justify="space-between">
            <Box px="lg" py="md">
              <Title order={5} fw={500} fz={16}>
                Labour Efficiency Report (
                {
                  labourEfficiencyData?.dates.filter(
                    (el) => el.day === labourEfficiencyData.day
                  )[0].date
                }
                )
              </Title>
              <Title
                component="p"
                order={6}
                fz={14}
                fw={500}
                size="sm"
                lh={1.5}
              >
                See the labour effieciency report by day
              </Title>
            </Box>

            <Box display={"flex"}>
              <Select
                py="md"
                size="sm"
                placeholder="Select day"
                data={dates}
                value={labourReportSelectedDate}
                // defaultValue={"Monday"}
                onChange={handleLabourReportDayChange}
                allowDeselect={false}
              />
              <Select
                py="md"
                px="sm"
                size="sm"
                placeholder="Select store"
                data={customReportStoreOptions}
                value={labourReportSelectedStore}
                onChange={handleLabourReportStoreChange}
                allowDeselect={false}
              />
            </Box>
          </Flex>
          <Divider />
          {isLoadingLabourEfficiencyData && (
            <Center h={500}>
              <Loader size="lg" />
            </Center>
          )}
          {labourEfficiencyData && (
            <ZenoLabourEfficiencyReportTable
              data={transformLabourEfficiencyReportData(
                labourEfficiencyData["data"],
                parseInt(labourReportSelectedStore),
                labourEfficiencyData["aggregate_values"],
                labourReportSelectedDate
              )}
              day={labourEfficiencyData?.day}
            />
          )}
        </Box>
      )}
      {selectedReport === "revenue-center" && (
        <Box
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
          }}
        >
          <Flex justify="space-between">
            <Box px="lg" py="md">
              <Title order={5} fw={500} fz={16}>
                Custom Report
              </Title>
              <Title
                component="p"
                order={6}
                fz={14}
                fw={500}
                size="sm"
                lh={1.5}
              >
                Revenue Centers by Period
              </Title>
            </Box>

            <Box display={"flex"}>
              <Select
                py="md"
                size="sm"
                placeholder="Select period"
                data={customReportPeriodOptions}
                value={customReportFilterPeriod}
                onChange={handleCustomReportPeriodChange}
                allowDeselect={false}
              />
              <Select
                py="md"
                px="sm"
                size="sm"
                placeholder="Select store"
                data={customReportStoreOptions}
                value={customReportFilterStoreId}
                onChange={handleCustomReportStoreChange}
                allowDeselect={false}
              />
            </Box>
          </Flex>
          <Divider />
          {isLoadingRevenueCenterData && (
            <Center h={500}>
              <Loader size="lg" />
            </Center>
          )}
          {customTableData && (
            <ZenoCustomReportTable
              data={transformData(
                customTableData["data"],
                customTableData["locations"]
              )}
              customReportFilterPeriod={customReportFilterPeriod}
            />
          )}
        </Box>
      )}
    </Stack>
  );
}

export default ReportsPage;
