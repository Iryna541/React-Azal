import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { ManagerPlanTable } from "~/modules/bk-manager-plan/ManagerPlanTable";
import { StoreRankingTable } from "~/modules/bk-store-ranking/StoreRankingTable";
import useStoreRanking from "~/modules/bk-store-ranking/api/useStoreRanking";

export function BkRankingPage() {
  const { data } = useStoreRanking();
  const [tab, setTab] = useState<"store" | "manager">("store");

  const managerData = data?.map((item) => {
    return {
      manager: item.general_managers,
      action_plan: item.cta,
    };
  });
  return (
    <Container size="100%">
      <Group mb="lg" gap="sm">
        <Button
          variant={tab === "store" ? "azalio-ui" : "azalio-ui-outline"}
          onClick={() => setTab("store")}
        >
          Store
        </Button>
        <Button
          variant={tab === "manager" ? "azalio-ui" : "azalio-ui-outline"}
          onClick={() => setTab("manager")}
        >
          Manager
        </Button>
      </Group>
      <ScrollArea
        h="80vh"
        style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}
      >
        <Box px="lg" py="md">
          <Title order={5} fw={500} fz={16} lh={1.57}>
            {tab === "store" ? "Store Leaderboard" : "Manager Action Plans"}
          </Title>
          {/* <Title order={6} fz={14} fw={500} size="sm" lh={1.57}>
            Which locations are doing better?
          </Title> */}
        </Box>
        <Divider />
        {data && tab === "store" && <StoreRankingTable data={data} />}
        {managerData && tab === "manager" && (
          <ManagerPlanTable data={managerData ?? []} />
        )}
      </ScrollArea>
    </Container>
  );
}
