import {
  Box,
  Title,
  Grid,
  Stack,
  Badge,
  ActionIcon,
  Flex,
  Tooltip,
  TypographyStylesProvider,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconBulb } from "@tabler/icons-react";
import { marked } from "marked";

export type DunkinStoreRankingData = Array<{
  store_rank: string;
  store_id: string;
  rank_net_sales: string;
  rank_average_weekly_ticket_count: string;
  rank_average_ticket_size: string;
  bullet_points: string;
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
        <Grid.Col span={2}>Store Id</Grid.Col>
        <Grid.Col span={2}>Net Sales</Grid.Col>
        <Grid.Col span={3}>Avg Weekly Ticket Count</Grid.Col>
        <Grid.Col span={2}>Avg Ticket Size</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item) => {
          const handleOpenModal = () => {
            const content = marked.parse(item.bullet_points);

            modals.open({
              title: "AI Insights",
              children: (
                <TypographyStylesProvider>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: content as string,
                    }}
                  ></div>
                </TypographyStylesProvider>
              ),
            });
          };

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
              <Grid.Col span={2} c="hsl(var(--foreground))">
                {item.store_id}
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2,0.2)"
                  c="rgb(255, 138, 2)"
                >
                  {item.rank_net_sales}
                </Badge>
              </Grid.Col>
              <Grid.Col span={3}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {item.rank_average_weekly_ticket_count}
                </Badge>
              </Grid.Col>
              <Grid.Col span={3}>
                <Flex w="100%" align="center" justify="space-between">
                  <Badge
                    size="lg"
                    fw={700}
                    bg="rgba(63, 221, 120, 0.24)"
                    c="rgb(63, 221, 120)"
                  >
                    {item.rank_average_ticket_size}
                  </Badge>
                  <Tooltip label="AI Insights">
                    <ActionIcon onClick={handleOpenModal}>
                      <IconBulb size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}