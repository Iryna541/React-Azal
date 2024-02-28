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
}

export type GetStoreRankingResponse = StoreInsights[];

export async function getStoreRanking(): Promise<GetStoreRankingResponse> {
  return axios
    .get("https://azalio-bk-api.cosmos.staging.delineate.pro/bk-store-ranking")
    .then((res) => res.data);
}

export type UseStoreRankingOptions = {
  config?: UseQueryOptions<GetStoreRankingResponse>;
};

export function useStoreRanking({ config }: UseStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["bk-store-ranking"],
    queryFn: getStoreRanking,
    ...config,
  });
}
