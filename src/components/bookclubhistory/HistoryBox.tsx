import { Link } from "react-router-dom";
import { ChevronRight, LocalActivity } from "@mui/icons-material";
import { getMonthNumber } from "util/getMonthNumber";
import { IBookMeeting } from "util/getFirebaseDoc";
import Subtitle from "components/common/Subtitle";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import device from "theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  bookMeeting: IBookMeeting;
}

const HistoryBox = ({ bookMeeting }: PropsType) => {
  const { id, book } = bookMeeting;

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
  padding: 20px 20px 70px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  > button {
    position: absolute;
    right: 10px;
    bottom: 20px;
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
    color: ${(props) => props.theme.text.lightBlue};
    svg {
      padding-top: 3px;
      fill: ${(props) => props.theme.text.lightBlue};
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
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
  @media ${device.tablet} {
    margin-top: 50px;
  }
`;

export default HistoryBox;
