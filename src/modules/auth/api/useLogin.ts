import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    access_token: string;
    isSuperAdmin: boolean;
    role_id: number;
  };
};

export type LoginError = {
  message: string;
};

export const login = async (body: LoginPayload) => {
  return axios.post("/auth/login", body).then((res) => res.data);
};

type UseLoginOptions = {
  config?: UseMutationOptions<LoginResponse, LoginError, LoginPayload>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation<LoginResponse, LoginError, LoginPayload>({
    mutationFn: (values) => login(values),
    ...config,
  });
};
