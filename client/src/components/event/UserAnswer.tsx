import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useHandleModal } from '@/hooks';

import { ReadingLifeQuestion } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import EditBtn from '@/components/common/button/EditBtn';
import UserImgName from '@/components/common/user/UserImgName';
import ReadingLifeQuestionModal from '@/components/event/ReadingLifeQuestionModal';

interface UserAnswerProps {
  question: ReadingLifeQuestion['question'];
  answerType: ReadingLifeQuestion['answerType'];
  userAnswer: ReadingLifeQuestion['answerList'][number];
}

export default function UserAnswer({
  question,
  answerType,
  userAnswer,
}: UserAnswerProps) {
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

  const { userId, book, answer } = userAnswer;

  return (
    <li className="bg-darkGray flex flex-col gap-y-2 rounded-xl p-3">
      <div className="flex w-full items-center justify-between gap-x-1">
        <UserImgName
          isLink={false}
          userId={userId}
          size="sm"
          className="w-fit min-w-fit font-medium"
        />
        {userId === currUser.uid && (
          <EditBtn
            className="!size-[22px] text-gray2"
            onClick={() =>
              openRereadingLifeQuestionListModal(question, answerType)
            }
          />
        )}
      </div>

      {answerType === 'sentence' && (
        <span
          className={`w-fit break-words font-medium tracking-tight text-purple3`}
        >
          {answer}
        </span>
      )}

      {answerType === 'book' && (
        <BookThumbnail
          title={book.title}
          thumbnail={book.thumbnail}
          className="mx-auto mb-1 w-[90%] [&>img]:!shadow-sm [&>img]:!shadow-gray1"
        />
      )}
    </li>
  );
}
