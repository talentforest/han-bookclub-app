import { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import { ISearchedBook } from 'data/bookAtom';
import { FiSearch, FiPlus, FiMinusCircle } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import Modal from 'components/atoms/Modal';
import SquareBtn from 'components/atoms/button/SquareBtn';
import Input from 'components/atoms/input/Input';
import VoteBookItem from 'components/molecules/VoteBookItem';
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
    onAddVoteItemBtn,
    onDeleteVoteItemClick,
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

  const onSelectBookBtnClick = (book: ISearchedBook) => {
    const { title, url, thumbnail } = book;

    const newBookItem = { title, url, thumbnail };

    const voteItems = newVote.voteItems.map((voteItem) => {
      const itemId = voteItem.id === searchBook.itemId;
      return itemId ? { ...voteItem, book: newBookItem } : voteItem;
    });

    setNewVote({ ...newVote, voteItems });
    toggleSelectReason();
  };

  const onSelectReasonChange = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
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
          <Label htmlFor='vote-title'>투표 제목</Label>
          <Input
            id='vote-title'
            type='text'
            placeholder='1월 과학책 투표'
            value={title}
            onChange={onVoteTitleChange}
            required
          />

          <Label>투표할 모임책</Label>
          <VoteItems>
            {voteItems.map((voteItem) => (
              <VoteBookItem key={voteItem.id} voteItem={voteItem}>
                {voteItem.id > 2 && (
                  <button
                    onClick={() => onDeleteVoteItemClick(voteItem.id)}
                    className='delete-btn'
                  >
                    <FiMinusCircle />
                  </button>
                )}

                {voteItem.book.title === '' && (
                  <button
                    className='empty-box'
                    type='button'
                    onClick={() => toggleSearch(voteItem.id)}
                  >
                    <FiSearch fontSize={25} />
                    <span>책 등록하기</span>
                  </button>
                )}
              </VoteBookItem>
            ))}
          </VoteItems>

          {voteItems.length < 4 && (
            <AddVoteItemBtn type='button' onClick={onAddVoteItemBtn}>
              <FiPlus />
              <span>투표할 책 추가</span>
            </AddVoteItemBtn>
          )}

          <Label htmlFor='datepicker'>투표 종료일</Label>
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
              <Label htmlFor='select-reason'>책등록 2단계</Label>
              <Textarea
                id='select-reason'
                placeholder='이 책을 투표항목으로 선정한 이유에 대해서 작성해주세요.'
                value={newVote.voteItems[searchBook.itemId - 1].selectReason}
                onChange={onSelectReasonChange}
              />
              <SquareBtn
                type='button'
                name='투표할 모임책 등록하기'
                handleClick={() => {
                  toggleSelectReason();
                  toggleSearch();
                }}
              />
            </>
          ) : (
            <>
              <Label htmlFor='search-book'>책등록 1단계</Label>
              <RefInput
                id='search-book'
                ref={searchInputRef}
                placeholder='투표할 책을 검색해주세요.'
                onChange={onBookQueryChange}
              />
              <SearchedBookList
                searchList={searchList}
                onSelectBtnClick={onSelectBookBtnClick}
              />
            </>
          )}
        </>
      )}
    </Modal>
  );
};

const Label = styled.label`
  color: ${({ theme }) => theme.container.blue3};
  font-size: 14px;
  margin: 0 0 8px 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: scroll;
  scroll-behavior: auto;
  padding: 5px 4px 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  label {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
  @media ${device.tablet} {
    label {
      margin-top: 40px;
    }
  }
`;

const VoteItems = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  @media ${device.tablet} {
    gap: 18px;
  }
`;

const AddVoteItemBtn = styled.button`
  padding: 4px;
  margin-top: 10px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  svg {
    font-size: 17px;
    margin-right: 3px;
    stroke: ${({ theme }) => theme.text.green};
  }
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.text.green};
  }
`;

const ReactDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.container.lightGray};
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
