import { useState } from 'react';

import useCreateBookVoteBox from 'hooks/useCreateBookVoteBox';
import useSearchBook from 'hooks/useSearchBook';

import { ISearchedBook } from 'data/bookAtom';

import SearchedBookList from '../search/SearchedBookList';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiMinusCircle, FiPlus, FiSearch } from 'react-icons/fi';

import Modal from 'components/common/Modal';
import BookThumbnail from 'components/common/book/BookThumbnail';
import SquareBtn from 'components/common/button/SquareBtn';
import Input from 'components/common/input/Input';
import Label from 'components/common/input/Label';
import RefInput from 'components/common/input/RefInput';

interface PropsType {
  onToggleModal: () => void;
}

const initialSearchBook = {
  isOpenSearchBook: false,
  itemId: 1,
};

const VoteCreateModal = ({ onToggleModal }: PropsType) => {
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
  } = useCreateBookVoteBox({ onToggleModal });

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

  const onSelectBookBtnClick = (book: ISearchedBook) => {
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
    <Modal title="모임책 투표 생성하기" onToggleClick={onToggleModal}>
      {!searchBook.isOpenSearchBook && (
        <form
          onSubmit={onNewVoteSubmit}
          className="mb-8 grid grid-cols-2 gap-x-4 gap-y-8 max-sm:flex max-sm:flex-col"
        >
          <Label title="투표 제목">
            <Input
              type="text"
              placeholder="1월 과학책 투표"
              value={title}
              onChange={onVoteTitleChange}
              required
            />
          </Label>

          <Label title="투표 종료일">
            <DatePicker
              id="투표 종료일"
              selected={new Date(newVote.deadline)}
              onChange={onDateChange}
              selectsEnd
              endDate={new Date(newVote.deadline)}
              minDate={new Date()}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              className="h-12 w-full rounded-xl border border-gray2 p-2.5 pl-4 shadow-card outline-none"
            />
          </Label>

          <Label title="투표할 모임책">
            <ul className="mb-2 flex flex-wrap gap-4">
              {voteItems.map(voteItem => (
                <div
                  key={voteItem.id}
                  className="relative flex aspect-[0.7/1] h-44 flex-col items-center justify-between gap-1.5 rounded-xl border border-gray2 bg-white p-3 py-4 shadow-card [&>img]:h-3/4"
                >
                  {voteItem.id > 2 && (
                    <button
                      onClick={() => onDeleteVoteItemClick(voteItem.id)}
                      className="absolute -right-1.5 -top-1.5"
                    >
                      <FiMinusCircle className="rounded-full bg-white text-xl text-pointCoral" />
                    </button>
                  )}

                  {voteItem.book.title === '' ? (
                    <button
                      className="flex h-full items-center gap-1"
                      type="button"
                      onClick={() => toggleSearch(voteItem.id)}
                    >
                      <FiSearch className="text-sm text-gray1" />
                      <span className="text-sm text-gray1">책 등록하기</span>
                    </button>
                  ) : (
                    <>
                      <BookThumbnail
                        thumbnail={voteItem.book.thumbnail}
                        title={title}
                      />
                      <div className="flex h-10 items-center">
                        <span className="line-clamp-2 text-center text-sm">
                          《{voteItem.book.title}》
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {voteItems.length < 4 && (
                <button
                  type="button"
                  onClick={onAddVoteItemBtn}
                  className="flex aspect-[0.7/1] h-44 items-center justify-center rounded-xl border border-gray2 bg-white px-2 py-1.5 shadow-card"
                >
                  <FiPlus className="text-blue-500" />
                  <span className="text-sm text-blue-500">투표할 책 추가</span>
                </button>
              )}
            </ul>
          </Label>

          <SquareBtn
            type="submit"
            name="모임책 투표 등록"
            className="mt-10 self-end"
          />
        </form>
      )}

      {searchBook.isOpenSearchBook &&
        (!isOpenSelectReason ? (
          <Label title="책등록 1단계">
            <RefInput
              id="search-book"
              ref={searchInputRef}
              placeholder="투표할 책을 검색해주세요."
              onChange={onBookQueryChange}
            />
            <SearchedBookList
              searchList={searchList}
              onSelectBtnClick={onSelectBookBtnClick}
            />
          </Label>
        ) : (
          <Label title="책등록 2단계">
            <textarea
              id="select-reason"
              placeholder="이 책을 투표항목으로 선정한 이유에 대해서 작성해주세요."
              value={voteItems[searchBook.itemId - 1].selectReason}
              onChange={onSelectReasonChange}
              className="mb-4 h-40 w-full resize-none rounded-xl border p-3 outline-none"
            />
            <SquareBtn
              type="button"
              name="투표할 모임책 등록하기"
              handleClick={() => {
                toggleSelectReason();
                toggleSearch();
              }}
              className="mb-2 self-end"
            />
          </Label>
        ))}
    </Modal>
  );
};

export default VoteCreateModal;
