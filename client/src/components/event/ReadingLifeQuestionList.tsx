import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { ReadingLifeQuestion } from '@/types';

import Accordion from '@/components/common/container/Accordion';
import UserAnswer from '@/components/event/UserAnswer';

interface ReadingLifeQuestionListProps {
  year: string;
  questionList: ReadingLifeQuestion[];
}

export default function ReadingLifeQuestionList({
  year,
  questionList,
}: ReadingLifeQuestionListProps) {
  const currUser = useRecoilValue(currAuthUserAtom);

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
          titleClassName="text-green3"
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
                year={year}
              />
            ))}

            {!getHasAnswer(answerList) && (
              <UserAnswer
                question={question}
                answerType={answerType}
                year={year}
              />
            )}
          </ul>
        </Accordion>
      ))}
    </ul>
  );
}
