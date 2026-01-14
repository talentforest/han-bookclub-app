import { useEffect, useRef } from 'react';

import { FiTrash2 } from 'react-icons/fi';
import { v4 } from 'uuid';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { useEditDoc, useHandleErrorMsg, useSearchBook } from '@/hooks';

import { EventContentUpdateRoute, ReadingLifeQuestion } from '@/types';

import FooterBookCard from '@/components/bookCard/FooterBookCard';
import ExternalLinkBtn from '@/components/common/ExternalLinkBtn';
import Modal from '@/components/common/Modal';
import Textarea from '@/components/common/Textarea';
import SquareBtn from '@/components/common/button/SquareBtn';
import EditorContent from '@/components/common/editor/EditorContent';
import Input from '@/components/common/input/Input';
import Label from '@/components/common/input/Label';
import SearchedBookList from '@/components/search/SearchedBookList';

interface ReadingLifeQuestionModalProps {
  year: string;
  questionTitle: string;
  answerType: ReadingLifeQuestion['answerType'];
  userAnswer?: ReadingLifeQuestion['answerList'][number];
}

export default function ReadingLifeQuestionModal({
  year,
  questionTitle,
  answerType,
  userAnswer,
}: ReadingLifeQuestionModalProps) {
  const { data: currUser } = useRecoilValue(currAuthUserAtom);

  const { data: club } = useRecoilValue(clubByMonthSelector(`${year}-12`));

  const { onEditSubmit, setEditedData, editedData } =
    useEditDoc<EventContentUpdateRoute>({
      collName: `BookClub-${year}`,
      docId: `${year}-12`,
      dataToUpdate: {
        'meeting.eventMonth.contents': club?.meeting?.eventMonth?.contents,
      },
    });

  const currEventContentList = editedData['meeting.eventMonth.contents'];

  const currEventContent = currEventContentList?.find(({ title }) =>
    title.includes('독서생활'),
  );

  const currQuestion = currEventContent?.result?.readingLifeQuestions?.find(
    ({ question }) => question === questionTitle,
  );

  const currMyAnswer = currQuestion?.answerList?.find(
    ({ userId }) => userId === currUser.uid,
  );

  // 데이터 변경
  const onCurrContentChange = async (newData: Partial<ReadingLifeQuestion>) => {
    const questionList = currEventContent?.result.readingLifeQuestions;
    const hasQuestionItem = questionList.find(({ id }) => id === newData.id);

    const initialQuestionItem: ReadingLifeQuestion = {
      id: v4(),
      answerType: 'sentence',
      question: '',
      answerList: [],
    };

    const updatedReadingLifeQuestionList = !hasQuestionItem
      ? [...questionList, { ...initialQuestionItem, ...newData }]
      : questionList.map(questionItem =>
          questionItem.id === newData.id
            ? { ...questionItem, ...newData }
            : questionItem,
        );

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

  const { onBookQueryChange, searchList } = useSearchBook();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { handleErrorMsg, errorMsg } = useHandleErrorMsg();

  const errorMsgObj = {
    book: [
      {
        condition: currQuestion?.answerType === 'book' && !currMyAnswer?.book,
        error: '책을 선택해주세요.',
      },
    ],
    answer: [
      {
        condition:
          currQuestion?.answerType === 'sentence' && !currMyAnswer?.answer,
        error: '답변을 작성해주세요.',
      },
    ],
  };

  return (
    <Modal title="독서생활을 돌아보는 질문">
      {userAnswer && (
        <div className="flex flex-col gap-y-3">
          <FooterBookCard book={userAnswer.book}>
            <ExternalLinkBtn
              url={userAnswer.book.url}
              className="mt-auto text-purple2"
            />
          </FooterBookCard>

          {userAnswer.answer && (
            <div>
              <Label
                text="책을 고른 이유"
                htmlFor="책을 고른 이유"
                className="!ml-0 !pl-0 text-purple2"
              />
              <EditorContent text={userAnswer.answer} />
            </div>
          )}
        </div>
      )}

      {!userAnswer && (
        <form
          className="flex flex-col overflow-scroll scrollbar-hide"
          onSubmit={e => {
            e.preventDefault();
            const hasError = handleErrorMsg(errorMsgObj);
            if (hasError) return;

            onEditSubmit(e);
          }}
        >
          <h3 className="mb-2 tracking-tight">{currQuestion.question}</h3>
          <div className="relative overflow-scroll rounded-xl border border-gray1 bg-purple4 px-3 pb-5 pt-3 scrollbar-hide">
            {answerType === 'book' && (
              <>
                {currMyAnswer?.book ? (
                  <div className="mb-4">
                    <Label
                      htmlFor="내가 고른 책"
                      text="내가 고른 책"
                      className="text-purple1"
                    />
                    <div className="flex items-center justify-between rounded-xl border border-purple2 bg-white px-3 py-2">
                      <FooterBookCard book={currMyAnswer.book} />
                      <button
                        type="button"
                        onClick={() => {
                          const answerList = currQuestion.answerList.map(
                            answerItem => {
                              return answerItem.userId === currUser.uid
                                ? {
                                    userId: answerItem.userId,
                                    answer: answerItem.answer,
                                  }
                                : answerItem;
                            },
                          );

                          onCurrContentChange({ ...currQuestion, answerList });
                        }}
                      >
                        <FiTrash2 className="size-5 text-gray1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Input
                      label="책 검색하기"
                      ref={inputRef}
                      placeholder="등록하실 책을 검색해주세요."
                      onChange={onBookQueryChange}
                      errorMsg={errorMsg.book}
                    />
                    <SearchedBookList
                      className="!mt-2 mb-4 h-[20vh] rounded-xl bg-white px-4"
                      searchList={searchList}
                      onSelectBtnClick={book => {
                        const hasMyAnswer = currQuestion.answerList.find(
                          ({ userId }) => userId === currUser.uid,
                        );

                        const myNewAnswer = {
                          userId: currUser.uid,
                          book,
                          answer: '',
                        };

                        const answerList = !hasMyAnswer
                          ? [...currQuestion.answerList, myNewAnswer]
                          : currQuestion.answerList.map(answerItem => {
                              return answerItem.userId === currUser.uid
                                ? { ...answerItem, book }
                                : answerItem;
                            });

                        onCurrContentChange({ ...currQuestion, answerList });
                      }}
                    />
                  </>
                )}
              </>
            )}

            <Textarea
              className="font-medium"
              errorMsg={errorMsg.answer}
              label={
                answerType === 'sentence'
                  ? '나의 답변'
                  : '책을 고른 이유 (선택작성)'
              }
              value={currMyAnswer?.answer || ''}
              onChange={e => {
                const hasMyAnswer = currQuestion.answerList.find(
                  ({ userId }) => userId === currUser.uid,
                );

                const myNewAnswer = {
                  userId: currUser.uid,
                  answer: e.target.value,
                };

                const answerList = !hasMyAnswer
                  ? [...currQuestion.answerList, myNewAnswer]
                  : currQuestion.answerList.map(answerItem => {
                      return answerItem.userId === currUser.uid
                        ? { ...answerItem, answer: e.target.value }
                        : answerItem;
                    });

                onCurrContentChange({ ...currQuestion, answerList });
              }}
              placeholder="답변을 작성해주세요"
            />
          </div>

          <SquareBtn
            type="submit"
            name="변경하기"
            className="ml-auto mt-4"
            size="md"
          />
        </form>
      )}
    </Modal>
  );
}
