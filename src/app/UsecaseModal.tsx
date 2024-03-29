'use client';
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { Project } from 'types/project';

const UsecaseModal = ({
  usecase,
  isOpen,
  onOpenChange,
}: {
  usecase: Project;
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

              {usecase.resources.length > 0 && (
                <>
                  <p>ダウンロードページ</p>
                  {usecase.resources.map((ogp, index) => {
                    return (
                      <Link key={index} href={ogp.url} target="_blank">
                        {ogp.title}
                      </Link>
                    );
                  })}
                </>
              )}

              {/* {usecase.tableau && (
                <>
                  <p>Tableau Public</p>
                  <Link href={usecase.tableau.url} target="_blank">
                    {usecase.tableau.title}
                  </Link>
                </>
              )} */}
            </ModalBody>
            <ModalFooter>
              <div className="flex w-full">
                <div className="flex-grow"></div>
                <div className="flex-none">
                  <Button color="danger" variant="light" onPress={onClose}>
                    閉じる
                  </Button>
                  {/* <Button
                    color="primary"
                    onPress={() => router.push(`/usecase/${usecase.id}`)}
                  >
                    詳細をみる
                  </Button> */}
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
