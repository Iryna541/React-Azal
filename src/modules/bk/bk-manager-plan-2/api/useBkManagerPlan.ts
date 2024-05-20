import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export type ManagerPlanRow = {
  managers_name: string;
  subRows: {
    order: number;
    shift: string;
    insights: {
      store_id: number;
      insight: string;
      has_employee: boolean;
      employees: {
        date: string;
        employee: Array<string>;
      }[];
    }[];
  }[];
};

export type ManagerPlanResponse = Array<ManagerPlanRow>;

export async function getBkManagerPlan(
  type: string,
  isDemo: string = ""
): Promise<ManagerPlanResponse> {
  return axios
    .get(
      `https://azalio-insights-api.cosmos.server.azal.io/bk-manager-plan?type=${type}&isDemo=${isDemo}`
    ) // Adjusted URL for manager plans
    .then((res) => res.data);
}

export type UseBkManagerPlanOptions = {
  config?: UseQueryOptions<ManagerPlanResponse>;
  type?: string | null;
  isDemo?: string;
};

export function useBkManagerPlan({
  config,
  type = "all",
  isDemo,
}: UseBkManagerPlanOptions = {}) {
  return useQuery({
    queryKey: ["bk-manager-plan", type, isDemo],
    queryFn: () => getBkManagerPlan(type || "all", isDemo),
    ...config,
  });
}
