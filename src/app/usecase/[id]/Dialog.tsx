'use client';

import Chat from 'components/organisms/Chat/Chat';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UsecaseProps } from 'types/usecase';

import style from './Dialog.module.scss';

type Status = 'search' | 'fetch' | 'format';

const SearchDialog = ({
  usecase,
  setStatus,
}: {
  usecase: UsecaseProps;
  setStatus: (status: Status) => void;
}) => {
  return (
    <div>
      <p>{usecase.search_prompt}</p>
      <button onClick={() => setStatus('fetch')}>Next</button>
    </div>
  );
};

const FetchDialog = ({
  usecase,
  setStatus,
}: {
  usecase: UsecaseProps;
  setStatus: (status: Status) => void;
}) => {
  return (
    <div>
      <p>{usecase.data_fetch_prompt}</p>
      <button onClick={() => setStatus('format')}>Next</button>
    </div>
  );
};

const FormatDialog = ({
  usecase,
  setStatus,
}: {
  usecase: UsecaseProps;
  setStatus: (status: Status) => void;
}) => {
  const router = useRouter();

  return (
    <div>
      <p>{usecase.data_fetch_prompt}</p>
      <button onClick={() => router.push('/')}>Finish</button>
    </div>
  );
};

const Dialog = (usecase: UsecaseProps) => {
  const router = useRouter();

  const [status, setStatus] = useState('search' as Status);

  const dialogComponentList = [];

  if (status === 'search' || status === 'fetch' || status === 'format') {
    dialogComponentList.push(
      <SearchDialog usecase={usecase} setStatus={setStatus} />
    );
  }

  if (status === 'fetch' || status === 'format') {
    dialogComponentList.push(
      <FetchDialog usecase={usecase} setStatus={setStatus} />
    );
  }

  if (status === 'format') {
    dialogComponentList.push(
      <FormatDialog usecase={usecase} setStatus={setStatus} />
    );
  }

  return (
    <div className={style.content}>
      <div className={style.hero}>
        <div className={style.background}></div>
        <div className={style.text}>
          <h1>{usecase.template_title}</h1>
          <p>{usecase.template_description}</p>
        </div>
      </div>

      <Chat />

      <div className="h-full">{dialogComponentList}</div>
    </div>
  );
};

export default Dialog;
