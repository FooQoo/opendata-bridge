import { axios } from 'lib/axios/axiosClient';
import { Project } from 'types/project';

export const fetchUsecasePath = '/api/usecase/:id';

export default function usecaseDetailFeatcher(id: string) {
  return axios.get(fetchUsecasePath.replace(':id', id)).then((res) => {
    return (res.data as Project) || undefined;
  });
}
