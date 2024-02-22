import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { storage } from "./storage";
import { showErrorNotification } from "~/utils/notifications";

export const axios = Axios.create({
  baseURL: "https://dev-be.azal.io/api",
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error instanceof AxiosError) {
      const response = error.response!.data;
      showErrorNotification(response.message);
    }
    return Promise.reject(error);
  }
);
