import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type ActiveUserResponse = {
  user_info: {
    user_id: number;
    name: string;
    email: string;
    role_id: number;
    role_title: string;
    color: string;
  };
};

const getActiveUser = async (): Promise<ActiveUserResponse> => {
  return axios.get("/super_admin/getInfo").then((res) => res.data);
};

type UseActiveUserOptions = {
  config?: Omit<UseQueryOptions<ActiveUserResponse>, "queryKey" | "queryFn">;
};

export function useActiveUser({ config }: UseActiveUserOptions = {}) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getActiveUser(),
    ...config,
  });
}
