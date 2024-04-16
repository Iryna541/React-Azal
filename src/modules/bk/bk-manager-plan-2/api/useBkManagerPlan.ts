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

export async function getBkManagerPlan(
  type: string
): Promise<ManagerPlanResponse> {
  return axios
    .get(
      `https://azalio-bk-api.cosmos.staging.delineate.pro/bk-manager-plan?type=${type}`
    ) // Adjusted URL for manager plans
    .then((res) => res.data);
}

export type UseBkManagerPlanOptions = {
  config?: UseQueryOptions<ManagerPlanResponse>;
  type?: string | null;
};

export function useBkManagerPlan({
  config,
  type = "all",
}: UseBkManagerPlanOptions = {}) {
  return useQuery({
    queryKey: ["bk-manager-plan", type],
    queryFn: () => getBkManagerPlan(type || "all"),
    ...config,
  });
}
