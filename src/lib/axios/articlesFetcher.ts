import { axios } from 'lib/axios/axiosClient';
import { ArticleProps } from 'types/article';

export const fetchArticlePath = '/api/article/list';

export default function articlesFeatcher(q: string) {
  return axios
    .get(fetchArticlePath, {
      params: {
        q: q === '' ? undefined : q,
      },
    })
    .then((res) => {
      return (res.data as ArticleProps[]) || [];
    });
}
