import { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import { ISearchedBook } from 'data/bookAtom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import BookVoteItem from 'components/atoms/BookVoteItem';
import useCreateBookVoteBox from 'hooks/useCreateBookVoteBox';
import useSearchBook from 'hooks/useSearchBook';
import RefInput from 'components/atoms/input/RefInput';
import SearchedBookList from '../SearchedBookList';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface PropsType {
  onToggleModal: () => void;
}

const initialSearchBook = {
  openSearch: false,
  itemId: 1,
};

const VoteCreateModal = ({ onToggleModal }: PropsType) => {
  const [searchBook, setSearchBook] = useState(initialSearchBook);
  const [openSelectReason, setOpenSelectReason] = useState(false);

  const {
    newVote,
    setNewVote,
    onNewVoteSubmit,
    onVoteTitleChange,
    onDateChange,
  } = useCreateBookVoteBox({ onToggleModal });

  const {
    searchInputRef,
    onBookQueryChange,
    searchList,
    resetSearchList, //
  } = useSearchBook();

  const toggleSearch = (id?: number) => {
    resetSearchList();
    setSearchBook(({ openSearch, itemId }) => {
      return { itemId: id || itemId, openSearch: !openSearch };
    });
  };

  const toggleSelectReason = () => setOpenSelectReason((prev) => !prev);

  const onSelectBtnClick = (book: ISearchedBook) => {
    const { title, url, thumbnail } = book;

    const newBookItem = { title, url, thumbnail };

    const voteItems = newVote.voteItems.map((voteItem) => {
      const itemId = voteItem.id === searchBook.itemId;
      return itemId ? { ...voteItem, book: newBookItem } : voteItem;
    });

    setNewVote({ ...newVote, voteItems });
    toggleSelectReason();
  };

  const onReasonChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    const vote = {
      ...newVote,
      voteItems: newVote.voteItems.map((item) => {
        const itemId = item.id === searchBook.itemId;
        return itemId ? { ...item, selectReason: value } : item;
      }),
    };

    setNewVote(vote);
  };

  const { title, voteItems } = newVote;

  return (
    <Modal title='모임책 투표 생성하기' onToggleClick={onToggleModal}>
      {!searchBook.openSearch ? (
        <Form onSubmit={onNewVoteSubmit}>
          <label htmlFor='vote-title'>투표 제목</label>
          <Input
            id='vote-title'
            type='text'
            placeholder='1월 과학책 투표'
            value={title}
            onChange={onVoteTitleChange}
            required
          />

          <label>투표할 모임책</label>
          <VoteItems>
            {voteItems.map((voteItem) => (
              <BookVoteItem
                key={voteItem.id}
                voteItem={voteItem}
                toggleSearch={toggleSearch}
              />
            ))}
          </VoteItems>

          <label htmlFor='datepicker'>투표 종료일</label>
          <ReactDatePicker
            id='datepicker'
            selected={new Date(newVote.deadline)}
            onChange={onDateChange}
            selectsEnd
            endDate={new Date(newVote.deadline)}
            minDate={new Date()}
            locale={ko}
            dateFormat='yyyy년 MM월 dd일'
          />

          <SquareBtn type='submit' name='모임책 투표 등록' />
        </Form>
      ) : (
        <>
          {openSelectReason ? (
            <>
              <Textarea
                placeholder='모임책으로 선정한 이유에 대해서 작성해주세요.'
                value={newVote.voteItems[searchBook.itemId - 1].selectReason}
                onChange={onReasonChange}
              />
              <SquareBtn
                type='button'
                name='투표함 모임책 등록하기'
                handleClick={() => {
                  toggleSelectReason();
                  toggleSearch();
                }}
              />
            </>
          ) : (
            <>
              <RefInput
                ref={searchInputRef}
                placeholder={`투표할 책을 검색해주세요.`}
                onChange={onBookQueryChange}
              />
              <SearchedBookList
                searchList={searchList}
                onSelectBtnClick={onSelectBtnClick}
              />
            </>
          )}
        </>
      )}
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  scroll-behavior: auto;
  padding: 10px 4px;
  &::-webkit-scrollbar {
    display: none;
  }
  label {
    color: ${({ theme }) => theme.container.blue3};
    font-size: 14px;
    margin: 25px 0 8px 5px;
    &:first-child {
      margin-top: 0;
    }
  }
`;

const VoteItems = styled.ul`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  @media ${device.tablet} {
    gap: 15px;
  }
`;

const ReactDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 40px;
  .react-datepicker__navigation-icon::before {
    border-color: #4872f9;
    border-width: 2px 2px 0 0;
    height: 7px;
    width: 7px;
  }
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    font-size: 16px;
    padding: 15px;
  }
`;

const Textarea = styled.textarea`
  font-size: 16px;
  width: 100%;
  height: 120px;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text.gray1};
  box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.2);
  resize: none;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
`;

export default VoteCreateModal;
