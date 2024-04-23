import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface DunkinStoreRankingData {
  store_rank: number;
  store_id: number;
  net_sales_current: number;
  net_sales_previous: number;
  sales_growth: number;
  insights: string;
}

export type GetDunkinStoreRankingResponse = DunkinStoreRankingData[];

export async function getDunkinStoreRanking(): Promise<GetDunkinStoreRankingResponse> {
  return axios
    .get(
      "https://azalio-bk-api.cosmos.staging.delineate.pro/dunkin-store-ranking"
    )
    .then((res) => res.data);
}

export type UseDunkinStoreRankingOptions = {
  config?: UseQueryOptions<GetDunkinStoreRankingResponse>;
};

export default function useDunkinStoreRanking({
  config,
}: UseDunkinStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["dunkin-store-ranking"],
    queryFn: getDunkinStoreRanking,
    ...config,
  });
}
