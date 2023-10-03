'use client';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { queryState } from 'recoil/queryState';

const SearchInput = () => {
  const [query, setQueryState] = useRecoilState(queryState);

  return (
    <div className="w-full">
      <Input
        label={
          query.isTyping ? '入力中...' : 'オープンデータ登録情報を検索する'
        }
        isClearable
        radius="lg"
        className="px-[5%] md:px-[10%] py-5"
        classNames={{
          label: ['text-black/50'],
          input: [
            'bg-transparent',
            'text-black/90',
            'placeholder:text-default-700/50',
            'text-md',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'group-data-[focused=true]:bg-default-200/50',
            '!cursor-text',
          ],
        }}
        placeholder="例:公園"
        startContent={
          <div className="text-black/50 text-slate-400 pointer-events-none flex justify-center items-center w-[24px] h-[36px]">
            <FontAwesomeIcon
              className="w-[24px] h-[24px]"
              icon={faMagnifyingGlass}
            />
          </div>
        }
        value={query.query}
        onChange={(e) =>
          setQueryState({
            query: e.target.value,
            isTyping: true,
            isInitialRender: false,
          })
        }
        onClear={() =>
          setQueryState({ query: '', isTyping: false, isInitialRender: false })
        }
        onKeyDown={() =>
          setQueryState({
            query: query.query,
            isTyping: false,
            isInitialRender: false,
          })
        }
      />

      <Button
        color="primary"
        onPress={() =>
          setQueryState({
            query: query.query,
            isTyping: false,
            isInitialRender: false,
          })
        }
      >
        検索する
      </Button>
    </div>
  );
};

export default SearchInput;
