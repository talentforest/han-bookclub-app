import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useEditDoc, useGetClubByYear, useHandleModal } from '@/hooks';

import { thisYear } from '@/utils';

import { BaseBookData } from '@/types';

import Modal from '@/components/common/Modal';
import BookThumbnail from '@/components/common/book/BookThumbnail';

interface BestSubjectAndBookModalProps {
  rank: number;
  isEditing?: boolean;
}

export default function BestBookModal({
  rank,
  isEditing,
}: BestSubjectAndBookModalProps) {
  const { meeting } = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const { hideModal } = useHandleModal();

  const { clubBookListByYear } = useGetClubByYear();

  const { onEditSubmitClick } = useEditDoc({
    collName: `${BOOKCLUB_THIS_YEAR}`,
    docId: `${thisYear}-12`,
    dataToUpdate: { 'meeting.eventMonth.contents': [] },
  });

  const onBestBookClick = ({ clubBook }: { clubBook: BaseBookData }) => {
    try {
      const contentList = meeting?.eventMonth?.contents || [];

      const newData = { clubBook, rank };

      const newContents = contentList?.map(content => {
        if (!content.title.includes('최고의 모임책')) return content;

        const books = isEditing
          ? content?.result.books?.map(book =>
              book.rank === rank ? newData : book,
            )
          : content?.result?.books
            ? [...content?.result?.books, newData]
            : [newData];

        return { ...content, result: { ...content?.result, books } };
      });

      onEditSubmitClick({ 'meeting.eventMonth.contents': newContents });
      alert(
        `2025년 최고의 모임책 ${rank}위로 📚${clubBook.title} 모임책이 ${isEditing ? '변경' : '선정'}되었습니다.`,
      );
    } catch (error) {
      console.log(error);
    } finally {
      hideModal();
    }
  };

  return (
    <Modal
      title={`2025년 최고의 모임책 ${rank}위 ${isEditing ? '수정' : '선정'}하기`}
    >
      <ul className="grid grid-cols-4 gap-4">
        {clubBookListByYear.map(({ yearMonthId, ...clubBook }) => (
          <li key={yearMonthId}>
            <button type="button" onClick={() => onBestBookClick({ clubBook })}>
              <BookThumbnail
                thumbnail={clubBook.thumbnail}
                title={clubBook.title}
              />
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
