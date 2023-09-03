import UsecaseCreateForm from 'app/usecase/create/UsecaseCreateForm';
import UsecaseEditForm from 'app/usecase/edit/[id]/UsecaseEditForm';
import usecaseDetailFeatcher from 'lib/axios/usecaseDetailFetcher';

const CreateUsecase = async ({ params }: { params: { id: string } }) => {
  console.info(`Detail: ${params.id}`);

  const init = await usecaseDetailFeatcher(params.id);

  return (
    <div className="bg-white border md:rounded-lg px-8 py-6 mx-auto my-8 w-full md:w-[80%]">
      <h2 className="text-2xl font-medium mb-4">プロンプトテンプレート編集</h2>

      <UsecaseEditForm init={init} />
    </div>
  );
};

export default CreateUsecase;
