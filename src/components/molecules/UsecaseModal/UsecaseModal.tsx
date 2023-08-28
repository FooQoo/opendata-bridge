import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { getUsecaseUrl, UsecaseProps } from 'types/usecase';

const UsecaseModal = ({
  usecase,
  isOpen,
  onOpenChange,
}: {
  usecase: UsecaseProps;
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {usecase.template_title}
            </ModalHeader>
            <ModalBody>
              <p>{usecase.template_description}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                あとで見る
              </Button>
              <Button
                color="primary"
                onPress={() => router.push(getUsecaseUrl(usecase.id))}
              >
                使ってみる
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UsecaseModal;
