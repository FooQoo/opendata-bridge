'use client';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { Prompt, UsecaseProps } from 'types/usecase';

const postUsecase = async (usecase: UsecaseProps) => {
  try {
    await fetch('/api/usecase', {
      method: 'POST',
      body: JSON.stringify(usecase),
    });
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
};

const CreateUsecase = () => {
  const [usecase, setUsecase] = useState<UsecaseProps>({
    id: '', // 空文字として送信する
    title: '特定のエリアの公園を調査する',
    description:
      '特定のエリアの公園に関する情報を検索できます。あなたはどこの公園をお探しですか？',
    base: {
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
        title: '類義語で検索する',
        content: `Aを代替する検索ワードを3つ考え、それぞれについて検索を行ってください。  
その後、Aとの関連性が高い検索結果を5件教えてください。  

出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットの説明`,
      },
      {
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
        title: 'もっと探す',
        content: `一つ前に検索した条件で、次のページを検索してください。
出力項目は以下でお願いいたします。  
- データセットの名称  
- データセットの説明`,
      },
    ] as Prompt[],
  });

  return (
    <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 w-full">
      <h2 className="text-2xl font-medium mb-4">プロンプトテンプレート作成</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            プロンプト名
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.title}
            onChange={(e) => setUsecase({ ...usecase, title: e.target.value })}
            placeholder="特定のエリアの公園を調査する"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            プロンプトの説明
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.description}
            onChange={(e) =>
              setUsecase({ ...usecase, description: e.target.value })
            }
            placeholder="特定のエリアの公園に関する情報を検索できます。あなたはどこの公園をお探しですか？"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            ベースとなるプロンプトの説明
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.base.title}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                base: { ...usecase.base, title: e.target.value },
              })
            }
            placeholder="公園を探す"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            ベースとなるプロンプトの内容
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            rows={10}
            value={usecase.base.content}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                base: { ...usecase.base, content: e.target.value },
              })
            }
            placeholder="以下において、A=「渋谷区の公園」とします。...."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの説明(1)
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.option[0].title}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[0], title: e.target.value }],
              })
            }
            placeholder="類義語で検索する"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの内容(1)
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            rows={10}
            value={usecase.option[0].content}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[0], content: e.target.value }],
              })
            }
            placeholder="Aを代替する検索ワードを3つ考え、それぞれについて検索を行ってください。 ..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの説明(2)
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.option[1].title}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[1], title: e.target.value }],
              })
            }
            placeholder="詳細を確認する"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの内容(2)
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            rows={10}
            value={usecase.option[1].content}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[1], content: e.target.value }],
              })
            }
            placeholder="これまで検索したデータセットを以下のフォーマットで出力してください。"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの説明(3)
          </label>
          <input
            type="text"
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            value={usecase.option[2].title}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[2], title: e.target.value }],
              })
            }
            placeholder="もっと探す"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            オプションとなるプロンプトの内容(3)
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
            required
            rows={10}
            value={usecase.option[2].content}
            onChange={(e) =>
              setUsecase({
                ...usecase,
                option: [{ ...usecase.option[2], content: e.target.value }],
              })
            }
          />
        </div>
      </form>

      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const isSuccess = await postUsecase(usecase);
          alert(isSuccess ? '作成しました' : '作成に失敗しました');
        }}
      >
        作成する
      </Button>
    </div>
  );
};

export default CreateUsecase;
