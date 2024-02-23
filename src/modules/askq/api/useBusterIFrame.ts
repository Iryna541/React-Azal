import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type BusterIFrameResponse = {
  iframe: string;
};

const fetchBusterIFrame = async (): Promise<BusterIFrameResponse> => {
  return axios.get("/askq/getBusterIFrame").then((res) => res.data);
};

type UseBusterIFrameOptions = {
  config?: Omit<UseQueryOptions<BusterIFrameResponse>, "queryKey" | "queryFn">;
};

export function useBusterIFrame({ config = {} }: UseBusterIFrameOptions = {}) {
  return useQuery({
    queryKey: ["busterIFrame"],
    queryFn: fetchBusterIFrame,
    ...config,
  });
}
