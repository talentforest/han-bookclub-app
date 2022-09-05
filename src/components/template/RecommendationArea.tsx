import BookRecomBox from "components/bookmeeting/BookRecomBox";
import BookRecomCreateBox from "components/bookmeeting/BookRecomCreateBox";
import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { currentUserState } from "data/userAtom";
import { useRecoilValue } from "recoil";
import { IBookMeeting } from "util/getFirebaseDoc";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  thisMonthDoc: IBookMeeting;
  recommends: IWrittenDocs[];
}

const RecommendationArea = ({ thisMonthDoc, recommends }: PropsType) => {
  const userData = useRecoilValue(currentUserState);

  return (
    <>
      <BookRecomCreateBox
        uid={userData?.uid}
        thisMonthBook={thisMonthDoc?.book}
        docMonth={thisMonthDoc?.id}
      />
      <RecordBox>
        {recommends.length !== 0 ? (
          recommends?.map((recommend) => (
            <BookRecomBox
              key={recommend.id}
              recommend={recommend}
              docMonth={thisMonthDoc?.id}
            />
          ))
        ) : (
          <EmptyRecord>첫번째 추천책을 남겨보세요.</EmptyRecord>
        )}
      </RecordBox>
    </>
  );
};

export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 50px auto 70px;
  padding: 5px 20px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  @media ${device.tablet} {
    font-size: 16px;
    border-radius: 30px;
    padding: 8px 30px;
  }
`;

export default RecommendationArea;
