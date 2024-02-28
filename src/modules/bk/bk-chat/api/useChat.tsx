import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

type Document = {
  page_content: string;
  metadata: {
    source: string;
  };
  type: string;
};

export type UseChatPayload = {
  query: string;
  type: "bk" | "dunkin";
};

export type UseChatResponse = {
  context: Document[];
  question: string;
  answer: string;
};

export const getChatResponse = async ({ type, ...body }: UseChatPayload) => {
  const searchParams = new URLSearchParams();
  searchParams.set("query", body.query);

  let ragUrl = "https://azalio-rag.cosmos.staging.delineate.pro/bk-rag";
  if (type === "dunkin") {
    ragUrl =
      "https://azalio-rag-salema.cosmos.staging.delineate.pro/salema-rag";
  }

  return axios.post(ragUrl, searchParams.toString()).then((res) => res.data);
};

type UseSignUpMutationOptions = {
  config?: UseMutationOptions<UseChatResponse, unknown, UseChatPayload>;
};

export const useChat = ({ config }: UseSignUpMutationOptions = {}) => {
  return useMutation<UseChatResponse, unknown, UseChatPayload>({
    mutationKey: ["bk-chat"],
    mutationFn: (values) => getChatResponse(values),
    ...config,
  });
};
