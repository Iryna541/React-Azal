import { BarChart, ChartTooltipProps } from "@mantine/charts";
import { Paper, Title, Flex, Box, Divider, Stack, Text } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

export function FSSBreakdownChart({
  data,
}: {
  data: Array<{
    name: string;
    Avg: number;
    stores: Array<{
      rating: number;
      store_id: number;
    }>;
  }>;
}) {
  return (
    <BarChart
      p="md"
      pt="xl"
      yAxisProps={{ domain: [0, 5], tickCount: 10, interval: 1 }}
      h={300}
      data={data}
      tooltipAnimationDuration={200}
      dataKey="name"
      tooltipProps={{
        content: ({ label, payload }) => (
          <ChartTooltip label={label} payload={payload} />
        ),
      }}
      barProps={{
        barSize: 36,
      }}
      series={[{ name: "Avg", color: "blue", label: "Average Rating" }]}
    />
  );
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;
  return (
    <Paper px="md" py="xs" withBorder shadow="md" radius="md">
      <Title fz={14} order={6} fw={600} mb={2}>
        {label}
      </Title>
      {payload.map((item, index) => {
        const storeBreakdown = item.payload.stores.map(
          (store: { store_id: string; rating: number }) => {
            return (
              <Flex justify="space-between">
                <Text size="sm">{store.store_id}</Text>
                <Text size="sm" fw={600}>
                  <span style={{ marginRight: 2 }}>
                    {store.rating.toFixed(1)}
                  </span>
                  <IconStarFilled
                    height={14}
                    width={14}
                    style={{ color: "#FAC84E" }}
                  />
                </Text>
              </Flex>
            );
          }
        );
        return (
          <Box key={index}>
            <Flex justify="space-between">
              <Text key={item.name} size="sm">
                Average Rating
              </Text>
              <Text size="sm" fw={600}>
                {item.value}
                <IconStarFilled
                  height={14}
                  width={14}
                  style={{ color: "#FAC84E" }}
                />
              </Text>
            </Flex>
            <Divider my="xs" />
            <Title fw={500} order={6} fz={14}>
              Breakdown by Stores
            </Title>
            <Stack gap={4}>{storeBreakdown}</Stack>
          </Box>
        );
      })}
    </Paper>
  );
}

// const data = [
//   {
//     name: "Guest Satisfaction (ACR)",
//     Avg: 3.5,
//     stores: [
//       { store_id: "4", rating: 4.5 },
//       { store_id: "42", rating: 4.3 },
//       { store_id: "43", rating: 4.7 },
//       { store_id: "68", rating: 4.3 },
//       { store_id: "77", rating: 4.6 },
//       { store_id: "78", rating: 3.5 },
//       { store_id: "984", rating: 3.5 },
//       { store_id: "2755", rating: 4.1 },
//       { store_id: "2847", rating: 3.9 },
//       { store_id: "3197", rating: 4.2 },
//     ],
//   },
//   {
//     name: "Window Time (SOS)",
//     Avg: 3.3,
//     stores: [
//       { store_id: "4451", rating: 4.9 },
//       { store_id: "4490", rating: 3.9 },
//       { store_id: "4870", rating: 4.0 },
//       { store_id: "5329", rating: 4.6 },
//       { store_id: "5777", rating: 3.2 },
//       { store_id: "5891", rating: 3.9 },
//     ],
//   },
//   {
//     name: "Avg. Training Rate",
//     Avg: 4.6,
//     stores: [
//       { store_id: "8296", rating: 4.5 },
//       { store_id: "13518", rating: 4.5 },
//       { store_id: "16754", rating: 4.3 },
//     ],
//   },
//   {
//     name: "Turnover Rate",
//     Avg: 4.4,
//     stores: [{ store_id: "22872", rating: 4.8 }],
//   },
//   {
//     name: "Brand Standards",
//     Avg: 3.8,
//     stores: [{ store_id: "23205", rating: 4.4 }],
//   },
// ];
