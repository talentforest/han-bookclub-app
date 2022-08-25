import SubjectCreateModal from "components/bookmeeting/SubjectCreateModal";
import Subjects, { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookMeeting } from "util/getFirebaseDoc";

interface PropsType {
  latestDoc: IBookMeeting;
  monthSubjects: IWrittenDocs[];
}

const SubjectArea = ({ latestDoc, monthSubjects }: PropsType) => {
  return (
    <>
      <SubjectCreateModal bookInfo={latestDoc?.book} docMonth={latestDoc?.id} />
      {monthSubjects?.map((subject) => (
        <Subjects key={subject.id} subject={subject} docMonth={latestDoc?.id} />
      ))}
    </>
  );
};

export default SubjectArea;
