import { getFbRoute } from 'util/index';
import { getCollection } from 'api/getFbDoc';
import { EmptyBox, Record } from './RecommendArea';
import { useRecoilState } from 'recoil';
import { subjectsState } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectCreateModal from 'components/organisms/bookclubthismonth/SubjectCreateModal';
import RecordBox from 'components/organisms/RecordBox';

interface ISubjectAreaProps {
  yearMonthId: string;
}

const SubjectArea = ({ yearMonthId }: ISubjectAreaProps) => {
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const { pathname } = useLocation();
  const thisMonthPage = pathname.includes('bookclub');

  useEffect(() => {
    getCollection(getFbRoute(yearMonthId).SUBJECTS, setSubjects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {thisMonthPage && <SubjectCreateModal docMonth={yearMonthId} />}
      <Record>
        {subjects?.length !== 0 ? (
          subjects?.map((subject) => (
            <RecordBox
              key={subject.id}
              doc={subject}
              collName={getFbRoute(yearMonthId).SUBJECTS}
            />
          ))
        ) : (
          <EmptyBox>
            {pathname.includes('history')
              ? '기록된 발제문이 없습니다.'
              : '첫번째 발제문을 남겨보세요.'}
          </EmptyBox>
        )}
      </Record>
    </>
  );
};

export default SubjectArea;
