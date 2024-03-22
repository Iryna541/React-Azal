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
import { IconSearch, IconStarFilled } from "@tabler/icons-react";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
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

export function FSSBreakdownChartBig({
  data,
}: {
  data: Array<FSSBreakdownDataRow>;
}) {

  const boxRef = useRef(null);

  const { submit,addInsight,setSubmit } = useInsightsContext();
  useEffect(() => {
    if (submit && boxRef.current) {
      html2canvas(boxRef.current).then(canvas => {
        const base64image = canvas.toDataURL("image/png");
        addInsight({ base64: base64image });
+        setSubmit(false);
    
      });
    }
  }, [submit, addInsight]);

  const [selectedData, setSelectedData] = useState<
    FSSBreakdownDataRow | undefined
  >(undefined);
  return (
    <Grid>
      <Grid.Col ref={boxRef} span={7}>
        <TitleBox
          title="FSS Breakdown by Category"
          subtitle="Identify Top Performers by Category"
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
