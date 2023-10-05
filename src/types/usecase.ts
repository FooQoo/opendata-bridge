import { Ogp } from 'service/ogpService';

export type UsecaseProps = {
  id: string;
  title: string;
  description: string;
  ogps: Ogp[];
  tableau: Tableau | undefined;
  base: Prompt;
  option: Prompt[];
  goodCount: number;
  updatedAt: string;
};

export type Tableau = {
  id: string;
  title: string;
  url: string;
};

export type Prompt = {
  id: string;
  title: string;
  content: string;
};

export const getUsecaseUrl = (id: string) => `/manage/usecase/${id}`;

export const getMessageSearch = (usecase: UsecaseProps) => {
  return `以下のプロンプトを参考にしてオープンデータを検索してみましょう。  
${usecase.description}`;
};
