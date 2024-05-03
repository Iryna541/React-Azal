import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StoreInsights {
  overall_ranking: string;
  store_id: string;
  general_managers: string;
  mgr_profit_ranking: string;
  fss_ranking: string;
  insights: string;
  insights_log: string;
  cta: string;
  cta_logs: string;
  bullet_points: string;
}

export type GetStoreRankingResponse = StoreInsights[];

export async function getStoreRanking(
  isDemo: string = ""
): Promise<GetStoreRankingResponse> {
  return axios
    .get(
      `https://azalio-bk-api.cosmos.staging.delineate.pro/bk-store-ranking${isDemo.length > 0 ? `?isDemo=${isDemo}` : ""}`
    )
    .then((res) => res.data);
}

export type UseStoreRankingOptions = {
  isDemo?: string;
  config?: UseQueryOptions<GetStoreRankingResponse>;
};

export function useStoreRanking({
  config,
  isDemo,
}: UseStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["bk-store-ranking", isDemo],
    queryFn: () => getStoreRanking(isDemo),
    ...config,
  });
}
