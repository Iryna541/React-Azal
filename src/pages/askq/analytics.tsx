import { Box, Divider, Stack, Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import IframeResizer from "iframe-resizer-react";
import useStoreRanking from "~/modules/bk-store-ranking/api/useStoreRanking";
import { StoreRankingTable } from "~/modules/bk-store-ranking/StoreRankingTable";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";

export default function AnalyticsPage() {
  const { data } = useStoreRanking();
  return (
    <Layout>
      <Title order={3}>Analytics</Title>
      <Box m={-20} py={20}>
        <IframeResizer
          width="100%"
          height={700}
          style={{
            border: 0,
            width: "1px",
            minWidth: "100%",
            overflow: "hidden",
          }}
          src="https://app.buster.so/embed/38d98437-8b37-4015-a8ef-5f329a80ff9c?jwtToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3ZjVmYjE4OS1kMWQ1LTRjNmYtYTllNC0xMzI1ZDViYTY2MDkiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiY3N0IjoiZm9yZGxhbmNlckB5b3BtYWlsLmNvbSIsImV4cCI6MTcwODQ1NjY2NX0.jwZh0dL9D5pRf48TPEmLE3jDhEF4sOyUhgfdr136iP8"
        ></IframeResizer>
      </Box>

      <Stack gap="lg">
        <Box
          style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}
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
          {data && <StoreRankingTable data={data} />}
        </Box>

        <ChatInterface />
      </Stack>
    </Layout>
  );
}
