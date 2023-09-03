import { useDisclosure } from '@nextui-org/react';
import UsecaseModal from 'components/molecules/UsecaseModal/UsecaseModal';
import { UsecaseProps } from 'types/usecase';

import styles from './Usecase.module.scss';

const Usecase = (usecase: UsecaseProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className={styles.card} onClick={onOpen}>
        <h2>{usecase.title}</h2>
        <p className="flex-grow">{usecase.description}</p>
        <div className="text-right text-sm">最終更新日:{usecase.updatedAt}</div>
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
