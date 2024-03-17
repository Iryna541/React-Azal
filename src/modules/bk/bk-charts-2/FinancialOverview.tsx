import { BarChart, ChartTooltipProps } from "@mantine/charts";
import {
  Paper,
  Title,
  Box,
  Divider,
  Text,
  Flex,
  Grid,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TitleBox from "~/components/TitleBox";

interface FinancialOverviewRow {
  store_id: string;
  act_vs_budget_managers_profits: number;
  actual_gp_percent: number;
  act_vs_adj_theor: number;
  adj_theoretical_gp_percent: number;
  actual_total_labor: number;
  budgeted_total_labor: number;
}

export function FinancialOverview({
  data,
}: {
  data: Array<FinancialOverviewRow>;
}) {
  return (
    <BarChart
      p="md"
      pt="xl"
      yAxisProps={{ domain: [0, 5], tickCount: 10, interval: 1 }}
      h={300}
      data={data}
      tooltipAnimationDuration={200}
      dataKey="store_id"
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      barProps={{
        barSize: 36,
      }}
      series={[
        {
          name: "act_vs_budget_managers_profits",
          color: "red",
          label: "Act vs Budg't Managers Profits",
        },
      ]}
    />
  );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      <Title fz={14} order={6} fw={600} mb={2}>
        Store {label}
      </Title>
      {payload.map((item, index) => {
        return (
          <Box key={index}>
            <Flex justify="space-between" gap="sm">
              <Text size="sm">{item.name}</Text>
              <Text size="sm" fw={600}>
                {item.value}
              </Text>
            </Flex>

            <Divider my="xs" />
            <Title fw={500} order={6} fz={14}>
              Labour Data
            </Title>
            <Flex justify="space-between">
              <Text size="sm">adj_theoretical_gp:</Text>
              <Text size="sm" fw={600}>
                {item.payload.adj_theoretical_gp_percent} %
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text size="sm">actual_gp:</Text>
              <Text size="sm" fw={600}>
                {item.payload.actual_gp_percent} %
              </Text>
            </Flex>

            <Flex justify="space-between">
              <Text size="sm">act_vs_adj_theor:</Text>
              <Text size="sm" fw={600}>
                {item.payload.act_vs_adj_theor}
              </Text>
            </Flex>
          </Box>
        );
      })}
    </Paper>
  );
}

export function FinancialOverviewBig({
  data,
}: {
  data: Array<FinancialOverviewRow>;
}) {
  const [selectedData, setSelectedData] = useState<
    FinancialOverviewRow | undefined
  >(undefined);
  return (
    <Grid>
      <Grid.Col span={7}>
        <TitleBox
          title="Financial Overview"
          subtitle="Profit and Labor Analysis by Store"
        >
          <BarChart
            p="md"
            pt="xl"
            yAxisProps={{ domain: [0, 5], tickCount: 10, interval: 1 }}
            h={300}
            data={data}
            tooltipAnimationDuration={200}
            dataKey="store_id"
            tooltipProps={{
              content: ({ payload }) => {
                return (
                  <UpdateFinancialOverviewChartOnHover
                    payload={payload}
                    setSelectedData={setSelectedData}
                  />
                );
              },
            }}
            barProps={{
              barSize: 36,
            }}
            series={[
              {
                name: "act_vs_budget_managers_profits",
                color: "red",
                label: "Act vs Budg't Managers Profits",
              },
            ]}
          />
        </TitleBox>
      </Grid.Col>
      <Grid.Col span={5}>
        <ScrollArea
          h={384}
          py="md"
          px="lg"
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--mantine-radius-md)",
          }}
        >
          {selectedData ? (
            <Box>
              <Title order={5} fw={500}>
                Store {selectedData.store_id}
              </Title>
              <Text>
                act_vs_budget_managers_profits:{" "}
                {selectedData.act_vs_budget_managers_profits}
              </Text>

              <Stack gap={6}>
                <Title mt="sm" order={6} fw={500}>
                  Labour Data
                </Title>

                <Divider />

                <Flex justify="space-between">
                  <Text size="sm">adj_theoretical_gp:</Text>
                  <Text size="sm" fw={600}>
                    {selectedData.adj_theoretical_gp_percent} %
                  </Text>
                </Flex>

                <Divider />

                <Flex justify="space-between">
                  <Text size="sm">actual_gp:</Text>
                  <Text size="sm" fw={600}>
                    {selectedData.actual_gp_percent} %
                  </Text>
                </Flex>

                <Divider />

                <Flex justify="space-between">
                  <Text size="sm">act_vs_adj_theor:</Text>
                  <Text size="sm" fw={600}>
                    {selectedData.act_vs_adj_theor}
                  </Text>
                </Flex>

                <Divider />

                <Flex justify="space-between">
                  <Text size="sm">actual_total_labor:</Text>
                  <Text size="sm" fw={600}>
                    {selectedData.actual_total_labor}
                  </Text>
                </Flex>

                <Divider />

                <Flex justify="space-between">
                  <Text size="sm">budgeted_total_labor:</Text>
                  <Text size="sm" fw={600}>
                    {selectedData.budgeted_total_labor}
                  </Text>
                </Flex>
              </Stack>
            </Box>
          ) : (
            <Flex align="center" justify="center" h={350}>
              <Stack gap="sm" maw={400} align="center" ta="center">
                <IconSearch size={32} />

                <Title order={5} fw={500}>
                  Explore Detailed Overview
                </Title>
                <Text size="sm">
                  Hover over each store in the chart below to reveal a breakdown
                  of profit margins and labor costs.
                </Text>
              </Stack>
            </Flex>
          )}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}

function UpdateFinancialOverviewChartOnHover({
  payload,
  setSelectedData,
}: ChartTooltipProps & {
  setSelectedData: React.Dispatch<
    React.SetStateAction<FinancialOverviewRow | undefined>
  >;
}) {
  useEffect(() => {
    if (payload && payload.length > 0) {
      setSelectedData(payload[0].payload);
    }
    // eslint-disable-next-line
  }, [payload]);
  return null;
}
