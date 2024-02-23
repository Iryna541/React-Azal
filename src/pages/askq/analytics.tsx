import {
  Badge,
  Box,
  Center,
  Divider,
  Grid,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Title,
} from "@mantine/core";
import { Layout } from "~/components/Layout";
import IframeResizer from "iframe-resizer-react";
import useStoreRanking from "~/modules/bk-store-ranking/api/useStoreRanking";
import { StoreRankingTable } from "~/modules/bk-store-ranking/StoreRankingTable";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";

export default function AnalyticsPage() {
  const { data } = useStoreRanking();
  const { data: busterIframeData, isLoading } = useBusterIFrame();

  const topManagersData: ManagerRankingData = (data ?? [])
    .slice(0, 5)
    .map((item, index) => {
      return {
        position: index + 1,
        manager: item.general_managers,
        fss: item.fss_ranking,
        financials: item.mgr_profit_ranking,
      };
    });

  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3}>Analytics</Title>
        <Box m={-20} py={20}>
          {busterIframeData && (
            <IframeResizer
              width="100%"
              height={700}
              style={{
                border: 0,
                width: "1px",
                minWidth: "100%",
                overflow: "hidden",
              }}
              src={busterIframeData.iframe}
            ></IframeResizer>
          )}
          {isLoading && (
            <Center h={700}>
              <Loader size="lg" type="dots" />
            </Center>
          )}
        </Box>

        <Tabs variant="pills" radius="xs" defaultValue="store">
          <Tabs.List mb="lg">
            <Tabs.Tab value="store">Store</Tabs.Tab>
            <Tabs.Tab value="manager">Manager</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="store">
            <Stack gap="xl">
              <SimpleGrid cols={2}>
                <ManagerRankingTable
                  title="Top 5 Best Store Managers"
                  data={topManagersData}
                />
                <ManagerRankingTable
                  title="Top 5 Worst Store Managers"
                  data={topManagersData}
                />
              </SimpleGrid>
              <Box
                style={{
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                }}
              >
                <Box px="lg" py="md">
                  <Title order={5} fw={500} fz={16}>
                    Store Leaderboard
                  </Title>
                  <Title
                    component="p"
                    order={6}
                    fz={14}
                    fw={500}
                    size="sm"
                    lh={1.5}
                  >
                    Which locations are doing better?
                  </Title>
                </Box>
                <Divider />
                {data && <StoreRankingTable data={data} />}
              </Box>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="manager">manager</Tabs.Panel>
        </Tabs>
        <Box mt="xl">
          <ChatInterface />
        </Box>
      </Layout>
    </ProtectedRoute>
  );
}

type ManagerRankingData = Array<{
  position: number;
  manager: string;
  fss: string;
  financials: string;
}>;

function ManagerRankingTable({
  title,
  data,
}: {
  title: string;
  data: ManagerRankingData;
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
        <Grid.Col span={4}>Manager</Grid.Col>
        <Grid.Col span={2}>FSS</Grid.Col>
        <Grid.Col span={2}>Financials</Grid.Col>
        <Grid.Col span={2}>Total</Grid.Col>
      </Grid>
      <Stack gap="xs">
        {data.map((item) => {
          return (
            <Grid
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
                <Badge
                  size="lg"
                  fw={700}
                  bg="rgba(63, 221, 120, 0.24)"
                  c="rgb(63, 221, 120)"
                >
                  {parseInt(item.fss) + parseInt(item.financials)}
                </Badge>
              </Grid.Col>
            </Grid>
          );
        })}
      </Stack>
    </Box>
  );
}
