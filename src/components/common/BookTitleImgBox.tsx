import { IBookApi } from "data/bookAtom";
import { useState } from "react";
import Overlay from "./Overlay";
import BookDesc from "./BookDesc";
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
  detailInfo,
  smSize,
}: PropsType) => {
  const [showBookDetail, setShowBookDetail] = useState(false);

  const onModalClick = () => {
    setShowBookDetail((prev) => !prev);
  };

  return (
    <>
      {thumbnail && title ? (
        <BookCoverTitleBox className={smSize ? "smSize" : ""}>
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            onClick={onModalClick}
          />
          <h3>{title}</h3>
          {detailInfo && showBookDetail && (
            <BookDetail>
              <Overlay onModalClick={onModalClick} />
              <BookDesc detailInfo={detailInfo} onModalClick={onModalClick} />
            </BookDetail>
          )}
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
  gap: 10px;
  align-items: center;
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

const BookDetail = styled.div`
  z-index: 1;
  position: fixed;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  > ul {
    z-index: 2;
    position: fixed;
    top: 30px;
    right: 0;
    left: 0;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
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
