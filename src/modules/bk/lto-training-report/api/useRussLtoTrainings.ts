import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type StorwWiseData = {
  store_id: number;
  total_enrolled: number;
  total_completed: number;
  total_not_completed: number;
  completion_percentage: number;
};

export type DTLWiseData = {
  manager_id: number;
  manager_name: string;
  total_enrolled: number;
  total_completed: number;
  total_not_completed: number;
  completion_percentage: number;
};

export type GetRussLtoTrainingReportResponse = {
  store_wise_data: StorwWiseData[];
  dtl_wise_data: DTLWiseData[];
  course_name: string;
};

export type UseRussLtoTrainingReportOptions = {
  // params: GetLtoTrainingReportParams;
  config?: UseQueryOptions<GetRussLtoTrainingReportResponse>;
};

export type GetLtoTrainingReportDetailsParams = {
  storeId?: string;
  managerId?: string;
};

export type UseRussLtoTrainingReportDetailsOptions = {
  params: GetLtoTrainingReportDetailsParams;
  config?: UseQueryOptions<GetRussLtoTrainingReportResponse>;
};

async function getLtoTrainingReport() {
  return axios.get(`/analytics/getLTOReport`).then((res) => res.data);
}

async function getLtoTrainingReportDetails({
  storeId,
  managerId,
}: GetLtoTrainingReportDetailsParams) {
  let url = "";
  if (storeId) {
    url = `/analytics/getLTODetails?store_id=${storeId}`;
  } else if (managerId) {
    url = `/analytics/getLTODetails?manager_id=${managerId}`;
  } else {
    url = `/analytics/getLTODetails`;
  }
  return axios.get(url).then((res) => res.data);
}

export function useRussLtoTrainingReports({
  config,
}: UseRussLtoTrainingReportOptions) {
  return useQuery({
    queryKey: ["ltoTrainingReport"],
    queryFn: () => getLtoTrainingReport(),
    ...config,
  });
}

export function useRussLtoTrainingReportDetail({
  params,
  config,
}: UseRussLtoTrainingReportDetailsOptions): any {
  console.log({ params });
  return useQuery({
    queryKey: ["ltoTrainingReportDetails"],
    queryFn: () => getLtoTrainingReportDetails(params),
    ...config,
  });
}
