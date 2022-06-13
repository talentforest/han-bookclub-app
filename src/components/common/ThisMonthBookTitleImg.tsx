import { BookCoverTitleBox } from "theme/commonStyle";
import styled from "styled-components";
import { BookMeetingInfo } from "routes/BookMeeting";

interface PropsType {
  docData: BookMeetingInfo[];
}

const ThisMonthBookTitleImg = ({ docData }: PropsType) => {
  return (
    <>
      {docData.length ? (
        <BookCoverTitleBox>
          <img src={docData[0]?.book.thumbnail} alt="Book_Image" />
          <h3>{docData[0]?.book.title}</h3>
        </BookCoverTitleBox>
      ) : (
        <EmptySign>
          등록된 책이
          <br />
          없습니다.
        </EmptySign>
      )}
    </>
  );
};

const EmptySign = styled.div`
  text-align: center;
  height: 130px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.container.default};
  font-size: 13px;
  font-weight: 700;
`;

export default ThisMonthBookTitleImg;
