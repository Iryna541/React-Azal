import { ColumnDef } from "@tanstack/react-table";
import { ZenoInsightRow } from "./api/useZenoInsightTable";

export const columns: ColumnDef<ZenoInsightRow>[] = [
  {
    accessorKey: "today_date",
    header: "Date",
    size: 150,
  },
  // {
  //   accessorKey: "store_id",
  //   header: "Store ID",
  //   size: 150,
  // },
  {
    accessorKey: "total_sales",
    header: "Sales",
    size: 150,
  },
  {
    accessorKey: "sales_percentage_current_vs_last_year",
    header: "Sales vs Ly %",
    size: 150,
  },
  // {
  //   accessorKey: "difference",
  //   header: "Sales vs Ly",
  //   size: 150,
  // },
  {
    accessorKey: "transaction_count",
    header: "Transaction Count",
    size: 150,
  },
  // labor data
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
  {
    accessorKey: "labor_goal_percentage",
    header: "Labor Goal %",
    size: 150,
  },

  // {
  //   accessorKey: "labor_other_amount",
  //   header: "Labor Other $",
  //   size: 150,
  // },
  // {
  //   accessorKey: "labor_other_hours",
  //   header: "Labor Other Hours",
  //   size: 150,
  // },
  {
    accessorKey: "labor_overtime_amount",
    header: "Labor Overtime $",
    size: 150,
  },
  // {
  //   accessorKey: "labor_overtime_hours",
  //   header: "Labor Overtime Hours",
  //   size: 150,
  // },
  {
    accessorKey: "labor_regular_amount",
    header: "Labor Regular $",
    size: 150,
  },
  // {
  //   accessorKey: "labor_regular_hours",
  //   header: "Labor Regular Hours",
  //   size: 150,
  // },
  {
    accessorKey: "labr_daily_salary_",
    header: "Daily Salary",
    size: 150,
  },

  // {
  //   accessorKey: "total_forecast_sales",
  //   header: "Total Forecast Sales",
  //   size: 150,
  // },

  // {
  //   accessorKey: "week_end_date",
  //   header: "Week End Date",
  //   size: 150,
  // },
  // {
  //   accessorKey: "week_start_date",
  //   header: "Week Start Date",
  //   size: 150,
  // },
];
