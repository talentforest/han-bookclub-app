import { FiSearch } from 'react-icons/fi';

import { useHandleModal } from '@/hooks';

import SearchedBookPostAddModal from '@/components/search/SearchedBookPostAddModal';

const SearchBookBtn = () => {
  const { showModal } = useHandleModal();

  return (
    <>
      <button
        className="mb-[10px] flex w-1/2 items-center gap-1 rounded-xl bg-white px-4 py-3 shadow-card max-sm:w-full"
        onClick={() =>
          showModal({
            element: <SearchedBookPostAddModal title="추천책 작성하기" />,
          })
        }
      >
        <FiSearch fontSize={16} />
        <span className="text-sm text-gray2">추천책 검색</span>
      </button>
    </>
  );
};

export default SearchBookBtn;
