import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type GetZenoInsightTableResponse = {
  insights_data: Array<
  ZenoInsightRow
  >
  stores: Array<{
    id: number
    name: string
  }>
};

export interface ZenoInsightRow {
    store_id: number
    total_sales: number
    total_forecast_sales: number
    difference: number
    sales_percentage_current_vs_last_year: number
    labor_regular_amount: number
    labor_regular_hours: number
    labor_overtime_amount: number
    labor_overtime_hours: number
    total_labor_hours: number
    labor_other_amount: number
    labor_other_hours: number
    labor_hourly_percentage: number
    labr_daily_salary_: number
    labor_hourly_salary_percentage: number
    labor_goal_percentage: number
    transaction_count: number
    week_start_date: string
    week_end_date: string
    today_date: string
}


export async function getZenoInsightTable(storeId?:string): Promise<GetZenoInsightTableResponse> {
 
  if(!storeId){
    return axios
    .get(
      `/analytics/getInsightsTable`
      )
      .then((res) => res.data);
    }
    
    console.log("storeId",storeId)
  return axios
    .get(
      `/analytics/getInsightsTable?store_id=${storeId} `
    )
    .then((res) => res.data);
}

export type UseZenoInsightTableOptions = {
  storeId?: string;
  config?: UseQueryOptions<GetZenoInsightTableResponse>;
};

export function useZenoInsightTable({ storeId, ...config }: UseZenoInsightTableOptions = {}) {
  return useQuery({
    queryKey: ["zeno-insight-table",storeId],
    queryFn:()=> getZenoInsightTable(storeId),
    ...config,
  });
}
