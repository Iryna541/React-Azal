import { ColumnDef } from "@tanstack/react-table";
import { ZenoInsightRow } from "./api/useZenoInsightTable";




export const columns: ColumnDef<ZenoInsightRow >[] = [
  
  {
    accessorKey: "today_date",
    header: "Today's Date",
    size: 55,
  },
  {
    accessorKey: "store_id",
    header: "Store ID",
    size: 30,
  },
  {
    accessorKey: "difference",
    header: "Diff",
    size: 30,
  },
  {
    accessorKey: "labor_goal_percentage",
    header: "Labor Goal %",
    size: 55,
  },
  {
    accessorKey: "labor_hourly_percentage",
    header: "Labor Hourly %",
    size: 55,
  },
  {
    accessorKey: "labor_hourly_salary_percentage",
    header: "Labor Hourly Salary %",
    size: 55,
  },
  {
    accessorKey: "labor_other_amount",
    header: "Labor Other Amount",
    size: 55,
  },
  {
    accessorKey: "labor_other_hours",
    header: "Labor Other Hours",
    size: 55,
  },
  {
    accessorKey: "labor_overtime_amount",
    header: "Labor Overtime Amount",
    size: 55,
  },
  {
    accessorKey: "labor_overtime_hours",
    header: "Labor Overtime Hours",
    size: 55,
  },
  {
    accessorKey: "labor_regular_amount",
    header: "Labor Regular Amount",
    size: 55,
  },
  {
    accessorKey: "labor_regular_hours",
    header: "Labor Regular Hours",
    size: 55,
  },
  {
    accessorKey: "labr_daily_salary_",
    header: "Daily Salary",
    size: 55,
  },
  {
    accessorKey: "sales_percentage_current_vs_last_year",
    header: "Sales % (Current vs Last Year)",
    size: 55,
  },
  {
    accessorKey: "total_forecast_sales",
    header: "Total Forecast Sales",
    size: 55,
  },
  {
    accessorKey: "total_labor_hours",
    header: "Total Labor Hours",
    size: 55,
  },
  {
    accessorKey: "total_sales",
    header: "Total Sales",
    size: 55,
  },
  {
    accessorKey: "transaction_count",
    header: "Transaction Count",
    size: 55,
  },
  {
    accessorKey: "week_end_date",
    header: "Week End Date",
    size: 55,
  },
  {
    accessorKey: "week_start_date",
    header: "Week Start Date",
    size: 55,
  },
];

