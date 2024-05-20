import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type GetLabourEfficiencyReportDataResponse = {
  data: Array<{
    id: number;
    // meal: 'breakfast' | 'linch' | 'dinner';
    meal: string;
    hour: string;
    expectedGuests: number;
    actualGuests: number;
    manager: number;
    shiftLeader: number;
    nuggetPrep: number;
    portion: number;
    lineCook: number;
    lateNight: number;
    dish: number;
    cashier: number;
    cashier2: number | string;
    sales: number;
    total: number | string;
    estGuestsPerLH?: number | string;
    actualGuestsPerLH?: number | string;
    actualSalesPerLH?: number | string;
    store_id?: number | string;
    date?: number | string;
  }>;
  dates: Array<{
    date: string;
    day: string;
  }>;
  day: string;
  aggregate_values: Array<{
    average_hourly_wage: number;
    discounts: number;
    gm: number;
    id: number;
  }>
};

export async function fetchLabourEfficiencyData(
  date: string,
  storeId: number,
): Promise<GetLabourEfficiencyReportDataResponse> {
  try {
    const response = await axios.get(
      `https://demo-be.azal.io/api/analytics/getLaborEfficiencyReport?date=${date}&store_id=${storeId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch labour efficiency data: ${error}`);
  }
}

export type UseLabourEfficiencyReportDataOptions = {
  date: string;
  storeId: number;
  // storeId: number;
  config?: UseQueryOptions<GetLabourEfficiencyReportDataResponse>;
};

export function useLabourEfficiencyReportData({
  date,
  storeId,
  ...config
}: UseLabourEfficiencyReportDataOptions) {
  return useQuery({
    queryKey: ["zeno-insight-labour-efficiency-table", date, storeId],
    queryFn: () => fetchLabourEfficiencyData(date, storeId),
    ...config,
  });
}

export type UpdateLabourEfficiencyDataPayload = {
  "id": number,
  "store_id"?: number,
  "actualGuests"?: number,
  "sales"?: number,
  "expectedGuests"?: number,
  "manager"?: number,
  "shiftLeader"?: number,
  "nuggetPrep"?: number,
  "portion"?: number,
  "lineCook"?: number,
  "lateNight"?: number,
  "dish"?: number,
  "cashier"?: number,
  "cashier2"?: number,
}

export type UpdateLabourEfficiencyDataError = {
  message: string;
};

export const updateLabourEfficiencyData = async (body: UpdateLabourEfficiencyDataPayload) => {
  return axios.post("/analytics/updateLaborEfficiencyReport", body).then((res) => res.data);
};

type UpdateLabourEfficiencyDataOptions = {
  config?: UseMutationOptions<any, UpdateLabourEfficiencyDataError, UpdateLabourEfficiencyDataPayload>;
};

export const useUpdateLabourEfficiencyData = ({ config }: UpdateLabourEfficiencyDataOptions = {}) => {
  return useMutation<any, UpdateLabourEfficiencyDataError, UpdateLabourEfficiencyDataPayload>({
    mutationFn: (values) => updateLabourEfficiencyData(values),
    ...config,
  });
};

export type UpdateLabourEfficiencyAggregateDataPayload = {
  "id": number;
  "date": string;
  "store_id": number | string;
  [key: string]: any;
}

export type UpdateLabourEfficiencyAggregateDataError = {
  message: string;
};

export const updateLabourEfficiencyAggregateData = async (body: UpdateLabourEfficiencyAggregateDataPayload) => {
  return axios.post("/analytics/updateLaborAggregateValues", body).then((res) => res.data);
};

type UpdateLabourEfficiencyAggregateDataOptions = {
  config?: UseMutationOptions<any, UpdateLabourEfficiencyAggregateDataError, UpdateLabourEfficiencyAggregateDataPayload>;
};

export const useUpdateLabourEfficiencyAggregateData = ({ config }: UpdateLabourEfficiencyAggregateDataOptions = {}) => {
  return useMutation<any, UpdateLabourEfficiencyAggregateDataError, UpdateLabourEfficiencyAggregateDataPayload>({
    mutationFn: (values) => updateLabourEfficiencyAggregateData(values),
    ...config,
  });
};