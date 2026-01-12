import { BiSearch } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { useHandleModal } from '@/hooks';

import { ReadingLifeQuestion } from '@/types';

import BookThumbnail from '@/components/common/book/BookThumbnail';
import UserImgName from '@/components/common/user/UserImgName';
import ReadingLifeQuestionModal from '@/components/event/ReadingLifeQuestionModal';

interface UserAnswerProps {
  question: ReadingLifeQuestion['question'];
  answerType: ReadingLifeQuestion['answerType'];
  userAnswer?: ReadingLifeQuestion['answerList'][number];
  year: string;
}

export default function UserAnswer({
  question,
  answerType,
  userAnswer,
  year,
}: UserAnswerProps) {
  const { data: currUser } = useRecoilValue(currAuthUserAtom);

  const { showModal } = useHandleModal();

  const toggleModal = (
    questionTitle: string,
    answerType: ReadingLifeQuestion['answerType'],
  ) => {
    showModal({
      element: (
        <ReadingLifeQuestionModal
          questionTitle={questionTitle}
          answerType={answerType}
          year={year}
          userAnswer={userAnswer}
        />
      ),
    });
  };

  const { userId, book, answer } = userAnswer || {};

  return (
    <>
      {userAnswer ? (
        <li>
          <button
            type="button"
            className="flex flex-col gap-y-2 rounded-xl bg-darkGray p-2.5"
            onClick={() => toggleModal(question, answerType)}
          >
            <UserImgName
              isLink={false}
              userId={userId}
              size="sm"
              className="line-clamp-1 w-fit font-medium"
            />

            {answerType === 'sentence' && (
              <span
                className={`w-fit break-words font-medium tracking-tight text-purple3`}
              >
                {answer}
              </span>
            )}

            {answerType === 'book' && book && (
              <BookThumbnail
                title={book.title}
                thumbnail={book.thumbnail}
                className="mx-auto mb-1 w-[90%] [&>img]:!shadow-sm [&>img]:!shadow-gray1"
              />
            )}
          </button>
        </li>
      ) : (
        <li className="col-span-2">
          <button
            type="button"
            onClick={() => toggleModal(question, answerType)}
            className="flex flex-col items-center justify-center rounded-xl border border-gray1 p-3"
          >
            <UserImgName
              userId={currUser.uid}
              isLink={false}
              size="sm"
              className="pb-2 font-medium"
            />

            {question.includes('책') ? (
              <BiSearch className="size-5 text-gray2" />
            ) : (
              <FiPlusCircle className="size-5 text-gray2" />
            )}
          </button>
        </li>
      )}
    </>
  );
}
