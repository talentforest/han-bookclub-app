import Subtitle from "components/common/Subtitle";
import styled from "styled-components";
import device from "theme/mediaQueries";
import BookTitleImgBox from "components/common/BookTitleImgBox";
import MeetingInfoBox from "components/common/MeetingInfoBox";
import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import { getMonthNumber } from "util/getMonthNumber";
import { BookMeetingInfo } from "routes/BookMeeting";

interface PropsType {
  item: BookMeetingInfo;
}

const HistoryBox = ({ item }: PropsType) => {
  return (
    <BookMeeting to={`${item.id}`} state={{ item: item }}>
      <Subtitle title={`${getMonthNumber(item.id)}월의 책`} />
      <Info>
        <BookTitleImgBox docData={item?.book} />
        <MeetingInfoBox docData={item?.meeting} />
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

export default HistoryBox;
