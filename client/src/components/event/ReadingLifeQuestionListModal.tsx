import { useCallback, useRef } from 'react';

import { SwiperRef, SwiperSlide } from 'swiper/react';
import { v4 } from 'uuid';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { allUsersAtom } from '@/data/userAtom';

import { BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useEditDoc } from '@/hooks';

import { thisYear } from '@/utils';

import { EventContent, EventContentUpdateRoute } from '@/types';

import Modal from '@/components/common/Modal';
import SquareBtn from '@/components/common/button/SquareBtn';
import SwiperContainer from '@/components/common/container/SwiperContainer';
import Input from '@/components/common/input/Input';
import UserImgName from '@/components/common/user/UserImgName';

export default function ReadingLifeQuestionListModal() {
  const memberList = useRecoilValue(allUsersAtom);

  const { meeting } = useRecoilValue(clubByMonthSelector(`${thisYear}-12`));

  const { onEditSubmit, setEditedData, editedData } =
    useEditDoc<EventContentUpdateRoute>({
      collName: BOOKCLUB_THIS_YEAR,
      docId: `${thisYear}-12`,
      dataToUpdate: {
        'meeting.eventMonth.contents': meeting.eventMonth.contents,
      },
    });

  const currEventContentList = editedData['meeting.eventMonth.contents'];

  const currEventContent = currEventContentList.find(({ title }) =>
    title.includes('독서생활'),
  );

  // 데이터 변경
  const onCurrContentChange = async (
    newData: Partial<EventContent['result']['readingLifeQuestions'][number]>,
  ) => {
    const questionList = currEventContent?.result.readingLifeQuestions;
    const hasQuestionItem = questionList.find(({ id }) => id === newData.id);

    const updatedReadingLifeQuestionList = hasQuestionItem
      ? questionList.map(questionItem =>
          questionItem.id === newData.id
            ? { ...questionItem, ...newData }
            : questionItem,
        )
      : [
          ...questionList,
          { id: v4(), answerList: [], question: '', ...newData },
        ];

    const updatedCurrContent = {
      ...currEventContent,
      result: { readingLifeQuestions: updatedReadingLifeQuestionList },
    };

    const newContents = currEventContentList.map(currContent =>
      currContent.id === currEventContent.id
        ? { ...currContent, ...updatedCurrContent }
        : currContent,
    );

    setEditedData({ 'meeting.eventMonth.contents': newContents });
  };

  const getAllAnwserList = useCallback(
    (
      answerList: {
        userId: string;
        answer: string;
      }[],
    ) => {
      const notAnswerList = memberList
        .filter(user => {
          return !answerList.find(({ userId }) => userId === user.id);
        })
        .map(user => ({ userId: user.id, answer: '' }));

      return [...answerList, ...notAnswerList].sort((a, b) =>
        b.userId > a.userId ? -1 : 0,
      );
    },
    [],
  );

  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <Modal title="독서생활을 돌아보는 질문">
      <form className="overflow-scroll scrollbar-hide" onSubmit={onEditSubmit}>
        <SwiperContainer
          ref={swiperRef}
          options={{
            slidesPerView: 1,
            spaceBetween: 16,
            autoplay: false,
            scrollbar: false,
            navigation: false,
            pagination: {
              clickable: true,
              type: 'custom',
              renderCustom: (_, current, total) => {
                return `<span class="font-medium text-gray1">${current} / ${total}</span>`;
              },
            },
          }}
        >
          {currEventContent.result.readingLifeQuestions.map(
            ({ question, answerList, id }, index) => (
              <SwiperSlide
                key={id}
                className="relative mb-0 flex flex-col items-start !p-0"
              >
                {/* 질문 */}
                <Input
                  value={question}
                  onChange={e =>
                    onCurrContentChange({
                      question: e.target.value,
                      id,
                      answerList,
                    })
                  }
                  label={`질문 ${index + 1}`}
                  placeholder="독서 생활을 돌아보는 질문을 작성해주세요"
                />
                {/* 답변 */}
                <h2 className="mb-1 ml-1 mt-4 self-start text-sm">답변들</h2>
                <ul className="flex w-full flex-col gap-y-2">
                  {getAllAnwserList(answerList).map(({ userId, answer }) => (
                    <li
                      key={userId}
                      className="relative flex w-full items-center"
                    >
                      <UserImgName
                        userId={userId}
                        className="absolute left-2 top-[9px] z-10 flex !h-fit items-center rounded-lg bg-blue4 px-2 py-1 text-[15px]"
                      />
                      <Input
                        value={answer || ''}
                        className="pl-[80px] font-medium text-blue2"
                        onChange={e => {
                          const hasItem = answerList.find(
                            a => a.userId === userId,
                          );
                          const item = !hasItem
                            ? [
                                ...answerList,
                                {
                                  userId,
                                  answer: e.target.value,
                                },
                              ]
                            : answerList.map(answerItem => {
                                return answerItem.userId === userId
                                  ? { ...answerItem, answer: e.target.value }
                                  : answerItem;
                              });
                          onCurrContentChange({
                            question,
                            id,
                            answerList: item,
                          });
                        }}
                        placeholder="답변을 작성해주세요"
                      />
                    </li>
                  ))}
                </ul>

                {currEventContent.result.readingLifeQuestions[
                  currEventContent.result.readingLifeQuestions.length - 1
                ].id === id && (
                  <button
                    type="button"
                    className="absolute -bottom-[42px] right-0 text-purple1 underline"
                    onClick={async () => {
                      await onCurrContentChange({
                        id: v4(),
                        answerList: [],
                        question: '',
                      });
                      swiperRef.current.swiper.slideNext();
                    }}
                  >
                    질문 추가하기+
                  </button>
                )}
              </SwiperSlide>
            ),
          )}
        </SwiperContainer>

        <SquareBtn
          type="submit"
          name="변경하기"
          className="ml-auto mt-4"
          size="md"
        />
      </form>
    </Modal>
  );
}
