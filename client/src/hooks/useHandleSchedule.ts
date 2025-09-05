import { useEffect, useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { clubByMonthSelector, clubByYearAtom } from '@/data/clubAtom';

import { getDocument } from '@/api';

import { BOOKCLUB_THIS_YEAR, MEETING_PLACE, TAG_LIST } from '@/appConstants';

import { useHandleModal } from '@/hooks';

import { MonthlyBookClub } from '@/types';

interface SavedPlaceList {
  id: number;
  place: string[];
}

export const useHandleSchedule = (
  meeting: MonthlyBookClub['meeting'],
  yearMonthId: string,
) => {
  const [currMeeting, setCurrMeeting] = useState(meeting);

  const [savedPlaceList, setSavedPlaceList] = useState<SavedPlaceList>(null);

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(yearMonthId));

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const { hideModal } = useHandleModal();

  const onMeetingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { time, place } = currMeeting;

    if (meeting.time === time.toLocaleString() && meeting.place === place)
      return hideModal();

    if (!place) return alert('모임 장소가 작성되지 않았어요.');

    try {
      const document = doc(dbService, BOOKCLUB_THIS_YEAR, yearMonthId);
      const editInfo = { meeting: currMeeting };
      await updateDoc(document, editInfo);
      setThisYearClub(prev => {
        return prev.map(bookclub =>
          monthlyBookClub.id === yearMonthId
            ? { ...bookclub, ...editInfo }
            : bookclub,
        );
      });
    } catch (error) {
      window.alert(
        '모임 장소 등록 중 오류가 발생했습니다. 관리자에게 문의해주세요.',
      );
    } finally {
      hideModal();
    }
  };

  const onTagClick = (place: string) =>
    setCurrMeeting(prev => ({ ...prev, place }));

  useEffect(() => {
    if (savedPlaceList?.place?.length !== null) {
      getDocument(TAG_LIST, MEETING_PLACE, setSavedPlaceList);
    }
  }, []);

  return {
    currMeeting,
    setCurrMeeting,
    onMeetingSubmit,
    onTagClick,
    savedPlaceList,
  };
};
