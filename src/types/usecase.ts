export type UsecaseProps = {
  id: string;
  title: string;
  description: string;
  base: Prompt;
  option: Prompt[];
};

export type Prompt = {
  title: string;
  content: string;
};

export const getUsecaseUrl = (id: string) => `/usecase/${id}`;

export const getMessageSearch = (usecase: UsecaseProps) => {
  return `以下のプロンプトを参考にしてオープンデータを検索してみましょう。  
${usecase.description}`;
};
