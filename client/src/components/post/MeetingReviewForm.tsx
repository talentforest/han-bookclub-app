import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { REVIEW } from '@/appConstants';
import SquareBtn from '@/components/common/button/SquareBtn';
import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';
import useAddDoc from '@/hooks/handleFbDoc/useAddDoc';
import useSendPushNotification from '@/hooks/useSendPushNotification';
import { formatDate, getFbRouteOfPost, thisYearMonthId } from '@/utils';
import { BiCheckCircle } from 'react-icons/bi';

interface PropsType {
  docMonth: string;
}

const MeetingReviewForm = ({ docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const { uid } = useRecoilValue(currAuthUserAtom);

  const collName = getFbRouteOfPost(docMonth, REVIEW);

  const docData = {
    createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    creatorId: uid,
    text,
    title: thisMonthClub?.book?.title,
    thumbnail: thisMonthClub?.book?.thumbnail,
    isAnonymous,
  };

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const { isPending, sendPostNotification } = useSendPushNotification();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (docData.text === '') return;

    try {
      await onAddDocSubmit(event);
      await sendPostNotification('모임 후기');
    } catch (error) {
      window.alert('추천 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-2xl bg-green3 p-4 shadow-card max-sm:p-4"
    >
      <div className="flex flex-col">
        <textarea
          placeholder="모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!)."
          value={text}
          onChange={onChange}
          className="mb-1 min-h-40 w-full resize-none rounded-xl bg-white p-2.5 outline-none"
        />
        <div className="flex items-end">
          <button
            type="button"
            className={`flex items-center ${isAnonymous ? 'text-blue1' : 'text-gray2'} py-1`}
            onClick={() => setIsAnonymous(prev => !prev)}
          >
            <BiCheckCircle />
            <span className="pl-1">익명으로 작성하기</span>
          </button>
          <SquareBtn
            name="남기기"
            type="submit"
            color="blue"
            className="ml-auto mt-2 !px-5 !py-2"
            disabled={isPending}
          />
        </div>
      </div>
    </form>
  );
};

export default MeetingReviewForm;
