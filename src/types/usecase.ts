export type UsecaseProps = {
  id: number;
  template_title: string;
  template_description: string;
  search_prompt: string | string[];
};

export const getUsecaseUrl = (id: number) => `/usecase/${id}`;

export const getMessageSearch = (usecase: UsecaseProps) => {
  return `以下のプロンプトを参考にしてオープンデータを検索してみましょう。  
${usecase.search_prompt}`;
};
