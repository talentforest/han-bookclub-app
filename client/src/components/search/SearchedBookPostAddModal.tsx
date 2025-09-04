import { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import { useSetRecoilState } from 'recoil';

import { bookDescState, recommendedBookAtom } from '@/data/bookAtom';

import { useSearchBook } from '@/hooks';

import { BookData } from '@/types';

import ChallengeBookForm from '@/components/challenge/ChallengeBookForm';
import Modal from '@/components/common/Modal';
import RefInput from '@/components/common/input/RefInput';
import RecommendBookModalForm from '@/components/post/recommendedBooks/RecommendBookModalForm';
import SearchedBookList from '@/components/search/SearchedBookList';

interface SearchedBookPostAddModalProps {
  title: '챌린지 등록하기' | '추천책 작성하기';
}

export default function SearchedBookPostAddModal({
  title,
}: SearchedBookPostAddModalProps) {
  const setMyRecommendBook = useSetRecoilState(recommendedBookAtom);
  const setBookDesc = useSetRecoilState(bookDescState);

  const [currStep, setCurrStep] = useState(1);

  const { searchInputRef, onBookQueryChange, searchList } = useSearchBook();

  useEffect(() => {
    if (searchInputRef && !searchList.length) {
      searchInputRef.current.focus();
    }
  }, []);

  const onSelectBtnClick = (book: BookData) => {
    changeStep(2);
    title === '추천책 작성하기' ? setMyRecommendBook(book) : setBookDesc(book);
  };

  const changeStep = (step: number) => setCurrStep(step);

  return (
    <Modal title={title}>
      {currStep === 1 && (
        <div className="relative mt-3 min-h-64 max-sm:mt-0">
          <div className="flex items-center gap-2">
            <FiSearch className="absolute left-3 top-4 text-lg text-gray2" />
            <RefInput
              ref={searchInputRef}
              placeholder={`${
                title === '추천책 작성하기' ? '추천책' : '챌린지 책'
              }을 검색해주세요.`}
              onChange={onBookQueryChange}
              className="bg-gray-50 pl-9"
            />
          </div>

          {searchList?.length !== 0 && (
            <SearchedBookList
              searchList={searchList}
              onSelectBtnClick={onSelectBtnClick}
            />
          )}
        </div>
      )}

      {currStep === 2 &&
        (title === '추천책 작성하기' ? (
          <RecommendBookModalForm />
        ) : (
          <ChallengeBookForm />
        ))}
    </Modal>
  );
}
