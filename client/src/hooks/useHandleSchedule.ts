import { ISchedule, thisMonthBookClubState } from 'data/bookClubAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { thisYearMonthId } from 'util/index';
import { THIS_YEAR_BOOKCLUB } from 'constants/index';
import useAlertAskJoin from './useAlertAskJoin';
import useSendPushNotification from './useSendPushNotification';

const useHandleSchedule = (
  meeting: ISchedule,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [thisMonthBookClub, setThisMonthBookClub] = useRecoilState(
    thisMonthBookClubState
  );
  const [time, setTime] = useState(
    !meeting?.time ? new Date() : new Date(meeting?.time)
  );
  const [place, setPlace] = useState(meeting?.place);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const { sendPlaceTimePushNotification } = useSendPushNotification();

  const document = doc(dbService, THIS_YEAR_BOOKCLUB, thisYearMonthId);

  const onTimeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.time === time.toLocaleString()) {
      return setIsEditing(false);
    }

    if (!time) return alert('모임 시간을 작성해주세요.');

    try {
      const editInfo = {
        meeting: { ...meeting, time: time.toISOString() },
      };
      await updateDoc(document, editInfo);
      setThisMonthBookClub({ ...thisMonthBookClub, ...editInfo });
      setIsEditing(false);
      sendPlaceTimePushNotification({
        type: '모임 시간',
        data: time.toLocaleString().slice(0, -3),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.place === place) {
      return setIsEditing(false);
    }

    if (!place) return alert('모임 시간과 모임 장소 모두 작성해주세요.');

    try {
      const editInfo = {
        meeting: { ...meeting, place },
      };
      await updateDoc(document, editInfo);
      setThisMonthBookClub({ ...thisMonthBookClub, ...editInfo });
      setIsEditing(false);
      sendPlaceTimePushNotification({ type: '모임 장소', data: place });
    } catch (error) {
      console.log(error);
    }
  };

  const onEditClick = () => {
    if (anonymous) return alertAskJoinMember();
    setIsEditing((prev) => !prev);
  };

  const onTagClick = (place: string) => setPlace(place);

  return {
    onTimeSubmit,
    onPlaceSubmit,
    onEditClick,
    time,
    place,
    setTime,
    setPlace,
    onTagClick,
  };
};

export default useHandleSchedule;
