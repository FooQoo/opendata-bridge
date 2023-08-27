import { useDisclosure } from '@nextui-org/react';
import UsecaseModal from 'components/molecules/UsecaseModal/UsecaseModal';
import { UsecaseProps } from 'types/usecase';

import styles from './Usecase.module.scss';

const Usecase = (usecase: UsecaseProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className={styles.card} onClick={onOpen}>
      <h2>{usecase.template_title}</h2>
      <p>{usecase.template_description}</p>
      <UsecaseModal
        usecase={usecase}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default Usecase;
