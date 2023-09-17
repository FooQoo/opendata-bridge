'use client';
import { UsecaseProps } from 'types/usecase';

const UsecaseForm = ({
  usecase,
  setUsecase,
}: {
  usecase: UsecaseProps;
  setUsecase: (usecase: UsecaseProps) => void;
}) => {
  return (
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
              option: [
                { ...usecase.option[0], title: e.target.value },
                { ...usecase.option[1] },
                { ...usecase.option[2] },
              ],
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
              option: [
                { ...usecase.option[0], content: e.target.value },
                { ...usecase.option[1] },
                { ...usecase.option[2] },
              ],
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
              option: [
                { ...usecase.option[0] },
                { ...usecase.option[1], title: e.target.value },
                { ...usecase.option[2] },
              ],
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
              option: [
                { ...usecase.option[0] },
                { ...usecase.option[1], content: e.target.value },
                { ...usecase.option[2] },
              ],
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
              option: [
                { ...usecase.option[0] },
                { ...usecase.option[1] },
                { ...usecase.option[2], title: e.target.value },
              ],
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
              option: [
                { ...usecase.option[0] },
                { ...usecase.option[1] },
                { ...usecase.option[2], content: e.target.value },
              ],
            })
          }
        />
      </div>
    </form>
  );
};

export default UsecaseForm;
