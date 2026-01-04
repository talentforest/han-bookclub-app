import { useState } from 'react';

import { BiCheckCircle } from 'react-icons/bi';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { REVIEWS } from '@/appConstants';

import { useAddDoc, useSendPushNotification } from '@/hooks';

import { getFbRouteOfPost, thisYearMonthId } from '@/utils';

import { UserPost } from '@/types';

import SquareBtn from '@/components/common/button/SquareBtn';

interface MeetingReviewFormProps {
  docMonth: string;
}

const MeetingReviewForm = ({ docMonth }: MeetingReviewFormProps) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const {
    data: { book: clubBook },
  } = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const { uid } = useRecoilValue(currAuthUserAtom);

  const collName = getFbRouteOfPost(docMonth, REVIEWS);

  const initialDocData = {
    text: '',
    createdAt: '',
    creatorId: uid,
    clubBook: clubBook || null,
    isAnonymous,
  };

  const { onAddDocSubmit, onDataChange, newDocData } = useAddDoc<
    Partial<UserPost>
  >({ collName, initialDocData });

  const { isPending, sendPostPushNotification } = useSendPushNotification();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newDocData.text === '') return;

    try {
      await onAddDocSubmit(event);
      onDataChange({ text: '' });
      await sendPostPushNotification('모임 후기');
    } catch (error) {
      window.alert('모임 후기 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-2xl bg-purple4 p-4 shadow-card max-sm:p-4"
    >
      <div className="flex flex-col">
        <textarea
          placeholder="모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!)."
          value={newDocData.text}
          onChange={e => {
            onDataChange({ text: e.target.value });
          }}
          className="mb-1 min-h-40 w-full resize-none rounded-xl bg-white p-2.5 outline-none"
        />

        <div className="flex items-end">
          <button
            type="button"
            className={`flex items-center ${isAnonymous ? 'text-blue3' : 'text-gray2'} py-1`}
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
