import { useNavigate } from 'react-router-dom';

import { LuBook, LuPartyPopper } from 'react-icons/lu';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { fieldAndHostSelector } from '@/data/fieldAndHostAtom';

import { useHandleModal } from '@/hooks';

import { formatDate, nextMonth, nextYearMonthId } from '@/utils';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import MonthEventCard from '@/components/bookCard/MonthEventCard';
import EventMeetingModal from '@/components/bookClub/EventMeetingModal';
import LabelWithValueCard from '@/components/common/LabelWithValueCard';
import SquareBtn from '@/components/common/button/SquareBtn';
import EmptyCard from '@/components/common/container/EmptyCard';

export default function NextMonthClub() {
  const nextClub = useRecoilValue(clubByMonthSelector(nextYearMonthId));

  const fieldAndHost = useRecoilValue(fieldAndHostSelector(nextYearMonthId));

  const { hosts, field } = fieldAndHost || {};

  const { book: nextBook, id: nextMonthId, meeting } = nextClub || {};

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
          title={`${+nextMonth}월 독서모임 정보`}
          yearMonthId={nextYearMonthId}
        />
      ),
    });
  };

  const nextMonthClubInfoList = nextClub && [
    {
      label: '모임시간' as const,
      value: meeting?.time,
    },
    {
      label: '모임장소' as const,
      value: meeting?.place,
    },
    {
      label: '발제자' as const,
      value: hosts,
    },
  ];

  return (
    <>
      {nextClub ? (
        <>
          {nextBook ? (
            <div className="grid grid-cols-2 gap-6 max-sm:flex max-sm:flex-col max-sm:gap-4">
              <MonthBookCard
                month={formatDate(nextMonthId, 'M')}
                book={nextBook}
                field={field}
                className="col-span-1 h-full"
              />
              <div className="col-span-1 flex flex-col gap-4">
                {nextMonthClubInfoList.map(({ label, value }) => (
                  <LabelWithValueCard
                    key={label}
                    label={label}
                    value={value}
                    editable={false}
                  />
                ))}
              </div>
            </div>
          ) : (
            <MonthEventCard
              yearMonthId={nextMonthId}
              event={nextClub.meeting}
            />
          )}
        </>
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
