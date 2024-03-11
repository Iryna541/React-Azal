import { ColumnDef } from "@tanstack/react-table";
import { ManagerPlanRow } from "./api/useBkManagerPlan";

export const columns: ColumnDef<ManagerPlanRow>[] = [
  {
    accessorKey: "managers_name",
    header: "Manager",
    size: 120,
  },
];