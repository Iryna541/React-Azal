import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type LaborViolationData = {
  store_id: number | string;
  employee_name: string;
  age: number;
  start: string;
  end: number;
  hours_worked: number;
  color: string | null;
};

export type GetRussLaborViolationReportResponse = LaborViolationData[];

export type UseRussLaborViolationReportOptions = {
  params: {date: string};
  config?: UseQueryOptions<GetRussLaborViolationReportResponse>;
};

export type GetLaborViolationReportParams = {
  date?: string;
};

async function getLaborViolationReport(date: string) {
  return axios.get(`/analytics/getLaborViolationsReport?date=${date}`).then((res) => res.data);
}

export function useRussLaborViolationReports({
  params: {date},
  config,
}: UseRussLaborViolationReportOptions) {
  return useQuery({
    queryKey: ["russ-labor-violation-report", date],
    queryFn: () => getLaborViolationReport(date),
    ...config,
  });
}
