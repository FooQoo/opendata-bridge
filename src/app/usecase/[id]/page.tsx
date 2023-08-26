import usecaseDetailFeatcher from 'lib/axios/usecaseDetailFetcher';

const Detail = async ({ params }: { params: { id: string } }) => {
  console.info(`Detail: ${params.id}`);

  const res = await usecaseDetailFeatcher(params.id);

  return (
    <div>
      <h1>Detail: {params.id}</h1>
      <p>{res.template_title}</p>
      <p>{res.template_description}</p>
      <p>{res.search_prompt}</p>
      <p>{res.data_fetch_prompt}</p>
      <p>{res.data_format_prompt}</p>
    </div>
  );
};

export default Detail;
