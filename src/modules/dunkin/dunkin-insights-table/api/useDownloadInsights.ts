import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export interface DunkinInsightsData {
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

export async function getInsights(): Promise<DunkinInsightsData[]> {
  return axios.get("/analytics/getWeeklyUpdate").then((res) => res.data);
}

export type UseInsightsOptions = {
  config?: UseQueryOptions<DunkinInsightsData[]>;
};

export function useGetDunkinInsights({ config }: UseInsightsOptions = {}) {
  return useQuery({
    queryKey: ["dunkin-insights"],
    queryFn: getInsights,
    ...config,
  });
}
