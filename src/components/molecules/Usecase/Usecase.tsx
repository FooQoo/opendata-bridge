import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDisclosure } from '@nextui-org/react';
import UsecaseModal from 'components/molecules/UsecaseModal/UsecaseModal';
import { Project } from 'types/project';
import { UsecaseProps } from 'types/usecase';

import styles from './Usecase.module.scss';

const Usecase = (usecase: Project) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className={styles.card} onClick={onOpen}>
        <h2>{usecase.title}</h2>
        <p className="flex-grow">{usecase.description}</p>
        <div className="text-sm grid grid-cols-2 h-[20px]">
          <div />
          <span className="text-right">最終更新日:{usecase.updatedAt}</span>
        </div>
      </div>
      <UsecaseModal
        usecase={usecase}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Usecase;
