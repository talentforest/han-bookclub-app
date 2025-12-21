import { useEffect, useRef, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';

import { getCollection } from '@/api';

import { BOOKCLUB_THIS_YEAR, SUBJECTS } from '@/appConstants';

import { useEditDoc, useGetClubByYear, useHandleModal } from '@/hooks';

import { getFbRouteOfPost, thisYear } from '@/utils';

import {
  BaseBookData,
  EventContent,
  EventContentUpdateRoute,
  UserPost,
} from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import GuideLine from '@/components/common/GuideLine';
import Modal from '@/components/common/Modal';
import BookThumbnail from '@/components/common/book/BookThumbnail';
import SquareBtn from '@/components/common/button/SquareBtn';
import EditorContent from '@/components/common/editor/EditorContent';
import Input from '@/components/common/input/Input';

interface BestSubjectModalProps {
  rank: number;
  isEditing?: boolean;
}

export default function BestSubjectModal({
  rank,
  isEditing,
}: BestSubjectModalProps) {
  const [currStep, setCurrStep] = useState(1);

  const [subjectList, setSubjectList] = useState<UserPost[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  const { meeting } = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const { hideModal } = useHandleModal();

  const { clubBookListByYear } = useGetClubByYear();

  const { editedData, setEditedData, onEditSubmitClick } =
    useEditDoc<EventContentUpdateRoute>({
      collName: `${BOOKCLUB_THIS_YEAR}`,
      docId: `${thisYear}-12`,
      dataToUpdate: { 'meeting.eventMonth.contents': [] },
    });

  const currBook = editedData['meeting.eventMonth.contents']
    .find(content => content.title.includes('최고의 모임책'))
    ?.result.subjects.find(subject => subject.rank === rank);

  console.log(currBook);

  const onBestSubjectStep = ({
    step,
    clubBook,
    yearMonthId,
  }: {
    step: number;
    clubBook: BaseBookData;
    yearMonthId: string;
  }) => {
    setCurrStep(step);

    const newData: EventContent['result']['subjects'][number] = {
      yearMonthId,
      clubBook,
      rank,
      bestSubject: '',
    };

    const newContents = meeting?.eventMonth?.contents.map(content => {
      if (!content.title.includes('최고의 모임책과 발제문')) return content;
      return {
        ...content,
        result: {
          ...content.result,
          subjects: isEditing
            ? content.result.subjects.map(subject => {
                return subject.rank !== rank ? subject : newData;
              })
            : [...content.result.subjects, newData],
        },
      };
    });

    setEditedData({ 'meeting.eventMonth.contents': newContents });
  };

  const onBestSubjectSubmit = () => {
    const bestSubject =
      subjectList[0].text
        .split('📍')
        .find(subject => subject.includes(ref?.current?.value)) || '';

    const newContents = editedData['meeting.eventMonth.contents'].map(
      content => {
        if (!content.title.includes('최고의 모임책과 발제문')) return content;

        return {
          ...content,
          result: {
            ...content.result,
            subjects: content.result.subjects.map(subject => {
              if (subject.rank !== rank) return subject;
              console.log('subject', subject);
              return { ...subject, bestSubject };
            }),
          },
        };
      },
    );

    console.log(
      newContents.find(content => content.title.includes('발제문')).result
        .subjects,
    );

    onEditSubmitClick({ 'meeting.eventMonth.contents': newContents });

    hideModal();
  };

  useEffect(() => {
    if (currBook) {
      getCollection(
        getFbRouteOfPost(currBook.yearMonthId, SUBJECTS),
        setSubjectList,
      );
    }
  }, [currBook]);

  return (
    <Modal
      title={`2025년 최고의 발제문 ${rank}위 ${isEditing ? '변경' : '선정'}하기`}
    >
      {currStep === 1 && (
        <>
          <GuideLine text="먼저 책을 선택해주세요." />

          <ul className="grid grid-cols-4 gap-4">
            {clubBookListByYear.map(({ yearMonthId, ...clubBook }) => (
              <li key={yearMonthId}>
                <button
                  type="button"
                  onClick={() =>
                    onBestSubjectStep({ step: 2, clubBook, yearMonthId })
                  }
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

      {currStep === 2 && (
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
            {currBook?.clubBook && <FooterBookCard book={currBook?.clubBook} />}
            <SquareBtn
              name="선택하기"
              color="purple"
              handleClick={() => onBestSubjectSubmit()}
              type="submit"
            />
          </div>
        </>
      )}
    </Modal>
  );
}
