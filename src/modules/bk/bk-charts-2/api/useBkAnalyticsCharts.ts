import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type AnalyticsChartsResponse = {
  chart1: Array<{
    name: string;
    color: string;
    values: number;
    stores: Array<{
      score: number;
      store_id: number;
    }>;
  }>;
  chart2: Array<{
    name: string;
    AVG: number;
    stores: Array<{
      rating: number;
      store_id: number;
    }>;
  }>;
  chart3: Array<{
    store_id: string;
    act_vs_budget_managers_profits: number;
    actual_gp_percent: number;
    act_vs_adj_theor: number;
    adj_theoretical_gp_percent: number;
    actual_total_labor: number;
    budgeted_total_labor: number;
  }>;
};

export async function getBkAnalyticsCharts(
  isMystores: boolean
): Promise<AnalyticsChartsResponse> {
  return axios
    .get(`/analytics/getAnalyticsCharts?isMyStores=${isMystores}`)
    .then((res) => res.data);
}

export type UseBkAnalyticsChartsOptions = {
  config?: UseQueryOptions<AnalyticsChartsResponse>;
  isMystores?: boolean;
};

export function useBkAnalyticsCharts({
  config,
  isMystores = false,
}: UseBkAnalyticsChartsOptions = {}) {
  return useQuery({
    queryKey: ["bk-analytics-charts", isMystores],
    queryFn: () => getBkAnalyticsCharts(isMystores),
    ...config,
  });
}
