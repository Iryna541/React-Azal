import { ColumnDef } from "@tanstack/react-table";
import { DunkinStoreRankingData } from "./api/useDunkinStoreRanking";
import { ActionIcon, Text } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";

export const columns: ColumnDef<DunkinStoreRankingData>[] = [
  {
    accessorKey: "store_rank",
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
    accessorKey: "store_id",
    header: "Store Id",
  },

  {
    accessorKey: "rank_net_sales",
    header: "Net Sales",
  },
  {
    accessorKey: "rank_average_weekly_ticket_count",
    header: "Avg Weekly Ticket Count",
  },
  {
    accessorKey: "rank_average_ticket_size",
    header: "Avg Ticket Size",
  },

  {
    header: "Details",
    cell: ({ row }) => {
      const expanded = row.getIsExpanded();
      return (
        <ActionIcon
          onClick={() => row.toggleExpanded(!expanded ? true : false)}
        >
          <Text c="hsl(var(--foreground) / 0.75)">
            <IconInfoCircleFilled />
          </Text>
        </ActionIcon>
      );
    },
  },
];
