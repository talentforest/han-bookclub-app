import { LogInUserInfo } from "components/App";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SubjectBox, { DocumentType } from "./SubjectBox";

interface PropsType {
  subjects: DocumentType[];
  userObj: LogInUserInfo;
}

const SubjectBoxes = ({ subjects, userObj }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  return (
    <SubjectContainer>
      {subjects.map(({ text, createdAt, creatorId, id }) => (
        <SubjectBox
          key={id}
          id={id}
          uid={userData?.uid}
          creatorId={creatorId}
          text={text}
          createdAt={createdAt}
          userObj={userObj}
        />
      ))}
    </SubjectContainer>
  );
};

const SubjectContainer = styled.div`
  border-radius: 5px;
  margin: 10px 5px;

  font-size: 13px;
`;

export default SubjectBoxes;
