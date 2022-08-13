import { axios } from 'lib/axiosClient';
import { Article } from 'pages/api/article/list';

const fetchArticlePath = '/api/article/list';

export default function articlesFeatcher() {
  return axios.get(fetchArticlePath).then((res) => {
    return res.data as Article[];
  });
}
