import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type LukeLobsterStoreRankingData = {
  id: string;
  store_rank: string;
  store_id: string;
  store_name: string;
  sales: string;
  forecast: string;
  sales_vs_sales_forecast: string;
  insights: string;

  net_sales_previous: string;
  net_sales_current: string;
  sales_growth: string;
};

export type LukeLobsterStoreRankingResponse =
  Array<LukeLobsterStoreRankingData>;

export async function getLukeLobsterStoreRanking(): Promise<LukeLobsterStoreRankingResponse> {
  return axios
    .get(
      // "https://azalio-bk-api.cosmos.staging.delineate.pro/luke-lobster-store-ranking"
      "http://localhost:3000/luke-lobster-store-ranking"
    )
    .then((res) => res.data);
}

export type UseLukeLobsterStoreRankingOptions = {
  config?: UseQueryOptions<LukeLobsterStoreRankingResponse>;
};

export function useLukeLobsterStoreRanking({
  config,
}: UseLukeLobsterStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["luke-lobster-store-ranking"],
    queryFn: getLukeLobsterStoreRanking,
    ...config,
  });
}
