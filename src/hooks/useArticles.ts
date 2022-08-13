import axios from 'axios';
import { Article } from 'pages/api/article/list';
import sleepService from 'service/sleepService';
import useSWR from 'swr';

const fetcher = (url: string) => {
  return axios.get(url).then(async (res) => {
    await sleepService(1000);
    return res.data as Article[];
  });
};

export default function useArticles() {
  const { data, error } = useSWR(`/api/article/list`, fetcher);

  return {
    articles: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
