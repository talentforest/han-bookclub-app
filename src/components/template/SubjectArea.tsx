import { getCollection, getDocument } from "util/getFirebaseDoc";
import { EmptyRecord, RecordBox } from "./RecommendationArea";
import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects from "components/common/SubjectBox";
import { useRecoilState } from "recoil";
import { subjectsState, thisMonthState } from "data/documentsAtom";
import { useEffect } from "react";
import { thisYearMonth } from "util/constants";

const SubjectArea = () => {
  const [thisMonthDoc, setThisMonthDoc] = useRecoilState(thisMonthState);
  const [subjects, setSubjects] = useRecoilState(subjectsState);

  useEffect(() => {
    getDocument("BookMeeting Info", `${thisYearMonth}`, setThisMonthDoc);
    getCollection(`BookMeeting Info/${thisYearMonth}/subjects`, setSubjects);
  }, [setThisMonthDoc, setSubjects]);

  return (
    <>
      <SubjectCreateModal
        bookInfo={thisMonthDoc?.book}
        docMonth={thisMonthDoc?.id}
      />
      <RecordBox>
        {subjects?.length !== 0 ? (
          subjects?.map((subject) => (
            <Subjects
              key={subject.id}
              subject={subject}
              docMonth={thisMonthDoc?.id}
            />
          ))
        ) : (
          <EmptyRecord>첫번째 발제문을 남겨보세요.</EmptyRecord>
        )}
      </RecordBox>
    </>
  );
};

export default SubjectArea;
