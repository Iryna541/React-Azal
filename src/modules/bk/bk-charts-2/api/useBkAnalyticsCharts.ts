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
      score: number;
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
  fss_score: number;
};

export async function getBkAnalyticsCharts(
  isMystores: boolean,
  managerId?: string,
): Promise<AnalyticsChartsResponse> {
  return axios
    .get(`/analytics/getAnalyticsCharts?onlymystores=${isMystores ? 1 : 0}&managerId=${managerId || ""}`)
    .then((res) => res.data);
}

export type UseBkAnalyticsChartsOptions = {
  config?: UseQueryOptions<AnalyticsChartsResponse>;
  isMystores?: boolean;
  managerId?: string;
};

export function useBkAnalyticsCharts({
  config,
  isMystores = false,
  managerId = ""
}: UseBkAnalyticsChartsOptions = {}) {
  return useQuery({
    queryKey: ["bk-analytics-charts", isMystores, managerId],
    queryFn: () => getBkAnalyticsCharts(isMystores, managerId),
    ...config,
  });
}
