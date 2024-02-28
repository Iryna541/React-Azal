import { ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useStoreRanking";
import { ActionIcon, Badge, Text } from "@mantine/core";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";

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
    header: "Manager Ranking",
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
