import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects, { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";
import { EmptyRecord, RecordBox } from "./RecommendationArea";

interface PropsType {
  thisMonthDoc: IBookMeeting;
  subjects: IWrittenDocs[];
}

const SubjectArea = ({ thisMonthDoc, subjects }: PropsType) => {
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
