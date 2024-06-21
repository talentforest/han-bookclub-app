import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil';
import {
  ISearchedBook,
  bookDescState,
  recommendBookState,
} from 'data/bookAtom';
import Modal from 'components/atoms/Modal';
import useSearchBook from 'hooks/useSearchBook';
import RefInput from 'components/atoms/input/RefInput';
import RecommendBookModalForm from 'components/organisms/RecommendBookModalForm';
import ChallengeModalForm from 'components/organisms/ChallengeModalForm';
import SearchedBookList from '../SearchedBookList';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface Props {
  title: '챌린지 등록하기' | '추천책 작성하기';
  onToggleClick: () => void;
}

export default function SearchedBookPostAddModal({
  title,
  onToggleClick,
}: Props) {
  const setMyRecommendBook = useSetRecoilState(recommendBookState);
  const setBookDesc = useSetRecoilState(bookDescState);

  const [currStep, setCurrStep] = useState(1);

  const {
    searchInputRef,
    onBookQueryChange,
    searchList,
    resetSearchList, //
  } = useSearchBook();

  useEffect(() => {
    if (searchInputRef && !searchList.length) {
      searchInputRef.current.focus();
    }
  }, []);

  const onModalToggleClick = () => {
    onToggleClick();
    resetSearchList();
  };

  const onSelectBtnClick = (book: ISearchedBook) => {
    changeStep(2);
    title === '추천책 작성하기' ? setMyRecommendBook(book) : setBookDesc(book);
  };

  const changeStep = (step: number) => setCurrStep(step);

  return (
    <Modal title={title} onToggleClick={onModalToggleClick}>
      {currStep === 1 && (
        <StepBox>
          <SearchBox>
            <FiSearch
              fontSize={18}
              stroke='#aaa'
              style={{ position: 'absolute', top: '11px', left: '12px' }}
            />
            <RefInput
              ref={searchInputRef}
              placeholder={`${
                title === '추천책 작성하기' ? '추천책' : '챌린지 책'
              }을 검색해주세요.`}
              onChange={onBookQueryChange}
            />
          </SearchBox>

          {searchList?.length !== 0 && (
            <SearchedBookList
              searchList={searchList}
              onSelectBtnClick={onSelectBtnClick}
            />
          )}
        </StepBox>
      )}

      {currStep === 2 &&
        (title === '추천책 작성하기' ? (
          <RecommendBookModalForm onModalClose={onModalToggleClick} />
        ) : (
          <ChallengeModalForm onModalClose={onModalToggleClick} />
        ))}
    </Modal>
  );
}

const StepBox = styled.div`
  position: relative;
  margin-top: 5px;
  min-height: 55vh;
  @media ${device.tablet} {
    min-height: 30vh;
  }
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  input {
    padding-left: 35px;
    border-radius: 30px;
  }
  button {
    width: 70px;
    padding-bottom: 4px;
  }
  @media ${device.tablet} {
    button {
      width: 150px;
    }
  }
`;
