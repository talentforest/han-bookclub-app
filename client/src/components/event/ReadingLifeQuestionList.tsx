import { BiSearch } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useHandleModal } from '@/hooks';

import { ReadingLifeQuestion } from '@/types';

import Accordion from '@/components/common/container/Accordion';
import UserImgName from '@/components/common/user/UserImgName';
import ReadingLifeQuestionModal from '@/components/event/ReadingLifeQuestionModal';
import UserAnswer from '@/components/event/UserAnswer';

interface ReadingLifeQuestionListProps {
  questionList: ReadingLifeQuestion[];
}

export default function ReadingLifeQuestionList({
  questionList,
}: ReadingLifeQuestionListProps) {
  const currUser = useRecoilValue(currAuthUserAtom);

  const { showModal } = useHandleModal();

  const openRereadingLifeQuestionListModal = (
    questionTitle: string,
    answerType: ReadingLifeQuestion['answerType'],
  ) => {
    showModal({
      element: (
        <ReadingLifeQuestionModal
          questionTitle={questionTitle}
          answerType={answerType}
        />
      ),
    });
  };

  const getHasAnswer = (answerList: ReadingLifeQuestion['answerList']) => {
    return answerList.find(({ userId }) => userId === currUser.uid);
  };

  return (
    <ul className="flex flex-col gap-y-8">
      {questionList.map(({ question, answerType, answerList }) => (
        <Accordion
          key={question}
          title={question}
          initialOpen={true}
          titleClassName="text-purple3"
          className="!bg-transparent !text-white [&>div:first-child]:!pb-0 [&>div]:px-0"
        >
          <ul
            key={question}
            className={`mt-2 ${answerType === 'sentence' ? 'flex flex-wrap gap-3' : 'grid grid-cols-3 gap-3'}`}
          >
            {answerList.map(userAnswer => (
              <UserAnswer
                key={userAnswer.userId}
                question={question}
                answerType={answerType}
                userAnswer={userAnswer}
              />
            ))}

            {/* 나의 답변이 없을 때 */}
            {!getHasAnswer(answerList) && (
              <li className="col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    openRereadingLifeQuestionListModal(question, answerType)
                  }
                  className="flex flex-col items-center justify-center rounded-xl border p-4"
                >
                  <UserImgName
                    userId={currUser.uid}
                    isLink={false}
                    className="w-fit min-w-fit rounded-lg pb-2 font-medium text-purple3"
                  />

                  {question.includes('책') ? (
                    <BiSearch className="size-5 text-gray2" />
                  ) : (
                    <FiPlusCircle className="size-5 text-gray2" />
                  )}
                </button>
              </li>
            )}
          </ul>
        </Accordion>
      ))}
    </ul>
  );
}
