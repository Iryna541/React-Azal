import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type User = {
  id: number;
  name: string;
  external_id: string;
  is_partner: number;
  role_id: number;
  user_color: string;
  play_pin: null | string;
  role_title: string;
  regionIds: string;
  regions: {
    region_id: number;
    region_title: string;
  }[];
  email: string;
  resend_mobile_invite: boolean;
  resend_web_invite: boolean;
  phone_number: string;
  is_account_owner: number;
  invitation_id: null | string;
  is_invitation_accepted: number;
  is_active: number;
  assignments: {
    id: number;
    name: string;
    type: string;
    color: string;
  }[];
  status: string;
  tagsCount: number;
};

export type UsersResponse = {
  users: User[];
};

const fetchAllUsers = async ({
  pageSize = 25,
  pageNo = 1,
  isActive = null,
  nameSort = 1,
}: {
  pageSize?: number;
  pageNo?: number;
  isActive?: number | null;
  nameSort?: number;
} = {}): Promise<UsersResponse> => {
  const params = {
    page_size: pageSize,
    page_no: pageNo,
    is_active: isActive,
    name_sort: nameSort,
  };
  return axios
    .get("/organisation/getUsers", { params })
    .then((res) => res.data);
};

type UseAllUsersOptions = {
  pageSize?: number;
  pageNo?: number;
  isActive?: number | null;
  nameSort?: number;
  config?: Omit<UseQueryOptions<UsersResponse>, "queryKey" | "queryFn">;
};

export function useAllUsers({
  pageSize = 25,
  pageNo = 1,
  isActive = null,
  nameSort = 1,
  config = {},
}: UseAllUsersOptions = {}) {
  return useQuery({
    queryKey: ["allUsers", pageSize, pageNo, isActive, nameSort],
    queryFn: () => fetchAllUsers({ pageSize, pageNo, isActive, nameSort }),
    ...config,
  });
}
