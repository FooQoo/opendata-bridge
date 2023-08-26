'use client';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';

const SearchInput = () => {
  return (
    <Input
      label="Search"
      isClearable
      radius="lg"
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
      placeholder="Type to search..."
      startContent={
        <div className="text-black/50 text-slate-400 pointer-events-none flex-shrink-0">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      }
    />
  );
};

export default SearchInput;
