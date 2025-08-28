import { useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { clubByMonthSelector, clubByYearAtom } from '@/data/clubAtom';

import { BOOKCLUB_THIS_YEAR } from '@/appConstants';

import { useHandleModal, useSendPushNotification } from '@/hooks';

import { formatDate, thisYearMonthId } from '@/utils';

import { MonthlyBookClub } from '@/types';

export const useHandleSchedule = (meeting: MonthlyBookClub['meeting']) => {
  const [time, setTime] = useState(
    !meeting?.time ? new Date() : new Date(meeting?.time),
  );
  const [place, setPlace] = useState(meeting?.place);

  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const document = doc(dbService, BOOKCLUB_THIS_YEAR, thisYearMonthId);

  const { sendPlaceTimePushNotification, isPending } =
    useSendPushNotification();

  const { hideModal } = useHandleModal();

  const onTimeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.time === time.toLocaleString()) return hideModal();
    if (!time) return alert('모임 시간을 작성해주세요.');

    try {
      const updatedTime = formatDate(time, "yyyy-MM-dd'T'HH:mm:ss");
      const editInfo = { meeting: { ...meeting, time: updatedTime } };

      await updateDoc(document, editInfo);

      setThisYearClub(prev => {
        return prev.map(bookclub =>
          thisMonthClub.id === thisYearMonthId
            ? { ...bookclub, ...editInfo }
            : bookclub,
        );
      });

      await sendPlaceTimePushNotification({
        type: '모임 시간',
        data: time.toLocaleString().slice(0, -3),
      });
    } catch (error) {
      window.alert(
        '모임 시간 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
    } finally {
      hideModal();
    }
  };

  const onPlaceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (meeting.place === place) return hideModal();
    if (!place) return alert('모임 시간과 모임 장소 모두 작성해주세요.');

    try {
      const editInfo = { meeting: { ...meeting, place } };
      await updateDoc(document, editInfo);

      setThisYearClub(prev => {
        return prev.map(bookclub =>
          thisMonthClub.id === thisYearMonthId
            ? { ...bookclub, ...editInfo }
            : bookclub,
        );
      });

      await sendPlaceTimePushNotification({ type: '모임 장소', data: place });
    } catch (error) {
      window.alert(
        '모임 장소 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
    } finally {
      hideModal();
    }
  };

  const onTagClick = (place: string) => setPlace(place);

  return {
    time: {
      time,
      setTime,
      onTimeSubmit,
    },
    place: {
      place,
      setPlace,
      onPlaceSubmit,
      onTagClick,
    },
    isPending,
  };
};
