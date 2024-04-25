import { BarChart, ChartTooltipProps } from "@mantine/charts";
import {
  Paper,
  Title,
  Flex,
  Box,
  Divider,
  Stack,
  Text,
  ScrollArea,
  Table,
  Grid,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconSearch, IconStarFilled } from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { Bar, Cell, LabelList } from "recharts";
import TitleBox from "~/components/TitleBox";
import { useInsightsContext } from "~/modules/askq/insightsContext";

interface FSSBreakdownDataRow {
  name: string;
  Avg: number;
  stores: Array<{
    rating: number;
    store_id: number;
  }>;
}

export function FSSBreakdownChart({
  data,
}: {
  data: Array<FSSBreakdownDataRow>;
}) {
  data = data.map((item) => {
    return {
      ...item,
      formatted_value: item.Avg.toFixed(1),
    };
  });

  function getColor(avg: number) {
    if (avg >= 4.0) return "#51CF66";
    else if (avg >= 3.8 && avg < 4.0) return "#a9e34b";
    else if (avg >= 3.0 && avg < 3.8) return "#ffd43b";
    else if (avg >= 2.0 && avg < 3) return "#ff922b";
    return "#ff6b6b";
  }

  return (
    <BarChart
      p="md"
      pt="xl"
      yAxisProps={{
        domain: [0, 5],
        tickCount: 10,
        interval: 1,
        tickLine: false,
        style: {
          fontWeight: "800",
          color: "black",
        },
      }}
      xAxisProps={{
        style: {
          fontWeight: "800",
          color: "black",
        },
      }}
      barChartProps={{ margin: { top: 20 } }}
      h={300}
      data={data}
      // tooltipAnimationDuration={200}
      dataKey="name"
      // tooltipProps={{
      //   content: ({ label, payload }) => (
      //     <ChartTooltip label={label} payload={payload} />
      //   ),
      // }}
      withTooltip={false}
      series={
        [
          // { name: "Avg", color: "blue", label: "Average Rating" }
        ]
      }
      children={
        <Bar
          dataKey="Avg"
          fill={"green"}
          barSize={32}
          onClick={(data) => {
            modals.open({
              title: data.name,
              children: (
                <Stack gap={4}>
                  <Grid>
                    <Grid.Col span={4}>
                      <Text size="sm" fw={600} style={{ textAlign: "center" }}>
                        Store Id
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Text size="sm" fw={600} style={{ textAlign: "center" }}>
                        Scores
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={4} style={{ textAlign: "center" }}>
                      <Text size="sm" fw={600}>
                        Rating
                      </Text>
                    </Grid.Col>
                  </Grid>
                  <Divider h={2} />
                  {data.stores.map(
                    (store: {
                      store_id: string;
                      rating: number;
                      score: any;
                    }) => {
                      return (
                        <Grid>
                          <Grid.Col span={4}>
                            {" "}
                            <Text size="sm" style={{ textAlign: "center" }}>
                              {store.store_id}
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Text size="sm" style={{ textAlign: "center" }}>
                              {typeof store.score === "number"
                                ? store.score.toFixed(1)
                                : store.score}
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Text
                              size="sm"
                              fw={600}
                              style={{ textAlign: "center" }}
                            >
                              <span style={{ marginRight: 2 }}>
                                {store.rating.toFixed(1)}
                              </span>
                              <IconStarFilled
                                height={14}
                                width={14}
                                style={{ color: "#FAC84E" }}
                              />
                            </Text>
                          </Grid.Col>
                        </Grid>
                      );
                    }
                  )}
                </Stack>
              ),
            });
          }}
          style={{ cursor: "pointer" }}
        >
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={getColor(entry.Avg)} />;
          })}
          <LabelList
            dataKey="formatted_value"
            position="top"
            offset={10}
            style={{ fontSize: 12, fill: "black", fontWeight: 800 }}
          />
          <LabelList
            dataKey="score"
            position="center"
            offset={10}
            fill="white"
            style={{
              fontSize: 12,
              fontWeight: 900,
            }}
          />
        </Bar>
      }
    />
  );
}

export function ChartTooltip({ label, payload }: ChartTooltipProps) {
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

export function FSSBreakdownChartBig({
  data,
}: {
  data: Array<FSSBreakdownDataRow>;
}) {
  const { boxref2 } = useInsightsContext();

  const [selectedData, setSelectedData] = useState<
    FSSBreakdownDataRow | undefined
  >(undefined);
  return (
    <Grid>
      <Grid.Col ref={boxref2} span={7}>
        <TitleBox
          title="FSS Breakdown by Category"
          subtitle="Detailed breakdown by category"
        >
          <BarChart
            p="md"
            pt="xl"
            yAxisProps={{ domain: [0, 5], tickCount: 10, interval: 1 }}
            h={360}
            data={data}
            tooltipAnimationDuration={200}
            dataKey="name"
            withTooltip={true}
            barProps={{
              barSize: 36,
              style: {
                cursor: "pointer",
              },
            }}
            tooltipProps={{
              content: ({ payload }) => {
                return (
                  <UpdateFSSBreakdownChartOnHover
                    payload={payload}
                    setSelectedData={setSelectedData}
                  />
                );
              },
            }}
            series={[{ name: "Avg", color: "blue", label: "Average Rating" }]}
          />
        </TitleBox>
      </Grid.Col>
      <Grid.Col span={5}>
        <ScrollArea
          h={444}
          py="md"
          px="lg"
          style={{
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--mantine-radius-md)",
          }}
        >
          {selectedData ? (
            <Stack gap="xs">
              <Box>
                <Title order={5} fw={500} mb={2}>
                  {selectedData.name}
                </Title>
                <Flex gap={2}>
                  <Text>Average Rating: </Text>
                  <Text fw={600}>
                    <span style={{ marginRight: 2 }}>{selectedData.Avg}</span>
                    <IconStarFilled
                      height={14}
                      width={14}
                      style={{ color: "#FAC84E" }}
                    />
                  </Text>
                </Flex>
              </Box>
              <Title fw={600} order={6} fz={14}>
                Breakdown by Stores
              </Title>
              <Table
                variant="azalio-rounded"
                stickyHeader
                data={{
                  head: ["Store Id", "Rating"],
                  body: selectedData.stores.map((store) => [
                    store.store_id,
                    <Flex key={store.store_id} gap="xs" align="center">
                      <span style={{ marginRight: 2 }}>{store.rating}</span>
                      <IconStarFilled
                        height={14}
                        width={14}
                        style={{ color: "#FAC84E" }}
                      />
                    </Flex>,
                  ]),
                }}
              />
            </Stack>
          ) : (
            <Flex align="center" justify="center" h={400}>
              <Stack gap="sm" maw={400} align="center" ta="center">
                <IconSearch size={32} />
                <Title order={5} fw={500}>
                  Explore Detailed FSS Breakdown
                </Title>
                <Text size="sm">
                  Hover over any FSS category bar to unveil a detailed breakdown
                  by store.
                </Text>
              </Stack>
            </Flex>
          )}
        </ScrollArea>
      </Grid.Col>
    </Grid>
  );
}

function UpdateFSSBreakdownChartOnHover({
  payload,
  setSelectedData,
}: ChartTooltipProps & {
  setSelectedData: React.Dispatch<
    React.SetStateAction<FSSBreakdownDataRow | undefined>
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
