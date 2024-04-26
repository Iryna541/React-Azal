import { ColumnDef } from "@tanstack/react-table";
import { ZenoInsightRow } from "./api/useZenoInsightTable";

export const columns: ColumnDef<ZenoInsightRow>[] = [
  {
    accessorKey: "today_date",
    header: "Norwalk",
    size: 294.5,
  },
  {
    accessorKey: "total_sales",
    header: "TOTAL NET SALES",
    size: 150,
  },
  {
    accessorKey: "sales_percentage_current_vs_last_year",
    header: "Sales vs Ly %",
    size: 150,
  },
  {
    accessorKey: "transaction_count",
    header: "Transaction Count",
    size: 150,
  },
  {
    accessorKey: "total_labor_hours",
    header: "Total Labor Hours",
    size: 150,
  },
  {
    accessorKey: "labor_hourly_percentage",
    header: "Hourly Labor %",
    size: 150,
  },
  {
    accessorKey: "labor_hourly_salary_percentage",
    header: "Hourly Labor Salary %",
    size: 150,
  },
];
