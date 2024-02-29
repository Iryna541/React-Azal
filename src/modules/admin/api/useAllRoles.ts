import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type Role = {
  role_id: number;
  role_title: string;
  role_description: string;
  is_mobile: boolean;
  is_web: boolean;
  is_azalio_play: boolean;
  feature_title: string;
  sms_check_default_value: boolean;
};

export type RolesResponse = {
  roles: Role[];
};

const fetchAllRoles = async (): Promise<RolesResponse> => {
  return axios.get("/api/user/getAllRoles").then((res) => res.data);
};

type UseAllRolesOptions = {
  config?: Omit<UseQueryOptions<RolesResponse>, "queryKey" | "queryFn">;
};

export function useAllRoles({ config = {} }: UseAllRolesOptions = {}) {
  return useQuery({
    queryKey: ["allRoles"],
    queryFn: fetchAllRoles,
    ...config,
  });
}
