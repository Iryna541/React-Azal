import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

interface StoreData {
  store_name: string;
}

export interface GuestSatisfactionData extends StoreData {
  store_name: string;
  overall_experience_percent: number;
  overall_experience_rank: number;
  speed_of_service_percent: number;
  speed_of_service_rank: number;
  order_accuracy_percent: number;
  order_accuracy_rank: number;
  friendly_percent: number;
  friendly_percent_rank: number;
}

export interface CostData extends StoreData {
  dcp_food_cost_percentage: number;
  dcp_paper_cost_percentage: number;
  dcp_premiums_cost_percentage: number;
  cml_cost_percentage: number;
  payroll_cost_percentage: number;
  total_cogs_percentage: number;
  cogs_rank: number;
  target: number;
  labor_total_hours: number;
  labor_overtime_hours: number;
  gc_over_lh: number;
}

export interface SalesBuildingData extends StoreData {
  total_digital_sales_percentage: number;
  total_digital_sales_rank: number;
  total_mobile_transactions_percentage: number;
  total_mobile_transactions_rank: number;
  loyalty_sales_percentage: number;
  loyalty_sales_rank: number;
  delivery_sales_percentage: number | null;
  delivery_sales_rank: number;
}

export interface LaborInfoData extends StoreData {
  labor_total_hours: number;
  labor_overtime_hours: number;
  salary_hours: number;
  total_hours: number;
  gc_over_lh: number;
  labor_per_hour_rate: number;
}

export interface DriveThruData extends StoreData {
  average_daily_count: number;
  average_daily_count_rank: number;
  lane_total: number;
  lane_total_rank: number;
}

export interface SalesData extends StoreData {
  net_sales: number;
  net_sales_rank: number;
  transactions: number;
  transaction_rank: number;
  average_ticket_size: number;
  ticket_size_rank: number;
}

export interface DunkinInsightsData {
  guest_satisfaction_data: GuestSatisfactionData[];
  cost_data: CostData[];
  sales_building_data: SalesBuildingData[];
  labor_info_data: LaborInfoData[];
  drive_thru_data: DriveThruData[];
  sales_data: SalesData[];
  week_end_date: string;
}

export async function getInsights(): Promise<DunkinInsightsData> {
  return axios.get("/analytics/getWeeklyUpdate").then((res) => res.data);
}

export type UseInsightsOptions = {
  config?: UseQueryOptions<DunkinInsightsData>;
};

export function useGetDunkinInsights({ config }: UseInsightsOptions = {}) {
  return useQuery({
    queryKey: ["dunkin-insights"],
    queryFn: getInsights,
    ...config,
  });
}
