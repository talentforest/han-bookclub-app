import { Link } from 'react-router-dom';
import { ArrowForwardIos, LocalActivity } from '@mui/icons-material';
import { cutLetter, getMonthNm } from 'util/index';
import { IBookClubMonthInfo } from 'data/documentsAtom';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  document: IBookClubMonthInfo;
}

const HistoryBox = ({ document }: PropsType) => {
  const { id, book } = document;

  return (
    <BookBox to={`${id}`} state={{ document }}>
      <Header>
        <h3>{`${getMonthNm(id)}월의 책`}</h3>
        <Btn type='button'>
          <ArrowForwardIos />
        </Btn>
      </Header>
      {book.thumbnail ? (
        <>
          <Img src={book.thumbnail} alt={`${book.title}`} />
          <Title>{cutLetter(book.title, 20)}</Title>
        </>
      ) : (
        <>
          <LocalActivity />
          <Title>이벤트</Title>
        </>
      )}
    </BookBox>
  );
};

const BookBox = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.container.default};
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  > svg {
    margin: 0 auto;
    height: 80px;
    width: 50px;
    fill: gold;
  }
  @media ${device.tablet} {
    padding: 20px 10px;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  > h3 {
    padding-left: 10px;
    font-weight: 700;
    font-size: 14px;
    color: ${(props) => props.theme.text.gray};
  }
`;
const Img = styled.img`
  width: auto;
  height: 80px;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.container.default};
  margin: 15px auto 10px;
`;
const Title = styled.h4`
  font-weight: 700;
  text-align: center;
  padding: 0 2px;
  height: 40px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Btn = styled.button`
  svg {
    font-size: 14px;

    fill: ${(props) => props.theme.text.lightBlue};
  }
`;

export default HistoryBox;
