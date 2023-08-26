import { axios } from 'lib/axios/axiosClient';
import { UsecaseProps } from 'types/usecase';

export const fetchUsecasePath = '/api/usecase/:id';

export default function usecaseDetailFeatcher(id: string) {
  return axios.get(fetchUsecasePath.replace(':id', id)).then((res) => {
    return (res.data as UsecaseProps) || undefined;
  });
}
