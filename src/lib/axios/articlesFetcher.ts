import { axios } from 'lib/axios/axiosClient';
import { ArticleProps } from 'types/article';

export const fetchArticlePath = '/api/article/list';

export default function articlesFeatcher() {
  return axios.get(fetchArticlePath).then((res) => {
    return res.data as ArticleProps[];
  });
}
