import { useState } from 'react';

import SearchedBookPostAddModal from '../../search/SearchedBookPostAddModal';
import { FiSearch } from 'react-icons/fi';

const SearchBookBtn = () => {
  const [openRecommendPostModal, setOpenRecommendPostModal] = useState(false);

  const toggleRecommendPostModal = () =>
    setOpenRecommendPostModal(prev => !prev);

  return (
    <>
      <button
        className="mb-[10px] flex w-1/2 items-center gap-1 rounded-xl border bg-white px-4 py-3 shadow-card max-sm:w-full"
        onClick={toggleRecommendPostModal}
      >
        <FiSearch fontSize={16} />
        <span className="text-sm text-gray2">추천책 검색</span>
      </button>

      {openRecommendPostModal && (
        <SearchedBookPostAddModal
          title="추천책 작성하기"
          onToggleClick={toggleRecommendPostModal}
        />
      )}
    </>
  );
};

export default SearchBookBtn;
