import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Link,
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {usecase.title}
            </ModalHeader>
            <ModalBody>
              <p>{usecase.description}</p>
              {usecase.ogps.length > 0 && (
                <>
                  <p>オープンデータ掲載元</p>
                  {usecase.ogps.map((ogp, index) => {
                    return (
                      <Link key={index} href={ogp.url} target="_blank">
                        {ogp.title}
                      </Link>
                    );
                  })}
                </>
              )}

              {usecase.tableau && (
                <>
                  <p>Tableau Public</p>
                  <Link href={usecase.tableau.url} target="_blank">
                    {usecase.tableau.title}
                  </Link>
                </>
              )}
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
