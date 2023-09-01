import Usecase from 'components/molecules/Usecase/Usecase';
import { UsecaseProps } from 'types/usecase';

import styles from './UsecaseList.module.scss';

export type UsercaseListProps = {
  usecases: UsecaseProps[];
};

const UsercaseList = ({ usecases }: UsercaseListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0  md:gap-4 mx-auto md:mx-[100px] justify-items-center">
      {usecases.map((usecase, index) => (
        <Usecase key={index} {...usecase} />
      ))}
    </div>
  );
};

export default UsercaseList;
