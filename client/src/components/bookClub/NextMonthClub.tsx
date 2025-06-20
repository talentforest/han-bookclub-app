import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import EmptyCard from '@/components/common/container/EmptyCard';
import { clubByMonthSelector } from '@/data/clubAtom';
import { nextMonthFieldAndHostSelector } from '@/data/fieldAndHostAtom';
import { formatDate, getNextMonthId } from '@/utils';

export default function NextMonthClub() {
  const nextMonthFieldAndHost = useRecoilValue(nextMonthFieldAndHostSelector);

  const nextClub = useRecoilValue(clubByMonthSelector(getNextMonthId()));

  const navigate = useNavigate();

  const { book: nextBook, id: nextMonthId } = nextClub || {};

  const { field } = nextMonthFieldAndHost || {};

  return (
    <>
      {nextBook ? (
        <MonthBookCard
          month={formatDate(nextMonthId, 'M')}
          book={nextBook}
          bookFields={field}
          className="!mb-0 h-full"
        />
      ) : (
        <EmptyCard
          text="아직 등록된 다음달 모임책이 없어요."
          createBtnTitle="다음달 모임책 등록하기"
          onCreateClick={() =>
            navigate('/search', { state: { registerMonth: 'nextMonth' } })
          }
        />
      )}
    </>
  );
}
