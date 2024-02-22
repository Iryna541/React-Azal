import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type Company = {
  company_id: number;
  company_name: string;
  signed_on: string;
  account_owner_id: number;
  account_owner_name: string;
  user_color: string;
  role_id: number;
  email: string;
  phone_number: string;
  role_title: string;
  is_azalio_play: number;
  azalio_play_user_pin_length: null | number;
  azalio_play_user_pin_autogenerate: number;
  boring2Fun: number;
  is_dashboard: number;
  is_ai_survey: number;
  is_sms_checkbox: number;
  is_askq: number;
};

export type CompaniesResponse = {
  companies: Company[];
};

const fetchAllCompanies = async (
  pageNo: number = 1,
  pageSize: number = 25
): Promise<CompaniesResponse> => {
  const params = { page_no: pageNo, page_size: pageSize };
  return axios
    .get("/super_admin/getAllCompanies", { params })
    .then((res) => res.data);
};

type UseAllCompaniesOptions = {
  pageNo?: number;
  pageSize?: number;
  config?: Omit<UseQueryOptions<CompaniesResponse>, "queryKey" | "queryFn">;
};

export function useAllCompanies({
  pageNo = 1,
  pageSize = 25,
  config = {},
}: UseAllCompaniesOptions = {}) {
  return useQuery({
    queryKey: ["allCompanies", pageNo, pageSize],
    queryFn: () => fetchAllCompanies(pageNo, pageSize),
    ...config,
  });
}
