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
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
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

const ReportsPage = () => {
  const [value, setValue] = useState<string>("example1");
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
        </Flex>
        {user?.company_id === 210 && (
          <>
            {value === "example1" && <ShawnExample />}
            {value === "example2" && <ZinoExample />}
          </>
        )}
        {user?.company_id === 211 && <RussReport />}
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

function RussReport() {
  const { data: ltoTrainingReport, isLoading } = useRussLtoTrainingReports({});

  console.log({ ltoTrainingReport });
  return (
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
              Store Wise LTO Training Data
            </Title>
          </Box>
        </Flex>
        <Divider />
        {isLoading && (
          <Center h={500}>
            <Loader size="lg" />
          </Center>
        )}
        {ltoTrainingReport?.store_wise_data && (
          <RussLtoTrainingReportTable
            data={ltoTrainingReport?.store_wise_data}
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
              DTL Wise LTO Training Data
            </Title>
          </Box>
        </Flex>
        <Divider />
        {isLoading && (
          <Center h={500}>
            <Loader size="lg" />
          </Center>
        )}
        {ltoTrainingReport?.dtl_wise_data && (
          <RussLtoTrainingReportTable
            data={ltoTrainingReport?.dtl_wise_data}
            columns={dtlWiseColumns}
            colVisibility={{ manager_id: false }}
          />
        )}
      </Box>
    </>
  );
}

export default ReportsPage;
