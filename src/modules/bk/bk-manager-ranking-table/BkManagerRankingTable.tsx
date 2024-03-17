import {
  Box,
  Title,
  Grid,
  Stack,
  Badge,
  Flex,
  Tooltip,
  ActionIcon,
  TypographyStylesProvider,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconBulb } from "@tabler/icons-react";
import { marked } from "marked";

export type BkManagerRankingData = Array<{
  position: number;
  manager: string;
  fss: string;
  financials: string;
  insights: string;
}>;

interface BkManagerRankingTableProps {
  title: string;
  data: BkManagerRankingData;
}

export function BkManagerRankingTable({
  title,
  data,
}: BkManagerRankingTableProps) {
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
        <Grid.Col span={4}>Manager</Grid.Col>
        <Grid.Col span={2}>FSS</Grid.Col>
        <Grid.Col span={2}>Financials</Grid.Col>
        <Grid.Col span={2}>Total</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item, index) => {
          return (
            <Grid
              key={index}
              // bg="hsl(var(--secondary))"
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
              <Grid.Col span={2}>{item.position}</Grid.Col>
              <Grid.Col span={4} c="hsl(var(--foreground))">
                {item.manager}
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(255, 138, 2,0.2)"
                  c="rgb(255, 138, 2)"
                >
                  {item.fss}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(0, 132, 255, 0.2)"
                  c="rgb(0, 132, 255)"
                >
                  {item.financials}
                </Badge>
              </Grid.Col>
              <Grid.Col span={2}>
                <Flex align="center" justify="space-between" gap="lg">
                  <Badge
                    size="lg"
                    fw={700}
                    bg="rgba(63, 221, 120, 0.24)"
                    c="rgb(63, 221, 120)"
                  >
                    {parseInt(item.fss) + parseInt(item.financials)}
                  </Badge>
                  <Tooltip label="Overview">
                    <ActionIcon
                      size="sm"
                      h={26}
                      variant="light"
                      onClick={() => {
                        const content = marked.parse(item.insights) as string;
                        modals.open({
                          size: "lg",
                          title: `${item.manager} - Overview`,
                          children: (
                            <TypographyStylesProvider>
                              <div
                                dangerouslySetInnerHTML={{ __html: content }}
                              ></div>
                            </TypographyStylesProvider>
                          ),
                        });
                      }}
                    >
                      <IconBulb size={14} />
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
