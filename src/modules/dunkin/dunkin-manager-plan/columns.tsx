import { ColumnDef } from "@tanstack/react-table";
import { ManagerPlanRow } from "./api/useDunkinManagerPlan";

export const columns: ColumnDef<ManagerPlanRow>[] = [
  {
    accessorKey: "store_id",
    header: "Store ID",
    size: 120,
  },
];
