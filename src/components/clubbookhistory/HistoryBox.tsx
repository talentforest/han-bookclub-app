import { Link } from "react-router-dom";
import { ChevronRight, LocalActivity } from "@mui/icons-material";
import { getMonthNumber } from "util/getMonthNumber";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subtitle from "components/common/Subtitle";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import device from "theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  bookMeeting: IBookMeeting;
}

const HistoryBox = ({ bookMeeting }: PropsType) => {
  const { id, book, meeting } = bookMeeting;

  return (
    <BookMeeting to={`${id}`} state={{ bookMeeting }}>
      <Subtitle title={`${getMonthNumber(id)}월의 책`} />
      <Info>
        {book.thumbnail ? (
          <BookTitleImgBox thumbnail={book.thumbnail} title={book.title} />
        ) : (
          <Event>
            <LocalActivity />
            <span>이벤트</span>
          </Event>
        )}
        <MeetingInfoBox docData={meeting} />
      </Info>
      <button type="button">
        자세히 보기 <ChevronRight />
      </button>
    </BookMeeting>
  );
};

const BookMeeting = styled(Link)`
  position: relative;
  width: 100%;
  border-radius: 7px;
  margin-top: 10px;
  padding: 10px 20px 40px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  > button {
    display: flex;
    align-items: center;
    position: absolute;
    border: none;
    background-color: transparent;
    right: 10px;
    font-size: 14px;
    font-weight: 700;
    color: ${(props) => props.theme.text.lightBlue};
    svg {
      padding-top: 3px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
  @media ${device.tablet} {
    padding: 20px 20px 40px;
    margin-top: 20px;
    width: 48%;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  > div:last-child {
    box-shadow: none;
    width: fit-content;
  }
`;

const Event = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 20px 0;
  background-color: ${(props) => props.theme.container.blue};
  > svg {
    height: 60px;
    width: 60px;
    fill: gold;
  }
  > span {
    color: ${(props) => props.theme.text.white};
    font-weight: 700;
  }
`;

export default HistoryBox;
