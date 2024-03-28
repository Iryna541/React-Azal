import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { axios } from "~/lib/axios";
import { Insight } from "../insightsContext";



export type EmailResponse = {
  user: {
    access_token: string;
    isSuperAdmin: boolean;
    role_id: number;
  };
};

function base64ToBlob(base64:string, mimeType = '') {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }

export const sendStoreRankingToEmail = async (body: Insight) => {
  console.log("body",body);
    const formData = new FormData();
    body.photo.forEach((base64String) => {
      const imageBlob = base64ToBlob(base64String, 'image/png');
      formData.append('photo', imageBlob, `store-ranking.png`);
    });
    formData.append('store_id', body.store_id);
    formData.append('email_text', body.email_text);


  return  axios
  .post(`/analytics/sendStoreRankingtoEmail`, formData, {
    headers: {
     
    },
  })
  .then((res) => res.data);
};

type UseSendStoreRankingToEmail = {
  config?: UseMutationOptions<EmailResponse,unknown, Insight>;
};

export const useSendStoreRankingToEmail = ({ config }: UseSendStoreRankingToEmail = {}) => {
  return useMutation<EmailResponse,unknown,Insight>({
    mutationFn: (values) => sendStoreRankingToEmail(values),
    ...config,
  });
};
