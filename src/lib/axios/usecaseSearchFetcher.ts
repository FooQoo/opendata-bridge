import { axios } from 'lib/axios/axiosClient';
import { UsecaseProps } from 'types/usecase';

export const fetchUsecasePath = '/api/usecase/search';

export default function usecaseSearchFeatcher(q: string) {
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
