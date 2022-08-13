import { axios } from 'lib/axiosClient';
import { Article } from 'pages/api/article/list';
import useSWR from 'swr';

export const fetchArticlePath = '/api/article/list';

export const articlesFeatcher = (url: string) => {
  return axios.get(url).then((res) => {
    return res.data as Article[];
  });
};

export default function useArticles() {
  const { data, error } = useSWR(fetchArticlePath, articlesFeatcher);

  return {
    articles: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
