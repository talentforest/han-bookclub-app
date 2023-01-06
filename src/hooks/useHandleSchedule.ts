import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { CLUB_INFO, thisYearMonth } from 'util/index';
import useAlertAskJoin from './useAlertAskJoin';

const useHandleSchedule = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { alertAskJoinMember, anonymous } = useAlertAskJoin('edit');

  const timeRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const document = doc(dbService, CLUB_INFO, `${thisYearMonth}`);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const time = timeRef.current.value;
    const place = placeRef.current.value;

    if (!time || !place) return;
    await updateDoc(document, {
      meeting: { place, time },
    });
    setIsEditing(false);
  };

  const onEditClick = () => {
    if (anonymous) return alertAskJoinMember();
    setIsEditing((prev) => !prev);
  };

  return {
    isEditing,
    onSubmit,
    onEditClick,
    timeRef,
    placeRef,
  };
};

export default useHandleSchedule;
