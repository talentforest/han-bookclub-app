import { IBookApi } from "data/bookAtom";
import styled from "styled-components";
import device from "theme/mediaQueries";

interface PropsType {
  thumbnail: string;
  title: string;
  detailInfo?: IBookApi;
  smSize?: string;
}

const BookTitleImgBox = ({
  thumbnail,
  title,

  smSize,
}: PropsType) => {
  return (
    <>
      {thumbnail && title ? (
        <BookCoverTitleBox className={smSize ? "smSize" : ""}>
          <img src={thumbnail} alt={`${title} thumbnail`} />
          <h3>{title}</h3>
        </BookCoverTitleBox>
      ) : (
        <EmptySign className={smSize ? "smSize" : ""}>
          <div />
          <span>등록된 책이 없습니다.</span>
        </EmptySign>
      )}
    </>
  );
};

export const BookCoverTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 180px;
  margin-top: 10px;
  img {
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    width: auto;
    height: 140px;
  }
  svg {
    height: 100%;
    width: 70px;
  }
  h3 {
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  &.smSize {
    flex-direction: row;
    justify-content: flex-start;
    min-height: fit-content;
    img {
      height: 30px;
    }
    svg {
      height: 24px;
    }
    h3 {
      margin-left: 10px;
      font-size: 12px;
    }
  }
  @media ${device.tablet} {
    min-height: 230px;
    svg,
    img {
      height: 180px;
    }
    h3 {
      margin-top: 10px;
      font-size: 18px;
      margin-left: 0px;
    }
    &.smSize {
      svg,
      img {
        height: 46px;
      }
      h3 {
        margin-left: 16px;
        font-size: 16px;
      }
    }
  }
`;

const EmptySign = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5px auto 0;
  height: 200px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95px;
    height: 130px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.container.default};
  }
  span {
    margin-top: 10px;
    font-size: 18px;
    margin-left: 0px;
    font-weight: 700;
  }
  &.smSize {
    flex-direction: row;
    justify-content: flex-start;
    height: fit-content;
    div {
      width: 30px;
      height: 46px;
    }
    span {
      font-size: 16px;
      margin-left: 16px;
    }
  }
`;

export default BookTitleImgBox;
