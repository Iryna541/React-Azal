import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type DateRangeResponse = Array<{
  week_start_date: string;
  week_end_date: string;
  date: string;
  data_frequency: string;
}>;

export async function getCurrentDateRange(): Promise<DateRangeResponse> {
  return axios
    .get("/analytics/getDateRange") // Endpoint for getting the current date range
    .then((res) => res.data);
}

export type UseCurrentDateRangeOptions = {
  config?: UseQueryOptions<DateRangeResponse>;
};

export function useCurrentDateRange({
  config,
}: UseCurrentDateRangeOptions = {}) {
  return useQuery({
    queryKey: ["current-date-range"],
    queryFn: getCurrentDateRange,
    ...config,
  });
}
