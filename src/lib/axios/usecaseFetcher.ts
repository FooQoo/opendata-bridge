import { axios } from 'lib/axios/axiosClient';
import { UsecaseProps } from 'types/usecase';

export const fetchUsecasePath = '/api/usecase/list';

export default function usecaseFeatcher(q: string) {
  return axios
    .get(fetchUsecasePath, {
      params: {
        q: q === '' ? undefined : q,
      },
    })
    .then((res) => {
      return (res.data as UsecaseProps[]) || [];
    });
}
