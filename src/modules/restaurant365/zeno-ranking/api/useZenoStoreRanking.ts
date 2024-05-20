import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StoreInsights {
  store_rank: number;
  store_id: number;
  store_name: string;
  net_sales_current: number;
  net_sales_previous: number;
  sales_growth: number;
  insights: string;
}

export type GetZenoStoreRankingResponse = StoreInsights[];

export async function getZenoStoreRanking(): Promise<GetZenoStoreRankingResponse> {
  return axios
    .get("https://azalio-insights-api.cosmos.server.azal.io/zeno-store-ranking")
    .then((res) => res.data);
}

export type UseZenoStoreRankingOptions = {
  config?: UseQueryOptions<GetZenoStoreRankingResponse>;
};

export function useZenoStoreRanking({
  config,
}: UseZenoStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["zeno-store-ranking"],
    queryFn: getZenoStoreRanking,
    ...config,
  });
}
