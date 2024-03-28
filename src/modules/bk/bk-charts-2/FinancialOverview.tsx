import { BarChart, ChartTooltipProps } from "@mantine/charts";
import { Paper, Title, Box, Divider, Text, Flex, Stack } from "@mantine/core";
import { modals } from "@mantine/modals";

import { Bar, Cell, LabelList } from "recharts";
import TitleBox from "~/components/TitleBox";
import { useInsightsContext } from "~/modules/askq/insightsContext";

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
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const { boxref3 } = useInsightsContext();

  return (
    <Box ref={boxref3}>
      <TitleBox
        title="Financial Overview"
        subtitle="Profit and Labor Analysis by Store"
      >
        <BarChart
          valueFormatter={(value) => USDollar.format(value)}
          p="md"
          pt="xl"
          h={300}
          data={data.map((item) => {
            return {
              ...item,
              formatted_value: USDollar.format(
                item.act_vs_budget_managers_profits
              ),
            };
          })}
          withTooltip={false}
          tooltipAnimationDuration={200}
          dataKey="store_id"
          barChartProps={{ margin: { top: 16, left: 16 } }}
          yAxisProps={{ padding: { bottom: 40 } }}
          series={[]}
          children={
            <Bar
              dataKey="act_vs_budget_managers_profits"
              fill={"green"}
              barSize={32}
              onClick={(data) => {
                console.log(data);
                modals.open({
                  title: "Store " + data.store_id,
                  children: (
                    <Stack gap="sm">
                      <Flex justify="space-between">
                        <Text size="sm">
                          Actual vs. Budgeted Manager's Profit:
                        </Text>
                        <Text size="sm" fw={600}>
                          {USDollar.format(data.act_vs_budget_managers_profits)}
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex justify="space-between">
                        <Text size="sm">Theoretical Gross Profit:</Text>
                        <Text size="sm" fw={600}>
                          {data.adj_theoretical_gp_percent} %
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex justify="space-between">
                        <Text size="sm">Actual Gross Profit:</Text>
                        <Text size="sm" fw={600}>
                          {data.actual_gp_percent} %
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex justify="space-between">
                        <Text size="sm">Gross Profit Variation:</Text>
                        <Text size="sm" fw={600}>
                          {data.act_vs_adj_theor} %
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex justify="space-between">
                        <Text size="sm">Actual Labor Cost:</Text>
                        <Text size="sm" fw={600}>
                          {USDollar.format(data.actual_total_labor)}
                        </Text>
                      </Flex>

                      <Divider />

                      <Flex justify="space-between">
                        <Text size="sm">Budgeted Labor Cost:</Text>
                        <Text size="sm" fw={600}>
                          {USDollar.format(data.budgeted_total_labor)}
                        </Text>
                      </Flex>
                    </Stack>
                  ),
                });
              }}
              style={{ cursor: "pointer" }}
            >
              {data.map((entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.act_vs_budget_managers_profits >= 0
                        ? "#82C91E"
                        : "#FA5252"
                    }
                  />
                );
              })}
              <LabelList
                dataKey="formatted_value"
                position="top"
                offset={10}
                style={{ fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          }
        />
      </TitleBox>
    </Box>
  );
}
