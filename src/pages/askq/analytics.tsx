import {
  Box,
  Center,
  Divider,
  Loader,
  SimpleGrid,
  Stack,
  Tabs,
  Title,
} from "@mantine/core";
import { Layout } from "~/components/Layout";
import { useStoreRanking } from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { BkStoreRankingTable } from "~/modules/bk/bk-store-ranking/BkStoreRankingTable";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { CalenderTable } from "~/components/CalenderTable";
import {
  BkManagerRankingData,
  BkManagerRankingTable,
} from "~/modules/bk/bk-manager-ranking-table/BkManagerRankingTable";
import IframeResizer from "iframe-resizer-react";
import { useUser } from "~/modules/auth/hooks/useUser";
import {
  DunkinStoreRankingData,
  DunkinTopStoreRanking,
} from "~/modules/dunkin/dunkin-top-store-ranking/DunkinTopStoreRanking";
import useDunkinStoreRanking from "~/modules/dunkin/dunkin-store-ranking/api/useDunkinStoreRanking";
import { DunkinStoreRankingTable } from "~/modules/dunkin/dunkin-store-ranking/DunkinStoreRankingTable";
import { R365StoreRankingTable } from "~/modules/restaurant365/store-ranking/R365StoreRankingTable";
import { useR365StoreRanking } from "~/modules/restaurant365/store-ranking/api/useR365StoreRanking";
import {
  StoreInsights,
  useZenoStoreRanking,
} from "~/modules/restaurant365/zeno-ranking/api/useZenoStoreRanking";
import { ZenoStoreRankingTable } from "~/modules/restaurant365/zeno-ranking/ZenoStoreRankingTable";
import { ZenoTopRankingTable } from "~/modules/restaurant365/zeno-ranking/zeno-top-ranking-table/ZenoTopRankingTable";

export default function AnalyticsPage() {
  const { user } = useUser();

  let height = 700;
  if (user?.company_id === 212 || user?.company_id === 214) height = 1100;

  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3}>Analytics</Title>
        <BusterIframe h={height} />
        {user?.company_id === 211 && <BkSetup />}
        {user?.company_id === 212 && <DunkinSetup />}
        {user?.company_id === 213 && <R365Setup />}
        {user?.company_id === 214 && <ZenoSetup />}
      </Layout>
    </ProtectedRoute>
  );
}

function BusterIframe({ h }: { h: number }) {
  const { data: busterIframeData, isLoading } = useBusterIFrame();

  return (
    <Box m={-20} py={20}>
      {busterIframeData && (
        <IframeResizer
          width="100%"
          height={h}
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
  );
}

function R365Setup() {
  const { data } = useR365StoreRanking();
  return (
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
        <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
          Which locations are doing better?
        </Title>
      </Box>
      <Divider />
      {data && <R365StoreRankingTable data={data} />}
    </Box>
  );
}

function BkSetup() {
  const { data } = useStoreRanking();

  const sortedManagersData: BkManagerRankingData = (data ?? [])
    .sort((a, b) => {
      return parseInt(a.overall_ranking) - parseInt(b.overall_ranking);
    })
    .map((item, index) => {
      return {
        position: index + 1,
        manager: item.general_managers,
        fss: item.fss_ranking,
        financials: item.mgr_profit_ranking,
        insights: item.bullet_points,
      };
    });

  return (
    <>
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
          {/* <Tabs.Tab value="manager">Manager</Tabs.Tab> */}
        </Tabs.List>
        <Tabs.Panel value="store">
          <Stack gap="xl">
            <SimpleGrid cols={2}>
              <BkManagerRankingTable
                title="Top 5 Best Store Managers"
                data={sortedManagersData.slice(0, 5)}
              />
              <BkManagerRankingTable
                title="Top 5 Worst Store Managers"
                data={sortedManagersData.reverse().slice(0, 5)}
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
              {data && <BkStoreRankingTable data={data} />}
            </Box>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="manager">
          <CalenderTable />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

function DunkinSetup() {
  const { data } = useDunkinStoreRanking();

  const topStoresByNetSalesData: DunkinStoreRankingData = [...(data ?? [])]
    .sort((a, b) => {
      return parseInt(a.rank_net_sales) - parseInt(b.rank_net_sales);
    })
    .map((item) => {
      return {
        store_rank: item.store_rank,
        store_id: item.store_id,
        rank_net_sales: item.rank_net_sales,
        rank_average_weekly_ticket_count: item.rank_average_weekly_ticket_count,
        rank_average_ticket_size: item.rank_average_ticket_size,
        bullet_points: item.bullet_points,
      };
    });

  const topStoresByAvgWeeklyTicketCount: DunkinStoreRankingData = [
    ...(data ?? []),
  ]
    .sort((a, b) => {
      return (
        parseInt(a.rank_average_weekly_ticket_count) -
        parseInt(b.rank_average_weekly_ticket_count)
      );
    })
    .map((item) => {
      return {
        store_rank: item.store_rank,
        store_id: item.store_id,
        rank_net_sales: item.rank_net_sales,
        rank_average_weekly_ticket_count: item.rank_average_weekly_ticket_count,
        rank_average_ticket_size: item.rank_average_ticket_size,
        bullet_points: item.bullet_points,
      };
    });

  const topStoresByAvgTicketSize: DunkinStoreRankingData = [...(data ?? [])]
    .sort((a, b) => {
      return (
        parseInt(a.rank_average_ticket_size) -
        parseInt(b.rank_average_ticket_size)
      );
    })
    .map((item) => {
      return {
        store_rank: item.store_rank,
        store_id: item.store_id,
        rank_net_sales: item.rank_net_sales,
        rank_average_weekly_ticket_count: item.rank_average_weekly_ticket_count,
        rank_average_ticket_size: item.rank_average_ticket_size,
        bullet_points: item.bullet_points,
      };
    });

  return (
    <Box>
      <Tabs variant="pills" radius="xs" defaultValue="store">
        <Tabs.List mb="lg">
          <Tabs.Tab value="store">Store</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="store">
          <Stack gap={40}>
            <SimpleGrid cols={2} spacing="xl">
              <DunkinTopStoreRanking
                title="Top 3 Best Stores by Net Sales"
                data={topStoresByNetSalesData.slice(0, 3)}
              />
              <DunkinTopStoreRanking
                title="Top 3 Worst Stores by Net Sales"
                data={topStoresByNetSalesData.reverse().slice(0, 3)}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} spacing="xl">
              <DunkinTopStoreRanking
                title="Top 3 Best Stores by Avg Weekly Ticket Count"
                data={topStoresByAvgWeeklyTicketCount.slice(0, 3)}
              />
              <DunkinTopStoreRanking
                title="Top 3 Worst Stores by Avg Weekly Ticket Count"
                data={topStoresByAvgWeeklyTicketCount.reverse().slice(0, 3)}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} spacing="xl">
              <DunkinTopStoreRanking
                title="Top 3 Best Stores by Avg Ticket Size"
                data={topStoresByAvgTicketSize.slice(0, 3)}
              />
              <DunkinTopStoreRanking
                title="Top 3 Worst Stores by Avg Ticket Size"
                data={topStoresByAvgTicketSize.reverse().slice(0, 3)}
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
              {data && <DunkinStoreRankingTable data={data} />}
            </Box>
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}

function ZenoSetup() {
  const { data } = useZenoStoreRanking();

  const sortedManagersData: StoreInsights[] = (data ?? []).sort((a, b) => {
    return parseInt(a.total_net_sales_rank) - parseInt(b.total_net_sales_rank);
  });

  return (
    <Stack gap="xl">
      <SimpleGrid cols={2} spacing="xl">
        <ZenoTopRankingTable
          title="Top 5 Best Stores by Net Sales"
          data={sortedManagersData.slice(0, 5)}
        />
        <ZenoTopRankingTable
          title="Top 5 Worst Stores by Net Sales"
          data={[...sortedManagersData].reverse().slice(0, 5)}
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
          <Title component="p" order={6} fz={14} fw={500} size="sm" lh={1.5}>
            Which locations are doing better?
          </Title>
        </Box>
        <Divider />

        {data && <ZenoStoreRankingTable data={data} />}
      </Box>
    </Stack>
  );
}
