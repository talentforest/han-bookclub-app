import { useState } from 'react';

import useSendPushNotification from 'hooks/useSendPushNotification';

import { IBookClub, thisMonthClubAtom } from 'data/clubAtom';
import { useRecoilState } from 'recoil';

import useAlertAskJoin from './useAlertAskJoin';
import { BOOKCLUB_THIS_YEAR } from 'appConstants';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { formatDate, thisYearMonthId } from 'utils';

const useHandleSchedule = (
  meeting: IBookClub['meeting'],
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [thisMonthBookClub, setThisMonthBookClub] =
    useRecoilState(thisMonthClubAtom);

  const [time, setTime] = useState(
    !meeting?.time ? new Date() : new Date(meeting?.time),
  );
  const [place, setPlace] = useState(meeting?.place);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const document = doc(dbService, BOOKCLUB_THIS_YEAR, thisYearMonthId);

  const { sendPlaceTimePushNotification, isPending } =
    useSendPushNotification();

  const onTimeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.time === time.toLocaleString()) return setIsEditing(false);

    if (!time) return alert('모임 시간을 작성해주세요.');

    try {
      const editInfo = {
        meeting: {
          ...meeting,
          time: formatDate(time, "yyyy-MM-dd'T'HH:mm:ss"),
        },
      };
      await updateDoc(document, editInfo);
      await sendPlaceTimePushNotification({
        type: '모임 시간',
        data: time.toLocaleString().slice(0, -3),
      });
      setThisMonthBookClub({ ...thisMonthBookClub, ...editInfo });
    } catch (error) {
      window.alert('모임 시간 등록 중 오류가 발생했습니다.');
    } finally {
      setIsEditing(false);
    }
  };

  const onPlaceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.place === place) return setIsEditing(false);

    if (!place) return alert('모임 시간과 모임 장소 모두 작성해주세요.');

    try {
      const editInfo = {
        meeting: { ...meeting, place },
      };
      await updateDoc(document, editInfo);
      await sendPlaceTimePushNotification({ type: '모임 장소', data: place });
      setThisMonthBookClub({ ...thisMonthBookClub, ...editInfo });
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const onEditClick = () => {
    if (anonymous) return alertAskJoinMember();
    setIsEditing(prev => !prev);
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
    isPending,
  };
};

export default useHandleSchedule;
