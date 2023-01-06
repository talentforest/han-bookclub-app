import { getFbRoute, CLUB_INFO } from 'util/index';
import { getCollection, getDocument } from 'api/getFbDoc';
import { EmptyBox, RecordBox } from './RecommendArea';
import { useRecoilState } from 'recoil';
import { subjectsState, thisMonthState } from 'data/documentsAtom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SubjectCreateModal from 'components/organisms/bookclubthismonth/SubjectCreateModal';
import Record from 'components/organisms/RecordBox';

interface ISubjectAreaProps {
  monthId: string;
}

const SubjectArea = ({ monthId }: ISubjectAreaProps) => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);
  const { pathname } = useLocation();
  const { book } = thisMonthDoc;

  useEffect(() => {
    getDocument(CLUB_INFO, `${monthId}`, setThisMonthDoc);
    getCollection(getFbRoute(monthId).SUBJECT, setSubjects);
  }, [setThisMonthDoc, setSubjects, monthId]);

  return (
    <>
      {pathname.includes('bookclub') && (
        <SubjectCreateModal bookInfo={book} docMonth={monthId} />
      )}
      <RecordBox>
        {subjects?.length !== 0 ? (
          subjects?.map((subject) => (
            <Record
              key={subject.id}
              doc={subject}
              collectionName={getFbRoute(monthId).SUBJECT}
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
