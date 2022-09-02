import { ExpandCircleDown } from "@mui/icons-material";
import { IBookApi } from "data/bookAtom";
import styled from "styled-components";
import device from "theme/mediaQueries";
import { timestamp } from "util/timestamp";

interface PropsType {
  detailInfo: IBookApi;
  onModalClick?: () => void;
}

const BookDesc = ({ detailInfo }: PropsType) => {
  return (
    <BookDetail>
      <h3>{detailInfo?.title}</h3>
      <ul>
        <li>
          <ExpandCircleDown />
          저자: {detailInfo?.authors?.join(", ")}
        </li>
        {detailInfo?.translators?.length !== 0 ? (
          <li>
            <ExpandCircleDown />
            역자: {detailInfo?.translators?.join(", ")}
          </li>
        ) : null}
        <li>
          <ExpandCircleDown />
          출간일: {timestamp(detailInfo?.datetime)}
        </li>
        <li>
          <ExpandCircleDown />
          출판사: {detailInfo?.publisher}
        </li>
        <li>
          <ExpandCircleDown />
          정가: {detailInfo?.price}원
        </li>
      </ul>
      <p>줄거리 {detailInfo?.contents}...</p>
      <a href={detailInfo?.url} target="_blank" rel="noreferrer">
        상세정보 보러가기
      </a>
    </BookDetail>
  );
};

const BookDetail = styled.div`
  top: 30px;
  right: 0;
  left: 0;
  width: 80%;
  border: 1px solid red;
  margin: 0 auto;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.theme.container.default};
  > h3 {
    font-weight: 700;
    margin-bottom: 20px;
  }
  ul {
    margin-bottom: 20px;
    border: 1px solid red;
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
    font-size: 14px;
    text-decoration: underline;
    color: ${(props) => props.theme.text.accent};
  }
  @media ${device.tablet} {
    /* height: /; */
  }
`;

export default BookDesc;
