import { Fragment, useEffect, useState } from 'react';
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
import SearchedBookBox from 'components/molecules/SearchedBookBox';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
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
    closeSearchList, //
  } = useSearchBook();

  useEffect(() => {
    if (searchInputRef && !searchList.length) {
      searchInputRef.current.focus();
    }
  }, []);

  const onModalToggleClick = () => {
    onToggleClick();
    closeSearchList();
  };

  const onSelectedBtnClick = (book: ISearchedBook) => {
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

          <BookResults>
            {searchList?.length !== 0 &&
              searchList.map((book, index) => (
                <Fragment key={`${book.title}-${index}`}>
                  <SearchedBookBox
                    searchedBook={book}
                    onSelectedBtnClick={onSelectedBtnClick}
                    modal
                  />
                  {searchList?.length - 1 !== index && <DottedDividingLine />}
                </Fragment>
              ))}
          </BookResults>
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

const BookResults = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 200px;
  height: 300px;
  transition: height 0.5s ease;
  overflow: scroll;
  .no_search {
    display: flex;
    padding-top: 60px;
    justify-content: center;
    height: 100%;
    span {
      font-size: 15px;
      color: ${({ theme }) => theme.text.gray3};
    }
  }
`;
