import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { developmentMode, testerUid } from '@/appConstants';

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
  const { data: currUser } = useRecoilValue(currAuthUserAtom);

  const getHasAnswer = (answerList: ReadingLifeQuestion['answerList']) => {
    return answerList.find(({ userId }) => userId === currUser.uid);
  };

  const excludeTesterAnswer = (
    answerList: ReadingLifeQuestion['answerList'],
  ) => {
    return answerList.filter(answer => answer.userId !== testerUid);
  };

  const handledQuestionList = (questionList: ReadingLifeQuestion[]) => {
    return questionList.map(({ answerList, ...rest }) => {
      const handledAnswerList = developmentMode
        ? answerList
        : excludeTesterAnswer(answerList);

      return { ...rest, answerList: handledAnswerList };
    });
  };

  return (
    <ul className="flex flex-col gap-y-8">
      {handledQuestionList(questionList).map(
        ({ question, answerType, answerList }) => (
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
        ),
      )}
    </ul>
  );
}
