import Usecase from 'components/molecules/Usecase/Usecase';
import { Project } from 'types/project';
import { UsecaseProps } from 'types/usecase';

import styles from './UsecaseList.module.scss';

export type UsercaseListProps = {
  usecases: Project[];
};

const UsercaseList = ({ usecases }: UsercaseListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4 mx-auto justify-items-center">
      {usecases.map((usecase, index) => (
        <Usecase key={index} {...usecase} />
      ))}
    </div>
  );
};

export default UsercaseList;
