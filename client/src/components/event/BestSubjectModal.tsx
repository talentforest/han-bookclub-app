import { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { BOOKCLUB_THIS_YEAR, SUBJECTS } from '@/appConstants';

import { useEditDoc, useGetClubByYear } from '@/hooks';

import { getFbRouteOfPost, thisYear } from '@/utils';

import { BaseBookData, BookData, EventContent, UserPost } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import GuideLine from '@/components/common/GuideLine';
import Modal from '@/components/common/Modal';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import EditorContent from '@/components/common/editor/EditorContent';
import Input from '@/components/common/input/Input';

type SelectClubBook = {
  step: number;
  clubBook?: BookData & { yearMonthId: string };
};

export default function BestSubjectModal() {
  const { meeting } = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const ref = useRef<HTMLInputElement>(null);

  const [currStep, setCurrStep] = useState<SelectClubBook>({ step: 1 });
  const [subjectList, setSubjectList] = useState<UserPost[]>([]);

  const { clubBookListByYear } = useGetClubByYear();

  const { editedData, setEditedData, onEditClick } = useEditDoc({
    collName: `${BOOKCLUB_THIS_YEAR}`,
    docId: `${thisYear}-12`,
    dataToUpdate: { 'meeting.eventMonth.contents': [] },
  });

  console.log(editedData);

  const onChangeData = (
    newSubject: EventContent['result']['subjects'][number],
  ) => {
    const initialContents = meeting?.eventMonth?.contents;

    const newContents = initialContents.map(content => {
      return content.title.includes('최우수 발제문')
        ? {
            ...content,
            result: {
              subjects: [...content.result.subjects, { ...newSubject }],
            },
          }
        : content;
    });

    setEditedData({ 'meeting.eventMonth.contents': newContents });
  };

  const handleStep = ({ step, clubBook }: SelectClubBook) => {
    setCurrStep({ step, clubBook });

    const { title, thumbnail, authors, url, publisher, yearMonthId } = clubBook;

    onChangeData({
      subject: '',
      yearMonthId,
      clubBook: { title, thumbnail, authors, url, publisher },
      rank: 1,
    });
  };

  useEffect(() => {
    if (currStep?.clubBook) {
      getCollection(
        getFbRouteOfPost(currStep.clubBook.yearMonthId, SUBJECTS),
        setSubjectList,
      );
    }
  }, [currStep?.clubBook?.yearMonthId]);

  const onSubmit = () => {
    editedData;
    console.log(ref?.current?.value);
  };

  return (
    <Modal title="최우수 발제문 선택하기">
      {currStep.step === 1 && (
        <>
          <GuideLine text="먼저 책을 선택해주세요." />
          <ul className="grid grid-cols-4 gap-4">
            {clubBookListByYear.map(clubBook => (
              <li key={clubBook.title}>
                <button
                  type="button"
                  onClick={() => handleStep({ step: 2, clubBook })}
                >
                  <BookThumbnail
                    thumbnail={clubBook.thumbnail}
                    title={clubBook.title}
                  />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {currStep.step === 2 && (
        <>
          <Input
            ref={ref}
            iconName="FiHash"
            placeholder="이중 몇번 발제가 가장 좋았나요?"
            className="mb-3"
          />
          <div className="mb-4 overflow-scroll rounded-xl border border-gray3 bg-[#f5f5f5] p-3 scrollbar-hide">
            {subjectList.map(subject => (
              <EditorContent key={subject.id} text={subject.text} />
            ))}
          </div>
          <div className="flex items-center">
            <FooterBookCard book={currStep.clubBook} />
            <SquareBtn
              name="선택하기"
              color="purple"
              handleClick={onSubmit}
              type="submit"
            />
          </div>
        </>
      )}
    </Modal>
  );
}
