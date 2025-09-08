import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { nextMonthFieldAndHostSelector } from '@/data/fieldAndHostAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { DEVELOPER_EMAIL } from '@/appConstants';

import { formatDate, getNextYearMonthId } from '@/utils';

import MonthBookCard from '@/components/bookCard/MonthBookCard';
import SquareBtn from '@/components/common/button/SquareBtn';
import EmptyCard from '@/components/common/container/EmptyCard';

export default function NextMonthClub() {
  const nextMonthFieldAndHost = useRecoilValue(nextMonthFieldAndHostSelector);

  const nextClub = useRecoilValue(clubByMonthSelector(getNextYearMonthId()));

  const { book: nextBook, id: nextMonthId } = nextClub || {};

  const { field } = nextMonthFieldAndHost || {};

  const { email } = useRecoilValue(currAuthUserAtom);

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
        <EmptyCard text="아직 등록된 다음달 모임책이 없어요.">
          {DEVELOPER_EMAIL === email && (
            <SquareBtn
              name="다음달은 이벤트달!"
              color="purple"
              handleClick={() => {}}
            />
          )}
        </EmptyCard>
      )}
    </>
  );
}
