import { useEffect, useState } from 'react';

import { dbService } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { clubByMonthSelector, clubByYearAtom } from '@/data/clubAtom';

import { getDocument, setDocument } from '@/api';

import { MEETING_PLACE, TAG_LIST } from '@/appConstants';

import { useHandleModal, useSendPushNotification } from '@/hooks';

import { formatDate } from '@/utils';

import { MonthlyBookClub } from '@/types';

interface SavedPlaceList {
  id: number;
  place: string[];
}

export type ErrorMsg = { [key in string]: { type: string; error: string } };

export const useHandleSchedule = (
  meeting: MonthlyBookClub['meeting'],
  yearMonthId: string,
) => {
  const [currMeeting, setCurrMeeting] = useState(meeting);

  const [savedPlaceList, setSavedPlaceList] = useState<SavedPlaceList>(null);

  const monthlyBookClub = useRecoilValue(clubByMonthSelector(yearMonthId));

  const setThisYearClub = useSetRecoilState(clubByYearAtom);

  const { hideModal } = useHandleModal();

  const { sendPushNotificationToAllUser } = useSendPushNotification();

  const monthNum = +yearMonthId.slice(-2);
  const collName = `BookClub-${yearMonthId.slice(0, 4)}`;

  const onMeetingEdit = async (
    editedValue: Pick<MonthlyBookClub, 'meeting'>,
  ) => {
    const document = doc(dbService, collName, yearMonthId);

    const {
      meeting: { time, place },
    } = editedValue;

    if (meeting.time === time.toLocaleString() && meeting.place === place)
      return hideModal();

    await updateDoc(document, editedValue);

    setThisYearClub(prev => {
      return prev.map(bookclub =>
        monthlyBookClub.id === yearMonthId
          ? { ...bookclub, ...editedValue }
          : bookclub,
      );
    });

    alert(`${monthNum}월 독서모임 정보가 변경되었습니다!`);

    await sendPushNotificationToAllUser({
      title: `☕️${monthNum}월 독서모임 변경 안내`,
      body: `${monthNum}월 모임정보가 바뀌었어요! 🕓${formatDate(time, 'M월 d일 EEEE a h시 mm분')}에 ${place}에서 만나요 👋`,
    });
  };

  const onNewBookClubSubmit = async (submittedValue: MonthlyBookClub) => {
    await setDocument(collName, yearMonthId, submittedValue);

    alert(`${monthNum}월 독서모임 정보가 등록되었습니다!`);

    // await sendPushNotificationToAllUser({
    //   title: `☕️${monthNum}월 독서모임 등록 안내`,
    //   body: `${monthNum}월 모임책은 《${submittedValue.book.title}》입니다. 🕓${formatDate(submittedValue.meeting.time, 'M월 d일 EEEE a h시 mm분')}에 ${submittedValue.meeting.place}에서 만나요👋`,
    // });
  };

  const onMeetingChange = (value: Partial<MonthlyBookClub['meeting']>) => {
    setCurrMeeting(prev => ({ ...prev, ...value }));
  };

  useEffect(() => {
    if (savedPlaceList?.place?.length !== null) {
      getDocument(TAG_LIST, MEETING_PLACE, setSavedPlaceList);
    }
  }, []);

  return {
    savedPlaceList,
    currMeeting,
    onMeetingChange,
    onMeetingEdit,
    onNewBookClubSubmit,
  };
};
