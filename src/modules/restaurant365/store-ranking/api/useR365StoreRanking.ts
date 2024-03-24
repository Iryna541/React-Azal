import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StoreInsights {
  store_id: string;
  location: string;
  total_net_sales_rank: string;
  insights: string;
  labor_cost_rank: string;
  overall_ranking: string;
}

export type GetR365StoreRankingResponse = StoreInsights[];

export async function getR365StoreRanking(): Promise<GetR365StoreRankingResponse> {
  return axios
    .get(
      "https://azalio-bk-api.cosmos.staging.delineate.pro/r365-store-ranking"
    )
    .then((res) => res.data);
}

export type UseR365StoreRankingOptions = {
  config?: UseQueryOptions<GetR365StoreRankingResponse>;
};

export function useR365StoreRanking({
  config,
}: UseR365StoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["r365-store-ranking"],
    queryFn: getR365StoreRanking,
    ...config,
  });
}
