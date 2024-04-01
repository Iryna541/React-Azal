import { Badge, Box, Center, Flex, Loader, Title } from "@mantine/core";
import IframeResizer from "iframe-resizer-react";
import { Layout } from "~/components/Layout";
import { useBusterIFrame } from "~/modules/askq/api/useBusterIFrame";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { useUser } from "~/modules/auth/hooks/useUser";

export default function AnalyticsPage() {
  const { user } = useUser();

  let height = 700;
  if (user?.company_id === 212 || user?.company_id === 214) height = 1100;

  return (
    <ProtectedRoute>
      <Layout>
        <Flex align="center" gap="md">
          <Title order={3}>Analytics</Title>
          <Badge fw={600} size="lg">
            Beta
          </Badge>
        </Flex>
        <BusterIframe h={height} />
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
