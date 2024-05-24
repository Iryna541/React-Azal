import { Box, Title, Grid, Stack, Badge } from "@mantine/core";

import { LukeLobsterStoreRankingData } from "../luke-lobster-store-ranking/api/useLukeLobsterStoreRanking";

export function LukeLobsterTopStoreRanking({
  title,
  data,
}: {
  title: string;
  data: Array<LukeLobsterStoreRankingData>;
}) {
  return (
    <Box>
      <Title order={5} mb="lg">
        {title}
      </Title>
      <Grid
        bg="hsl(var(--secondary))"
        c="hsl(var(--foreground) / 0.65)"
        fw={700}
        fz={14}
        px="md"
        style={{ borderRadius: 4 }}
        mb="lg"
      >
        <Grid.Col span={3}>Rank</Grid.Col>

        <Grid.Col span={3}>Store</Grid.Col>

        <Grid.Col span={3}>Total Sales</Grid.Col>
        <Grid.Col span={3}>Sales growth (vs LW)</Grid.Col>

        {/* <Grid.Col span={2}>Sales</Grid.Col>
        <Grid.Col
          span={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          Forecast
        </Grid.Col>
        <Grid.Col span={3}>Delta</Grid.Col> */}
      </Grid>
      <Stack gap="xs">
        {data.map((item, index) => {
          return (
            <Grid
              key={index}
              c="hsl(var(--foreground) / 0.65)"
              fw={700}
              fz={14}
              px="md"
              py="md"
              style={{
                border: "1px solid hsl(var(--border))",
                borderRadius: 4,
              }}
            >
              <Grid.Col span={1}>{item.store_rank}</Grid.Col>
              <Grid.Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item?.store_name}
              </Grid.Col>
              <Grid.Col
                span={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge fw={700} bg="rgba(255, 138, 2,0.2)" c="rgb(255, 138, 2)">
                  {item?.net_sales_current}
                </Badge>
              </Grid.Col>
              <Grid.Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                span={4}
              >
                <Badge
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {item?.sales_growth}
                </Badge>
              </Grid.Col>

              {/* <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2,0.2)"
                  c="rgb(255, 138, 2)"
                >
                  {USDollar.format(parseInt(item.sales))}
                </Badge>
              </Grid.Col>
              <Grid.Col
                span={3}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {USDollar.format(parseInt(item.forecast))}
                </Badge>
              </Grid.Col>
              <Grid.Col span={3}>
                <Flex w="100%" align="center" justify="space-between">
                  <Badge
                    size="lg"
                    fw={700}
                    bg={
                      parseInt(item.sales_vs_sales_forecast) > 0
                        ? "rgba(63, 221, 120, 0.24)"
                        : "rgba(232, 66, 60,0.25)"
                    }
                    c={
                      parseInt(item.sales_vs_sales_forecast) > 0
                        ? "rgb(63, 221, 120)"
                        : "rgb(232, 66, 60)"
                    }
                  >
                    {USDollar.format(parseInt(item.sales_vs_sales_forecast))}
                  </Badge>
                  <Tooltip label="AI Insights">
                    <ActionIcon onClick={handleOpenModal}>
                      <IconBulb size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Grid.Col> */}
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}
