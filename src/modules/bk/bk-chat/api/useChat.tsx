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
  // const searchParams = new URLSearchParams();
  // searchParams.set("query", body.query);
  // searchParams.set("client_id", type === 'bk' ? "russ" : type === "dunkin" ? "shawn_salema" : "");
  const data = {
    query: body.query,
    client_id: type === 'bk'? "russ" : type === "dunkin"? "shawn_salema" : "",
  }

  // let ragUrl = "https://azalio-rag.cosmos.staging.delineate.pro/bk-rag";
  const ragUrl = "https://azal-ai-api.cosmos.server.azal.io/clients-rag";

  return axios.post(ragUrl, data).then((res) => res.data);
  // return axios.post(ragUrl, JSON.stringify({query: body.query, client_id: type === 'bk' ? "russ" : type === "dunkin" ? "shawn_salema" : ""})).then((res) => res.data);
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
