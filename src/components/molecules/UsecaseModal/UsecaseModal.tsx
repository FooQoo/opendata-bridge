import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {usecase.title}
            </ModalHeader>
            <ModalBody>
              <p>{usecase.description}</p>
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full">
                <div className="flex-grow">
                  <Link href={`/manage/usecase/edit/${usecase.id}`}>
                    <Button color="danger" variant="light">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                  </Link>
                </div>
                <div className="flex-none">
                  <Button color="danger" variant="light" onPress={onClose}>
                    あとで見る
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      router.push(getUsecaseUrl(usecase.id));
                      router.refresh();
                    }}
                  >
                    使ってみる
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UsecaseModal;
