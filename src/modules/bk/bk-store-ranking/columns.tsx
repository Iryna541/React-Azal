import { CellContext, ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useStoreRanking";
import {
  ActionIcon,
  Badge,
  Divider,
  Flex,
  Loader,
  Grid,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconStarFilled,
} from "@tabler/icons-react";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";
import { modals } from "@mantine/modals";

import { useBkAnalyticsCharts } from "../bk-charts-2/api/useBkAnalyticsCharts";

export const columns: ColumnDef<StoreInsights>[] = [
  {
    accessorKey: "overall_ranking",
    header: "Rank",
    size: 80,
    cell: ({ getValue }) => {
      const value = getValue() as string;
      if (value === "1") {
        return <IconFirstPlace height={28} width={28} />;
      } else if (value === "2") {
        return <IconSecondPlace height={28} width={28} />;
      } else if (value === "3") {
        return <IconThirdPlace height={28} width={28} />;
      } else if (value === "4") {
        return <IconFourthPlace height={28} width={28} />;
      } else if (value === "5") {
        return <IconFifthPlace height={28} width={28} />;
      }
      return value;
    },
  },
  {
    accessorKey: "general_managers",
    header: "Manager",
    cell: (cell) => {
      const value = cell.getValue() as string;
      return (
        <Tooltip label={cell.row.original.store_id}>
          <Text size="sm">{value}</Text>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "store_id",
    header: "Store Id",
  },
  {
    accessorKey: "fss_ranking",
    header: "FSS Ranking",
    cell: FSSRankingCell,
  },
  {
    accessorKey: "mgr_profit_ranking",
    header: "Financial Ranking",
    cell: FinancialRankingCell,
  },
  {
    header: "Details",
    cell: ({ row }) => {
      const expanded = row.getIsExpanded();
      return (
        <ActionIcon
          onClick={() => row.toggleExpanded(!expanded ? true : false)}
        >
          {expanded ? <IconChevronUp /> : <IconChevronDown />}
        </ActionIcon>
      );
    },
  },
];

function FSSRankingCell(cell: CellContext<StoreInsights, unknown>) {
  const storeId = cell.row.original.store_id;
  return (
    <Badge
      size="md"
      h={32}
      w={40}
      c="hsl(var(--foreground) / 0.8)"
      bg="hsl(var(--secondary))"
      fw={600}
      fz={14}
      style={{ borderRadius: 4, cursor: "pointer" }}
      onClick={() => {
        modals.open({
          title: "FSS Ranking Details",
          children: <ModalContent storeId={storeId} />,
        });
      }}
    >
      {cell.getValue() as string}
    </Badge>
  );
}

function FinancialRankingCell(cell: CellContext<StoreInsights, unknown>) {
  const storeId = cell.row.original.store_id;
  return (
    <Badge
      size="md"
      h={32}
      w={40}
      c="hsl(var(--foreground) / 0.8)"
      bg="hsl(var(--secondary))"
      fw={600}
      fz={14}
      style={{ borderRadius: 4, cursor: "pointer" }}
      onClick={() => {
        modals.open({
          title: "Financial Ranking Details",
          children: <FinancialModalContent storeId={storeId} />,
        });
      }}
    >
      {cell.getValue() as string}
    </Badge>
  );
}

export function ModalContent({ storeId }: { storeId: string }) {
  const { data: data } = useBkAnalyticsCharts({
    isMystores: false,
  });

  let fssScore: number = 0;

  const storeRatings = {
    acr: 0,
    sos: 0,
    training_rate: 0,
    retention: 0,
    glv: 0,
    revs: 0,
  };

  const storeScores = {
    acr: 0,
    sos: 0,
    training_rate: 0,
    retention: 0,
    glv: 0,
    revs: 0,
  }

  if (data) {
    storeRatings.acr = data.chart2[0].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.rating;
    storeRatings.sos = data.chart2[1].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.rating;
    storeRatings.training_rate = data.chart2[2].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.rating;
    storeRatings.retention = data.chart2[3].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.rating;
    storeRatings.glv = data.chart2[4].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.rating;
    storeRatings.revs =
      data.chart2[5].stores.find(
        (item) => item.store_id === parseInt(storeId)
      )!.rating;

    storeScores.acr = data.chart2[0].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;
    storeScores.sos = data.chart2[1].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;
    storeScores.training_rate = data.chart2[2].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;
    storeScores.retention = data.chart2[3].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;
    storeScores.glv = data.chart2[4].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;
    storeScores.revs = data.chart2[4].stores.find(
      (item) => item.store_id === parseInt(storeId)
    )!.score;

    for (let i = 0; i < data?.chart1?.length; i++) {
      const store = data.chart1[i].stores.find(st => st.store_id === parseInt(storeId));
      if(store){
        fssScore = store.score;
        break;
      }
    }
  }

  return (
    <Stack>
      <Flex justify="space-between">
        <Text>FSS Score</Text>
        <Text fw={600}>{fssScore}</Text>
      </Flex>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>ACR</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.acr}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.acr} {" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>SOS</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.sos}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.sos} {" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>Training Rate</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.training_rate}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.training_rate} {" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>Retention</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.retention}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.retention} {" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>GLV</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.glv}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.glv}{" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
        <Text>REVs</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'center'}}>{storeScores.revs}</Text>
        </Grid.Col>
        <Grid.Col span={1}>
        <Text style={{textAlign: 'end'}}>
          {storeRatings.revs} {" "}
          <IconStarFilled height={14} width={14} style={{ color: "#FAC84E" }} />
        </Text>
        </Grid.Col>
      </Grid>
  
    </Stack>
  );
}

export function FinancialModalContent({ storeId }: { storeId: string }) {
  const { data: data } = useBkAnalyticsCharts({
    isMystores: false,
  });

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const filteredData =
    data?.chart3?.filter((item) => item.store_id === storeId.toString()) || [];

  return (
    <Stack gap="sm">
      <Flex justify="space-between">
        <Text size="sm">Actual vs. Budgeted Manager's Profit:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {USDollar.format(filteredData[0]?.act_vs_budget_managers_profits)}
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>

      <Divider />

      <Flex justify="space-between">
        <Text size="sm">Theoretical Gross Profit:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {filteredData[0]?.adj_theoretical_gp_percent} %
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>

      <Divider />

      <Flex justify="space-between">
        <Text size="sm">Actual Gross Profit:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {filteredData[0]?.actual_gp_percent} %
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>

      <Divider />

      <Flex justify="space-between">
        <Text size="sm">Gross Profit Variation:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {filteredData[0]?.act_vs_adj_theor} %
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>

      <Divider />

      <Flex justify="space-between">
        <Text size="sm">Actual Labor Cost:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {USDollar.format(filteredData[0]?.actual_total_labor)}
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>

      <Divider />

      <Flex justify="space-between">
        <Text size="sm">Budgeted Labor Cost:</Text>
        {data ? (
          <Text size="sm" fw={600}>
            {USDollar.format(filteredData[0]?.budgeted_total_labor)}
          </Text>
        ) : (
          <Loader />
        )}
      </Flex>
    </Stack>
  );
}
