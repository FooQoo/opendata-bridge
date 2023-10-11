import { Chat } from 'components/molecules/Chat/chat';
import usecaseDetailFeatcher from 'lib/axios/usecaseDetailFetcher';

export const runtime = 'edge';

const Detail = async ({ params }: { params: { id: string } }) => {
  console.info(`Detail: ${params.id}`);

  const res = await usecaseDetailFeatcher(params.id);

  return (
    <div className="h-full w-full">
      <Chat id={params.id} usecase={res} />
    </div>
  );
};

export default Detail;
