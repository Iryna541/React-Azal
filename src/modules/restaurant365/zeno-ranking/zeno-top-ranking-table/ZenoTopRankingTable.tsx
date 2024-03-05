import React from "react";
import { Box, Title, Grid, Stack, Badge } from "@mantine/core";

interface StoreInsights {
  store_id: string;
  name: string;
  net_sales: string;
  total_net_sales_rank: string;
  insights: string;
}

interface ZenoTopRankingTableProps {
  title: string;
  data: StoreInsights[];
}

export const ZenoTopRankingTable: React.FC<ZenoTopRankingTableProps> = ({
  title,
  data,
}) => {
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

        <Grid.Col span={3}>Name</Grid.Col>
        <Grid.Col span={2}>Store Id</Grid.Col>

        <Grid.Col span={3}>Net Sales</Grid.Col>
        <Grid.Col span={2}>Sales Rank</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item) => {
          return (
            <Grid
              key={item.store_id}
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
              <Grid.Col span={2}>{item.total_net_sales_rank}</Grid.Col>
              <Grid.Col span={3} c="hsl(var(--foreground))">
                {item.name}
              </Grid.Col>
              <Grid.Col span={2}>{item.store_id}</Grid.Col>

              <Grid.Col span={3}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2, 0.2)"
                  c="rgb(255, 138, 2)"
                >
                  {item.net_sales}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {item.total_net_sales_rank}
                </Badge>
              </Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
};
