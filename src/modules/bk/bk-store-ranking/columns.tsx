import { CellContext, ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useStoreRanking";
import {
  ActionIcon,
  Badge,
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

// import { useBkAnalyticsCharts } from "../bk-charts-2/api/useBkAnalyticsCharts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<any>();
  const queryClient = useQueryClient();

  const testData = queryClient.getQueriesData({
    queryKey: ["bk-analytics-charts"],
  })[0][1];

  console.log("test==>", testData);

  useEffect(() => {
    setData(
      queryClient.getQueriesData({ queryKey: ["bk-analytics-charts"] })[0][1]
    );
  }, [queryClient]);
  // const { data: data } = useBkAnalyticsCharts({
  //   isMystores: false,
  // });

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
    acr: "0",
    sos: "0",
    training_rate: "0",
    retention: "0",
    glv: "0",
    revs: "0",
  };

  if (data) {
    console.log(data.chart2[0].stores);

    storeRatings.acr =
      data.chart2[0].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;
    storeRatings.sos =
      data.chart2[1].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;
    storeRatings.training_rate =
      data.chart2[2].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;
    storeRatings.retention =
      data.chart2[3].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;
    storeRatings.glv =
      data.chart2[4].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;
    storeRatings.revs =
      data.chart2[5].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.rating || 5;

    const getScore = (index: number) =>
      data.chart2[index].stores.find(
        (item: any) => item.store_id.toString() === storeId.toString()
      )?.score;

    storeScores.acr =
      typeof getScore(0) === "number" ? getScore(0).toFixed(1) : "0";
    storeScores.sos = getScore(1) || "0";
    storeScores.training_rate =
      typeof getScore(2) === "number" ? getScore(2).toFixed(1) : "0";
    storeScores.retention =
      typeof getScore(3) === "number" ? getScore(3).toFixed(1) : "0";
    storeScores.glv =
      typeof getScore(4) === "number" ? getScore(4).toFixed(1) : "0";
    storeScores.revs =
      typeof getScore(5) === "number" ? getScore(5).toFixed(1) : "0";

    for (let i = 0; i < data?.chart1?.length; i++) {
      const store = data.chart1[i].stores.find(
        (st: any) => st.store_id === parseInt(storeId)
      );
      if (store) {
        fssScore = store.score;
        break;
      }
    }
  }

  return (
    <Stack>
      <Flex justify="space-between">
        <Text>FSS Score</Text>
        {data ? <Text fw={600}>{fssScore}</Text> : <Loader />}
      </Flex>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>ACR</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>{storeScores.acr}</Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1} style={{ justifyContent: "end" }}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.acr}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>SOS</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>{storeScores.sos}</Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.sos}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>Training Rate</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>
              {storeScores.training_rate}
            </Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.training_rate}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>Retention</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>{storeScores.retention}</Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.retention}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>GLV</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>{storeScores.glv}</Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.glv}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col span={1}>
          <Text>REVs</Text>
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "center" }}>{storeScores.revs}</Text>
          ) : (
            <Text style={{ textAlign: "center" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          {data ? (
            <Text style={{ textAlign: "end" }}>
              {storeRatings.revs}{" "}
              <IconStarFilled
                height={14}
                width={14}
                style={{ color: "#FAC84E" }}
              />
            </Text>
          ) : (
            <Text style={{ textAlign: "end" }}>
              <Loader />
            </Text>
          )}
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

export function FinancialModalContent({ storeId }: { storeId: string }) {
  const [data, setData] = useState<any>();
  const queryClient = useQueryClient();

  const test = queryClient.getQueriesData({
    queryKey: ["bk-analytics-charts"],
  });

  console.log("test:==>", test);

  useEffect(() => {
    setData(
      queryClient.getQueriesData({ queryKey: ["bk-analytics-charts"] })[0][1]
    );
  }, [queryClient]);
  // const { data: data } = useBkAnalyticsCharts({
  //   isMystores: false,
  // });

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const filteredData =
    data?.chart3?.filter(
      (item: any) => item?.store_id === storeId.toString()
    ) || [];

  const financialData = filteredData[0]?.data || [];

  return (
    <Stack gap="sm">
      {financialData &&
        financialData.map((item: any) => {
          return (
            <Flex justify="space-between" py={4}>
              <Text size="sm">{item?.label}</Text>
              <Text size="sm" fw={600}>
                {item?.label.includes("%")
                  ? `${item?.value}%`
                  : USDollar.format(item?.value)}
                {/* {item.value} */}
              </Text>
            </Flex>
          );
        })}
    </Stack>
  );
}
