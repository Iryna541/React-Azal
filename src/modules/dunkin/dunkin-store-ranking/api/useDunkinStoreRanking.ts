import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface DunkinStoreRankingData {
  store_id: string;
  rank_net_sales: string;
  rank_average_weekly_ticket_count: string;
  rank_average_ticket_size: string;
  rank_net_sales_doubled: string;
  total_rank_points: string;
  store_rank: string;
  insights: string;
  bullet_points: string;
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
