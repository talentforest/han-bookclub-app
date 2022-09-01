import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects, { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";

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
      {subjects?.map((subject) => (
        <Subjects
          key={subject.id}
          subject={subject}
          docMonth={thisMonthDoc?.id}
        />
      ))}
    </>
  );
};

export default SubjectArea;
