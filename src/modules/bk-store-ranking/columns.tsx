import { ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useStoreRanking";
import { ActionIcon, Badge, Text } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";

export const columns: ColumnDef<StoreInsights>[] = [
  {
    accessorKey: "overall_ranking",
    header: "Rank",
    size: 80,
  },
  {
    accessorKey: "store_id",
    header: "Store Id",
  },

  {
    accessorKey: "general_managers",
    header: "Manager",
  },
  {
    accessorKey: "fss_ranking",
    header: "FSS Ranking",
    cell: ({ getValue }) => {
      return (
        <Badge
          size="md"
          h={32}
          w={40}
          c="hsl(var(--foreground) / 0.8)"
          bg="hsl(var(--secondary))"
          fw={600}
          fz={14}
          style={{ borderRadius: 4 }}
        >
          {getValue() as string}
        </Badge>
      );
    },
  },
  {
    accessorKey: "mgr_profit_ranking",
    header: "Profit Ranking",
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
