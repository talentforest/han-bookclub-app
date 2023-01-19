import { getFbRoute } from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { EmptyBox, RecordBox } from './RecommendArea';
import { useRecoilState } from 'recoil';
import { subjectsState, clubInfoByMonthState } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectCreateModal from 'components/organisms/bookclubthismonth/SubjectCreateModal';
import Record from 'components/organisms/RecordBox';

interface ISubjectAreaProps {
  yearMonthId: string;
}

const SubjectArea = ({ yearMonthId }: ISubjectAreaProps) => {
  const [clubInfo, setClubInfo] = useRecoilState(clubInfoByMonthState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const { pathname } = useLocation();
  const { book } = clubInfo;
  const year = yearMonthId.slice(0, 4);

  useEffect(() => {
    getDocument(`BookClub-${year}`, `${yearMonthId}`, setClubInfo);
    getCollection(getFbRoute(yearMonthId).SUBJECTS, setSubjects);
  }, [year, setClubInfo, setSubjects, yearMonthId]);

  return (
    <>
      {pathname.includes('bookclub') && (
        <SubjectCreateModal bookInfo={book} docMonth={yearMonthId} />
      )}
      <RecordBox>
        {subjects?.length !== 0 ? (
          subjects?.map((subject) => (
            <Record
              key={subject.id}
              doc={subject}
              collectionName={getFbRoute(yearMonthId).SUBJECTS}
            />
          ))
        ) : (
          <EmptyBox>
            {pathname.includes('history')
              ? '기록된 발제문이 없습니다.'
              : '첫번째 발제문을 남겨보세요.'}
          </EmptyBox>
        )}
      </RecordBox>
    </>
  );
};

export default SubjectArea;
