import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

type user = {
  user_name: string;
  user_id: number;
  role_id: number;
  profile_url?: string;
  stores: string[];
};

export type GetUsersPicResponse = {
  users: user[];
};

export async function getUser(): Promise<GetUsersPicResponse> {
  return axios.get("/analytics/getStoresandManagers").then((res) => res.data);
}

export type UseUserOptions = {
  config?: UseQueryOptions<GetUsersPicResponse>;
};

export function useGetUsersPic({ config }: UseUserOptions = {}) {
  return useQuery({
    queryKey: ["all-users-pic"],
    queryFn: getUser,
    ...config,
  });
}
