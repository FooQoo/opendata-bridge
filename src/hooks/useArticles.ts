import articlesFeatcher, { fetchArticlePath } from 'lib/articlesFetcher';
import useSWR from 'swr';

export default function useArticles() {
  const { data, error } = useSWR(fetchArticlePath, articlesFeatcher);

  return {
    articles: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
