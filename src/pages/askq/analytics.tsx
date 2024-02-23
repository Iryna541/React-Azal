import { Box, Center, Divider, Loader, Stack, Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import IframeResizer from "iframe-resizer-react";
import useStoreRanking from "~/modules/bk-store-ranking/api/useStoreRanking";
import { StoreRankingTable } from "~/modules/bk-store-ranking/StoreRankingTable";
import { ChatInterface } from "~/modules/bk-chat/ChatInterface";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";

export default function AnalyticsPage() {
  const { data } = useStoreRanking();
  const { data: busterIframeData, isLoading } = useBusterIFrame();
  return (
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
            <Loader size="xl" />
          </Center>
        )}
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
