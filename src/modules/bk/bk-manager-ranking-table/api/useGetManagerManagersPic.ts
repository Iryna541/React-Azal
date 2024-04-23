import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

type Manager = {
  id: number;
  name: string;
  external_id?: string;
  is_partner: number;
  role_id: number;
  user_color: string;
  play_pin?: null;
  profile_url?: string;
  role_title: string;
  assignments_teams?: null;
  regionIds?: string;
  teamIds?: null;
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
  teams: Array<any>;
  assignments: Array<any>;
  status: string;
  tags: Array<any>;
  tagsCount: number;
};

export type GetManagersPicResponse = {
  users: Manager[];
  pagination: {
    page_no: number;
    page_size: number;
    total_records: number;
  };
};

export async function getUser(): Promise<GetManagersPicResponse> {
  return axios
    .get(
      "/organisation/getUsers?page_size=25&page_no=1&is_active=null&name_sort=1"
    )
    .then((res) => res.data);
}

export type UseUserOptions = {
  config?: UseQueryOptions<GetManagersPicResponse>;
};

export function useGetUsers({ config }: UseUserOptions = {}) {
  return useQuery({
    queryKey: ["manager-pic"],
    queryFn: getUser,
    ...config,
  });
}
