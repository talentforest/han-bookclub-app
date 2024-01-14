import { IBookApi } from 'data/bookAtom';
import { getLocalDate } from 'util/index';
import styled from 'styled-components';
import device from 'theme/mediaQueries';

interface PropsType {
  detailInfo: IBookApi;
}

const BookDesc = ({ detailInfo }: PropsType) => {
  return (
    <BookDetail>
      <h3>{detailInfo?.title}</h3>
      <ul>
        <li>저자: {detailInfo?.authors?.join(', ')}</li>
        {detailInfo?.translators?.length !== 0 ? (
          <li>역자: {detailInfo?.translators?.join(', ')}</li>
        ) : null}
        <li>출간일: {getLocalDate(detailInfo?.datetime)}</li>
        <li>출판사: {detailInfo?.publisher}</li>
        <li>정가: {detailInfo?.price.toLocaleString()}원</li>
      </ul>
      <p>줄거리 {detailInfo?.contents}...</p>
      {detailInfo?.url && (
        <a href={detailInfo?.url} target='_blank' rel='noreferrer'>
          상세정보 보러가기
        </a>
      )}
    </BookDetail>
  );
};

const BookDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: ${(props) => props.theme.container.default};
  > h3 {
    font-weight: 700;
    margin-bottom: 20px;
  }
  ul {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    > li {
      margin-bottom: 5px;
      font-size: 16px;
      display: flex;
      align-items: center;
      svg {
        width: 14px;
        margin-right: 5px;
        padding-top: 2px;
      }
    }
  }
  > p {
    line-height: 1.6;
  }
  a {
    align-self: flex-end;
    font-size: 14px;
    text-decoration: underline;
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    min-height: 40vh;
    padding: 30px;
    > h3 {
      font-size: 20px;
    }
  }
  a {
    font-size: 16px;
    margin-top: 20px;
  }
`;

export default BookDesc;