import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type ManagerSchedule = {
  store_id: number;
  date: string;
  name: string;
  scheduled_hours: number | null;
  scheduled_start_time: string | null;
  scheduled_end_time: string | null;
};

export type GetManagerSchedulesResponse = {
  stores: string[];
  selected_store: number;
  previous_week_schedules: ManagerSchedule[];
  current_week_schedules: ManagerSchedule[];
  next_week_schedules: ManagerSchedule[];
};

export interface GetManagerSchedulesParams {
  storeId: string;
  onlymystores?: number;
  managerId?: number;
}

export async function getManagerSchedules(
  params: GetManagerSchedulesParams
): Promise<GetManagerSchedulesResponse> {
  const { storeId, onlymystores, managerId } = params;
  const queryParameters = new URLSearchParams({ store_id: storeId.toString() });
  if (onlymystores !== undefined)
    queryParameters.append("onlymystores", onlymystores.toString());
  if (managerId !== undefined)
    queryParameters.append("managerId", managerId.toString());

  return axios
    .get(`/analytics/getManagerSchedules?${queryParameters.toString()}`)
    .then((res) => res.data);
}

export type UseManagerSchedulesOptions = {
  params: GetManagerSchedulesParams;
  config?: UseQueryOptions<GetManagerSchedulesResponse>;
};

export function useRussManagerSchedules({
  params,
  config,
}: UseManagerSchedulesOptions) {
  return useQuery({
    queryKey: [
      "managerSchedules",
      params.storeId,
      params.onlymystores,
      params.managerId,
    ],
    queryFn: () => getManagerSchedules(params),
    ...config,
  });
}
