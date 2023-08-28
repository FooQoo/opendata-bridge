export type UsecaseProps = {
  id: number;
  template_title: string;
  template_description: string;
  search_prompt: string;
  data_fetch_prompt: string;
  data_format_prompt: string;
};

export const getUsecaseUrl = (id: number) => `/usecase/${id}`;

export const getMessageSearch = (usecase: UsecaseProps) => {
  return `以下のプロンプトを参考にしてオープンデータを検索してみましょう。  
${usecase.search_prompt}`;
};
