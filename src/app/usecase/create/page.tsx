import UsecaseCreateForm from 'app/usecase/create/UsecaseCreateForm';
import { Prompt } from 'types/usecase';

const init = {
  id: '', // 空文字として送信する
  title: '特定のエリアの公園を調査する',
  description:
    '特定のエリアの公園に関する情報を検索できます。あなたはどこの公園をお探しですか？',
  base: {
    id: '', // 空文字として送信する
    title: '公園を探す',
    content: `以下において、A=「渋谷区の公園」とします。  
これからAに関するオープンデータを5件教えてください。  

出力は、「例として以上のオープンデータがありますが、どれかについて詳細をお知りになりたいですか？」としてください。  

出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットの説明`,
  } as Prompt,
  option: [
    {
      id: '', // 空文字として送信する
      title: '類義語で検索する',
      content: `Aを代替する検索ワードを3つ考え、それぞれについて検索を行ってください。  
その後、Aとの関連性が高い検索結果を5件教えてください。  

出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットの説明`,
    },
    {
      id: '', // 空文字として送信する
      title: '詳細を確認する',
      content: `これまで検索したデータセットを以下のフォーマットで出力してください。
- データセットの名称  
- データセットのurl
- データセットの説明
- データセットのリソースの一覧
- フォーマット
- ライセンス`,
    },
    {
      id: '', // 空文字として送信する
      title: 'もっと探す',
      content: `一つ前に検索した条件で、次のページを検索してください。
出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットの説明`,
    },
  ] as Prompt[],
  updatedAt: new Date().toISOString(),
};

const CreateUsecase = () => {
  return (
    <div className="bg-white border md:rounded-lg px-8 py-6 mx-auto my-8 w-full md:w-[80%]">
      <h2 className="text-2xl font-medium mb-4">プロンプトテンプレート作成</h2>
      <UsecaseCreateForm init={init} />
    </div>
  );
};

export default CreateUsecase;
