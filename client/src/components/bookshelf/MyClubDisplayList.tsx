import { useRecoilValue } from 'recoil';

import { clubByYearMonthIdListAtomFamily } from '@/data/clubAtom';

import ClubCard from '@/components/bookCard/ClubCard';

interface MyClubDisplayListProps {
  hostYearMonthIdList: string[];
}

export default function MyClubDisplayList({
  hostYearMonthIdList,
}: MyClubDisplayListProps) {
  const idListToString = hostYearMonthIdList.join(',');

  const { status, data: myClubList } = useRecoilValue(
    clubByYearMonthIdListAtomFamily(idListToString),
  );

  return (
    <>
      {status === 'loaded' && (
        <>
          {myClubList.length === 0 && (
            <span className="text-gray2">아직 진행한 모임이 없습니다</span>
          )}

          {myClubList?.length > 0 ? (
            <ul className="grid grid-cols-1 gap-y-3">
              {myClubList.map(club => (
                <li key={club.docId}>
                  <ClubCard club={club} />
                </li>
              ))}
            </ul>
          ) : myClubList?.length === 1 ? (
            <ClubCard club={myClubList[0]} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
