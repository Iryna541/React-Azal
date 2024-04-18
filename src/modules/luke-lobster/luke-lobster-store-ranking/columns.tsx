import { ColumnDef } from "@tanstack/react-table";
import { ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";
import { LukeLobsterStoreRankingData } from "./api/useLukeLobsterStoreRanking";

export const columns: ColumnDef<LukeLobsterStoreRankingData>[] = [
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
    accessorKey: "name",
    header: "Store",
  },
  // {
  //   accessorKey: "store_id",
  //   header: "Store Id",
  // },
  {
    accessorKey: "sales",
    header: "Sales",
  },
  {
    accessorKey: "sales_vs_sales_forecast",
    header: "Forcast",
  },
  {
    accessorKey: "sales_vs_sales_forecast",
    header: "Delta",
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
