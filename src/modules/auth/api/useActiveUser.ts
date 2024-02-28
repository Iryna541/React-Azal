import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";
import { storage } from "~/lib/storage";

export type ActiveUserResponse = {
  user_info: {
    user_id: number;
    name: string;
    email: string;
    role_id: number;
    role_title: string;
    color: string;
    company_id: number;
  };
};

const getActiveUser = async (): Promise<ActiveUserResponse> => {
  // companyId exists when logged in as superadmin
  const companyId = storage.getCompanyId();
  const roleId = storage.getRoleId(); // roleId "1" = SuperAdmin
  if (companyId || roleId !== "1") {
    const user = await axios.get("/user/getInfo").then((res) => res.data);
    return user;
  }
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
