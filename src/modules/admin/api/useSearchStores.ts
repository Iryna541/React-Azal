import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type SearchStoresPayload = {
  search_text: string;
};

export type SearchStoresResponse = {
  results: Array<{
    id: number;
    name: string;
    type: string;
    color: string;
    role_title: null | string;
  }>;
};

export type SearchStoresError = {
  message: string;
};

export const searchStores = async (body: SearchStoresPayload) => {
  return axios
    .post("/organisation/searchQuery", {
      ...body,
      onlyRegionsAndTeams: true,
      onlyUsers: false,
      isRole: false,
    })
    .then((res) => res.data);
};

type UseSearchStoresOptions = {
  config?: UseMutationOptions<
    SearchStoresResponse,
    SearchStoresError,
    SearchStoresPayload
  >;
};

export const useSearchStores = ({ config }: UseSearchStoresOptions = {}) => {
  return useMutation<
    SearchStoresResponse,
    SearchStoresError,
    SearchStoresPayload
  >({
    mutationFn: (values) => searchStores(values),
    ...config,
  });
};
