import { Box, Title, Grid, Stack } from "@mantine/core";

export type DunkinStoreRankingData = Array<{
  store_rank: number;
  store_id: number;
  net_sales_current: number;
  net_sales_previous: number;
  sales_growth: number;
  insights: string;
}>;

export function DunkinTopStoreRanking({
  title,
  data,
}: {
  title: string;
  data: DunkinStoreRankingData;
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
        <Grid.Col span={2}>Position</Grid.Col>
        <Grid.Col span={3}>Store Id</Grid.Col>
        <Grid.Col span={3}>Total sales</Grid.Col>
        <Grid.Col span={3}>Sales Growth</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item) => {
          return (
            <Grid
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
              <Grid.Col span={2}>{item.store_rank}</Grid.Col>
              <Grid.Col span={3} c="hsl(var(--foreground))">
                {item.store_id}
              </Grid.Col>
              <Grid.Col span={3}>{item.net_sales_current}</Grid.Col>
              <Grid.Col span={3}>{item.sales_growth}</Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}
