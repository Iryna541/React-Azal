import { ColumnDef } from "@tanstack/react-table";

export interface ManagerPlan {
  manager: string;
  action_plan: string;
}

export const columns: ColumnDef<ManagerPlan>[] = [
  {
    accessorKey: "manager",
    header: "General Manager",
    size: 40,
  },
  {
    accessorKey: "action_plan",
    header: "Action Plans",
  },
];
