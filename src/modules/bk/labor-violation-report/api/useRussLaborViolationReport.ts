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
  params: {date: string; store_id: string};
  config?: UseQueryOptions<GetRussLaborViolationReportResponse>;
};

export type GetLaborViolationReportParams = {
  date?: string;
  store_id?: string;
};

async function getLaborViolationReport(date: string, store_id: string) {
  return axios.get(`/analytics/getLaborViolationsReport?date=${date}&store_id=${store_id}`).then((res) => res.data);
}

export function useRussLaborViolationReports({
  params: {date, store_id},
  config,
}: UseRussLaborViolationReportOptions) {
  return useQuery({
    queryKey: ["russ-labor-violation-report", date, store_id],
    queryFn: () => getLaborViolationReport(date, store_id),
    ...config,
  });
}
