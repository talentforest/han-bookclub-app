import { useNavigate } from 'react-router-dom';

import { LuBook, LuPartyPopper } from 'react-icons/lu';
import { v4 } from 'uuid';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { nextMonthFieldAndHostSelector } from '@/data/fieldAndHostAtom';

import { useHandleModal } from '@/hooks';

import {
  formatDate,
  getThirdSunday,
  nextMonth,
  nextYear,
  nextYearMonthId,
  thisYear,
} from '@/utils';

import { MonthlyBookClub } from '@/types';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import MonthEventCard from '@/components/bookCard/MonthEventCard';
import EventMeetingModal from '@/components/bookClub/EventMeetingModal';
import SquareBtn from '@/components/common/button/SquareBtn';
import EmptyCard from '@/components/common/container/EmptyCard';

export default function NextMonthClub() {
  const nextMonthFieldAndHost = useRecoilValue(nextMonthFieldAndHostSelector);

  const nextClub = useRecoilValue(clubByMonthSelector(nextYearMonthId));

  const { book: nextBook, id: nextMonthId } = nextClub || {};

  const { field } = nextMonthFieldAndHost || {};

  const initialEventMeeting: MonthlyBookClub['meeting'] = {
    place: '카페 느티',
    time: formatDate(
      getThirdSunday(+thisYear, +nextMonth, 11, 0),
      "yyyy-MM-dd'T'HH:mm:ss",
    ),
    eventMonth: {
      title: '',
      contents: [
        { id: v4(), title: `${thisYear}년 재독 챌린지 결과`, detail: '' },
        { id: v4(), title: `${thisYear}년 가장 멋진 발제문은?`, detail: '' },
        { id: v4(), title: `${nextYear}년 책분야와 발제자`, detail: '' },
      ],
      hosts: [],
    },
  };

  const { showModal } = useHandleModal();

  const navigate = useNavigate();

  const onEditBtnClick = () =>
    navigate('/search', {
      state: { registerYearMonth: nextYearMonthId },
    });

  const registerEventMonth = async () => {
    showModal({
      element: (
        <EventMeetingModal
          title={`${nextMonth}월 독서모임 정보`}
          currentValue={initialEventMeeting}
          yearMonthId={nextYearMonthId}
        />
      ),
    });
  };

  return (
    <>
      {nextClub ? (
        nextBook ? (
          <MonthBookCard
            month={formatDate(nextMonthId, 'M')}
            book={nextBook}
            bookFields={field}
            className="!mb-0 h-full"
          />
        ) : (
          <MonthEventCard
            yearMonthId={nextMonthId}
            event={nextClub.meeting}
            className="!mb-0 h-full"
          />
        )
      ) : (
        <EmptyCard text="아직 등록된 다음달 모임책이 없어요.">
          <div className="flex gap-x-3">
            <SquareBtn
              name="모임책 등록"
              color="lightBlue"
              handleClick={onEditBtnClick}
            >
              <LuBook className="mr-2" />
            </SquareBtn>
            <SquareBtn
              name="이벤트 등록"
              color="purple"
              handleClick={registerEventMonth}
            >
              <LuPartyPopper className="mr-2" />
            </SquareBtn>
          </div>
        </EmptyCard>
      )}
    </>
  );
}
