import { Link } from 'react-router-dom';
import { ChevronRight, LocalActivity } from '@mui/icons-material';
import { getMonthNm } from 'util/index';
import { IBookClubMonthInfo } from 'data/documentsAtom';
import BookImgTitle from 'components/atoms/BookImgTitle';
import device from 'theme/mediaQueries';
import styled from 'styled-components';

interface PropsType {
  bookMeeting: IBookClubMonthInfo;
}

const HistoryBox = ({ bookMeeting }: PropsType) => {
  const { id, book } = bookMeeting;

  return (
    <BookMeeting to={`${id}`} state={{ bookMeeting }}>
      <Title>{`${getMonthNm(id)}월의 책`}</Title>
      <Info>
        {book.thumbnail ? (
          <BookImgTitle thumbnail={book.thumbnail} title={book.title} />
        ) : (
          <Event>
            <LocalActivity />
            <span>이벤트</span>
          </Event>
        )}
      </Info>
      <Btn type='button'>
        자세히 보기 <ChevronRight />
      </Btn>
    </BookMeeting>
  );
};

const BookMeeting = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;
const Title = styled.h4`
  font-size: 14px;
  color: ${(props) => props.theme.text.gray};
  font-weight: 700;
  margin-left: 20px;
`;

const Info = styled.div`
  margin: 10px auto;
`;
const Btn = styled.button`
  width: fit-content;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.text.lightBlue};
  svg {
    padding-top: 3px;
    fill: ${(props) => props.theme.text.lightBlue};
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
  @media ${device.tablet} {
    margin-top: 50px;
  }
`;

export default HistoryBox;
