import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export type ManagerPlanRow = {
  managers_name: string;
  subRows: Array<{
    shift: string;
    insights: string;
  }>;
};

export type ManagerPlanResponse = Array<ManagerPlanRow>;

export async function getBkManagerPlan(): Promise<ManagerPlanResponse> {
  return axios
    .get("https://azalio-bk-api.cosmos.staging.delineate.pro/bk-manager-plan") // Adjusted URL for manager plans
    .then((res) => res.data);
}

export type UseBkManagerPlanOptions = {
  config?: UseQueryOptions<ManagerPlanResponse>;
};

export function useBkManagerPlan({ config }: UseBkManagerPlanOptions = {}) {
  return useQuery({
    queryKey: ["bk-manager-plan"],
    queryFn: getBkManagerPlan,
    ...config,
  });
}
