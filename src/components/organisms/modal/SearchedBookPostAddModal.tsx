import { Fragment, useEffect, useState } from 'react';
import { cutLetter } from 'util/index';
import { useSetRecoilState } from 'recoil';
import {
  ISearchedBook,
  bookDescState,
  recommendBookState,
} from 'data/bookAtom';
import { FiCheckCircle, FiSearch } from 'react-icons/fi';
import Modal from 'components/atoms/Modal';
import device from 'theme/mediaQueries';
import useSearchBook from 'hooks/useSearchBook';
import RefInput from 'components/atoms/input/RefInput';
import BookThumbnailImg from 'components/atoms/BookThumbnailImg';
import RecommendBookModalForm from 'components/molecules/form/RecommendBookModalForm';
import DottedDividingLine from 'components/atoms/DottedDividingLine';
import ChallengeModalForm from 'components/molecules/form/ChallengeModalForm';
import styled from 'styled-components';
import BookAuthorPublisher from 'components/atoms/BookAuthorPublisher';

interface Props {
  title: '챌린지 등록하기' | '추천책 작성하기';
  onToggleClick: () => void;
}

export default function SearchedBookPostAddModal({
  title,
  onToggleClick,
}: Props) {
  const [currStep, setCurrStep] = useState(1);

  const setMyRecommendBook = useSetRecoilState(recommendBookState);
  const setBookDesc = useSetRecoilState(bookDescState);

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

  const onSearchedBookBoxClick = (book: ISearchedBook) => {
    setCurrStep(2);
    if (title === '추천책 작성하기') {
      setMyRecommendBook(book);
    } else {
      setBookDesc(book);
    }
  };

  const onModalToggleClick = () => {
    onToggleClick();
    closeSearchList();
  };

  const resulbBoxheight = 81 * (searchList.length > 3 ? 3 : searchList.length);

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

          <BookResults $height={resulbBoxheight}>
            {searchList.slice(0, 3).map((book, index) => (
              <Fragment key={`${book.title}-${index}`}>
                <BookBox>
                  <BookThumbnailImg
                    title={book.title}
                    thumbnail={book.thumbnail}
                  />
                  <div>
                    <h3>{cutLetter(book.title, 16)}</h3>

                    <BookAuthorPublisher
                      authors={book.authors}
                      publisher={book.publisher}
                    />
                  </div>

                  <button
                    type='button'
                    onClick={() => onSearchedBookBoxClick(book)}
                  >
                    <FiCheckCircle fontSize={12} stroke='#8bb0ff' />
                    <span>선택</span>
                  </button>
                </BookBox>
                {index !== searchList.length && <DottedDividingLine />}
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
  height: 40px;
  margin-bottom: 10px;
  input {
    height: inherit;
    min-width: 150px;
    width: 100%;
    padding-top: 18px;
    padding-left: 35px;
    border-radius: 30px;
  }
  button {
    width: 70px;
  }
  @media ${device.tablet} {
    height: 62px;
    input {
      height: 40px;
      min-width: 150px;
      width: 100%;
      padding-left: 35px;
      border-radius: 30px;
    }
    button {
      width: 150px;
    }
  }
`;

const BookResults = styled.section<{ $height: number }>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 200px;
  height: ${({ $height }) => `${$height}px`};
  transition: height 0.5s ease;
  overflow: hidden;
`;

const BookBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 10px 5px;
  gap: 10px;

  > div:first-child {
    max-width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    h3 {
      font-size: 15px;
    }
    span {
      font-size: 14px;
      color: #888;
    }
  }
  > button {
    position: absolute;
    right: 4px;
    bottom: 5px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 3px;
    padding-left: 5px;
    span {
      padding-top: 4px;
      color: ${({ theme }) => theme.text.blue1};
    }
  }
`;
