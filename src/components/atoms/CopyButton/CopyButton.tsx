import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import { IconCheck, IconCopy } from 'components/atoms/Chat/icons';
import { useCopyToClipboard } from 'hooks/use-copy-to-clipboard';

const CopyButton = ({ value }: { value: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  function solid(
    arg0: string
  ): import('@fortawesome/fontawesome-svg-core').IconProp {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="text-2xl" onClick={onCopy}>
      {isCopied ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faCopy} />
      )}
    </div>
  );
};

export default CopyButton;
