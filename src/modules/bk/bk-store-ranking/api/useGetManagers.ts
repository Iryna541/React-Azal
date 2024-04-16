import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type GetManagersResponse = {
  users: Array<{
    id: number;
    name: string;
    external_id?: string;
    is_partner: number;
    role_id: number;
    user_color: string;
    role_title: string;
    regionIds?: string;
    regions: Array<{
      region_id: number;
      region_title: string;
    }>;
    email: string;
    resend_mobile_invite: boolean;
    resend_web_invite: boolean;
    phone_number: string;
    is_account_owner: number;
    invitation_id: number;
    is_invitation_accepted: number;
    is_active: number;
    assignments: Array<{
      id?: number;
      name: string;
      type: string;
      color: string;
      role_title: string;
      is_partner?: boolean;
    }>;
    status: string;
    tagsCount: number;
  }>;
  pagination: {
    page_no: number;
    page_size: number;
    total_records: number;
  };
};

export async function getManagers(): Promise<GetManagersResponse> {
  return axios
    .get(
      "/organisation/getUsers?page_size=50&page_no=1&is_active=null&name_sort=1"
    )
    .then((res) => res.data);
}

export type UseManagersOptions = {
  config?: UseQueryOptions<GetManagersResponse>;
};

export function useGetManagers({ config }: UseManagersOptions = {}) {
  return useQuery({
    queryKey: ["bk-managers"],
    queryFn: getManagers,
    ...config,
  });
}
