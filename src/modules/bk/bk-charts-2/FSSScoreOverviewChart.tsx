import { ChartTooltipProps, DonutChart } from "@mantine/charts";
import { Box, Flex, Paper, Stack, Text, Title } from "@mantine/core";

export default function FSSScoreOverviewChart({
  data,
}: {
  data: Array<{ name: string; value: number; color: string; stores: number[] }>;
}) {
  return (
    <Flex h="80%" align="center" justify="center">
      <DonutChart
        size={200}
        thickness={32}
        paddingAngle={2}
        withLabels
        withLabelsLine
        chartLabel={"3.9 Avg. Rating"}
        pieProps={{
          dataKey: "value",
          fontSize: 12,
          fontWeight: 600,
          label: {
            fontWeight: 600,
            fill: "hsl(var(--foreground))",
          },
          legendType: "square",
        }}
        data={data}
        tooltipDataSource="all"
        tooltipAnimationDuration={500}
        tooltipProps={{
          content: ({ payload }) => {
            return <ChartTooltip payload={payload} />;
          },
        }}
      />
      <Stack gap="xs" ml="xl">
        {data.map((item) => {
          return (
            <Flex key={item.name} align="center" gap="xs">
              <Box h={8} w={8} bg={item.color}></Box>
              <Text c="hsl(var(--foreground))" fw={600} size="xs">
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Stack>
    </Flex>
  );
}

function ChartTooltip({ payload }: ChartTooltipProps) {
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      {payload?.map((item,idx) => {
        const stores = item.payload.stores.join(", ");
        return (
          <Box key={idx}>
            <Title fz={14} order={6} fw={600} mb={2}>
              {payload![0].name}
            </Title>
            <Text size="sm" fw={500}>
              {stores}
            </Text>
          </Box>
        );
      })}
    </Paper>
  );
}

// const data = [
//   {
//     name: "Above 4.0",
//     value: 10,
//     color: "green.5",
//     stores: [
//       "4",
//       "42",
//       "43",
//       "68",
//       "77",
//       "78",
//       "984",
//       "2755",
//       "2847",
//       "3197",
//     ],
//   },
//   {
//     name: "3.8 - 3.9",
//     value: 6,
//     color: "lime.4",
//     stores: ["78", "984", "2755", "2847", "3197"],
//   },
//   {
//     name: "3.0 - 3.7",
//     value: 3,
//     color: "yellow.4",
//     stores: ["78", "984", "2755", "2847", "3197"],
//   },
//   { name: "2.0 - 2.9", value: 1, color: "orange.5", stores: ["78", "984"] },
//   { name: "Below 2.0", value: 1, color: "red.5", stores: ["2755"] },
// ];
