import { useRecoilValue } from 'recoil';

import { allUsersAtom } from '@/data/userAtom';

import { useHandleModal } from '@/hooks';

import { EventContent } from '@/types';

import Accordion from '@/components/common/container/Accordion';
import UserImgName from '@/components/common/user/UserImgName';
import ReadingLifeQuestionListModal from '@/components/event/ReadingLifeQuestionListModal';

interface ReadingLifeQuestionListProps {
  questionList: EventContent['result']['readingLifeQuestions'];
}

export default function ReadingLifeQuestionList({
  questionList,
}: ReadingLifeQuestionListProps) {
  const memberList = useRecoilValue(allUsersAtom);

  const { showModal } = useHandleModal();

  const openRereadingLifeQuestionListModal = () => {
    showModal({
      element: <ReadingLifeQuestionListModal />,
    });
  };

  const getAllAnwserList = (
    answerList: {
      userId: string;
      answer: string;
    }[],
  ) => {
    const notAnswerList = memberList
      .filter(user =>
        answerList.length !== 0
          ? answerList.find(({ userId }) => userId !== user.id)
          : true,
      )
      .map(user => ({ userId: user.id, answer: '' }))
      .sort((a, b) => (b.userId > a.userId ? -1 : 0));

    return [...answerList, ...notAnswerList];
  };

  return (
    <div className="flex flex-col gap-y-3">
      {questionList.map(({ question, answerList }) => (
        <Accordion
          key={question}
          title={question}
          className="!bg-transparent !text-white [&>div]:pl-0"
        >
          <ul key={question} className="mb-4 mt-2 grid grid-cols-1 gap-y-3">
            {getAllAnwserList(answerList).map(({ answer, userId }) => (
              <li key={userId} className="flex items-start">
                <UserImgName
                  userId={userId}
                  className="rounded-lg bg-[#eeedff] px-2 py-1 text-[15px] font-medium text-blue1"
                />
                <span
                  className={`ml-3 w-fit break-words font-medium tracking-tight ${!answer ? 'text-gray3' : 'text-blue1'}`}
                >
                  {answer || '정보 없음'}
                </span>
              </li>
            ))}
          </ul>
        </Accordion>
      ))}

      <button
        type="button"
        className="self-end text-[15px] text-purple4 underline"
        onClick={openRereadingLifeQuestionListModal}
      >
        질문들 수정하기
      </button>
    </div>
  );
}
