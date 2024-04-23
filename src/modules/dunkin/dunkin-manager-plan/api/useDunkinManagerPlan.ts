import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export type ManagerPlanRow = {
  store_id: string;
  subRows: Array<{
    shift: string;
    insights: string;
  }>;
};

export type ManagerPlanResponse = Array<ManagerPlanRow>;

export async function getDunkinManagerPlan(): Promise<ManagerPlanResponse> {
  return axios
    .get(
      "https://azalio-bk-api.cosmos.staging.delineate.pro/dunkin-manager-plan"
    ) // Adjusted URL for manager plans
    .then((res) => res.data);
}

export type UseDunkinManagerPlanOptions = {
  config?: UseQueryOptions<ManagerPlanResponse>;
};

export function useDunkinManagerPlan({
  config,
}: UseDunkinManagerPlanOptions = {}) {
  return useQuery({
    queryKey: ["bk-manager-plan"],
    queryFn: getDunkinManagerPlan,
    ...config,
  });
}
