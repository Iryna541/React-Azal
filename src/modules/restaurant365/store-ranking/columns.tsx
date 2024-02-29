import { ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useR365StoreRanking"; // Adjusted import for the new hook
import { ActionIcon, Badge, Text } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";

export const columns: ColumnDef<StoreInsights>[] = [
  {
    accessorKey: "total_net_sales_rank",
    header: "Position",
  },
  {
    accessorKey: "store_id",
    header: "Store ID",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "total_net_sales_rank",
    header: "Sales Rank",
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
    header: "Details",
    id: "details",
    cell: ({ row }) => {
      const expanded = row.getIsExpanded();
      return (
        <ActionIcon
          variant="azalio-ui-white"
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
