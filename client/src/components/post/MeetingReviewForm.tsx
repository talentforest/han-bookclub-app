import { useState } from 'react';

import useAddDoc from 'hooks/handleFbDoc/useAddDoc';
import useHandlePenalty from 'hooks/useHandlePenalty';
import useSendPushNotification from 'hooks/useSendPushNotification';

import { absenceListState } from 'data/absenceAtom';
import { thisMonthBookClubState } from 'data/bookClubAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { REVIEW } from 'appConstants';
import { getFbRouteOfPost, thisMonth } from 'utils';

import SquareBtn from 'components/common/button/SquareBtn';

interface PropsType {
  docMonth: string;
}

const MeetingReviewForm = ({ docMonth }: PropsType) => {
  const [text, setText] = useState('');
  const clubInfo = useRecoilValue(thisMonthBookClubState);
  const userData = useRecoilValue(currentUserState);
  const absenceList = useRecoilValue(absenceListState);

  const { sendPostNotification } = useSendPushNotification();

  const isOnceAbsenceThisMonth = absenceList.absenceMembers
    ?.find(item => item.month === +thisMonth)
    .onceAbsenceMembers //
    .includes(userData.uid);

  const collName = getFbRouteOfPost(docMonth, REVIEW);

  const {
    book: { title, thumbnail },
  } = clubInfo;

  const docData = {
    createdAt: Date.now(),
    creatorId: userData.uid,
    text,
    title,
    thumbnail,
  };

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

    if (docData.text !== '') {
      sendPostNotification('모임 후기');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-xl border bg-blue-50 p-4 shadow-card sm:p-2.5"
    >
      <textarea
        placeholder="모임 후기나 기록하고 싶은 이야기를 작성해주세요(한 문장도 좋아요!)."
        value={text}
        onChange={onChange}
        className="mb-1 min-h-40 w-full resize-none rounded-xl border bg-white p-2.5 outline-none"
      />
      <SquareBtn name="남기기" type="submit" className="ml-auto px-6" />
    </form>
  );
};

export default MeetingReviewForm;
