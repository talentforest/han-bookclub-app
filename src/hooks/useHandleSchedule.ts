import { ISchedule, thisMonthClubState } from 'data/documentsAtom';
import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { thisYearMonthId, THIS_YEAR_BOOKCLUB } from 'util/index';
import useAlertAskJoin from './useAlertAskJoin';

const useHandleSchedule = (meeting: ISchedule) => {
  const [thisMonthClub, setThisMonthClub] = useRecoilState(thisMonthClubState);
  const [time, setTime] = useState(
    meeting?.time === 0 ? null : new Date(meeting?.time)
  );
  const [place, setPlace] = useState(meeting?.place);
  const [isEditing, setIsEditing] = useState(false);

  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const document = doc(dbService, THIS_YEAR_BOOKCLUB, thisYearMonthId);

  const onTimeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!time) return alert('모임 시간을 작성해주세요.');

    const editInfo = {
      meeting: { ...meeting, time: time.getTime() },
    };
    await updateDoc(document, editInfo);
    setThisMonthClub({ ...thisMonthClub, ...editInfo });
    setIsEditing(false);
  };

  const onPlaceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!place) return alert('모임 시간과 모임 장소 모두 작성해주세요.');

    const editInfo = {
      meeting: { ...meeting, place },
    };
    await updateDoc(document, editInfo);
    setThisMonthClub({ ...thisMonthClub, ...editInfo });
    setIsEditing(false);
  };

  const onEditClick = () => {
    if (anonymous) return alertAskJoinMember();
    setIsEditing((prev) => !prev);
  };

  const onTagClick = (place: string) => setPlace(place);

  return {
    isEditing,
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
