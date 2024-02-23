import Axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { storage } from "./storage";

export const axios = Axios.create({
  baseURL: "https://test-be.azal.io/api",
});

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();
  const companyId = storage.getCompanyId();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  if (companyId) {
    config.headers.Companyid = companyId;
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
      // const response = error.response!.data;
      // showErrorNotification(response.message);
    }
    return Promise.reject(error);
  }
);
