import { BarChart, ChartTooltipProps } from "@mantine/charts";
import { Paper, Title, Box, Divider, Text, Flex } from "@mantine/core";

export function FinancialOverview() {
  const data = [
    {
      store_id: "4",
      act_vs_budget_managers_profits: 1174,
      adj_theoretical_gp_percent: 71.8,
      actual_gp_percent: 71.9,
      act_vs_adj_theor: 0.1,
    },
    {
      store_id: "42",
      act_vs_budget_managers_profits: -538,
      adj_theoretical_gp_percent: 72.4,
      actual_gp_percent: 71.4,
      act_vs_adj_theor: -1,
    },
    {
      store_id: "43",
      act_vs_budget_managers_profits: -807,
      adj_theoretical_gp_percent: 72.3,
      actual_gp_percent: 71.4,
      act_vs_adj_theor: -0.9,
    },
    {
      store_id: "68",
      act_vs_budget_managers_profits: 987,
      adj_theoretical_gp_percent: 71.7,
      actual_gp_percent: 71.7,
      act_vs_adj_theor: 0,
    },
    {
      store_id: "77",
      act_vs_budget_managers_profits: 880,
      adj_theoretical_gp_percent: 70.4,
      actual_gp_percent: 70.2,
      act_vs_adj_theor: -0.2,
    },
    {
      store_id: "78",
      act_vs_budget_managers_profits: 413,
      adj_theoretical_gp_percent: 70.8,
      actual_gp_percent: 70.4,
      act_vs_adj_theor: -0.4,
    },
    {
      store_id: "984",
      act_vs_budget_managers_profits: 656,
      adj_theoretical_gp_percent: 72.6,
      actual_gp_percent: 72,
      act_vs_adj_theor: -0.6,
    },
    {
      store_id: "2755",
      act_vs_budget_managers_profits: 285,
      adj_theoretical_gp_percent: 70.8,
      actual_gp_percent: 70.1,
      act_vs_adj_theor: -0.7,
    },
    {
      store_id: "2847",
      act_vs_budget_managers_profits: 223,
      adj_theoretical_gp_percent: 71,
      actual_gp_percent: 70.3,
      act_vs_adj_theor: -0.7,
    },
    {
      store_id: "3197",
      act_vs_budget_managers_profits: 1101,
      adj_theoretical_gp_percent: 73.7,
      actual_gp_percent: 73.1,
      act_vs_adj_theor: -0.6,
    },
    {
      store_id: "4451",
      act_vs_budget_managers_profits: -1284,
      adj_theoretical_gp_percent: 62.4,
      actual_gp_percent: 54.8,
      act_vs_adj_theor: -7.6,
    },
    {
      store_id: "4490",
      act_vs_budget_managers_profits: -340,
      adj_theoretical_gp_percent: 72,
      actual_gp_percent: 71.3,
      act_vs_adj_theor: -0.7,
    },
    {
      store_id: "4870",
      act_vs_budget_managers_profits: 42,
      adj_theoretical_gp_percent: 73.8,
      actual_gp_percent: 73.7,
      act_vs_adj_theor: -0.1,
    },
    {
      store_id: "5200",
      act_vs_budget_managers_profits: 250,
      adj_theoretical_gp_percent: 0,
      actual_gp_percent: 100,
      act_vs_adj_theor: 100,
    },
    {
      store_id: "5329",
      act_vs_budget_managers_profits: 551,
      adj_theoretical_gp_percent: 71.9,
      actual_gp_percent: 72.4,
      act_vs_adj_theor: 0.5,
    },
    {
      store_id: "5777",
      act_vs_budget_managers_profits: -1386,
      adj_theoretical_gp_percent: 69.4,
      actual_gp_percent: 67.7,
      act_vs_adj_theor: -1.7,
    },
    {
      store_id: "5891",
      act_vs_budget_managers_profits: -55,
      adj_theoretical_gp_percent: 73.6,
      actual_gp_percent: 73.8,
      act_vs_adj_theor: 0.2,
    },
    {
      store_id: "8296",
      act_vs_budget_managers_profits: -491,
      adj_theoretical_gp_percent: 73.7,
      actual_gp_percent: 73.1,
      act_vs_adj_theor: -0.6,
    },
    {
      store_id: "13518",
      act_vs_budget_managers_profits: -334,
      adj_theoretical_gp_percent: 69.7,
      actual_gp_percent: 68.7,
      act_vs_adj_theor: -1,
    },
    {
      store_id: "16754",
      act_vs_budget_managers_profits: -568,
      adj_theoretical_gp_percent: 71.3,
      actual_gp_percent: 70.5,
      act_vs_adj_theor: -0.8,
    },
    {
      store_id: "18258",
      act_vs_budget_managers_profits: 250,
      adj_theoretical_gp_percent: 0,
      actual_gp_percent: 100,
      act_vs_adj_theor: 100,
    },
    {
      store_id: "22872",
      act_vs_budget_managers_profits: 156,
      adj_theoretical_gp_percent: 72.3,
      actual_gp_percent: 71.5,
      act_vs_adj_theor: -0.8,
    },
    {
      store_id: "23205",
      act_vs_budget_managers_profits: 497,
      adj_theoretical_gp_percent: 72.6,
      actual_gp_percent: 71.1,
      act_vs_adj_theor: -1.5,
    },
  ];

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
