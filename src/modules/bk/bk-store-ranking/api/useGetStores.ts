import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type GetStoresResponse = {
  stores: Array<{
    id: number;
    external_id: string;
    title: string;
    default_timezone: string;
    address: any;
    radius: any;
    company_id: number;
    is_geofencing: number;
    is_deleted: number;
    is_leaderboard: number;
    created_by: number;
    modified_by: any;
    creation_date: string;
    modification_date: any;
    lat: any;
    lng: any;
    location: any;
    pin: any;
    points_reset_date: string;
    last_activity_date: string;
    shifts: any;
    group_missing: number;
  }>;

  pagination: {
    page_no: number;
    page_size: number;
    total_records: number;
  };
};

export async function getStores(): Promise<GetStoresResponse> {
  return axios
    .get("/settings/getStoresOfCompany?page_size=25&page_no=1")
    .then((res) => res.data);
}

export type UseStoresOptions = {
  config?: UseQueryOptions<GetStoresResponse>;
};

export function useGetStores({ config }: UseStoresOptions = {}) {
  return useQuery({
    queryKey: ["bk-stores"],
    queryFn: getStores,
    ...config,
  });
}
