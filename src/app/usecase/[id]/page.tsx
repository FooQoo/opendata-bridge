import usecaseDetailFeatcher from 'lib/axios/usecaseDetailFetcher';

const Detail = async ({ params }: { params: { id: string } }) => {
  console.info(`Detail: ${params.id}`);

  const usecase = await usecaseDetailFeatcher(params.id);

  return (
    <div className="h-full w-full">
      <h1>{usecase.title}</h1>
    </div>
  );
};

export default Detail;
