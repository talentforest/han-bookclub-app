import { useRecoilValue } from 'recoil';

import { clubByYearMonthIdListAtomFamily } from '@/data/clubAtom';

import ClubCard from '@/components/bookCard/ClubCard';

interface MyClubDisplayListProps {
  hostYearMonthIdList: string[];
}

export default function MyClubDisplayList({
  hostYearMonthIdList,
}: MyClubDisplayListProps) {
  const hostClubs = useRecoilValue(
    clubByYearMonthIdListAtomFamily(hostYearMonthIdList),
  );

  return (
    <>
      {hostClubs?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-y-3">
          {hostClubs.map(club => (
            <li key={club.id}>
              <ClubCard club={club} />
            </li>
          ))}
        </ul>
      ) : hostClubs?.length === 1 ? (
        <ClubCard club={hostClubs[0]} />
      ) : (
        <></>
      )}
    </>
  );
}
