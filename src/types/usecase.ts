export type UsecaseProps = {
  id: number;
  template_title: string;
  template_description: string;
  search_prompt: string;
  data_fetch_prompt: string;
  data_format_prompt: string;
};

export const getUsecaseUrl = (id: number) => `/usecase/${id}`;
