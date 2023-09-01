'use client';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { queryState } from 'recoil/queryState';

const SearchInput = () => {
  const [query, setQueryState] = useRecoilState(queryState);

  return (
    <Input
      label="Search"
      isClearable
      radius="lg"
      className="w-[80%]"
      classNames={{
        label: 'text-black/50',
        input: [
          'bg-transparent',
          'text-black/90',
          'placeholder:text-default-700/50',
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
      placeholder="プロンプトを検索しましょう。例:公園"
      startContent={
        <div className="text-black/50 text-slate-400 pointer-events-none flex justify-center items-center w-[24px] h-[36px]">
          <FontAwesomeIcon
            className="w-[24px] h-[24px]"
            icon={faMagnifyingGlass}
          />
        </div>
      }
      value={query}
      onChange={(e) => setQueryState(e.target.value)}
      onClear={() => setQueryState('')}
    />
  );
};

export default SearchInput;
