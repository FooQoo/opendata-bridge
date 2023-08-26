import Dialog from 'app/usecase/[id]/Dialog';
import usecaseDetailFeatcher from 'lib/axios/usecaseDetailFetcher';

const Detail = async ({ params }: { params: { id: string } }) => {
  console.info(`Detail: ${params.id}`);

  const res = await usecaseDetailFeatcher(params.id);

  return (
    <div className="h-full" style={{ width: '80%' }}>
      <Dialog {...res} />
    </div>
  );
};

export default Detail;
