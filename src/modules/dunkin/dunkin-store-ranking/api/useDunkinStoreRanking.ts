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

export async function getDunkinStoreRanking(
  companyId: string | undefined
): Promise<GetDunkinStoreRankingResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append("companyId", companyId as string);
  return axios
    .get(
      `https://azalio-insights-api.cosmos.server.azal.io/dunkin-store-ranking?${searchParams.toString()}`
    )
    .then((res) => res.data);
}

export type UseDunkinStoreRankingOptions = {
  config?: UseQueryOptions<GetDunkinStoreRankingResponse>;
  companyId?: string;
};

export default function useDunkinStoreRanking({
  config,
  companyId,
}: UseDunkinStoreRankingOptions = {}) {
  return useQuery({
    queryKey: ["dunkin-store-ranking"],
    queryFn: () => getDunkinStoreRanking(companyId),
    ...config,
  });
}
