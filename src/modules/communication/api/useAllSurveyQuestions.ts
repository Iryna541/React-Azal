import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

export interface SurveyQuestion {
  id: number;
  title: string;
  type_id: number | null;
  iconClass: string;
  image_url: string | null;
  description: string;
  is_trigger: number;
  is_enabled: number;
  category: string;
  is_comming_soon: number;
  MessageTemplates: Array<{
    MessageType: number;
    TemplateType: number | string;
    TemplateTitle: string;
    TemplateContent: string;
  }> | null;
  icon_color: string;
  box_color: string;
  is_fss: number;
}

export interface SurveyCategories {
  category: string;
}

export interface SurveyFieldFillers {
  field_fillers: string[];
}

export interface GetAllSurveyQuestionsResponse {
  data: SurveyQuestion[];
  categories: SurveyCategories[];
  field_fillers: SurveyFieldFillers[];
}

export async function getAllSurveyQuestions(): Promise<GetAllSurveyQuestionsResponse> {
  return axios
    .get("/ai-survey/getAllSurveyQuestions?category=All")
    .then((res) => res.data);
}

export type UseAllSurveyQuestionsOptions = {
  config?: UseQueryOptions<GetAllSurveyQuestionsResponse>;
};

export function useAllSurveyQuestions({
  config,
}: UseAllSurveyQuestionsOptions = {}) {
  return useQuery<GetAllSurveyQuestionsResponse>({
    queryKey: ["all-survey-questions"],
    queryFn: getAllSurveyQuestions,
    ...config,
  });
}
