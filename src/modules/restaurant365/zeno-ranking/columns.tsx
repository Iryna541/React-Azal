import { ColumnDef } from "@tanstack/react-table";
import { StoreInsights } from "./api/useZenoStoreRanking";
import { ActionIcon, Badge } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import {
  IconFifthPlace,
  IconFirstPlace,
  IconFourthPlace,
  IconSecondPlace,
  IconThirdPlace,
} from "~/assets";

export const columns: ColumnDef<StoreInsights>[] = [
  {
    accessorKey: "store_rank",
    header: "Position",
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
  // {
  //   accessorKey: "store_id",
  //   header: "Store ID",
  // },
  {
    accessorKey: "store_name",
    header: "Store",
  },
  {
    accessorKey: "net_sales_current",
    header: "Total Sales",
    // cell: ({ getValue }) => {
    //   return (
    //     <Badge
    //       size="md"
    //       h={32}
    //       w={40}
    //       c="hsl(var(--foreground) / 0.8)"
    //       bg="hsl(var(--secondary))"
    //       fw={600}
    //       fz={14}
    //       style={{ borderRadius: 4 }}
    //     >
    //       {getValue() as string}
    //     </Badge>
    //   );
    // },
  },
  {
    accessorKey: "sales_growth",
    header: "Sales growth (VS LW)",
  },
  {
    header: "Details",
    id: "details",
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
