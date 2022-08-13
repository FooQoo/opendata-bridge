import axiosBase from 'axios';
import { Article } from 'pages/api/article/list';
import sleepService from 'service/sleepService';
import useSWR from 'swr';

const axios = axiosBase.create({
  baseURL: 'http://localhost:3000', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export const fetchArticlePath = '/api/article/list';

export const fetchArticles = (url: string) => {
  return axios.get(url).then(async (res) => {
    await sleepService(1000);
    return res.data as Article[];
  });
};

export default function useArticles() {
  const { data, error } = useSWR(fetchArticlePath, fetchArticles, {
    refreshInterval: 1000,
  });

  return {
    articles: data?.sort(() => (Math.random() > 0.5 ? 1 : -1)) || [],
    isLoading: !error && !data,
    isError: error,
  };
}
