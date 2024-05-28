import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type GetRevenueCenterDataResponse = {
  data: Array<{
    id: number;
    week: number;
    period: string;
    tickets: number;
    store_id: number;
    net_sales: number;
    percentage: string;
    category_id: number;
    category_name: string;
    total_tickets: number;
    category_total: number;
    week_start_date: string;
    average_ticket_size: string;
    prev_period_total_diff: any;
    prev_period_ticket_diff: any;
    prev_period_avg_ticket_diff: any;
  }>;
  categories: Array<string>;
  periods: Array<{
    name: string;
    weeks: Array<{
      week_number: number;
      week_start_date: string;
    }>;
  }>;
  locations: Array<{
    name: string;
    store_id: number;
  }>;
};

export async function fetchRevenueCenterData(
  period: string,
  storeId: number | null
): Promise<GetRevenueCenterDataResponse> {
  try {
    const response = await axios.get(
      `https://demo-be.azal.io/api/analytics/getRevenueCenterData?period=${period}&store_id=${storeId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch revenue center data: ${error}`);
  }
}

export type UseRevenueCenterDataOptions = {
  period: string;
  storeId: number | null;
  config?: UseQueryOptions<GetRevenueCenterDataResponse>;
};

export function useRevenueCenterData({
  storeId,
  period,
  ...config
}: UseRevenueCenterDataOptions) {
  return useQuery({
    queryKey: ["zeno-insight-revenue-table", storeId, period],
    queryFn: () => fetchRevenueCenterData(period, storeId),
    ...config,
  });
}

export type UpdateRevenueCenterDataPayload = {
  store_id: number;
  category_id: number;
  week_start_date: string;
  net_sales: number;
  percentage: number;
  tickets: number;
  average_ticket_size: number;
};

export type UpdateRevenueCenterDataError = {
  message: string;
};

export const updateRevenueCenterData = async (
  body: UpdateRevenueCenterDataPayload
) => {
  return axios
    .post("/analytics/updateRevenueCenterData", body)
    .then((res) => res.data);
};

type UseLoginOptions = {
  config?: UseMutationOptions<
    any,
    UpdateRevenueCenterDataError,
    UpdateRevenueCenterDataPayload
  >;
};

export const useUpdateRevenueCenterData = ({
  config,
}: UseLoginOptions = {}) => {
  return useMutation<
    any,
    UpdateRevenueCenterDataError,
    UpdateRevenueCenterDataPayload
  >({
    mutationFn: (values) => updateRevenueCenterData(values),
    ...config,
  });
};
