import { ColumnDef } from "@tanstack/react-table";

import {
  CostData,
  DriveThruData,
  GuestSatisfactionData,
  LaborInfoData,
  SalesBuildingData,
  SalesData,
} from "./api/useGetInsights";

export const guestSatisfactionColumns: ColumnDef<GuestSatisfactionData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "overall_experience_percent",
    header: "OSAT",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },

  {
    accessorKey: "overall_experience_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "friendly_percent",
    header: "Friendlyness",
    size: 110,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "friendly_percent_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "order_accuracy_percent",
    header: "Accuracy",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "order_accuracy_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "speed_of_service_percent",
    header: "Speed",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "speed_of_service_rank",
    header: "Rank",
    size: 100,
  },
];

export const costDataColumns: ColumnDef<CostData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "cml_cost_percentage",
    header: "CML",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "dcp_food_cost_percentage",
    header: "Food",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },

  {
    accessorKey: "dcp_paper_cost_percentage",
    header: "Paper",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "dcp_premiums_cost_percentage",
    header: "Prem",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },

  {
    accessorKey: "payroll_cost_percentage",
    header: "Payroll",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "total_cogs_percentage",
    header: "COGS",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "cogs_rank",
    header: "Rank",
  },
  {
    accessorKey: "target",
    header: "+/-Target$",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "labor_total_hours",
    header: "TTL Hours",
  },
  {
    accessorKey: "labor_overtime_hours",
    header: "OT Hours",
  },
  {
    accessorKey: "gc_over_lh",
    header: "GC/LH",
  },
];

export const salesBuildingColumns: ColumnDef<SalesBuildingData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "total_digital_sales_percentage",
    header: "Digital Sales",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "total_digital_sales_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "total_mobile_transactions_percentage",
    header: "Mobile Transactions",
    size: 110,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "total_mobile_transactions_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "loyalty_sales_percentage",
    header: "Loyalty",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "loyalty_sales_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "delivery_sales_percentage",
    header: "Delivery",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "delivery_sales_rank",
    header: "Rank",
    size: 100,
  },
];

export const laborInfoColumns: ColumnDef<LaborInfoData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "total_hours",
    header: "T Hrs",
  },
  {
    accessorKey: "labor_overtime_hours",
    header: " OT Hrs",
  },
  {
    accessorKey: "salary_hours",
    header: "Salary Hrs",
  },
  {
    accessorKey: "labor_total_hours",
    header: "TTL Hrs",
  },
  {
    accessorKey: "gc_over_lh",
    header: "GC/LH",
  },
  {
    accessorKey: "labor_per_hour_rate",
    header: "$/LH",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
];

export const driveThruColumns: ColumnDef<DriveThruData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "lane_total",
    header: "Time(s)",
    size: 100,
  },
  {
    accessorKey: "lane_total_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "average_daily_count",
    header: "ADC",
    size: 100,
  },
  {
    accessorKey: "average_daily_count_rank",
    header: "Rank",
    size: 100,
  },
];

export const salesColumns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "net_sales",
    header: "Sales",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "net_sales_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "net_sales",
    header: "v.LY $",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "sales_ly_rank",
    header: "Rank",
    size: 100,
  },

  {
    accessorKey: "transactions",
    header: "TC",
    size: 100,
  },
  {
    accessorKey: "transaction_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "ly_transactions",
    header: "v.LY $",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "ly_transaction_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "transactions_growth_percentage",
    header: "v.LY %",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "transactions_growth_percentage_rank",
    header: "Rank",
    size: 100,
  },

  {
    accessorKey: "average_ticket_size",
    header: "AT",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "ticket_size_rank",
    header: "Rank",
    size: 100,
  },
  {
    accessorKey: "ly_average_ticket_size",
    header: "$v.LY",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
  {
    accessorKey: "ly_average_ticket_size_rank",
    header: "Rank",
    size: 100,
  },

  {
    accessorKey: "ticket_size_percentage",
    header: "%v.LY",
    size: 100,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `${value}%`;
    },
  },
  {
    accessorKey: "ticket_size_percentage_rank",
    header: "Rank",
    size: 100,
  },
];
