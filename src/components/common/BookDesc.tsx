import { ExpandCircleDown } from "@mui/icons-material";
import { IBookApi } from "data/bookAtom";
import styled from "styled-components";
import { timestamp } from "util/timestamp";

interface PropsType {
  bookInfo: IBookApi;
  onModalClick?: () => void;
}

const BookDesc = ({ bookInfo }: PropsType) => {
  return (
    <BookDetail>
      <h3>{bookInfo?.title}</h3>
      <li>
        <ExpandCircleDown />
        저자: {bookInfo?.authors?.join(", ")}
      </li>
      {bookInfo?.translators?.length !== 0 ? (
        <li>
          <ExpandCircleDown />
          역자: {bookInfo?.translators?.join(", ")}
        </li>
      ) : null}
      <li>
        <ExpandCircleDown />
        출간일: {timestamp(bookInfo?.datetime)}
      </li>
      <li>
        <ExpandCircleDown />
        출판사: {bookInfo?.publisher}
      </li>
      <li>
        <ExpandCircleDown />
        정가: {bookInfo?.price}원
      </li>
      <p>줄거리 {bookInfo?.contents}...</p>
      <a href={bookInfo?.url} target="_blank" rel="noreferrer">
        상세정보 보러가기
      </a>
    </BookDetail>
  );
};

const BookDetail = styled.ul`
  border-radius: 10px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: 0 auto;
  padding: 15px;
  width: 95%;
  > h3 {
    font-weight: 700;
    margin-bottom: 10px;
  }
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
  > p {
    margin-top: 10px;
    line-height: 1.6;
  }
  a {
    padding-top: 10px;
    font-size: 14px;
    text-decoration: underline;
    color: ${(props) => props.theme.text.accent};
  }
`;

export default BookDesc;
