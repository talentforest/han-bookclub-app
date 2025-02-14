import { useEffect, useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useHandlePenalty from 'hooks/useHandlePenalty';

import { getDocument } from 'api/firebase/getFbDoc';

import { absenceAtom } from 'data/absenceAtom';
import { thisMonthClubAtom } from 'data/clubAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BOOKCLUB_THIS_YEAR, REVIEW } from 'appConstants';
import { BiCheckCircle } from 'react-icons/bi';
import { getFbRouteOfPost, thisMonth, thisYearMonthId } from 'utils';

import SquareBtn from 'components/common/button/SquareBtn';

interface PropsType {
  docMonth: string;
}

const MeetingReviewForm = ({ docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [clubInfo, setThisMonthClub] = useRecoilState(thisMonthClubAtom);
  const { uid } = useRecoilValue(currAuthUserAtom);
  const absenceList = useRecoilValue(absenceAtom);

  const isOnceAbsenceThisMonth = absenceList.absenceMembers
    ?.find(item => item.month === +thisMonth)
    .onceAbsenceMembers //
    .includes(uid);

  const collName = getFbRouteOfPost(docMonth, REVIEW);

  console.log(clubInfo);
  const docData = {
    createdAt: Date.now(),
    creatorId: uid,
    text,
    title: clubInfo?.book?.title,
    thumbnail: clubInfo?.book?.thumbnail,
    isAnonymous,
  };

  useEffect(() => {
    getDocument(BOOKCLUB_THIS_YEAR, thisYearMonthId, setThisMonthClub);
  }, []);

  const { isOverdueEndOfThisMonth, updatePenaltyMonth } = useHandlePenalty(
    docData.createdAt,
  );

  const { onAddDocSubmit, onChange } = useAddDoc({
    setText,
    collName,
    docData,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 일회 불참멤버이고, 이달 말까지의 기한이 넘은 경우
    if (isOnceAbsenceThisMonth && isOverdueEndOfThisMonth) {
      updatePenaltyMonth('불참 후기');
    }
    onAddDocSubmit(event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-xl border bg-green3 p-4 shadow-card max-sm:p-4"
    >
      <textarea
        placeholder="모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!)."
        value={text}
        onChange={onChange}
        className="mb-1 min-h-40 w-full resize-none rounded-xl border bg-white p-2.5 outline-none"
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
          className="ml-auto !px-5"
        />
      </div>
    </form>
  );
};

export default MeetingReviewForm;
