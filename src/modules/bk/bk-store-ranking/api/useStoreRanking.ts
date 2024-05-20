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
  companyId: string = ""
): Promise<GetStoreRankingResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append("companyId", companyId);
  return axios
    .get(
      `https://azalio-insights-api.cosmos.server.azal.io/bk-store-ranking?${searchParams.toString()}`
    )
    .then((res) => res.data);
}

export type UseStoreRankingOptions = {
  companyId?: string;
  config?: UseQueryOptions<GetStoreRankingResponse>;
};

export function useStoreRanking({
  config,
  companyId,
}: UseStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["bk-store-ranking", companyId],
    queryFn: () => getStoreRanking(companyId),
    ...config,
  });
}
