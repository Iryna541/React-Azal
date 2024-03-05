import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface StoreInsights {
  store_id: string;
  name: string;
  net_sales: string;
  total_net_sales_rank: string;
  insights: string;
}

export type GetZenoStoreRankingResponse = StoreInsights[];

export async function getZenoStoreRanking(): Promise<GetZenoStoreRankingResponse> {
  return axios
    .get(
      "https://azalio-bk-api.cosmos.staging.delineate.pro/zeno-store-ranking"
    )
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
