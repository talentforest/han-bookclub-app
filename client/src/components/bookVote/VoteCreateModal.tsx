import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { FiPlusCircle } from 'react-icons/fi';

import { useCreateBookVoteBox, useSearchBook } from '@/hooks';

import { BaseBookData } from '@/types';

import CreateVoteBookCard from '@/components/bookVote/CreateVoteBookCard';
import CustomDatePicker from '@/components/common/CustomDatePicker';
import Modal from '@/components/common/Modal';
import Textarea from '@/components/common/Textarea';
import SquareBtn from '@/components/common/button/SquareBtn';
import Input from '@/components/common/input/Input';
import SearchedBookList from '@/components/search/SearchedBookList';

const initialSearchBook = {
  isOpenSearchBook: false,
  itemId: 1,
};

const VoteCreateModal = () => {
  const [searchBook, setSearchBook] = useState(initialSearchBook);

  const [isOpenSelectReason, setIsOpenSelectReason] = useState(false);

  const {
    newVote,
    setNewVote,
    onNewVoteSubmit,
    onVoteTitleChange,
    onDateChange,
    onAddVoteItemBtn,
    onDeleteVoteItemClick,
    isPending,
  } = useCreateBookVoteBox();

  const {
    searchInputRef,
    onBookQueryChange,
    searchList,
    resetSearchList, //
  } = useSearchBook();

  const toggleSearch = (id?: number) => {
    resetSearchList();
    setSearchBook(({ isOpenSearchBook, itemId }) => {
      return { itemId: id || itemId, isOpenSearchBook: !isOpenSearchBook };
    });
  };

  const toggleSelectReason = () => setIsOpenSelectReason(prev => !prev);

  const onSelectBookBtnClick = (book: BaseBookData) => {
    const { title, url, thumbnail } = book;
    const newBookItem = { title, url, thumbnail };
    const voteItems = newVote.voteItems.map(voteItem => {
      const itemId = voteItem.id === searchBook.itemId;
      return itemId ? { ...voteItem, book: newBookItem } : voteItem;
    });
    setNewVote({ ...newVote, voteItems });
    toggleSelectReason();
  };

  const onSelectReasonChange = (
    event: React.FormEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;
    const vote = {
      ...newVote,
      voteItems: newVote.voteItems.map(item => {
        const itemId = item.id === searchBook.itemId;
        return itemId ? { ...item, selectReason: value } : item;
      }),
    };
    setNewVote(vote);
  };

  const { title, voteItems } = newVote;

  return (
    <Modal title="모임책 투표 생성하기" className="max-w-[500px]">
      {!searchBook.isOpenSearchBook && (
        <form
          onSubmit={onNewVoteSubmit}
          className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide"
        >
          <Input
            label="투표제목"
            type="text"
            placeholder="예: 1월 과학책 투표"
            value={title}
            onChange={onVoteTitleChange}
            required
          />

          <div>
            <span className="py-1 pl-1 text-sm font-medium text-blue1">
              투표할 책 등록
            </span>
            <ul className="flex gap-x-3 overflow-x-scroll py-1 scrollbar-hide">
              {voteItems.map(({ id, book }) => (
                <CreateVoteBookCard
                  key={id}
                  voteId={id}
                  book={book}
                  onCreateClick={() => toggleSearch(id)}
                  onDeleteClick={() => onDeleteVoteItemClick(id)}
                />
              ))}
              <button
                type="button"
                onClick={onAddVoteItemBtn}
                disabled={voteItems.length >= 4}
                className="flex h-[inherit] items-center justify-center px-2 text-blue1 disabled:text-gray2"
              >
                <FiPlusCircle className="text-xl" />
              </button>
            </ul>
          </div>

          <CustomDatePicker
            id="투표 종료일"
            label="투표 종료일"
            selected={new Date(newVote.deadline)}
            onChange={onDateChange}
            selectsEnd
            endDate={new Date(newVote.deadline)}
            dateFormat="yyyy년 MM월 dd일"
          />

          <SquareBtn
            type="submit"
            name="모임책 투표 등록하기"
            className="mt-3 self-end"
            disabled={isPending}
            color="blue"
          />
        </form>
      )}

      {searchBook.isOpenSearchBook &&
        (!isOpenSelectReason ? (
          <>
            <Input
              id="search-book"
              label="투표책 검색"
              ref={searchInputRef}
              placeholder="투표할 책을 검색해주세요."
              onChange={onBookQueryChange}
              iconName="FiSearch"
            />
            <SearchedBookList
              searchList={searchList}
              onSelectBtnClick={onSelectBookBtnClick}
            />
          </>
        ) : (
          <>
            <Textarea
              label="책등록 2단계"
              id="select-reason"
              placeholder="이 책을 투표항목으로 선정한 이유에 대해서 작성해주세요."
              value={voteItems[searchBook.itemId - 1].selectReason}
              onChange={onSelectReasonChange}
            />
            <SquareBtn
              type="button"
              name="투표책으로 등록하기"
              handleClick={() => {
                toggleSelectReason();
                toggleSearch();
              }}
              className="mt-3 self-end"
            />
          </>
        ))}
    </Modal>
  );
};

export default VoteCreateModal;
